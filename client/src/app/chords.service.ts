import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

let chordpro = require('chordprojs');

@Injectable()
export class ChordsService {
  
  constructor(private http: Http) {}
  
  getPublicChords()
  {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
        
      let options = new RequestOptions({ headers: headers});
      
      return this.http
      .get('https://se3316a-lab5-kpate222.c9users.io:8080/myapi/chord', options)
      .map((response: Response) => response.json())
      .map((response) => {
          let j = 0;
          let publicChords = [];
          for (let i in response)
          {
              if (response[i].isPublic)
              {
                  publicChords[j] = response[i];
                  
                  var parseResult = chordpro.parse(publicChords[j].chordDoc);
                  var formatResult = chordpro.formatParseResult(parseResult);
                  
                  publicChords[j].chordDoc = formatResult.html;
                  
                  j++;
              }
          }
          return publicChords;
      });
  }
  
  getUserChords(userEmail)
  {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
        
      let options = new RequestOptions({ headers: headers});
      
      return this.http
      .get('https://se3316a-lab5-kpate222.c9users.io:8080/myapi/chord', options)
      .map((response: Response) => response.json())
      .map((response) => {
          //console.log(response);
          
          let j = 0;
          let userChords = [];
          for (let i in response)
          {
              if (response[i].email == userEmail)
              {
                  userChords[j] = response[i];
                  
                  var parseResult = chordpro.parse(userChords[j].chordDoc);
                  var formatResult = chordpro.formatParseResult(parseResult);
                  
                  userChords[j].chordDoc = formatResult.html;
                  
                  j++;
              }
          }
          return userChords;
      });
  }
  
  postUserChord(email, title, version, chordDoc, isPublic)
  {
    //console.log(chordDoc);
    
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
        
      let options = new RequestOptions({ headers: headers});
      let body = JSON.stringify({ email: email, title: title, version: version, chordDoc: chordDoc, isPublic: isPublic });
      
      return this.http
      .post('https://se3316a-lab5-kpate222.c9users.io:8080/myapi/chord', body, options)
      .map((response: Response) => response.json())
      .map((response) => {
        return response;
      });
  }
  
  getRawUserChords(userEmail)
  {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
        
      let options = new RequestOptions({ headers: headers});
      
      return this.http
      .get('https://se3316a-lab5-kpate222.c9users.io:8080/myapi/chord', options)
      .map((response: Response) => response.json())
      .map((response) => {
          //console.log(response);
          
          let j = 0;
          let userChords = [];
          for (let i in response)
          {
              if (response[i].email == userEmail)
              {
                  userChords[j] = response[i];
                  j++;
              }
          }
          return userChords;
      });
  }
  
  deleteUserChord(userEmail, title, version)
  {
    var isDelete = true;
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
        
    let options = new RequestOptions({ headers: headers});
    let body = JSON.stringify({ email: userEmail, title: title, version: version, isDelete: isDelete});
    
    return this.http
    .put('https://se3316a-lab5-kpate222.c9users.io:8080/myapi/chord', body, options)
    .map((response: Response) => response.json())
    .map((response) => {
        return response;
    });
  }
  
  changePrivacySetting(userEmail, title, version, isPublic)
  {
    var isDelete = false;
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
        
    let options = new RequestOptions({ headers: headers});
    let body = JSON.stringify({ email: userEmail, title: title, version: version, isPublic: isPublic, isDelete: isDelete, newTitle: title});
    
    return this.http
    .put('https://se3316a-lab5-kpate222.c9users.io:8080/myapi/chord', body, options)
    .map((response: Response) => response.json())
    .map((response) => {
        return response;
    });
  }
  
  changeTitle(userEmail, title, version, chordDoc, isPublic, newTitle)
  {
    var isDelete = false;
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
        
    let options = new RequestOptions({ headers: headers});
    let body = JSON.stringify({ email: userEmail, title: title, version: version, chordDoc: chordDoc, isPublic: isPublic, isDelete: isDelete, newTitle: newTitle});
    
    return this.http
    .put('https://se3316a-lab5-kpate222.c9users.io:8080/myapi/chord', body, options)
    .map((response: Response) => response.json())
    .map((response) => {
        return response;
    });
  }
  
  extractTitle(chordDoc)
  {
    var parseResult = chordpro.parse(chordDoc);
    var title = parseResult.title;
    return title;
  }
}








