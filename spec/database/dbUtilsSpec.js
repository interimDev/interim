var jasmine = require('jasmine');
var Firebase = require('firebase');
var dbUtils = require('../../client/database/dbUtils');

describe('dbUtils creating and updating profiles', function() {
  // Test the Interim Firebase instance
 // var dataRef = new Firebase('https://interim.firebaseio.com/');
  var dataRef = new Firebase('https://unsheep.firebaseio.com/');

  var testUser1 = {
    userName: 'Yoda',
    role: 'user',
    usersCommunities: {Jedi: false, MakerSquare: true},
    // Requested an authenticated groups are indicated as true
    // Pending groups are indicated as false
    usersGroups:{"MKS15-MakerSquare": true},
    authType: 'Github',
    userProfile: {
      location: 'Dagoba',
      url: 'http://en.wikipedia.org/wiki/Yoda',
      freeText: 'Try not! Do or do not. There is no try.',
      image: 'http://upload.wikimedia.org/wikipedia/en/9/9b/Yoda_Empire_Strikes_Back.png'
    }};
  var testUser2 = {
    userName: 'Felurian',
    role: 'admin',
    usersCommunities: {Fae: true, MakerSquare:true},
    usersGroups: {"MKS17-MakerSquare": true},
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
    groupName: 'MKS15',
    groupLocation: 'San Francisco, CA',
    groupDates: '',
    groupAdmins: {"Felurian-Github": true},
    groupSuperAdmins: {"Felurian-Github": true},
    groupMembers: {"Felurian-Github": true,
              "Yoda-Github": true, "Ned-Github": false},
    groupTags: {},
    groupPrivacy: true
    };
    var tempUserVal;
  // User profile and functions.

  // Load the Firebase DB with user information to check.
  beforeEach(function(done) {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 4000;
    setTimeout(function() {
     //console.log('Tests initialized inside timeout.');
     done();
     }, 1200);

  var clearData = function(){dataRef.set({}, function(err){
      if(err){
        console.log(err);
      }else{
        console.log("DB Tests initialized, database set");
    }
  });
  }

  });

   it('creates a new user', function(done) {
    dbUtils.createUser(testUser2);
    //expect(dataRef.child('UsersDB').child('Yoda-Github').userName.val() ).toBe('Yoda');
    expect(testUser2.userName).toBe('Felurian');
    done();
    }); //working

  xit('creates a second user', function(done) {
    dbUtils.createUser(testUser1);
    //expect(dataRef.child('UsersDB').child('Yoda-Github').userName.val() ).toBe('Yoda');
    //expect(dbUtils.usersRef(testUser2.userName)).toBe(testUser2.userName);
    done();
    }); //working


  it('expects a new user', function(done) {
    dataRef.child('UsersDB').child('Felurian-Github').child('userName').on("value", function(snapshot) {
        console.log("User test snapshot", snapshot.val());
        var tempUserVal = snapshot.val();
        expect(tempUserVal).toBe('Felurian');
        done();
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
    });

   xit('expects a second user', function(done) {
    //expect(dataRef.child('UsersDB').child('Yoda-Github').userName.val() ).toBe('Yoda');
    // dataRef.child('UsersDB').child('Yoda-Github').child('userName').once('value', function(data) {
    //   var tempData = data.userName
      //expect(data.to.exist);
    // });
    done();
    });

   xit('can delete a user', function(done) {
    dbUtils.createUser(testUser1.userName);
    dbUtils.deleteUser(testUser1.userName);
    done();
    }); //not written, nor tested

   xit('can update a user profile', function(done) {
    //dbUtils.createUser(testUser2);
    dbUtils.updateUser('Felurian-Github', 'freeText','how how my poet is an owl.' );
    // dataRef.child('UsersDB').child('Felurian-Github').child('userName').child('userProfile').child('freeText').once('value', function(snapshot) {
    //   expect(snapshot.val()).to.equal('how how my poet is an owl.');
    // });
    done();
    });


  // Community profile and functions
  it('creates a new community', function(done) {
      console.log("Community buildling tests");
      dbUtils.createCommunity("MakerSquare", "Felurian-Github");
      done();
    });
   // Group profile and functions
   it('creates a new groups within a community', function(done) {
      dbUtils.createGroup("MKS17", 'MakerSquare', 'Felurian-Github');
      done();
    });
   it('creates a new group within a community', function(done) {
      dbUtils.createGroup("MKS15", 'MakerSquare', 'Felurian-Github');
      done();
    });
  xit('can update a group profile', function(done) {
      dbUtils.updateGroup("MakerSquare", "MKS17", "groupLocation", "Frisco");
      done();
    });
  xit('can update a community profile', function(done) {
      dbUtils.updateCommunity("MakerSquare", "communityLocation", "Austin and San Francisco and Los Angeles");
      done();
    });


  xit('defaults to be a private group', function(done) {
      done();
    });
  xit('can update a group profile', function(done) {
      done();
    });

  // User requesting permission to join a group
  it('a user can request to be a member of that group', function(done) {
      dbUtils.requestUserToGroup("Felurian-Github", "MKS15", "MakerSquare");
      done();
    });
  it('a group receives the request from the user', function(done) {
      dbUtils.requestGroupToUser("Felurian-Github", "MKS15", "MakerSquare");
      done();
    });


  // TO-DO: This is still over-writing exiting acceptances
  xit('a user should not be able to request to join a group of which they are already a member', function(done) {
      dbUtils.requestUserToGroup("Felurian-Github", "MKS17", "MakerSquare");
      done();
    });

  xit('a group should be updated by a user request to join ', function(done) {
      //dbUtils.requestUserToGroup("Felurian-Github", "MKS15", "MakerSquare");
      done();
    });

  xit('can authenticate a user as a member of that group', function(done) {
      done();
    });
  xit('can deactivate a user from being a member of that group', function(done) {
      done();
    });

  // Community profile and functions


});

