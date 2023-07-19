import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAttendenceComponent } from './create-attendence.component';

describe('CreateAttendenceComponent', () => {
  let component: CreateAttendenceComponent;
  let fixture: ComponentFixture<CreateAttendenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAttendenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAttendenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
