import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';
import { Message } from 'src/app/models/message';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.sass']
})
export class AddUserComponent implements OnInit {

  crud = this.parent.crud;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    secondSurname: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    telephone: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    userType: new FormControl('', Validators.required)
  });

  constructor(private parent: AppComponent, private router: Router) { }

  ngOnInit() {

    console.log(this.crud.currentUser);
    if (this.crud.currentUser.logged && this.crud.currentUser.admin) {
      console.log('Logged successfully.');
    } else {
      this.router.navigateByUrl('/login');
    }

  }

  addUser() {

    this.crud.signUpUser(this.form.value).subscribe((res) => {
      console.log(res);
      alert(res.message);
    });

    this.form.reset();
  }

}
