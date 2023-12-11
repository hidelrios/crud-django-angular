import { Component, NgModule, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Person } from '../person';
import { PersonService } from '../person.service';
import { PersonEditorComponent } from '../person-editor/person-editor.component';
import { Subscription } from 'rxjs';
import { NgFor } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatFormFieldControl } from '@angular/material/form-field';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports:[NgFor,MatTableModule, ],
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css'],
})


export class PersonListComponent implements OnInit {
  personList: Person[] = [];
  displayedColumns: string[] = ['name', 'birth_date', 'cpf', 'sex','height', 'weight',];

  constructor(
    private personService: PersonService,

    ) {}

  ngOnInit() {
    this.getPersonList();
    this.personService.itemList$.subscribe((items) => {
      this.personList = items;
    });
  }

  getPersonList() {
    this.personService.getAllPerson().then((personList: Person[]) => {
      this.personList = personList;
    });
  }

}
