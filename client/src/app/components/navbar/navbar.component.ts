import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  crud = this.parent.crud;

  constructor(private parent: AppComponent, private router: Router) { }

  ngOnInit() {
  }

  logOff() {
    if (window.confirm('Are you sure you want to log off?')) {
      this.crud.currentUser = {
        id: 0,
        name: '',
        logged: false,
        admin: false
      }
      this.router.navigateByUrl('/login');
    }
  }

}
