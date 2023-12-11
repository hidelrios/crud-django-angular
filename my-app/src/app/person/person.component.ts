import { Component, inject } from '@angular/core';
import { Person } from '../person';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person',
  standalone: true,
  imports: [],
  templateUrl: './person.component.html',
  styleUrl: './person.component.css',
})

export class PersonComponent {
  persons: Person[] = [];
  private personService: PersonService = inject(PersonService)

  constructor() {}

  ngOnInit(): void {
    this.getPersons();
  }

  getPersons(): void {
    this.personService.getAllPerson();
  }

}
