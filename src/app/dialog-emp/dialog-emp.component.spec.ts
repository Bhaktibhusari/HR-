import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEmpComponent } from './dialog-emp.component';

describe('DialogEmpComponent', () => {
  let component: DialogEmpComponent;
  let fixture: ComponentFixture<DialogEmpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogEmpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
