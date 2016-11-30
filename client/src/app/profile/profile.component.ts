import { Component, OnInit, EventEmitter } from '@angular/core';

import { Auth } from '../auth.service';
import { ChordsService } from '../chords.service';

import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [Auth, ChordsService]
})
export class ProfileComponent implements OnInit {
  
  counter = 1;
  userChords;
  modalActions = new EventEmitter<string|MaterializeAction>();
  
  constructor(private auth: Auth, private chordsService: ChordsService) {}

  ngOnInit() {
    
  }
  
  getUserChordsJson() 
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
  
  createChordSheet(isPublic, chordDoc)
  {
    if (chordDoc.includes("{title:"))
    {
      var title = chordDoc.split("{title:");
      var endIndex = chordDoc.search("}");
      title = title[1].substr(0, endIndex - 7);
      this.chordsService.postUserChord(this.auth.userProfile.email, title, 1, chordDoc, isPublic).subscribe((result) => {
        console.log("Result = " + result);
      });
      window.location.reload();
    }
    else if (chordDoc.includes("{t:"))
    {
      var title = chordDoc.split("{t:");
      var endIndex = chordDoc.search("}");
      title = title[1].substr(0, endIndex - 3);
      this.chordsService.postUserChord(this.auth.userProfile.email, title, 1, chordDoc, isPublic).subscribe((result) => {
        console.log("Result = " + result);
      });
      window.location.reload();
    }
    else
    {
      alert("Please specify a title using {title: yourTitle} or {t: yourTitle} in the chord sheet.");
    }
    

    
    /*if (!title || !version || !chordDoc)
    {
      alert("None of the fields can be empty. Try again.");
    }
    else
    {
      //email, title, version, chordDoc, isPublic
      this.chordsService.postUserChord(this.auth.userProfile.email, title, version, chordDoc, isPublic).subscribe((result) => {
        console.log("Result = " + result);
      });
      
      window.location.reload();
    }*/
  }
  
  deleteChordSheet(title, version)
  {
    console.log(title);
    console.log(version)
    
    this.chordsService.deleteUserChord(this.auth.userProfile.email, title, version).subscribe((result) => {
      console.log("Delete Message: " + result);
      window.location.reload();
    });
  }
  
  changePrivacy(title, version, isPublic)
  {
    console.log("on change");
    this.chordsService.changePrivacySetting(this.auth.userProfile.email, title, version, isPublic).subscribe((result) => {
      console.log("Privacy changed");
    });
  }
  
  openModal()
  {
    this.modalActions.emit({action:"modal",params:['open']});
  }
  
  closeModal()
  {
    this.modalActions.emit({action:"modal",params:['close']});
  }
}