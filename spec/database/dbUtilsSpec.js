var jasmine = require('jasmine');
var Firebase = require('firebase');
var dbUtils = require('../../database/dbUtils');

describe('dbUtils creating and updating profiles', function() {
  // Test the Interim Firebase instance
 // var dataRef = new Firebase('https://interim.firebaseio.com/');
  var dataRef = new Firebase('https://unsheep.firebaseio.com/');

  var testUser1 = {
    userName: 'Yoda',
    userId: null,
    chatId: null,
    role: 'user',
    groups: {Jedi: false, MakerSquare: true},
    // Requested an authenticated groups are indicated as true
    // Pending groups are indicated as false
    authType: 'Github',
    userProfile: {
      location: 'Dagoba',
      url: 'http://en.wikipedia.org/wiki/Yoda',
      freeText: 'Try not! Do or do not. There is no try.',
      image: 'http://upload.wikimedia.org/wikipedia/en/9/9b/Yoda_Empire_Strikes_Back.png'
    }};
  var testUser2 = {
    userName: 'Felurian',
    userId: null,
    chatId: null,
    role: 'admin',
    groups: {Fae: true, MakerSquare:true},
    authType: 'Github',
    userProfile: {
      location: 'twilight woodland glade in Fae',
      url: 'http://kingkiller.wikia.com/wiki/Felurian',
      freeText: 'am I mere brightness with no spark beneath?',
      image: 'http://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Marbled_emperor_moth_heniocha_dyops.jpg/1920px-Marbled_emperor_moth_heniocha_dyops.jpg'
    }};
  var testUser3 = {
      userName: 'Ned',
      userEmail: 'ned_flanders@hotmail.com',
      password: 'okiedokielee',
      authType: 'email'
    };
  var testCommmunity1 = {
    communityName: 'MakerSquare',
    communityLocation: "Austin & San Francisco",
    communityPrivacy: true
    };
  var testCommmunity2 = {
    communityName: "SF Interns",
    communityLocation: "San Francisco, CA",
    communityPrivacy: true
    };
  var testGroup1 = {
    groupName: 'MKS 15',
    groupLocation: 'San Francisco, CA',
    groupDates: '',
    groupAdmins: {"Felurian-Github": true},
    groupSuperAdmins: {"Felurian-Github": true},
    groupMembers: {"Felurian-Github": true,
              "Yoda-Github": true, "Ned-Github": false},
    groupTags: {},
    groupPrivacy: true
    };

  // User profile and functions.

  // Load the Firebase DB with user information to check.
  beforeEach(function(done) {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 2000;
    setTimeout(function() {
     console.log('Tests initialized inside timeout.');
     done();
     }, 1000);

  var clearData = function(){dataRef.set({}, function(err){
      if(err){
        console.log(err);
      }else{
        console.log("DB Tests initialized, database set");
       // dbUtils.child('UsersDB').createUser(testUser1.userName);
    }
  });
  }

  });

  it('creates a new user', function(done) {
    dbUtils.createUser(testUser2);
    //dbUtils.createUser(testUser1);
    //expect(dataRef.child('UsersDB').child('Yoda-Github').userName.val() ).toBe('Yoda');
    //expect(dbUtils.usersRef(testUser2.userName)).toBe(testUser2.userName);
    done();
    }); //working

 it('creates a second user', function(done) {
    //dbUtils.createUser(testUser2);
    dbUtils.createUser(testUser1);
    //expect(dataRef.child('UsersDB').child('Yoda-Github').userName.val() ).toBe('Yoda');
    //expect(dbUtils.usersRef(testUser2.userName)).toBe(testUser2.userName);
    done();
    }); //working


  it('expects a new user', function(done) {
    dataRef.child('UsersDB').child('Felurian-Github').child('userName').once('value', function(snapshot) {
      expect( snapshot.val() ).to.be('Felurian');
    });
    done();
    });

   xit('expects a second user', function(done) {
    //expect(dataRef.child('UsersDB').child('Yoda-Github').userName.val() ).toBe('Yoda');
    dataRef.child('UsersDB').child('Yoda-Github').child('userName').once('value', function(snapshot) {
      expect(snapshot.val()).to.be('Yoda');
    });
    done();
    });

   xit('can delete a user', function(done) {
    dbUtils.createUser(testUser1.userName);
    dbUtils.deleteUser(testUser1.userName);
    done();
    }); //not written, nor tested

  it('can update a user profile', function(done) {
    //dbUtils.createUser(testUser2);
    dbUtils.updateUser('Felurian-Github', 'freeText','how how my poet is an owl.' );
    // dataRef.child('UsersDB').child('Felurian-Github').child('userName').child('userProfile').child('freeText').once('value', function(snapshot) {
    //   expect(snapshot.val()).to.equal('how how my poet is an owl.');
    // });
    done();
    }); //working


  // Community profile and functions
  xit('creates a new community', function(done) {
      console.log("Community buildling tests");
      dbUtils.createCommunity("MakerSquare", "Felurian-Github");
      done();
    });
   // Group profile and functions
  xit('creates a new group within a community', function(done) {
      // dbUtils.createCommunity("MakerSquare", "Felurian-Github");
      dbUtils.createGroup("MKS15", 'MakerSquare', 'Felurian-Github');
      done();
    });
  xit('creates a new groups', function(done) {
      dbUtils.createGroup("MKS17", 'MakerSquare', 'Felurian-Github');
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

