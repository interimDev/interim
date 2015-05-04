var Firebase = require('firebase');
//var dataRef = new Firebase('https://interim.firebaseio.com/');
var dataRef = new Firebase('https://unsheep.firebaseio.com/');

// Initalize main folders in database
dataRef.child('CommunityDB');
dataRef.child('UsersDB');

// Shorthand to access stored data
exports.communityRef = function(community) {
  return dataRef.child('CommunityDB').child(community);
};
exports.groupRef = function(group) {
  return dataRef.child('CommunityDB').child().child('group');
};
exports.usersRef = function(user){
  return dataRef.child('UsersDB').child(user);
};


/*Database layout:
  Interim
    - UsersDB
      -randomNumber333333
        - userName:
        - chatID: null, // value once chatted
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
        - auth:
        - role: (admin, superadmin, user)
    - CommunityDB
      - "SFInterns"
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
exports.createUser = function(user, cb){
// Generate a userId by storing in db
cb = cb || defaultCb('Failed to create user');
  dataRef.push(user, cb);


// function go() {
//   var userData = { 'userName': userName };
//   tryCreateUser(userName, userData);
// }

// var userCreated = function(userName, success) {
//   if (!success) {
//     alert('user ' + userName + ' already exists!');
//   } else {
//     alert('Successfully created ' + userName);
//   }
// }

// // Tries to set /usersDB/<userId> to the specified data, but only
// // if there's no data there already.
// function tryCreateUser(userName, userData) {
//   usersRef.child(userName).transaction(function(currentUserData) {
//     if (currentUserData === null)
//       return userData;
//   }, function(error, committed) {
//     userCreated(userName, committed);
//   });
// }


};
exports.createGroup = function(group){};
exports.createCommunity = function(community){};

// Creation of helpers in the Community frame
exports.createRoom = function(room){};
exports.createTag = function(tag){};


// Updating Profiles that already exist in the database.
// TBV: May only need generic update, where type indicates user/group/community.
// To-do: Data will need be to be validated when storing to databse.
// exports.updateProfile = function(name, type, profile);

exports.updateUser = function(userName, userProfile){};
exports.updateGroup = function(group, groupProfile){};
exports.updateCommunity = function(community, communityProfile){};

// Admin utilities: Validations during the creation process.
exports.validateUserToGroup = function(user, group) {};
exports.validateUserToCommunity = function(user, community){};
exports.validateGroup = function(sessionInfo) {};
exports.validateCommunity = function(community){};
exports.deactivateUserFromGroup = function(user, group){};


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

// Debugging tests purposes
exports.helloWorld = function(){
  console.log("Hello from dbUtils!");
}
