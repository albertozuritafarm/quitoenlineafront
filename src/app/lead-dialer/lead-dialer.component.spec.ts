import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadDialerComponent } from './lead-dialer.component';

describe('LeadDialerComponent', () => {
  let component: LeadDialerComponent;
  let fixture: ComponentFixture<LeadDialerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadDialerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadDialerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
