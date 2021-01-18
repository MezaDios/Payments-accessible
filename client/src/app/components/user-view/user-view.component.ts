import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';
import { Debt } from 'src/app/models/debt';
import { Payment } from 'src/app/models/payment';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.sass']
})
export class UserViewComponent implements OnInit {

  crud = this.parent.crud;

  totalDue: number;
  payments;
  debts;

  constructor(private parent: AppComponent, private router: Router) {
    this.totalDue = 0;
  }

  ngOnInit() {
    console.log(this.crud.currentUser);
    if (this.crud.currentUser.logged && !this.crud.currentUser.admin) {
      console.log('Logged successfully.');
    } else {
      this.router.navigateByUrl('/login');
    }

    this.getDebts();
    this.getPayments();
    this.getTotalDue();

  }

  getDebts() {
    this.crud.debtsByUser(this.crud.currentUser.id, null).subscribe((res) => {
      this.debts = [];
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      res.forEach(debt => {
        const date = new Date(debt.creationDate).toLocaleString('en-US', options);
        this.debts.push({
          id: debt.id,
          concept: debt.concept,
          amount: debt.amount,
          creationDate: date
        });
      });
    });
  }

  getPayments() {
    this.crud.paymentsByUser(this.crud.currentUser.id, null).subscribe((res) => {
      this.payments = [];
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      res.forEach(payment => {
        const date = new Date(payment.paymentDate).toLocaleString('en-US', options);
        this.payments.push({
          id: payment.id,
          amount: payment.amount,
          paymentDate: date
        });
      });
    });
  }

  getTotalDue() {
    this.crud.totalDue(this.crud.currentUser.id, null).subscribe(res => {
      this.totalDue = res[0].due;
    });
  }

}
