var Firebase = require('firebase');
//var dataRef = new Firebase('https://interim.firebaseio.com/');
var dataRef = new Firebase('https://interim.firebaseio.com/');

// Initalize main folders in database
//dataRef.set('CommunityDB');
//dataRef.set('UsersDB');

// Shorthand to access stored data
exports.communityRef = function(community) {
  return dataRef.child('CommunityDB').child(community);
};
exports.groupRef = function(group, community) {
  return dataRef.child('CommunityDB').child(community).child('communityGroups');
};
exports.usersRef = function(user){
  return dataRef.child('UsersDB').child(user);
};


/*Database layout:
  Interim
    - UsersDB
      -userName-authType
        - userName: ,
        - userId: randomNumber333333,
        - chatId: null, // value once chatted
        - usersGroups: {
            Group1: true,
            Group2: false
                        }
          // Requested an authenticated groups are indicated as true
          // Pending groups are indicated as false
        - userProfile: {
            location: null,
            url: null,
            freeText: " ",
            image: null
                        },
        - authType: Github/Twitter/FB/etc
        - role: (admin, superadmin, user)
    - CommunityDB
      - "SFInterns"
        - communityName:
        - communityLocation:
        - communityFounder:
        - communityFoundingDate:
        - communityGroups:
        - "Summer 2015"
        - "Fall 2015"
        - "Summer 2016"
      - "MakerSquare"
        -"MKS15"
        -"MKS17"
    - room-metadata (ChatsDB)
      -randomRoomNumber3449919
        - createdAt:
        - id:
        - name:
        - type:
          -randomMessageNumber332382
            - userName:
            - messageContent:
            - type : public (vs private)
            - tags:
            - contentType: (text, link, file/image)
    - TaggedMessages
      -TagName
        - randomNumber3449919 (same as ChatDB)
        - randomNumber3555555


*/


// Creating Profiles adding to the database.
// To-do: Data will need be to be validated when storing to datebase.
// user argument should be a completed object
exports.createUser = function(user, cb){
// Generate a userId by storing in db
  var userObj = {};
  var dbName = user.userName +"-" + user.authType;
  userObj[dbName] = user;

    dataRef.child('UsersDB').update( userObj , function(error){
      if(!error){
      console.log("User ", user.userName, "sucessfully created.");
    }else{
      console.log("Error while setting user information");
    }
  });
};
// Updating Profiles that already exist in the database.
// TBV: May only need generic update, where type indicates user/group/community.
// To-do: Data will need be to be validated when storing to databse.
// To-do refactor: exports.updateProfile = function(name, type, profile);

exports.updateUser = function(userName, changedField, fieldValue, cb){
  console.log(userName, " requested a profile update");
  cb = cb || defaultCb('Failed to update user profile for ', userName);
  var tempObj = {};
  tempObj[changedField] = fieldValue;
  dataRef.child('UsersDB').child(userName).child('userProfile').update(tempObj, cb);
};

exports.requestUserToGroup = function(userName, groupName, communityName, cb) {
  // Check if user already authenitcated for this group
  // We do not want to erase existing approval from the group by mis-click

  var commGroupName = groupName +"-" + communityName;
  console.log(userName, "'s request to join ", commGroupName, " in progress...");

  if(dataRef.child('UsersDB').child(userName).child('usersGroups').child(commGroupName)){

      // Update user profile to reflect request
      console.log(userName, " requested to join ", groupName, " of ", communityName);
      var tempObj = {};
      // Pull data, check false || snapshot.val()
      // TO-DO: This is still overwriting groupName:true for existing approvals
      tempObj[commGroupName] = false;
      cb = cb || defaultCb('Failed to request user ', userName, ' to join group ', groupName );
      dataRef.child('UsersDB').child(userName).child('usersGroups').update(tempObj, function(){
        console.log("Callback from UserDB update");
      });

  }else{
    console.log("User ", userName, " already is a member of ", groupName, " within ", communityName);
  }
};

// Updates group profile of all group members
exports.requestGroupToUser = function(userName, groupName, communityName, cb){
      console.log(groupName, " notified of request to join from ", userName);
      var groupObj = {};
      groupObj[userName] = false;
      console.log("Temp group permission request object ", groupObj);
      console.log("Group ", groupName, " updated with ", userName, "'s request.");
      dataRef.child('CommunityDB').child(communityName).child('communityGroups').child(groupName).child('groupMembers').update(groupObj, cb);

};

exports.createCommunity = function(communityName, currentAdmin, cb){

  if(dataRef.child('CommunityDB').child(communityName) ){
    dataRef.child('CommunityDB').set({ communityName: communityName,
                                       communityFounder: currentAdmin,
                                       communityFoundingDate: Firebase.ServerValue.TIMESTAMP,
                                       communityGroups: {},
                                       communityLocation: 'unknown',
                                       communityPrivacy: 'private'
                                       // communityGroups not made
                                     });
  console.log("Community ", communityName, " sucessfully created");
  }else{
    console.log("Error: Community already exits in database.");
  }

};

exports.createGroup = function(groupName, communityName, currentAdmin, cb){
  if(dataRef.child('CommunityDB').child(communityName).child(groupName)){
     var newGroup = { groupName: groupName,
                      groupFounder: currentAdmin,
                      groupFoundingDate: Firebase.ServerValue.TIMESTAMP,
                      groupLocation: 'unknown',
                      groupPrivacy: 'private'
                     };
    cb = cb || defaultCb('Failed to create Group ', groupName, communityName );
    var tempGroup ={};
    tempGroup[groupName] = newGroup;
    dataRef.child('CommunityDB').child(communityName).child('communityGroups').update(tempGroup, cb);
    console.log("Group ", groupName, " sucessfully created in ", communityName);
  }else{
    console.log("Error: Group ", groupName ," already exits in under the ", communityName, " community.");
  }
};

// Group & Community update functions
exports.updateGroup = function(communityName, groupName, changedField, fieldValue, cb){
  var groupObj = {};
  groupObj[changedField] = fieldValue;
  cb = cb || defaultCb('Failed to update group ', groupName, "property: ", changedField, fieldValue);
  dataRef.child('CommunityDB').child(communityName).child('communityGroups').child(groupName).update(groupObj, cb);
  console.log("Group ", groupName, " updated ", changedField, " to ", fieldValue);
};

exports.updateCommunity = function(communityName, changedField, fieldValue, cb){
  var commObj = {};
  commObj[changedField] = fieldValue;
  cb = cb || defaultCb('Failed to update community ', communityName, "'s property ", changedField, fieldValue);
  dataRef.child('CommunityDB').child(communityName).update(commObj, cb);
  console.log("Community ", communityName, " updated ", changedField, " to ", fieldValue);
};



// Creation of helpers in the Community frame
exports.createTag = function(tag){};  //last

// Admin utilities: Validations during the creation process.
exports.validateUserToGroup = function(userName, groupName, communityName, cb) {

  // Update in user's profile

  var tempObj = {};
  tempObj[groupName] = true;
  cb = cb || defaultCb('Failed to validate user ', userName, "to group ", groupName);
  dataRef.child('UsersDB').child(userName).child('userProfile').child('usersGroups').update(tempObj);

  //To-do: Refactor with the requestUserToGroup / requestGroupToUser
  //http://stackoverflow.com/questions/5135566/javascript-callbacks-and-optional-params
};

//Admin functions
exports.validateUserToCommunity = function(userName, groupName, communityName, cb){
  var tempObj = {};
  tempObj[groupName] = true;
  cb = cb || defaultCb('Failed to validate user ', userName, "to group ", groupName);
  dataRef.child('UsersDB').child(userName).child('userProfile').child('usersGroups').update(tempObj);

};  //2
exports.validateGroup = function(sessionInfo) {}; //3


//Super Admin functions
exports.validateCommunity = function(community){}; //4
exports.deactivateUserFromGroup = function(user, group){};  //5


// Opening Groups & Communities, retrieving their info.
// Expect these to be called by Angular front-end
exports.openGroup = function(group){};
exports.openCommunity = function(community){};

// Database helper methods
var defaultCb = function(message) {
  message = message || 'Unable to access database';
  return function(err) {
    if (err) {
      console.error(message, err);
    }
  };
};

// Switch to a new reference database for testing purposes
// exports._changeRef = function(newRef) {
//   dataRef = newRef || dataRef;
// };

