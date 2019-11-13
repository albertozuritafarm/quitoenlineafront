import {
    Component, OnInit
}
from '@angular/core';
import {
    UserService
}
from '../../shared/user.service';
import {
    HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
}
from '@angular/common/http';
import {
    Observable,
}
from 'rxjs';
import {
    catchError
}
from 'rxjs/operators';
import {
    Router
}
from '@angular/router';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
    isLoginError: boolean = false;
	showProgress: boolean = false;
	public errorme = "Incorrect username or password";
    constructor(private userService: UserService, private router: Router) {}

    ngOnInit() {
        var token = localStorage.getItem('userToken');
        if (token) {
            this.router.navigate(['/home']);
        } else {
            this.router.navigate(['/login']);
        }

    }

    OnSubmit(userName, password) {
        this.showProgress = true;
        var old_session;
        var current_session;
        this.userService.userAuthentication(userName, password).subscribe((data: any) => {
            localStorage.setItem('userToken', data.token);
            var id = data.userId;
            localStorage.setItem('userId', data.userId);
            
            this.userService.getsession(id).subscribe((data: any) => {
                localStorage.setItem('currentsession', data.data.data);
            	localStorage.setItem('oldsession', data.old_data.old_data);
            	localStorage.setItem('additional_session', data.additional_session.additional_session);
            	
            this.router.navigate(['/home']);
            
            }, (err: HttpErrorResponse) => {
                
                this.isLoginError = true;
				this.showProgress = false;
				this.errorme = "Incorrect username or password";
            });
        }, (err: HttpErrorResponse) => {
            
            this.isLoginError = true;
			this.showProgress = false;
			this.errorme = "Incorrect username or password";
        })
	}
}