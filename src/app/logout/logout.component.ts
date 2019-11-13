import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import {NgbModal, ModalDismissReasons, NgbDateStruct, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
declare var $: any;


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private userService : UserService,private router : Router) { 
	  this.logout();
}

  ngOnInit() {
  	
 }
 
 logout(){
 	debugger;
 	var userId = localStorage.getItem('userId');
    this.userService.updatesession(userId).subscribe((data : any)=>{
  	
  	localStorage.removeItem('userToken');
  	this.router.navigate(['/login']);
  	
	  })
	  
	}
		
}
