import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../user.service.ts';
import { AboutComponent } from '../about/about.component.ts';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})

export class LoginComponent implements OnInit {
  
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    
  }
  
  onSubmit(email, password)
  {
    this.userService.login(email, password).subscribe((result) => {
      if (result)
      {
        this.router.navigate(['profile']);
      }
    });
  }
}
