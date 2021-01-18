import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/models/user';
import { NgForm, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    telephone: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  crud = this.parent.crud;

  constructor(
    private router: Router,
    private parent: AppComponent) { }

  ngOnInit() {
    if (this.crud.currentUser.logged === true) {
      if (this.crud.currentUser.admin === true) {
        this.router.navigateByUrl('/admin');
      } else {
        this.router.navigateByUrl('/user');
      }
    }
  }

  login() {

    const data = {
      telephone: this.form.get('telephone').value,
      password: this.form.get('password').value
    };

    this.crud.getlogin(data).subscribe(
      res => {
        this.crud.currentUser = res;
        console.log(this.crud.currentUser);
        if (this.crud.currentUser.logged === false) {
          alert('Usuario o contraseña incorrectos!!!');
        } else {
          localStorage.setItem('currentUser', JSON.stringify(this.crud.currentUser));
          if (this.crud.currentUser.admin === true) {
            this.form.reset();
            this.router.navigateByUrl('/admin');
          } else {
            this.form.reset();
            this.router.navigateByUrl('/user');
          }
        }
      },
      err => console.log(err)
    );
  }

}
