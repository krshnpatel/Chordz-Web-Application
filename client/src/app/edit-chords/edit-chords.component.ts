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
  
  saveChordSheet(version, chordDoc, isPublic)
  {
    console.log("Save Chord Sheet");
    
    if (chordDoc.includes("{title:"))
    {
      var title = chordDoc.split("{title:");
      var endIndex = chordDoc.search("}");
      title = title[1].substr(0, endIndex - 7);
      this.chordsService.postUserChord(this.auth.userProfile.email, title, version + 1, chordDoc, isPublic).subscribe((result) => {
        console.log("Result = " + result);
      });
    }
    else if (chordDoc.includes("{t:"))
    {
      var title = chordDoc.split("{t:");
      var endIndex = chordDoc.search("}");
      title = title[1].substr(0, endIndex - 3);
      this.chordsService.postUserChord(this.auth.userProfile.email, title, version + 1, chordDoc, isPublic).subscribe((result) => {
        console.log("Result = " + result);
      });
    }
    else
    {
      alert("Please specify a title using {title: yourTitle} or {t: yourTitle} in the chord sheet.");
    }
  }
  
  clearChordSheet(chordTextArea)
  {
    console.log("Clear Chord Sheet");
    if (confirm("Are you sure you want to clear the chordz?"))
    {
      chordTextArea.value = "";
    }
  }
}




