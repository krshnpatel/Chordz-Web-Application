import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Auth } from './auth.service.ts';
import { ChordsService } from './chords.service.ts';

declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Auth, ChordsService]
})

export class AppComponent {
  
  title = 'CHORDZ';
  publicChords;
  userChords;
  counter = 1;
  
  constructor (private auth: Auth, private chordsService: ChordsService, private router: Router)
  {
    chordsService.getPublicChords().subscribe((result) => {
      this.publicChords = result;
    });
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
    $('#' + id).modal('close');
  }
  
  
}