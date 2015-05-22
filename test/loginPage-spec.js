describe('Interim Login Page Test', function() {
   beforeEach(function() {
    //before each go to login page
    browser.get('http://localhost:5000/#/signin');
  });

  it('should have a title', function() {
    //check if title is Interim
    expect(browser.getTitle()).toEqual('Interim');
  });

  it('should have a github login button', function() {
    //check if github login button exists
    expect(element(by.css('.btn-github')).isPresent()).toBe(true);
  });

  it('should have communities sign in input fields', function() {
    //check if singin form exist
    expect(element(by.css('#singInInputs')).isPresent()).toBe(true);
    //check if there is email input
    expect(element(by.model('community.email')).isPresent()).toBe(true);
    //check if there is password input
    expect(element(by.model('community.password')).isPresent()).toBe(true);
    //check if there is Submit button
    expect(element(by.css('#sign-in-btn')).isPresent()).toBe(true);
  });

  it('should have create community button', function() {
    //check if button exists
    expect(element(by.css('#create-cm-btn')).isPresent()).toBe(true);
  });
});