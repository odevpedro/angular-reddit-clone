import { TestBed } from '@angular/core/testing';
import { provideRouter, RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({ selector: 'app-header', standalone: true, template: '' })
class MockHeaderComponent {}

describe('AppComponent', () => {
  beforeEach(async () => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jasmine.createSpy('matchMedia').and.returnValue({
        matches: false,
        addEventListener: () => {},
        removeEventListener: () => {},
      }),
    });

    await TestBed.configureTestingModule({
      providers: [provideRouter([])],
    })
      .overrideComponent(AppComponent, {
        set: { imports: [CommonModule, RouterOutlet, MockHeaderComponent] },
      })
      .compileComponents();
  });

  it('should create the app component', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should start with loading set to false', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance.loading).toBeFalse();
  });

  it('should render the loading bar element', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.loading-bar')).toBeTruthy();
  });
});
