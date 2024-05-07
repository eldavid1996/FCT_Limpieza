import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule, NgForm } from '@angular/forms';
import { SeguridadService } from '../seguriad.service';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let seguridadServiceSpy: jasmine.SpyObj<SeguridadService>;

  beforeEach(async(() => {
    seguridadServiceSpy = jasmine.createSpyObj('SeguridadService', ['login']);

    TestBed.configureTestingModule({
      imports: [
        LoginComponent, // Agrega LoginComponent a la matriz "imports"
        FormsModule,
        { provide: SeguridadService, useValue: seguridadServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login method of SeguridadService on form submit', () => {
    const formValue = { email: 'test@test.com', password: 'password' };
    const form = { value: formValue } as NgForm;

    component.loginUsuario(form);

    expect(seguridadServiceSpy.login).toHaveBeenCalledWith(formValue);
  });
});
