const { $, expect } = require('@wdio/globals')
const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    // NOTE: elements collection
    get fieldUsername () { return $('#user-name');}

    get fieldPassword () { return $('#password');}

    get buttonLogin () { return $('#login-button');} 

    get errorLockedOutUser () { return $('//h3[text()="Epic sadface: Sorry, this user has been locked out."]')}

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login () {
        console.log (`USERNAME: ${process.env.USERNAME_STANDARD_USER}`)
        console.log (`PASSWORD: ${process.env.PASSWORD_SAUCEDEMO}`)
        await this.fieldUsername.setValue('process.env.USERNAME_STANDARD_USER');
        await this.fieldPassword.setValue('process.env.PASSWORD_SAUCEDEMO');
        await this.buttonLogin.click();
    }

    async validateLockedOutUserError () {
        expect(this.errorLockedOutUser).toBeDisplayed()
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    open () {
        return super.open('/');
    }
}

module.exports = new LoginPage();
