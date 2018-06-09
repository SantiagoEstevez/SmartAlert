import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogRealTimeComponent } from './log-real-time.component';

describe('LogRealTimeComponent', () => {
  let component: LogRealTimeComponent;
  let fixture: ComponentFixture<LogRealTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogRealTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogRealTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
