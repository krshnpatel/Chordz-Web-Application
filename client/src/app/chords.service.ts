import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

let chordpro = require('chordprojs');
var validator = require('validator');

@Injectable()
export class ChordsService {
  
  constructor(private http: Http) {}
  
  
  getPublicChords()
  {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Cache-Control', 'max-age');
        
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
  } // End of getPublicChords
  
  
  getUserChords(userEmail)
  {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Cache-Control', 'max-age');
        
      let options = new RequestOptions({ headers: headers});
      
      return this.http
      .get('https://se3316a-lab5-kpate222.c9users.io:8080/myapi/chord', options)
      .map((response: Response) => response.json())
      .map((response) => {
          
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
  } // End of getUserChords
  
  
  getRawUserChords(userEmail)
  {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Cache-Control', 'max-age');
        
      let options = new RequestOptions({ headers: headers});
      
      return this.http
      .get('https://se3316a-lab5-kpate222.c9users.io:8080/myapi/chord', options)
      .map((response: Response) => response.json())
      .map((response) => {

          let j = 0;
          let userChords = [];
          for (let i in response)
          {
              if (response[i].email == userEmail)
              {
                  userChords[j] = response[i];
                  userChords[j].chordDoc = validator.unescape(userChords[j].chordDoc);
                  
                  j++;
              }
          }
          
          return userChords;
      });
  } // End of getRawUserChords
  
  
  postUserChord(email, title, version, chordDoc, isPublic)
  {
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
  } // End of postUserChord
  
  
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
  } // End of deleteUserChord
  
  
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
  } // End of changePrivacySetting
  
  
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
  } // End of changeTitle
  
  
  extractTitle(chordDoc)
  {
    var parseResult = chordpro.parse(chordDoc);
    var title = parseResult.title;
    
    return title;
  } // End of extractTitle
  
  
  checkStartBraces(chordDoc)
  {
    var lines = chordDoc.split('\n');
    
    for (var i = 0; i < lines.length; i++)
    {
      lines[i] = lines[i].trim();
      
      if (lines[i].search('{') > 0)
      {
        alert("Error: You cannot have a starting curly brace '{' after the first character on the same line.");
        return false;
      }
    }
    
    return true;
  } // End of checkStartBraces
  
  
  checkEndBraces(chordDoc)
  {
    var lines = chordDoc.split('\n');
    
    for (var i = 0; i < lines.length; i++)
    {
      lines[i] = lines[i].trim();
      
      if (lines[i].search('}') < lines[i].length - 1 && lines[i].search('}') >= 0)
      {
        alert("Error: You cannot have an ending curly brace '}' before the last character on the same line.");
        return false;
      }
    }
    
    return true;
  } // End of checkEndBraces
  
  
  checkForMultipleStartingBraceOnSameLine(chordDoc)
  {
    var lines = chordDoc.split('\n');
    
    for (var i = 0; i < lines.length; i++)
    {
      lines[i] = lines[i].trim();
      
      if (lines[i].match(/{/g) != null)
      {
        if (lines[i].match(/{/g).length > 1)
        {
          alert("Error: You cannot have more than one starting curly brace '{' on the same line.");
          return false;
        }
      }
    }
    
    return true;
  } // End of checkForMultipleStartingBraceOnSameLine
  
  
  checkForMultipleEndingBraceOnSameLine(chordDoc)
  {
    var lines = chordDoc.split('\n');
    
    for (var i = 0; i < lines.length; i++)
    {
      lines[i] = lines[i].trim();
      
      if (lines[i].match(/{/g) != null)
      {
        if (lines[i].match(/}/g).length > 1)
        {
          alert("Error: You cannot have more than one ending curly brace '}' on the same line.");
          return false;
        }
      }
    }
    
    return true;
  } // End of checkForMultipleEndingBraceOnSameLine
  
  
  checkForMultipleTitles(chordDoc)
  {
    if (chordDoc.match(/({title:|{t:)/g) != null)
    {
      if (chordDoc.match(/({title:|{t:)/g).length > 1)
      {
        alert("Error: You cannot have more than one title in a chord sheet.");
        return false;
      }
    }
    
    return true;
  } // End of checkForMultipleTitles
  
  
  checkForDirectives(chordDoc)
  {
    var res = chordDoc.split('\n');

    var j = 0;
    var errMsg = "Errors:\n";
    
    res[0] = res[0].trim();
    
    if (((res[0] == "{new_song}" || res[0] == "{ns}") && (res[1].includes("{title:") || res[1].includes("{t:"))) || (res[0].includes("{title:") || res[0].includes("{t:")))
    {   
      for (let i = 0; i < res.length; i++)
      {
        res[i] = res[i].trim();

        if (res[i] == "{new_song}" || res[i] == "{ns}" || res[i] == "{start_of_chorus}" || res[i] == "{soc}" || res[i] == "{end_of_chorus}" || res[i] == "{eoc}" || res[i] == "{start_of_tab}" || res[i] == "{sot}" || res[i] == "{end_of_tab}" || res[i] == "{eot}")
        {
          
          if ((res[i] == "{new_song}" || res[i] == "{ns}") && i != 0)
          {
            errMsg = errMsg + "-> {new_song} or {ns} has to be in the first line\n";
            break;
          }
          
        }
        else if (res[i][0] == '{')
        {
          
          if (res[i].includes(':'))
          {
            var dirValue = res[i].split(':')[1];
            dirValue = dirValue.substr(0, dirValue.length - 1);
            dirValue = dirValue.trim();

            var dirType = res[i].split(':')[0];
            dirType = dirType.substr(1, dirType.length);
            dirType = dirType.trim();

            if (!dirValue.replace(/\s/g, '').length)
            {
            	errMsg = errMsg + "-> directive value cannot be empty at line " + (i+1) + "\n";
            }
            
          }
          else
          {
          	errMsg = errMsg + "-> missing a colon in directive at line " + (i+1) + "\n";
          }

        }
      }
    }
    else
    {
      errMsg = errMsg + "-> you have to start with {new_song}, {ns}, {title: yourTitleHere} or {t: yourTitleHere}\n-> if you start with {new_song} or {ns}, then your second line should be {title: yourTitleHere} or {t: yourTitleHere}\n-> check if you have a colon in your title directive\n-> check if you have '{' and '}' surrounding your new song and/or title directives\n-> check your spelling of the directive type (new_song, ns, title, t)\n";
    }
    
    if (errMsg != "Errors:\n")
    {
      alert(errMsg);
      return false;
    }
    else
    {
      return true;
    }
    
  } // End of checkForDirectives
  
  
  checkForWarnings(chordDoc)
  {
    var res = chordDoc.split('\n');
    var warningMsg = "Warnings:\n";
    
    for (let i = 0; i < res.length; i++)
    {
      res[i] = res[i].trim();
      
      if (res[i] == "{new_song}" || res[i] == "{ns}" || res[i] == "{start_of_chorus}" || res[i] == "{soc}" || res[i] == "{end_of_chorus}" || res[i] == "{eoc}" || res[i] == "{start_of_tab}" || res[i] == "{sot}" || res[i] == "{end_of_tab}" || res[i] == "{eot}")
      {
        //ignore
      }
      else if (res[i][0] == '{')
      {
        var dirType = res[i].split(':')[0];
        dirType = dirType.substr(1, dirType.length);
        dirType = dirType.trim();
        
        var dirValue = res[i].split(':')[1];
        dirValue = dirValue.substr(0, dirValue.length - 1);
        dirValue = dirValue.trim();
        
        if (dirType == 't' || dirType == 'title' || dirType == 'subtitle' || dirType == 'st' || dirType == 'comment' || dirType == 'c' || dirType == 'define')
        {
          //ignore
        }
        else
        {
          warningMsg = warningMsg + "-> unknown directive at line " + (i+1) + "\n";
        }

        if (dirType == 'define')
        {
          var name = dirValue.split(' ')[0];
          name = name.trim();
          
          if (!name[0].match(/[A-G]/g))
          {
            warningMsg = warningMsg + "-> name parameter of 'define' directive does not start with capital letters A, B, C, D, E, F or G (at line " + (i+1) + ")\n";
          }
          
          var code = dirValue.split(' ')[1];
          code = code.trim();
          
          if (code.length > 6)
          {
          	warningMsg = warningMsg + "-> code parameter of 'define' directive has more than 6 characters (at line " + (i+1) + ")\n";
          }
          else if (code.length < 6)
          {
          	warningMsg = warningMsg + "-> code parameter of 'define' directive has less than 6 characters (at line " + (i+1) + ")\n";
          }
          
          if (!code.match(/[xX0-9]{6}/g))
          {
            warningMsg = warningMsg + "-> code parameter of 'define' directive contains characters other than x, X and 0-9 (at line " + (i+1) + ")\n";
          }
        }
      }
    }
    
    if (warningMsg != "Warnings:\n")
    {
      if (confirm(warningMsg + "\n" + "Do you still want to continue?"))
        return true;
      else
        return false;
    }
    else
    {
      return true;
    }
    
  } // End of checkForWarnings
  
  
} // End of ChordsService