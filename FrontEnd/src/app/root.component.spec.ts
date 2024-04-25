import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { of } from 'rxjs';
import { TaskComponent } from './components/task/task.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { NavbarComponent } from './components/navegacion/navbar/navbar.component';
import { MenuListaComponent } from './components/navegacion/menu-lista/menu-lista.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { LoginComponent } from './components/seguridad/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { RootComponent } from './root.component';
import { SeguridadService } from './components/seguridad/seguriad.service';
import { NgForm } from '@angular/forms';

describe('All components and requirements', () => {
  let titleServiceSpy: any;
    let seguridadServiceSpy: jasmine.SpyObj<SeguridadService>;

  beforeEach(async(() => {
    titleServiceSpy = jasmine.createSpyObj('TitleService', ['setTitle']);
    seguridadServiceSpy = jasmine.createSpyObj('SeguridadService', ['login']);

    TestBed.configureTestingModule({
      imports: [
        TaskComponent,
        RoomsComponent,
        NavbarComponent,
        MenuListaComponent,
        DashboardComponent,
        CalendarComponent,
        LoginComponent,
        UsersComponent,
        RootComponent
      ],
      providers: [
        { provide: SeguridadService, useValue: seguridadServiceSpy }
      ]
    })
    .compileComponents();
  }));

  describe('TaskComponent', () => {
    let component: TaskComponent;
    let fixture: ComponentFixture<TaskComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(TaskComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('RoomsComponent', () => {
    let component: RoomsComponent;
    let fixture: ComponentFixture<RoomsComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(RoomsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  // Do the same for the rest of the components

  describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

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

  describe('RootComponent', () => {
    let component: RootComponent;
    let fixture: ComponentFixture<RootComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(RootComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have the "FrontEnd" title', () => {
      titleServiceSpy.setTitle.and.callFake((title: string) => {
        expect(title).toEqual('FrontEnd');
      });

      component.ngOnInit();
    });

    it('should render title',() => {
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('h1').textContent).toContain('FrontEnd');
    });

    it('should create the root', () => {
      expect(component).toBeTruthy();
    });
  });
});
