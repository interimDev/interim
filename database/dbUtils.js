var Firebase = require('firebase');
var dBRef = new Firebase('https://interim.firebaseio.com/');

// Shorthand to access stored data
exports.communityRef = function(community) {};
exports.groupRef = function(sessionInfo) {};
exports.userRef = function(user){};

// Creating Profiles adding to the database.
// To-do: Data will need be to be validated when storing to datebase.
exports.createUser = function(user, userProfile){};
exports.createGroup = function(group, groupProfile){};
exports.createCommunity = function(community, communityProfile){};

// Updating Profiles that already exist in the database.
// TBV: May only need generic update, where type indicates user/group/community.
// To-do: Data will need be to be validated when storing to databse.
exports.updateProfile = function(name, type, profile);
exports.updateUser = function(user, userProfile){};
exports.updateGroup = function(group, groupProfile){};
exports.updateCommunity = function(community, communityProfile){};

// Validations during the creation process.
exports.validateUserToGroup = function(user, group) {};
// TBV: Will validateUserToCommunity be "free" since the Group is under Community ?
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
