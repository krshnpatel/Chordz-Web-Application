import { Component, EventEmitter } from '@angular/core';

import { Router } from '@angular/router';

import { Auth } from './auth.service.ts';
import { ChordsService } from './chords.service.ts';

import { MaterializeAction } from 'angular2-materialize';

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Auth, ChordsService]
})

export class AppComponent {
  
  modalActions = new EventEmitter<string|MaterializeAction>();
  title = 'CHORDZ';
  publicChords;
  userChords;
  counter = 1;
  
  constructor (private auth: Auth, private chordsService: ChordsService, private router: Router) {
    chordsService.getPublicChords().subscribe((result) => {
      this.publicChords = result;
    });
    
    /*if (this.auth.authenticated() && this.auth.userProfile)
    {
      chordsService.getUserChords(this.auth.userProfile.email).subscribe((result) => {
        this.userChords = result;
      });
      console.log(this.userChords);
    }*/
  }
  
  getUserChordsApp()
  {
    if (this.counter == 1)
    {
      this.chordsService.getUserChords(this.auth.userProfile.email).subscribe((result) => {
        this.userChords = result;
      });
    }
    
    this.counter++;
    return true;
  }

  getPrivacy(isPublic)
  {
    if (isPublic)
      return "public";
    else
      return "private";
  }

  checkRoute()
  {
    if (this.router.url != '/')
      return false;
    else
      return true;
  }
  
  openModal(id)
  {
    $('#' + id).modal('open');
  }
  
  closeModal(id)
  {
    //this.modalActions.emit({action:"modal",params:['close']});
    $('#' + id).modal('close');
  }
}