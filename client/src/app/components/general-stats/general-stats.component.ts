import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-general-stats',
  templateUrl: './general-stats.component.html',
  styleUrls: ['./general-stats.component.sass']
})
export class GeneralStatsComponent implements OnInit {

  crud = this.parent.crud;

  debtors: any = [];

  totalDue = 0;

  totalPaid = 0;

  constructor(private parent: AppComponent, private router: Router) { }

  async ngOnInit() {

    console.log(this.crud.currentUser);
    if (this.crud.currentUser.logged && this.crud.currentUser.admin) {
      console.log('Logged successfully.');
    } else {
      this.router.navigateByUrl('/login');
    }

    await this.getDebtors();

    setTimeout(() => {
      this.getGeneralDue();
      this.getGeneralPaid();
      console.log(this.debtors);
    }, 1000);

  }

  getDebtors() {
    this.crud.getDebtors(null).subscribe((res) => {
      this.debtors = res;

      this.getDebts();

      this.getPayments();

      this.getTotalDue();

    });

  }

  getDebts() {
    this.debtors.forEach(debtor => {
      debtor.debts = [];
      this.crud.debtsByUser(debtor.id, null).subscribe((res) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        res.forEach(debt => {
          const date = new Date(debt.creationDate).toLocaleString('en-US', options);
          debtor.debts.push({
            id: debt.id,
            concept: debt.concept,
            amount: debt.amount,
            creationDate: date
          });
        });
      });

    });
  }

  getPayments() {
    this.debtors.forEach(debtor => {

      this.crud.paymentsByUser(debtor.id, null).subscribe((res) => {
        debtor.payments = [];
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        res.forEach(payment => {
          const date = new Date(payment.paymentDate).toLocaleString('en-US', options);
          debtor.payments.push({
            id: payment.id,
            amount: payment.amount,
            paymentDate: date
          });
        });
      });
    });
  }

  getTotalDue() {
    this.debtors.forEach(debtor => {
      this.crud.totalDue(debtor.id, null).subscribe(res => {
        debtor.totalDue = res[0].due;
      });
    });
  }

  getGeneralDue() {
    this.totalDue = 0;
    this.debtors.forEach(debtor => {

      if (debtor.totalDue != null) {
        this.totalDue += debtor.totalDue;
      }
    });
  }

  getGeneralPaid() {
    this.totalPaid = 0;
    this.debtors.forEach(debtor => {
      debtor.payments.forEach(payment => {
        if (!(payment.amount === null || payment.amount === undefined)) {
          this.totalPaid += payment.amount;
        }
      });
    });
  }

  isNull(value) {
    if (!(value === null || value === undefined)) {
      return false;
    } else {
      return true;
    }
  }

}

