import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDialogAboutComponent } from './my-dialog-about.component';

describe('MyDialogAboutComponent', () => {
  let component: MyDialogAboutComponent;
  let fixture: ComponentFixture<MyDialogAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyDialogAboutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDialogAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
