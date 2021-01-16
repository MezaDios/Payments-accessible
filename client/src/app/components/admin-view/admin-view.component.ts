import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { CrudService } from '../../services/crud.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.sass']
})
export class AdminViewComponent implements OnInit {

  crud = this.parent.crud;

  totalDue;


  constructor(private parent: AppComponent, private router: Router) { }

  ngOnInit() {

    console.log(this.crud.currentUser);
    if (this.crud.currentUser.logged && this.crud.currentUser.admin) {
      console.log('Logged successfully.');
    } else {
      this.router.navigateByUrl('/login');
    }

  }

}
