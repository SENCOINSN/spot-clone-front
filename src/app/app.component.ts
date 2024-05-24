import { Component, effect, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fontAwesomeIcons } from './shared/font-awesome-icons';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { LibraryComponent } from './layout/library/library.component';
import { HeaderComponent } from './layout/header/header.component';
import { NgbModal, NgbModalRef, NgbToast } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from './service/toast.service';
import { PlayerComponent } from './layout/player/player.component';
import { AuthPopupState, AuthService } from './layout/service/auth.service';
import { AuthPopupComponent } from './layout/auth-popup/auth-popup.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FontAwesomeModule,NavigationComponent,LibraryComponent,HeaderComponent,NgbToast,PlayerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'spot-clone-front';
  toastService = inject(ToastService);

  private faIconLibrary: FaIconLibrary = inject(FaIconLibrary);

  public authS= inject(AuthService)

  private modalService = inject(NgbModal);

  private authModalRef: NgbModalRef | null = null;


  constructor(){
    effect(() => {
      this.openOrCloseAuthModal(this.authS.authPopupStateChange())
    }, {allowSignalWrites: true});
  }


  user:any;

  ngOnInit(): void {
      this.initFontAwesome()
      //this.toastService.show("hello toast","SUCCESS")
      
  }

  private openOrCloseAuthModal(state: AuthPopupState) {
    if(state === "OPEN") {
      this.openAuthPopup();
    } else if(this.authModalRef !== null && state === "CLOSE"
    && this.modalService.hasOpenModals()) {
      this.authModalRef.close();
    }
  }

  private openAuthPopup() {
    this.authModalRef = this.modalService.open(AuthPopupComponent, {
      ariaDescribedBy: 'authentication-modal',
      centered: true
    });

    this.authModalRef.dismissed.subscribe({
      next: () => {
        this.authS.openOrCloseAuthPopup("CLOSE");
      }
    });

    this.authModalRef.closed.subscribe({
      next: () => {
        this.authS.openOrCloseAuthPopup("CLOSE");
      }
    });
  }

  private initFontAwesome(){
    this.faIconLibrary.addIcons(...fontAwesomeIcons)
  }
}
