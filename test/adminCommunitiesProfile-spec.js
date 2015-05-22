describe('Interim Admin', function() {

  it('admin should be able to login', function() {
    browser.get('http://localhost:5000/#/signin');
    element(by.model('community.email')).sendKeys("mks@mks.com");
    element(by.model('community.password')).sendKeys("mks");
    element(by.css('#sign-in-btn')).click();
    browser.sleep(1000); //wait till page is loaded
  });

  it('should have navigation bar', function() {
    expect(element(by.css('#nav')).isPresent()).toBe(true);
  });

  it('should have community picture', function() {
    expect(element(by.css('.communityAvi')).isPresent()).toBe(true);
  });

  it('should have community name', function() {
    expect(element(by.css('#community-name')).isPresent()).toBe(true);
  });

  it('should have community location, website, and twitter container', function() {
    expect(element(by.css('.communitySocial')).isPresent()).toBe(true);
  });

  it('should have edit profile button', function() {
    expect(element(by.buttonText('Edit Profile')).isPresent()).toBe(true);
  });

  it('should have members list and group list', function() {
    expect(element(by.css('#members')).isPresent()).toBe(true);
    expect(element(by.css('.groupList')).isPresent()).toBe(true);
  });

  it('should be able to create new public room', function() {
    element(by.css('.glyphicon-plus')).click();
    element(by.css('#group_name')).sendKeys("PublicTest");
    element(by.buttonText('Create Group')).click();
  });

  it('should check for new created room', function() {
    expect(element(by.linkText('PublicTest')).isPresent()).toBe(true);
  });

  it('should be able to create new private room', function() {
    element(by.css('.glyphicon-plus')).click();
    element(by.css('#group_name')).sendKeys("PrivateTest");
    element(by.model('group.private')).click();
    element(by.buttonText('Create Group')).click();
  });

  it('should check for new created private room', function() {
    expect(element(by.linkText('PrivateTest')).isPresent()).toBe(true);
  });
});