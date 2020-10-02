import { Component, OnInit } from '@angular/core';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  faUser = faUser;
  faKey = faKey;

  lmodel: any = {};

  onSubmit() {
    //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.lmodel))
    if(this.lmodel.uName==='Admin' && this.lmodel.password==='admin123'){
      localStorage.setItem('isLoggedIn', "true");
      this.router.navigate(['/list']);
    }
    else{
      alert('Invalid Username or Password')
      this.lmodel.password='';
    }
  }

}
