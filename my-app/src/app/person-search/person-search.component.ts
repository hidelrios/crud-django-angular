import { Component } from '@angular/core';
import { PersonService } from '../person.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Person } from '../person';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-person-search',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
  ],
  templateUrl: './person-search.component.html',
  styleUrl: './person-search.component.css',
})
export class PersonSearchComponent {
  resultSearch: any[] = [];
  selectedPerson: any = null; // Adicione esta linha
  displayedColumns: string[] = [
    'name',
    'birth_date',
    'cpf',
    'sex',
    'height',
    'weight',
    'action'
  ];

  constructor(private personService: PersonService) {}

  searchPersonForm = new FormGroup({
    name: new FormControl(''),
  });

  editPersonForm = new FormGroup({
    name: new FormControl(''),
    birth_date: new FormControl(''),
    cpf: new FormControl(''),
    sex: new FormControl(''),
    height: new FormControl(''),
    weight: new FormControl(''),
  });

  applyFilter() {
    const nome: string = this.searchPersonForm.value.name!;

    this.personService.getPersonByName(nome).then((data) => {
      this.resultSearch = data;
      this.searchPersonForm.reset();
    });
  }

  alterar(person: any) {
    this.selectedPerson = person;

    this.editPersonForm.patchValue({
      name: person.name,
      birth_date: person.birth_date,
      cpf: person.cpf,
      sex: person.sex,
      height: person.height,
      weight: person.weight,
    });
  }

  salvarEdicao() {
    if (this.selectedPerson) {
      const editedPerson: Person = {
        id: this.selectedPerson.id,
        name: this.editPersonForm.value.name!,
        birth_date: this.editPersonForm.value.birth_date!,
        cpf: this.editPersonForm.value.cpf!,
        sex: this.editPersonForm.value.sex!,
        height: this.editPersonForm.value.height!,
        weight: this.editPersonForm.value.weight!,
        // Adicione outros campos conforme necessário
      };

      this.personService.updatePerson(editedPerson).subscribe(() => {
        // Atualize a lista de resultados após a edição
        this.applyFilter();
        // Limpe o estado de selectedPerson e editPersonForm
        this.selectedPerson = null;
        this.editPersonForm.reset();
      });
    }
  }

  deletePerson(personId: number) {
    // Chame o método de exclusão do serviço
    this.personService.deletePerson(personId);
  }
}
