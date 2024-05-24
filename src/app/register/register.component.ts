import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../layout/service/auth.service';
import { ToastService } from '../service/toast.service';
import { userReq, userRequest } from '../service/model/auth.model';
import { FlowStatus } from '../constants/flow.status';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,NgbAlertModule,FontAwesomeModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  authService = inject(AuthService)
  router=inject(Router)
  private formBuilder = inject(FormBuilder)

  private toastService = inject(ToastService)

  public userReq:userReq ={}

  public registerForm = this.formBuilder.group({
    lastName:new FormControl('' ,{nonNullable: true, validators:[Validators.required]}),
    firstName:new FormControl('' ,{nonNullable: true, validators:[Validators.required]}),
    email:new FormControl('' ,{nonNullable: true, validators:[Validators.required]}),
    username:new FormControl('' ,{nonNullable: true, validators:[Validators.required]}),
    imageUrl:[''],
    password:new FormControl('' ,{nonNullable: true, validators:[Validators.required]}),
  })

  isLogin:boolean=false;

  flowStatus: FlowStatus = 'init';


  register(){

    this.isLogin=true;
   
   this.userReq.username = this.registerForm.value.username;
   this.userReq.password = this.registerForm.value.password;
   this.userReq.lastName = this.registerForm.value.lastName;
   this.userReq.email = this.registerForm.value.email;
   this.userReq.firstName = this.registerForm.value.firstName;
   this.userReq.imageUrl = this.registerForm.value.imageUrl!;

   console.log("object body "+ JSON.stringify(this.userReq))
   
   this.authService.register(this.userReq)
   .subscribe({
    next:(resp:any)=>{
    
      console.log("response auth "+ resp)
      this.toastService.show("Souscription réussie !!!","SUCCESS")
      this.router.navigate(['login'])
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
