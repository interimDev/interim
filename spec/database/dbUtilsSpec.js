var jasmine = require('jasmine');
var Firebase = require('firebase');
var dbUtils = require('../database/dbUtils');

describe('dbUtils creating and updating profiles', function() {
  // Test the Interim Firebase instance
  var dataRef = new Firebase('https://interim.firebaseio.com/');
  dbUtils._changeRef(dataRef);

  var testCommunity = {
    name: 'SF',
    ownGroups:{ MakerSquare:true};
  };
  var testGroup1 = {
    groupName: 'MakerSquare',
    groupId: 1234,
    private: true,
    users: {
      Yoda: true,
      Felurian: true
    },
    profile: {
      location: 'San Francisco, CA',
      url: 'www.makersquare.com',
      freeText: 'Advanced software immersive. Not your typical dev bootcamp.'
    },
    chats: {},
    rooms:{},
    tags:{}
  };
  var testUser1 = {
    name: 'Yoda',
    role: user,
    groups: {Jedi: false, MakerSquare: true},
    // Requested an authenticated groups are indicated as true
    // Pending groups are indicated as false
    auth: 'Github',
    profile: {
      location: 'Dagoba',
      url: 'http://en.wikipedia.org/wiki/Yoda',
      freeText: 'Try not! Do or do not. There is no "try".',
      image: lib/yoda.png
    },
  };
  var testUser2 = {
    name: 'Felurian',
    role: admin,
    groups: {Fae: true, MakerSquare:true},
    auth: 'Github',
    profile: {
      location: 'twilight woodland glade in Fae',
      url: 'http://kingkiller.wikia.com/wiki/Felurian',
      freeText: 'am I mere brightness with no spark beneath?
                I could pull the very sky around me like a mantle and grasp
                the crescent moon as if it were a sickle blade.',
      image: lib/felurian.gif
    },
  };

  // User profile and functions.

  // Load the Firebase DB with user information to check.
  before(function(done) {
    this.timeout(10000);
    dataRef.set({
      // To-do: Set sample data here
    }, function(err) {
      if (err) {
        console.error(err);
      }else {
        // Data sucessfully written. Notify user.
      }
    });
  });

  it('creates a new user', function(done) {
      done();
    });
  it('can update a user profile', function(done) {
      done();
    });

   // Group profile and functions
  it('creates a new group', function(done) {
      done();
    });
  it('defaults to be a private group', function(done) {
      done();
    });
  it('can update a group profile', function(done) {
      done();
    });
  it('can authenticate a user as a member of that group', function(done) {
      done();
    });
  it('can deactivate a user from being a member of that group', function(done) {
      done();
    });

  // Community profile and functions
  it('creates a new community', function(done) {
      done();
    });

});

