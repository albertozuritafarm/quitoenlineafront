import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from "@angular/http";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { User } from './user.model';

@Injectable()
export class UserService {
  readonly rootUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  registerUser(user: User) {
    const body: User = {
      UserName: user.UserName,
      Password: user.Password,
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName
    }
    var reqHeader = new HttpHeaders({'No-Auth':'True'});
    return this.http.post(this.rootUrl + '/api/User/Register', body,{headers : reqHeader});
  }

  userAuthentication(userName, password):Observable<any> {
    // Prueba
    var data = "username=" + userName + "&password=" + password;
    var reqHeader = new HttpHeaders({ 'No-Auth':'True', "Authorization": "Basic " + btoa(userName + ":" + password) });
    //return this.http.post(this.rootUrl + '/token', data, { headers: reqHeader });
    return this.http.get(this.rootUrl + '/rest/login?'+ data, { headers: reqHeader }).map(
      res => {
        
        return res;
      },
      err => {
        return err;
      }
    )
  }

  leadsSave(leadname, phonenumber, calltype, dp): Observable<any> {
    // format:  Year-Month-Day
    let token = localStorage.getItem('userToken')
    let headers = new HttpHeaders({ 'Allow':'GET, POST, PUT, DELETE, OPTIONS, HEAD', 'Access-Control-Allow-Headers': 'Origin Content-Type, X-Auth-Token','Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS', 'Access-Control-Allow-Origin': '*', 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Content-Type':  'application/json', 'Authorization': `Bearer ${token}` });
    const getItemUrl = this.rootUrl + '/leads/create?name='+leadname+'&alt_name='+leadname+'&renewal_date='+dp+'&attempts=6&status=1&completion_method=2&campaign_id='+calltype+'&import_date=2019-07-23&created_at=2019-07-23&phone_number='+phonenumber;
    return this.http
      .get(getItemUrl, { headers: headers })
      .map(
        res => {
          return res;
        },
        err => {
          return err;
        }
      )
  }

  leadsgetlead(leadid): Observable<any> {
    let token = localStorage.getItem('userToken')
    let headers = new HttpHeaders({ 'Allow':'GET, POST, PUT, DELETE, OPTIONS, HEAD', 'Access-Control-Allow-Headers': 'Origin Content-Type, X-Auth-Token','Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS', 'Access-Control-Allow-Origin': '*', 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Content-Type':  'application/json','Authorization': `Bearer ${token}` });
    const getItemUrl = this.rootUrl + '/leads/get-lead-detail?leadId=' + leadid;
    return this.http
      .get(getItemUrl, { headers: headers })
      .map(
        res => {
          return res;
        },
        err => {
          return err;
        }
      )
  }

  leadsgetphonenumber(leadid): Observable<any> {
    let token = localStorage.getItem('userToken')
    let headers = new HttpHeaders({ 'Allow':'GET, POST, PUT, DELETE, OPTIONS, HEAD', 'Access-Control-Allow-Headers': 'Origin Content-Type, X-Auth-Token','Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS', 'Access-Control-Allow-Origin': '*', 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Content-Type':  'application/json','Authorization': `Bearer ${token}` });
    const getItemUrl = this.rootUrl + '/leads/get-leads-phone-numbers?leadId=' + leadid;
    return this.http
      .get(getItemUrl, { headers: headers })
      .map(
        res => {
          return res;
        },
        err => {
          return err;
        }
      )
  }

  leadsaddphonenumber(leadid,leadPhoneNumber, name): Observable<any> {
    let token = localStorage.getItem('userToken')
    let headers = new HttpHeaders({ 'Allow':'GET, POST, PUT, DELETE, OPTIONS, HEAD', 'Access-Control-Allow-Headers': 'Origin Content-Type, X-Auth-Token','Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS', 'Access-Control-Allow-Origin': '*', 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Content-Type':  'application/json','Authorization': `Bearer ${token}` });
    const getItemUrl = this.rootUrl + '/leads/add-phone-number-from-pane?leadId=' + leadid +'&leadPhoneNumber=' + leadPhoneNumber + '&name=' + name;
    return this.http
      .get(getItemUrl, { headers: headers })
      .map(
        res => {
          return res;
        },
        err => {
          return err;
        }
      )
  }


  leadsdeletephonenumber(leadid, leadPhoneNumberId): Observable<any> {
    let token = localStorage.getItem('userToken')
    let headers = new HttpHeaders({ 'Allow':'GET, POST, PUT, DELETE, OPTIONS, HEAD', 'Access-Control-Allow-Headers': 'Origin Content-Type, X-Auth-Token','Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS', 'Access-Control-Allow-Origin': '*', 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Content-Type':  'application/json','Authorization': `Bearer ${token}` });
    const getItemUrl = this.rootUrl + '/leads/delete-leads-phone-number?leadId=' + leadid +'&leadPhoneNumberId=' + leadPhoneNumberId;
    return this.http
      .get(getItemUrl, { headers: headers })
      .map(
        res => {
          return res;
        },
        err => {
          return err;
        }
      )
  }


  leadsupdatephonenumber(leadPhoneNumberId,leadPhoneNumber, name): Observable<any> {
    let token = localStorage.getItem('userToken')
    let headers = new HttpHeaders({ 'Allow':'GET, POST, PUT, DELETE, OPTIONS, HEAD', 'Access-Control-Allow-Headers': 'Origin Content-Type, X-Auth-Token','Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS', 'Access-Control-Allow-Origin': '*', 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Content-Type':  'application/json','Authorization': `Bearer ${token}` });
    const getItemUrl = this.rootUrl + '/leads/edit-leads-phone-number-by-phone-id?leadPhoneNumberId=' + leadPhoneNumberId + '&leadPhoneNumber=' + leadPhoneNumber + '&name=' + name;

    return this.http
      .get(getItemUrl, { headers: headers })
      .map(
        res => {
          return res;
        },
        err => {
          return err;
        }
      )
  }

  getcampaigns(): Observable<any> {
    let token = localStorage.getItem('userToken')
    let headers = new HttpHeaders({ 'Allow':'GET, POST, PUT, DELETE, OPTIONS, HEAD', 'Access-Control-Allow-Headers': 'Origin Content-Type, X-Auth-Token','Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS', 'Access-Control-Allow-Origin': '*', 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Content-Type':  'application/json','Authorization': `Bearer ${token}` });
    const getItemUrl = this.rootUrl + '/campaigns/get-all-campaigns';
    return this.http
      .get(getItemUrl, { headers: headers })
      .map(
        res => {
          return res;
        },
        err => {
          return err;
        }
      )
  }

  getsession(userId): Observable<any> {
    let token = localStorage.getItem('userToken')
    let headers = new HttpHeaders({ 'Allow':'GET, POST, PUT, DELETE, OPTIONS, HEAD', 'Access-Control-Allow-Headers': 'Origin Content-Type, X-Auth-Token','Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS', 'Access-Control-Allow-Origin': '*', 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Content-Type':  'application/json','Authorization': `Bearer ${token}` });
    const getItemUrl = this.rootUrl + '/session/check-session?userId='+ userId;
    return this.http
      .get(getItemUrl, { headers: headers })
      .map(
        res => {
          return res;
        },
        err => {
          return err;
        }
      )
  }
  
   deletesession(userId): Observable<any> {
    let token = localStorage.getItem('userToken')
    let headers = new HttpHeaders({ 'Allow':'GET, POST, PUT, DELETE, OPTIONS, HEAD', 'Access-Control-Allow-Headers': 'Origin Content-Type, X-Auth-Token','Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS', 'Access-Control-Allow-Origin': '*', 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Content-Type':  'application/json','Authorization': `Bearer ${token}` });
    const getItemUrl = this.rootUrl + '/session/delete-session?userId='+ userId;
    return this.http
      .get(getItemUrl, { headers: headers })
      .map(
        res => {
          return res;
        },
        err => {
          return err;
        }
      )
  }
  
   updatesession(userId): Observable<any> {
    let token = localStorage.getItem('userToken')
    let headers = new HttpHeaders({ 'Allow':'GET, POST, PUT, DELETE, OPTIONS, HEAD', 'Access-Control-Allow-Headers': 'Origin Content-Type, X-Auth-Token','Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS', 'Access-Control-Allow-Origin': '*', 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Content-Type':  'application/json','Authorization': `Bearer ${token}` });
    const getItemUrl = this.rootUrl + '/session/update-session?userId='+ userId;
    return this.http
      .get(getItemUrl, { headers: headers })
      .map(
        res => {
          return res;
        },
        err => {
          return err;
        }
      )
  }
  

}

