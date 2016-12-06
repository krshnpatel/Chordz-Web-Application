import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';

let Auth0 = require('auth0-lock').default;

var options = {
  auth: {
    redirectUrl: 'https://se3316a-lab5-kpate222.c9users.io:8081/profile',
    responseType: 'token'
  },
  languageDictionary: {
    title: "CHORDZ"
  },
  theme: {
    logo: '../favicon.ico'
  }  
};


@Injectable()
export class Auth {

  userProfile;
  
  // Configure Auth0
  lock = new Auth0('bj8WZOwdUG07ik3oF5tSZ5I71y1yVSTr', 'krshnpatel.auth0.com', options);

  constructor()
  {
    // Set userProfile attribute of already saved profile
    this.userProfile = JSON.parse(localStorage.getItem('profile'));
    
    // Add callback for lock `authenticated` event
    this.lock.on("authenticated", (authResult) => {
      
      localStorage.setItem('id_token', authResult.idToken);
    
      // Fetch profile information
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          // Handle error
          alert(error);
          return;
        }
        
        localStorage.setItem('profile', JSON.stringify(profile));
        this.userProfile = profile;
      });
    });
  }


  public login()
  {
    // Call the show method to display the widget.
    this.lock.show();
  };


  public authenticated()
  {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  };


  public logout()
  {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.userProfile = undefined;
  };
  
  
}


