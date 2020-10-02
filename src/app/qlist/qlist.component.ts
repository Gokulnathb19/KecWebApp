import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Query } from '../query.model';
import { QueryService } from '../query.service';

@Component({
  selector: 'app-qlist',
  templateUrl: './qlist.component.html',
  styleUrls: ['./qlist.component.css']
  //providers:  [ QueryService ]
})
export class QlistComponent implements OnInit {

  queries: Query[];

  isBackupData = false;

  constructor(private queryService: QueryService, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('isLoggedIn') == "true"){
      this.fetch();
    }
    else{
      alert('You are not authorised to view this page')
      this.router.navigate(['/home']);
    }
  }

  fetchQueries() {
    console.log('hello '+this.queryService);
    this.queryService
    .getQueries()
    .subscribe((data: Query[]) => {
      this.queries = data;
      console.log('Data requested ... ');
      console.log(this.queries);
    });
  }

  fetchBackupQueries() {
    console.log('hellob '+this.queryService);
    this.queryService
    .getBackupQueries()
    .subscribe((data: Query[]) => {
      this.queries = data;
      console.log('Data requested ... ');
      console.log(this.queries);
    });
  }

  backupQueries() {
    this.queryService
    .backupQueries()
    .subscribe((text) => {
      console.log(text);
      alert('Queries BackedUp Successfully')
    });
  }

  deleteQuery(id) {
    this.queryService.deleteQuery(id).subscribe((text) => {
      console.log(text);
      this.fetchQueries();
    });
  }

  logout(){
    console.log('check')
    localStorage.setItem('isLoggedIn', "false");
    this.router.navigate(['/home']);
  }

  readLocalStorageValue(key) {
    return localStorage.getItem(key);
  }

  changeQueryType(){
    this.isBackupData=!this.isBackupData;
    this.fetch();
  }

  fetch(){
    if(!this.isBackupData){
      this.fetchQueries();
    }
    else if(this.isBackupData){
      this.fetchBackupQueries();
    }
  }

}
