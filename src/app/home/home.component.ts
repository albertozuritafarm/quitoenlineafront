import { Component, OnInit,Input, NgZone  } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import {NgbModal, ModalDismissReasons, NgbDateStruct, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
declare var $: any;
const current = new Date();
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbAlertConfig , NgbDatepickerConfig] 
})
export class HomeComponent implements OnInit {
  @Input() public alerts: Array<string> = [];
  public campaigns: Array<string> = [];
  closeResult: string;
  leadname:any;
  calltype:any;
  dp:any;
  message:any;
  phonenumber:any;

  type = 'danger';

  isLoginError : boolean = false;

  todayDate:any;


  constructor(private modalService: NgbModal, private router: Router, private userService: UserService, alertConfig: NgbAlertConfig, config: NgbDatepickerConfig) {
    
    
    
    $("#message").hide();
    this.todayDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };
    
    
    
  }

  
   


  ngOnInit() {


    var self = this;
   $(document).ready(function () {
      
        function old_session() {
          self.checksession();
        }
        
        setInterval(old_session, 100000);

    });
    
    
   

    this.userService.getcampaigns().subscribe((data : any)=>{

      this.campaigns = data.data;
    
    },
    (err : HttpErrorResponse)=>{
     
    });
   
  }


   
  
  checksession(){
    
  	var currentsession = localStorage.getItem('currentsession');
    var userId = localStorage.getItem('userId');
  	this.userService.getsession(userId).subscribe((data : any)=>{
    var newsession = data.data.data;
    var old_session = data.old_data.old_data;

   if (old_session == currentsession) {
      this.Logout();
   } 
   else{
    clearInterval(1000);
   }
    },
    (err : HttpErrorResponse)=>{
     
    });
  	
  }

  showfisrt(){
    this.router.navigate(['/leads-home']);
  }

  
  savelead(type){
    $("#message").hide();
    var leadname = $("#leadname").val(),
    phonenumber = $("#phonenumber").val(),
    calltype = $("#calltype").val(),
    dp = $("#dp").val();
    
    

    if (leadname == "" || leadname ==undefined ) {
      
      this.message = 'The lead name field is empty';
      $("#message").css("display", "block");
      return;
    }

    if ( phonenumber  == "" || phonenumber ==undefined ) {
      this.message = 'The phone number field is empty';
      $("#message").css("display", "block");
      return;
    }

    phonenumber = phonenumber.replace(/"/g, "").replace(/'/g, "").replace("(", "").replace(")", "").replace(/\+/g,"").replace(/ /gi, "");

    if(phonenumber.substring(0,3) <  "100"){
      this.message = 'This is an invalid phone number, please correct the phone number';
      $("#message").css("display", "block");
      return;
    }

    if(phonenumber.length <  "10"){
      this.message = 'The phone number should have 10 digits';
      $("#message").css("display", "block");
      return;
    }

    if (calltype == "" || calltype ==undefined || calltype =="0" ) {
      this.message = 'The campaign field is empty';
      $("#message").css("display", "block");
      return;
    }
/*
    if (dp == "" || dp ==undefined ) {
      this.message = 'The call date field is empty';
      $("#message").css("display", "block");
      return;
    }*/


  dp = this.format(dp);


    this.userService.leadsSave(leadname,phonenumber, calltype, dp).subscribe((data : any)=>{
      if (type == "s"){
        if (data.success == true){
          this.type = 'success';
          this.message = 'The information was saved successfully';
          $("#message").css("display", "block");
          $(".formleadadd").trigger("reset");
        
        }else{
          this.message = 'Error: ';
          var errores = data.error;
          for (var v in errores) 
          {  
            this.message+= errores[v]+'\n';
          }  
          $("#message").css("display", "block");
        }
      
    }
    else{
      $(".close").click();
      this.router.navigate(['/leads-home',data.data.id]);
    }
    },
    (err : HttpErrorResponse)=>{
      this.message = 'Error';
      $("#message").css("display", "block");
    });
  }

  open(content) {
    
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  changedate(date){
    //Year-Month-Day
    $("#dp").val(date.month +'-'+ date.day +'-'+ date.year )
  }

  format(date){

    if ( date == '' )
    {
      return '';
    } else {
      var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [year, month, day].join('-');
    }
    
  }
  

  Logout() {
    this.router.navigate(['/logout']);
  }


}
