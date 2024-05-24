import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthpopupComponent } from './authpopup.component';

describe('AuthpopupComponent', () => {
  let component: AuthpopupComponent;
  let fixture: ComponentFixture<AuthpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthpopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
