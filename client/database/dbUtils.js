var Firebase = require('firebase');
//var dataRef = new Firebase('https://interim.firebaseio.com/');
var dataRef = new Firebase('https://unsheep.firebaseio.com/');

// Initalize main folders in database
//dataRef.set('CommunityDB');
//dataRef.set('UsersDB');

// Shorthand to access stored data
var communityRef = function(community) {
  return dataRef.child('CommunityDB').child(community);
};
var groupRef = function(group) {
  return dataRef.child('CommunityDB').child('group');
};
var usersRef = function(user){
  return dataRef.child('UsersDB');
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

// Data validation that the appropriate parameters are present
// var validateDataUser = function(userInfo) {
//   return userInfo && userInfo.auth && userInfo.userId;
// };
// var validateDataGroup = function(groupInfo) {
//   return validateUser(groupInfo.name) && sessionInfo.sessionId;
// };

// Creating Profiles adding to the database.
// To-do: Data will need be to be validated when storing to datebase.
// user argument should be a completed object
var createUser = function(user, cb){
// Generate a userId by storing in db
  var userObj = {};
  var dbName = user.userName +"-" + user.authType;
  userObj[dbName] = user;

  //dataRef.child('UsersDB').push(user);
    dataRef.child('UsersDB').set( userObj , function(error){
      if(!error){
      console.log("User ", user.userName, "sucessfully created.");
    }else{
      console.log("Error while setting user information");
    }
     })

};
// Updating Profiles that already exist in the database.
// TBV: May only need generic update, where type indicates user/group/community.
// To-do: Data will need be to be validated when storing to databse.
// var updateProfile = function(name, type, profile);

var updateUser = function(userName, changedField, fieldValue){
  console.log(userName, " requested a profile update");
  var tempObj = {};
  tempObj[changedField] = fieldValue;
  dataRef.child('UsersDB').child(userName).child('profile').update(tempObj);

};

var createCommunity = function(communityName, currentAdmin, cb){

  if(dataRef.child('CommunityDB').child(communityName) ){
    dataRef.child('CommunityDB').set({ communityName: communityName,
                                       communityFounder: currentAdmin,
                                       communityFoundingDate: Firebase.ServerValue.TIMESTAMP,
                                       communityGroups: {}
                                       // communityGroups not made
                                     });
  }else{
    console.log("Error: Community already exits in database.")
  }

};

var createGroup = function(groupName, communityName, currentAdmin){
  if(dataRef.child('CommunityDB').child(communityName).child(groupName) ){
    dataRef.child('CommunityDB').child(communityName).set({ groupName: groupName,
                                       groupFounder: currentAdmin,
                                       groupFoundingDate: Firebase.ServerValue.TIMESTAMP,
                                       communityGroups: {}
                                       // communityGroups not made yet
                                     });
    var newGroup = {};
    newGroup[groupName] = groupName;
    dataRef.child('CommunityDB').child(communityName).child('communityGroups').set(newGroup);
  }else{
    console.log("Error: Community already exits in database.")
  }

};

// Creation of helpers in the Community frame
var createRoom = function(room){};
var createTag = function(tag){};

var updateGroup = function(group, groupProfile){};
var updateCommunity = function(community, communityProfile){};

// Admin utilities: Validations during the creation process.
var validateUserToGroup = function(user, group) {};
var validateUserToCommunity = function(user, community){};
var validateGroup = function(sessionInfo) {};
var validateCommunity = function(community){};
var deactivateUserFromGroup = function(user, group){};


// Opening Groups & Communities, retrieving their info.
// Expect these to be called by Angular front-end
var openGroup = function(group){};
var openCommunity = function(community){};

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
// var _changeRef = function(newRef) {
//   dataRef = newRef || dataRef;
// };

// Debugging tests purposes
var helloWorld = function(){
  console.log("Hello from dbUtils!");
}
