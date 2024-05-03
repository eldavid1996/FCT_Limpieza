import { TestBed } from '@angular/core/testing';
import { RootComponent } from './root.component';

describe('RootComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RootComponent],
    }).compileComponents();
  });

  it('should create the root', () => {
    const fixture = TestBed.createComponent(RootComponent);
    const root = fixture.componentInstance;
    expect(root).toBeTruthy();
  });

  it(`should have the 'FrontEnd' title`, () => {
    const fixture = TestBed.createComponent(RootComponent);
    const root = fixture.componentInstance;
    expect(root.title).toEqual('FrontEnd');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(RootComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, FrontEnd');
  });
});
