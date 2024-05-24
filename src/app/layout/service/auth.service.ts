import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { State } from '../../service/model/state.model';
import { User } from '../../service/model/user.model';
import { environment } from '../../../environments/environment.development';
import {Location} from "@angular/common";
import { Observable } from 'rxjs';
import { Auth, AuthRequest, userReq } from '../../service/model/auth.model';
import { Router } from '@angular/router';
import moment from 'moment';
import { jwtDecode } from 'jwt-decode';


export type AuthPopupState = "OPEN" | "CLOSE"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http:HttpClient = inject(HttpClient)
  location:Location=inject(Location);
  notConnected:string='NOT_CONNECTED';

  router=inject(Router)

  rawToken:any;

  constructor() { }

  private fetchUser$ : WritableSignal<State<User,HttpErrorResponse>>=
  signal(State.Builder<User,HttpErrorResponse>().forSuccess({email:this.notConnected}).build())

  fetchUser=computed(()=>this.fetchUser$());

  private triggerAuthPopup$: WritableSignal<AuthPopupState> = signal("CLOSE");
  authPopupStateChange = computed(() => this.triggerAuthPopup$());


  fetch(): void {
    this.http.get<User>(`${environment.API_URL}/api/get-authenticated-user`)
      .subscribe({
        next: user =>{
          console.log("user "+JSON.stringify(user))
          this.fetchUser$.set(State.Builder<User, HttpErrorResponse>().forSuccess(user).build())
        } ,
        error: (err: HttpErrorResponse) => {
          if (err.status === HttpStatusCode.Unauthorized && this.isAuthenticated()) {
            this.fetchUser$.set(State.Builder<User, HttpErrorResponse>().forSuccess({email: this.notConnected}).build());
          } else {
            this.fetchUser$.set(State.Builder<User, HttpErrorResponse>().forError(err).build());
          }
        }
      });
  }

  isAuthenticated(): boolean {
    // if (this.fetchUser$().value) {
    //   return this.fetchUser$().value!.email !== this.notConnected;
    // } else {
    //   return false;
    // }

    let user = this.getUserAuth()
    return user !== null ? true : false;
  }

  storeToken(token:any){
    localStorage.removeItem('token')
    localStorage.setItem('token',token)
  }

  storeUser(user:any){
    localStorage.setItem('user',JSON.stringify(user))
  }

  

  public tokenExpired(token:any):boolean{
    this.rawToken = this.getRawToken(token);
    return moment().unix() > this.rawToken.exp
  }

  getRawToken(accessToken:any){
    return jwtDecode(accessToken);
 }

  redirectLogin():void{
    this.router.navigate(['login'])
  }


  getToken(){
    return localStorage.getItem('token');
  }

  getUserAuth(){
    return localStorage.getItem("user")
  }

  login(data:Auth): Observable<any> {
    //location.href = `${location.origin}${this.location.prepareExternalUrl('oauth2/authorization/okta')}`;

    return this.http.post(`${environment.API_URL}/api/login`,data);
  }

  register(data:userReq):Observable<any>{
    return this.http.post(`${environment.API_URL}/api/register`,data)
  }

  logout(): void {
    // this.http.post(`${environment.API_URL}/api/logout`, {}, {withCredentials: true})
    //   .subscribe({
    //     next: (response: any) => {
    //       this.fetchUser$.set(State.Builder<User, HttpErrorResponse>().forSuccess({email: this.notConnected}).build());
    //       location.href = response.logoutUrl
    //     }
    //   })

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate([''])

  }

  openOrCloseAuthPopup(state: AuthPopupState) {
    this.triggerAuthPopup$.set(state);
  }



  
}
