import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Message } from 'src/app/models/message';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.sass']
})
export class AddPaymentComponent implements OnInit {

  crud = this.parent.crud;

  debtors;
  debts;
  form = new FormGroup({
    amount: new FormControl('', [Validators.required, Validators.min(0)]),
    user: new FormControl('', Validators.required),
    debt: new FormControl('', Validators.required)
  });

  constructor(private parent: AppComponent, private router: Router) {
    this.form.get('user').valueChanges.subscribe(res => {
      this.getDebts();
    });
  }

  ngOnInit() {
    console.log(this.crud.currentUser);
    if (this.crud.currentUser.logged && this.crud.currentUser.admin) {
      console.log('Logged successfully.');
    } else {
      this.router.navigateByUrl('/login');
    }
    this.getDebtors();
  }

  getDebtors() {
    this.crud.getDebtors(null).subscribe(res => {
      this.debtors = res;
      console.log(this.debtors);
    });
  }

  getDebts() {
    console.log(this.form.get('user').value);
    this.crud.debtsByUser(this.form.get('user').value, null).subscribe(res => {
      this.debts = res;
      console.log(this.debts);
    });
  }

  addPayment() {
    const date = new Date();
    const data = {
      id_user: this.form.get('user').value,
      id_debt: this.form.get('debt').value,
      amount: this.form.get('amount').value,
      paymentDate: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    };
    console.log(data);
    this.crud.addPayment(data).subscribe((res) => {
      console.log(res);
      alert(res.message);
    });
    this.form.reset();
  }

}
