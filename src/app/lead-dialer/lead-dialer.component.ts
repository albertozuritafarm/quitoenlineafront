import { Component, OnInit,Input } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { UserService } from '../shared/user.service';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
import * as $ from 'jquery';
import { empty } from 'rxjs/observable/empty';
declare var $: any;


@Component({
  selector: 'app-lead-dialer',
  templateUrl: './lead-dialer.component.html',
  styleUrls: ['./lead-dialer.component.css'],
  providers: [NgbAlertConfig]
})
export class LeadDialerComponent implements OnInit {
  private fieldArray: Array<any> = [];
    private newAttribute: any = {};
    public namelead = "User";
    showProgress: boolean = false;
    message: any;
    type = 'danger';
    closeResult: string;
    public edit: string = 'nohave';
  constructor(private modalService: NgbModal,private router : Router, private rutaActiva: ActivatedRoute, private userService: UserService, alertConfig: NgbAlertConfig) { 
    $("#message").hide();
    
    
  }

  ngOnInit() {
    //console.log(this.rutaActiva.snapshot.params.id);
    



    this.userService.leadsgetlead(this.rutaActiva.snapshot.params.id).subscribe((data : any)=>{
      
      this.namelead = data["data"].name;
    
    },
    (err : HttpErrorResponse)=>{
     
    });

    this.userService.leadsgetphonenumber(this.rutaActiva.snapshot.params.id).subscribe((data : any)=>{
      this.fieldArray = data["data"];
      
    
    },
    (err : HttpErrorResponse)=>{
    });
  }
  
  addFieldValue() {
      $("#message").hide();
      if (this.isEmptyObject(this.newAttribute)) {
        this.newAttribute = {};
        
      } else {
        
           var field;
          if (this.newAttribute.name == undefined || this.newAttribute.name == ""){
            this.type = 'danger';
            field = "Name";
            this.message = 'The field '+ field +' is empty';
            $("#message").css("display", "block");
            return;
          }
          if (this.newAttribute.phone_number == undefined || this.newAttribute.phone_number == ""){
            this.type = 'danger';
            field = "Phone Number";
            this.message = 'The field '+ field +' is empty';
            $("#message").css("display", "block");
            return;
          }

          var phonenumber = this.newAttribute.phone_number.replace(/"/g, "").replace(/'/g, "").replace("(", "").replace(")", "").replace(/\+/g,"").replace(/ /gi, "");

          if(phonenumber.substring(0,3) <  "100"){
            this.message = 'This is an invalid phone number, please correct the phone number';
            $("#message").css("display", "block");
            return;
          }

          if(phonenumber.toString().length <  "10"){
            this.message = 'The phone number should have 10 digits';
            $("#message").css("display", "block");
            return;
          }
          

          this.userService.leadsaddphonenumber(this.rutaActiva.snapshot.params.id,this.newAttribute.phone_number, this.newAttribute.name).subscribe((data : any)=>{
      
            this.fieldArray.push(this.newAttribute);
            this.newAttribute = {}; 
           /* this.type = 'success';
            this.message = 'The information was saved successfully';
            $("#message").css("display", "block");*/
            
          
          },
          (err : HttpErrorResponse)=>{
            this.newAttribute = {}; 
          });
        
          
        
        
      }
    }

    editFieldValue(index) {
      $("#message").hide();
      
      var id = this.fieldArray[index].id;
      var phone_number = this.fieldArray[index].phone_number;
      var name = this.fieldArray[index].name;
      
         var field;
          if (name == undefined || name == ""){
            this.type = 'danger';
            field = "Name";
            this.message = 'The field '+ field +' is empty';
            $("#message").css("display", "block");
            return;
          }
          if (phone_number == undefined || phone_number == ""){
            this.type = 'danger';
            field = "Phone Number";
            this.message = 'The field '+ field +' is empty';
            $("#message").css("display", "block");
            return;
          }
          var phonenumber = phone_number;
          ;

          if(phonenumber.toLocaleString().substring(0,3) <  "100"){
            this.message = 'This is an invalid phone number, please correct the phone number';
            $("#message").css("display", "block");
            return;
          } 
          
          if(phonenumber.toString().length <  "10"){
            this.message = 'The phone number should have 10 digits';
            $("#message").css("display", "block");
            return;
          }
          

         this.userService.leadsupdatephonenumber(id,phone_number, name).subscribe((data : any)=>{
          $('.yeshave-'+ id).attr("style", "display: none !important");
         /* this.type = 'success';
          this.message = 'The information was updated correctly';
          $("#message").css("display", "block");*/
          
          },
          (err : HttpErrorResponse)=>{
             
          });
        
          
        
        
      
    }

  deleteFieldValue(index) {
    $("#message").hide();
    var id = this.fieldArray[index].id;

   this.userService.leadsdeletephonenumber(this.rutaActiva.snapshot.params.id, id).subscribe((data : any)=>{
     
      this.fieldArray.splice(index, 1);
      
      
    
    },
    (err : HttpErrorResponse)=>{
      
    });
      
  }

  isEmptyObject(obj) {
    return (obj && (Object.keys(obj).length === 0));
  }


  detectedit(row, index){
    var id = index;
    this.fieldArray.forEach(function (index2, value) {
      
      if (id == index2.id) {
      $('.yeshave-'+ index2.id).attr("style", "display: block !important");  
      } else {
      $('.yeshave-'+ index2.id).attr("style", "display: none !important");  
      }
      
      
      });
    
  }

  open(content) {
    this.modalService.open(content, {}).result.then((result) => {
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

}
