var jasmine = require('jasmine');
var Firebase = require('firebase');
var dbUtils = require('../../database/dbUtils');

describe('dbUtils creating and updating profiles', function() {
  // Test the Interim Firebase instance
 // var dataRef = new Firebase('https://interim.firebaseio.com/');
  var dataRef = new Firebase('https://unsheep.firebaseio.com/');
  //dbUtils._changeRef(dataRef);

  var testCommunity = {
    name: 'SF',
    ownGroups:{ MakerSquare:true}
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
    userName: 'Yoda',
    chatID: '1234',
    role: 'user',
    groups: {Jedi: false, MakerSquare: true},
    // Requested an authenticated groups are indicated as true
    // Pending groups are indicated as false
    auth: 'Github',
    profile: {
      location: 'Dagoba',
      url: 'http://en.wikipedia.org/wiki/Yoda',
      freeText: 'Try not! Do or do not. There is no "try".',
      image: 'lib/yoda.png'
    },
  };
  var testUser2 = {
    userName: 'Felurian',
    role: 'admin',
    groups: {Fae: true, MakerSquare:true},
    auth: 'Github',
    profile: {
      location: 'twilight woodland glade in Fae',
      url: 'http://kingkiller.wikia.com/wiki/Felurian',
      freeText: 'am I mere brightness with no spark beneath?',
      image: 'lib/felurian.gif'
    },
  };

  // User profile and functions.

  // Load the Firebase DB with user information to check.
  beforeEach(function(done) {
     setTimeout(function() {
     console.log("DB Tests initialized");
     //dbUtils.helloWorld();
     //timerCallback();
     }, 100);
    dataRef.set({}, function(err){
      if(err){
        console.log(err);
      }else{
        console.log("DB Tests initialized, database set");
        dbUtils.createUser(testUser1.userName);
    }
  });
  });

  it('retrieves references', function(done) {
    console.log("New Reference test: ");
    dbUtils.dataRef;
    done();
    });

  it('creates a new user', function(done) {
    console.log("New User test: ", testUser1.userName);
    dbUtils.createUser(testUser1.userName);
    dbUtils.userRef(testUser1.userName);
    expect(dbUtils.userRef(testUser1.userName)).toBe(testUser1.userName);
    done();
    });

   xit('can delete a user', function(done) {
    dbUtils.createUser(testUser1.userName);
    dbUtils.deleteUser(testUser1.userName);
    done();
    });

  xit('can update a user profile', function(done) {
      done();
    });

   // Group profile and functions
  xit('creates a new group', function(done) {
      done();
    });
  xit('defaults to be a private group', function(done) {
      done();
    });
  xit('can update a group profile', function(done) {
      done();
    });
  xit('can authenticate a user as a member of that group', function(done) {
      done();
    });
  xit('can deactivate a user from being a member of that group', function(done) {
      done();
    });

  // Community profile and functions
  xit('creates a new community', function(done) {
      done();
    });

});

