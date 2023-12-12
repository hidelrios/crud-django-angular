import { Component, OnInit } from '@angular/core';
import { Person } from '../person';
import { PersonService } from '../person.service';
import { Observable } from 'rxjs';
import { CommonModule, NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [NgFor, MatTableModule, CommonModule],
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css'],
})
export class PersonListComponent implements OnInit {
  personList: Person[] = [];

  displayedColumns: string[] = [
    'name',
    'birth_date',
    'cpf',
    'sex',
    'height',
    'weight',
  ];

  showPersonList$: Observable<boolean>;

  constructor(private personService: PersonService) {
    this.showPersonList$ = this.personService.showPersonList$;
  }

  ngOnInit() {
    this.personService.togglePersonList(true);
    this.getPersonList();
    this.personService.itemList$.subscribe((items) => {
      this.personList = items;
    });
  }

  getPersonList() {
    this.personService.getPersonList().then((personList: Person[]) => {
      this.personList = personList;
    });
  }
}
