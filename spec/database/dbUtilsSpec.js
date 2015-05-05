var jasmine = require('jasmine');
var Firebase = require('firebase');
var dbUtils = require('../../database/dbUtils');

describe('dbUtils creating and updating profiles', function() {
  // Test the Interim Firebase instance
 // var dataRef = new Firebase('https://interim.firebaseio.com/');
  var dataRef = new Firebase('https://unsheep.firebaseio.com/');

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
    userId: null,
    chatId: null,
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
    userId: null,
    chatId: null,
    role: 'admin',
    groups: {Fae: true, MakerSquare:true},
    authType: 'Github',
    profile: {
      location: 'twilight woodland glade in Fae',
      url: 'http://kingkiller.wikia.com/wiki/Felurian',
      freeText: 'am I mere brightness with no spark beneath?',
      image: 'lib/felurian.gif'
    },
  };
  var testUser3 = {
      userName: 'Ned',
      userEmail: 'ned_flanders@hotmail.com',
      password: 'okiedokielee',
      authType: 'email'
  };

  // User profile and functions.

  // Load the Firebase DB with user information to check.
  beforeEach(function(done) {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 2000;
    setTimeout(function() {
     console.log('Tests initialized inside timeout.');
     }, 100);


    dataRef.set({}, function(err){
      if(err){
        console.log(err);
      }else{
        console.log("DB Tests initialized, database set");
        //dbUtils.child('UsersDB').createUser(testUser1.userName);
    }
  });

  });

  xit('retrieves references', function(done) {
    console.log("New Reference test");
    //expect(dbUtils.dataRef.children()).toBe();
    done();
    });

  xit('creates a new user', function(done) {
    //console.log("New User test: ", testUser1);
    dbUtils.createUser(testUser1);
    //dbUtils.createUser(testUser2);
    expect(dbUtils.usersRef(testUser1.userName)).toBe(testUser1.userName);
    done();
    });

   xit('can delete a user', function(done) {
    dbUtils.createUser(testUser1.userName);
    dbUtils.deleteUser(testUser1.userName);
    done();
    });

  it('can update a user profile', function(done) {
    dbUtils.createUser(testUser2);
    dbUtils.updateUser('Felurian-Github', 'freeText', 'hooo hoo like an owl.');
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

