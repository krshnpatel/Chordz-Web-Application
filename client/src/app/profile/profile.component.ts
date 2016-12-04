import { Component, OnInit, EventEmitter } from '@angular/core';

import { AppComponent } from '../app.component';

import { Auth } from '../auth.service';
import { ChordsService } from '../chords.service';

//import { MaterializeAction } from 'angular2-materialize';

declare var $:any;

let chordpro = require('chordprojs');

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [Auth, ChordsService]
})
export class ProfileComponent implements OnInit {
  
  counter = 1;
  userChords;
  rawUserChords;
  
  //modal2Actions = new EventEmitter<string|MaterializeAction>();
  
  constructor(private auth: Auth, private chordsService: ChordsService, private appComponent: AppComponent) {}

  ngOnInit() {
    
  }
  
  getUserChordsJson() 
  {
    if (this.counter == 1)
    {
      this.chordsService.getUserChords(this.auth.userProfile.email).subscribe((result) => {
        this.userChords = result;
      });
      this.chordsService.getRawUserChords(this.auth.userProfile.email).subscribe((result) => {
        this.rawUserChords = result;
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
  
  createChordSheet(isPublic, chordDoc)
  {
    if (chordDoc.includes("{title:") || chordDoc.includes("{t:"))
    {
      var title = this.chordsService.extractTitle(chordDoc);
      
      if (!title.replace(/\s/g, '').length)
      {
        alert("You cannot have only whitespaces as your song title.");
      }
      else
      {
        this.chordsService.postUserChord(this.auth.userProfile.email, title, 1, chordDoc, isPublic).subscribe((result) => {
          console.log(result.message);
           
          if (result.message)
          {
            window.location.reload();
          }
          else
          {
            alert("This is an exact copy of another chord sheet. Please stop plagiarizing.");
          }
        });
      }
    }
    else
    {
      alert("Please specify a title using {title: yourTitle} or {t: yourTitle} in the chord sheet.");
    }
  }
  
  deleteChordSheet(title, version)
  {
    this.chordsService.deleteUserChord(this.auth.userProfile.email, title, version).subscribe((result) => {
      console.log("Delete Message: " + result);
      window.location.reload();
    });
  }
  
  changePrivacy(title, version, chordDoc, isPublic)
  {
    this.chordsService.changePrivacySetting(this.auth.userProfile.email, title, version, isPublic).subscribe((result) => {
      console.log(result.message);
    });
  }
  
  renameChordSheet(title, version, chordDoc, isPublic, newTitle)
  {
    console.log(title);
    
    var rawChordDoc;
    
    for (let i = 0; i < this.rawUserChords.length; i++)
    {
      if (this.rawUserChords[i].title == title && this.rawUserChords[i].version == version)
      {
        rawChordDoc = this.rawUserChords[i].chordDoc;
        break;
      }
    }
    
    var title = rawChordDoc.split("{title:");
    var endIndex = rawChordDoc.search("}");
    title = title[1].substr(0, endIndex - 7);
    title = title.trim();
    
    var newChordDoc = rawChordDoc.replace(title, newTitle.value);
    
    if (!newTitle.value.replace(/\s/g, '').length)
    {
      alert("You cannot have only whitespaces as your song title.");
    }
    else
    {
      this.chordsService.changeTitle(this.auth.userProfile.email, title, version, newChordDoc, isPublic, newTitle.value).subscribe((result) => {
        console.log(result.message);
      });
      window.location.reload();
    }
    
    newTitle.value = "";
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