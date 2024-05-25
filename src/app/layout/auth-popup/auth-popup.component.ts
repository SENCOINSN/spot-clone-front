import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-auth-popup',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './auth-popup.component.html',
  styleUrl: './auth-popup.component.scss'
})
export class AuthPopupComponent {
  router=inject(Router)
  authService = inject(AuthService)

  login(){
    this.router.navigate(['login'])
    this.authService.openOrCloseAuthPopup("CLOSE")


  }

  register(){
    this.router.navigate(['register'])
    this.authService.openOrCloseAuthPopup("CLOSE")
  }

}
