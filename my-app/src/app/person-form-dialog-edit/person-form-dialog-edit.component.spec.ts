import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonFormDialogEditComponent } from './person-form-dialog-edit.component';

describe('PersonFormDialogEditComponent', () => {
  let component: PersonFormDialogEditComponent;
  let fixture: ComponentFixture<PersonFormDialogEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonFormDialogEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonFormDialogEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
