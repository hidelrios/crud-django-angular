import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonSearchComponent } from './person-search.component';

describe('PersonSearchComponent', () => {
  let component: PersonSearchComponent;
  let fixture: ComponentFixture<PersonSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
