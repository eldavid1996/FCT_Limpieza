import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UserTableComponent } from './user-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { UserService } from '../../services/user.service';
import { Observable, of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('UserTableComponent', () => {
  let component: UserTableComponent;
  let fixture: ComponentFixture<UserTableComponent>;
  let userServiceMock: any;
  let userService: UserService;
  let debugElement: DebugElement;

  beforeEach(waitForAsync(() => {
    userServiceMock = {
      getUsers: jasmine.createSpy('getUsers').and.returnValue(of([]))
    };

    TestBed.configureTestingModule({
      declarations: [ UserTableComponent ],
      imports: [
        MatTableModule,
        MatPaginatorModule,
        MatSortModule
      ],
      providers: [
        { provide: UserService, useValue: userServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTableComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getUsers method on ngOnInit if dataSource is empty', () => {
    spyOn(userService, 'getUsers').and.returnValue(of([]));
    component.ngOnInit();
    expect(userService.getUsers).toHaveBeenCalled();
  });

  it('should not call getUsers method on ngOnInit if dataSource is not empty', () => {
    component.dataSource.data = [{ id: 1, name: 'John', email: 'john@example.com', phone: '1234567890' }];
    spyOn(userService, 'getUsers').and.returnValue(of([]));
    component.ngOnInit();
    expect(userService.getUsers).not.toHaveBeenCalled();
  });

  t('should update dataSource when hacerFiltro is called', () => {
    const mockUsers: User[] = [
      { 
        id: '1',
        name: 'John',
        email: 'john@example.com',
        phone: '1234567890',
        birthDate: new Date(),
        city: 'City',
        dni: '12345678A',
        surname: 'Doe',
        pc: '12345',
        admin: 0,
        token: 'token123',
        password: 'password'
      },
      { 
        id: '2',
        name: 'Jane',
        email: 'jane@example.com',
        phone: '0987654321',
        birthDate: new Date(),
        city: 'City',
        dni: '87654321B',
        surname: 'Smith',
        pc: '67890',
        admin: 1,
        token: 'token456',
        password: 'password'
      }
    ];
  
    spyOn(userService, 'getUsers').and.returnValue(of(mockUsers));
  
    component.hacerFiltro('john');
  
    expect(component.dataSource.data.length).toBe(1);
    expect(component.dataSource.data[0].name).toBe('John');
  });

  // Agrega más pruebas según las funcionalidades que desees cubrir
});
