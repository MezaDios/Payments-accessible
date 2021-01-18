import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Debt } from 'src/app/models/debt';

@Component({
  selector: 'app-consults',
  templateUrl: './consults.component.html',
  styleUrls: ['./consults.component.sass']
})
export class ConsultsComponent implements OnInit {

  form = new FormGroup({
    type: new FormControl('', Validators.required)
  });

  formUser = new FormGroup({
    user: new FormControl('', Validators.required)
  });

  formDate = new FormGroup({
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required)
  });

  date = false;
  user = false;

  debtors: any = [];

  foundDebts = [];

  crud = this.parent.crud;

  constructor(private parent: AppComponent, private router: Router) {
  }

  ngOnInit() {

    console.log(this.crud.currentUser);
    if (this.crud.currentUser.logged && this.crud.currentUser.admin) {
      console.log('Logged successfully.');
    } else {
      this.router.navigateByUrl('/login');
    }

    this.form.get('type').valueChanges.subscribe(() => {
      if (this.form.get('type').value === 1) {
        this.user = true;
        this.date = false;
      } else if (this.form.get('type').value === 2) {
        this.user = false;
        this.date = true;
      }
    });

    this.getDebtors();

  }

  getDebtors() {
    this.crud.getDebtors(null).subscribe((res) => {
      this.debtors = res;
    });

  }

  getByUser() {
    this.crud.debtsByUser(this.formUser.get('user').value, null).subscribe((res) => {
      this.foundDebts = [];

      res.forEach(debt => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(debt.creationDate).toLocaleString('en-US', options);

        this.foundDebts.push({
          id: debt.id,
          name: debt.name,
          creationDate: date,
          concept: debt.concept,
          amount: debt.amount,
          telephone: debt.telephone
        });
      });
    });
  }

  getByDate() {
    const data = {
      startDate: this.formDate.get('startDate').value,
      endDate: this.formDate.get('endDate').value
    };

    this.crud.debtsByDate(data).subscribe((res) => {

      this.foundDebts = [];

      res.forEach(debt => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(debt.creationDate).toLocaleString('en-US', options);

        this.foundDebts.push({
          id: debt.id,
          name: debt.name,
          creationDate: date,
          concept: debt.concept,
          amount: debt.amount,
          telephone: debt.telephone
        });
      });

    });
  }

}
