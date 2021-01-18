import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrentUser } from '../models/currentUser';

@Injectable({
  providedIn: 'root'
})

export class CrudService {

  currentUser: CurrentUser = {
    id: 0,
    admin: false,
    logged: false,
    name: ''
  };

  API_URI = 'http://localhost:3000/api/users'; // DIRECCION DEL SERVIDOR

  constructor(private http: HttpClient) { }

  getlogin(user) {
    return this.http.post(`${this.API_URI}/login/`, user); // DIRECCION DE USUARIOS}
  }

  signUpUser(user) {
    return this.http.post(`${this.API_URI}/registerUser`, user);
  }

  addPayment(data) {
    console.log(data);
    return this.http.post(`${this.API_URI}/addPayment`, data);
  }

  addCharge(data) {
    return this.http.post(`${this.API_URI}/addDebt`, data);
  }

  debtsByDate(data) {
    return this.http.post(`${this.API_URI}/debtsByDate/`, data);
  }

  debtsByUser(id, data) {
    return this.http.post(`${this.API_URI}/debtsByUSer/${id}`, data);
  }

  totalDue(id, data) {
    return this.http.post(`${this.API_URI}/totalDue/${id}`, data);
  }

  paymentsByUser(id, data) {
    return this.http.post(`${this.API_URI}/paymentsByUser/${id}`, data);
  }

  getDebtors(data) {
    return this.http.post(`${this.API_URI}/Debtors`, data);
  }

}
