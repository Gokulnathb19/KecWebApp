import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { localStorage.setItem('isLoggedIn', "false");  }

  getQueries() {
    return this.http.get(`${this.uri}/queries`);
  }

  getBackupQueries() {
    return this.http.get(`${this.uri}/bqueries`);
  }

  getQueryById(id) {
    return this.http.get(`${this.uri}/queries/${id}`);
  }

  addQuery(name, email, phone, q) {
    const query = {
      name: name,
      email: email,
      phone: phone,
      query: q
    };
    return this.http.post(`${this.uri}/queries/add`, query);
  }

  deleteQuery(id) {
    console.log(id);
    return this.http.get(`${this.uri}/queries/delete/${id}`);
  }

  backupQueries() {
    return this.http.get(`${this.uri}/backup`);
  }
}
