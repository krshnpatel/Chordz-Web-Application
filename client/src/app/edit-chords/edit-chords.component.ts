import { Component, OnInit } from '@angular/core';

import { Auth } from '../auth.service';
import { ChordsService } from '../chords.service';

@Component({
  selector: 'app-edit-chords',
  templateUrl: './edit-chords.component.html',
  styleUrls: ['./edit-chords.component.css'],
  providers: [Auth, ChordsService]
})
export class EditChordsComponent implements OnInit {

  counter = 1;
  userChords;
  
  constructor(private auth: Auth, private chordsService: ChordsService) {}

  ngOnInit() {
  }
  
  getUserChordsJson() 
  {
    if (this.counter == 1)
    {
      this.chordsService.getRawUserChords(this.auth.userProfile.email).subscribe((result) => {
        this.userChords = result;
      });
    }
    
    this.counter++;
    return true;
  }
  
  saveChordSheet(chordDoc, isPublic)
  {
    if (chordDoc.includes("{title:") || chordDoc.includes("{t:"))
    {
      var title = this.chordsService.extractTitle(chordDoc);
      var version = 1;
      
      for (let i = 0; i < this.userChords.length; i++)
      {
        if (this.userChords[i].title == title)
        {
          version = version + 1;
        }
      }

      this.chordsService.postUserChord(this.auth.userProfile.email, title, version, chordDoc, isPublic).subscribe((result) => {
        console.log("Result = " + result);
      });
      
      window.location.reload();
    }
    else
    {
      alert("Please specify a title using {title: yourTitle} or {t: yourTitle} in the chord sheet.");
    }
  }
  
  clearChordSheet(chordTextArea)
  {
    console.log("Clear Chord Sheet");
    if (confirm("Are you sure you want to clear the chord sheet?"))
    {
      chordTextArea.value = "";
    }
  }
  
  getPrivacy(isPublic)
  {
    if (isPublic)
      return "public";
    else
      return "private";
  }
  
  checkStartBraces(chordDoc)
  {
    
  }
  
  checkEndBraces(chordDoc)
  {
    
  }
  
  checkForTitle(chordDoc)
  {
    
  }
  
  checkForMultipleTitles(chordDoc)
  {
    
  }
  
  checkForDirectives(chordDoc)
  {
    
  }
  
  checkForExtraCharacters(chordDoc)
  {
    
  }
}




