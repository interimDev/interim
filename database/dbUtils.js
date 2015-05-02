var Firebase = require('firebase');
var dBRef = new Firebase('https://interim.firebaseio.com/');

// Shorthand to access stored data
exports.communityRef = function(community) {
  return dBRef.child('CommunityDB').child(community);
};
exports.groupRef = function(group) {
  return dBRef.child('CommunityDB').child().child('group');
};
exports.usersRef = function(user){
  return dBRef.child('UsersDB').child(user);
};


/*Database layout:
  Interim
    - UsersDB
      -randomNumber333333
        - userName:
        - usersGroups: {
            Group1: true,
            Group2: false
                        }
        - userProfile: {
            location: null,
            url: null,
            freeText: " "
                        }
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
var validateDataUser = function(userInfo) {
  return userInfo && userInfo.auth && userInfo.userId;
};
var validateDataGroup = function(groupInfo) {
  return validateUser(groupInfo.name) && sessionInfo.sessionId;
};

// Creating Profiles adding to the database.
// To-do: Data will need be to be validated when storing to datebase.
exports.createUser = function(userName){
// Generate a userId by storing in db
function go() {
  var userData = { name: userName };
  tryCreateUser(userName, userData);
}

var userCreated = function(userName, success) {
  if (!success) {
    alert('user ' + userName + ' already exists!');
  } else {
    alert('Successfully created ' + userName);
  }
}

// Tries to set /usersDB/<userId> to the specified data, but only
// if there's no data there already.
function tryCreateUser(userName, userData) {
  usersRef.child(userName).transaction(function(currentUserData) {
    if (currentUserData === null)
      return userData;
  }, function(error, committed) {
    userCreated(userName, committed);
  });
}

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

exports.updateUser = function(user, userProfile){};
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
exports._changeRef = function(newRef) {
  dBRef = newRef || dBRef;
};
