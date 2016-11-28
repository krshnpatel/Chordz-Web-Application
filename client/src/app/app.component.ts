import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { Auth } from './auth.service.ts';
import { ChordsService } from './chords.service.ts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Auth, ChordsService]
})

export class AppComponent {
  
  title = 'CHORDZ';
  publicChords;
  
  constructor (private auth: Auth, private chordsService: ChordsService, private router: Router) {
    chordsService.getPublicChords().subscribe((result) => {
      this.publicChords = result;
    });
  }
  
  checkRoute()
  {
    if (this.router.url != '/')
      return false;
    else
      return true;
  }
}