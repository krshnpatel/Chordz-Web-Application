import { Component, OnInit, EventEmitter } from '@angular/core';

import { Auth } from '../auth.service';
import { ChordsService } from '../chords.service';

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
      this.chordsService.getRawUserChords(this.auth.userProfile.email).subscribe((result) => {
        this.rawUserChords = result;
      });
    }
    
    this.counter++;
    return true;
  } // End of getUserChordsJson
  
  
  getPrivacy(isPublic)
  {
    if (isPublic)
      return "public";
    else
      return "private";
  } // End of getPrivacy
  
  
  createChordSheet(isPublic, chordDoc)
  {
    if (this.chordsService.checkStartBraces(chordDoc) && this.chordsService.checkEndBraces(chordDoc) && this.chordsService.checkForMultipleStartingBraceOnSameLine(chordDoc) && this.chordsService.checkForMultipleEndingBraceOnSameLine(chordDoc) && this.chordsService.checkForMultipleTitles(chordDoc) && this.chordsService.checkForDirectives(chordDoc) && this.chordsService.checkForWarnings(chordDoc))
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
        alert("Error: Please specify a title using {title: yourTitle} or {t: yourTitle} in the chord sheet.");
      }
      
    }
    
  } // End of createChordSheet
  
  
  deleteChordSheet(title, version)
  {
    
    this.chordsService.deleteUserChord(this.auth.userProfile.email, title, version).subscribe((result) => {
      window.location.reload();
    });
    
  } // End of deleteChordSheet
  
  
  changePrivacy(title, version, isPublic)
  {
    
    this.chordsService.changePrivacySetting(this.auth.userProfile.email, title, version, isPublic).subscribe((result) => {
      console.log(result.message);
    });
    
  } // End of changePrivacy
  
  
  renameChordSheet(title, version, chordDoc, isPublic, newTitle)
  {
    if (!newTitle.value.replace(/\s/g, '').length)
    {
      alert("You cannot have only whitespaces as your song title.");
    }
    else
    {
      var rawChordDoc;
    
      for (let i = 0; i < this.rawUserChords.length; i++)
      {
        if (this.rawUserChords[i].title == title && this.rawUserChords[i].version == version)
        {
          rawChordDoc = this.rawUserChords[i].chordDoc;
          break;
        }
      }
  
      var title;
      
      if (rawChordDoc.includes("{title:"))
      {
        title = rawChordDoc.split("{title:");
        var endIndex = rawChordDoc.search("}");
        title = title[1].substr(0, endIndex - 7);
        title = title.trim();
      }
      else if (rawChordDoc.includes("{t:"))
      {
        title = rawChordDoc.split("{t:");
        var endIndex = rawChordDoc.search("}");
        title = title[1].substr(0, endIndex - 3);
        title = title.trim();
      }
      
      var newChordDoc = rawChordDoc.replace(title, newTitle.value);
      
      this.chordsService.changeTitle(this.auth.userProfile.email, title, version, newChordDoc, isPublic, newTitle.value).subscribe((result) => {
        window.location.reload();
      });
      
    }
    
    newTitle.value = "";
    
  } // End of renameChordSheet
  
  
  openModal(id)
  {
    
    $('#' + id).modal('open');
    
  } // End of openModal
  
  
  closeModal(id)
  {
    
    $('#' + id).modal('close');
    
  } // End of closeModal
  
  
}