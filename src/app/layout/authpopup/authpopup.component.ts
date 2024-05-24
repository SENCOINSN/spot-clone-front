import { Component, inject } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-authpopup',
  standalone: true,
  imports: [],
  templateUrl: './authpopup.component.html',
  styleUrl: './authpopup.component.scss'
})
export class AuthpopupComponent {
  private authService=inject(AuthService)

  login():void{
    
  }

}
