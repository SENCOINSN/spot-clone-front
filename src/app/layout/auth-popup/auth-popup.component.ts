import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth-popup',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './auth-popup.component.html',
  styleUrl: './auth-popup.component.scss'
})
export class AuthPopupComponent {
  router=inject(Router)

  login(){
    this.router.navigate(['login'])

  }

  register(){
    this.router.navigate(['register'])
  }

}
