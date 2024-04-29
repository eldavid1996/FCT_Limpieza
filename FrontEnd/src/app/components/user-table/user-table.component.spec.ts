import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UserTableComponent } from './user-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { UserService } from '../../services/user.service';
import { Observable, of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { User } from '../../models/user.model';

describe('UserTableComponent', () => {
  let component: UserTableComponent;
  let fixture: ComponentFixture<UserTableComponent>;
  let userServiceMock: jasmine.SpyObj<UserService>;
  let debugElement: DebugElement;

  beforeEach(waitForAsync(() => {
    userServiceMock = jasmine.createSpyObj<UserService>('UserService', ['getUsers']);

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
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getUsers method on ngOnInit if dataSource is empty', () => {
    userServiceMock.getUsers.and.returnValue(of([]));
    component.ngOnInit();
    expect(userServiceMock.getUsers).toHaveBeenCalled();
  });

  it('should not call getUsers method on ngOnInit if dataSource is not empty', () => {
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
    component.ngOnInit();
    expect(userServiceMock.getUsers).not.toHaveBeenCalled();
  });

  it('should update dataSource when hacerFiltro is called', () => {
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

    const observableMock = of(mockUsers);

    userServiceMock.getUsers.and.returnValue(observableMock);

    component.ngOnInit(); // Llamamos ngOnInit para que se establezca el dataSource

    observableMock.subscribe(users => {
      component.dataSource.data = users; // Actualizamos dataSource con los usuarios obtenidos
    });

    component.hacerFiltro('john');

    expect(component.dataSource.data.length).toBe(1);
    expect(component.dataSource.data[0].name).toBe('John');
  });
});
