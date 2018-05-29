import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HardDiskComponent } from './hard-disk.component';

describe('HardDiskComponent', () => {
  let component: HardDiskComponent;
  let fixture: ComponentFixture<HardDiskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HardDiskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HardDiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
