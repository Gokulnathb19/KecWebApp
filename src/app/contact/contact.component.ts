import { Component, OnInit } from '@angular/core';
import { faEnvelope,faUser, faQuestionCircle, faPhoneSquare } from '@fortawesome/free-solid-svg-icons';
//import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { QueryService } from '../query.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
  //providers:  [ QueryService ]
})
export class ContactComponent implements OnInit {

  constructor(private queryService: QueryService, private router: Router) {
    
  }

  addQuery(name, email, phone, query) {
    //alert('name:'+name+'email:'+email+'phone:'+phone+'query:'+query)
    this.queryService.addQuery(name, email, phone, query).subscribe((text) => {
      //this.router.navigate(['/list']);
      console.log(text);
    });
  }

  ngOnInit() {
  }

  faEnvelope = faEnvelope;
  faUser = faUser;
  faPhone = faPhoneSquare;
  faQuestionCircle = faQuestionCircle;

  model: any = {};

  onSubmit() {
    this.addQuery(this.model.Name,this.model.email,this.model.Phone,this.model.Query)
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model))
    this.model.Name='';
    this.model.email='';
    this.model.Phone='';
    this.model.Query='';
  }
}
