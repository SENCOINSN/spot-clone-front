import { Component, inject } from '@angular/core';
import { AuthService } from '../layout/service/auth.service';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../service/toast.service';
import { Router, RouterModule } from '@angular/router';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Auth, AuthRequest } from '../service/model/auth.model';


type FlowStatus = 'init' | 'success' | 'error';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,NgbAlertModule,FontAwesomeModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private authService=inject(AuthService)

  private formBuilder = inject(FormBuilder)

  private toastService = inject(ToastService)

  private router=inject(Router);

  public loginForm = this.formBuilder.nonNullable.group<AuthRequest>({
    usernameOrEmail:new FormControl('' ,{nonNullable: true, validators:[Validators.required]}),
    password:new FormControl('' ,{nonNullable: true, validators:[Validators.required]}),
  })

  isLogin:boolean=false;

  flowStatus: FlowStatus = 'init';

 
  public authRequest:Auth ={}

  data:any;

  constructor(){

  }

  login(){
   this.isLogin=true;
   
   this.authRequest.usernameOrEmail = this.loginForm.value.usernameOrEmail;
   this.authRequest.password = this.loginForm.value.password;
   
   this.authService.login(this.authRequest)
   .subscribe({
    next:(resp:any)=>{
      this.data=resp;
      console.log("response auth "+ resp)
      this.toastService.show("Connexion réussie !!!","SUCCESS")
      this.authService.storeToken(this.data.accessToken);
      this.authService.storeUser(this.data.userInfo)
      this.router.navigate([''])
      this.isLogin=false;
    },
    error:(err:any)=>{
      console.log("something wrong login")
      this.toastService.show("Erreur interne serveur sur l'authentification","DANGER");
      this.isLogin=false;
    }
   })

  }

}
