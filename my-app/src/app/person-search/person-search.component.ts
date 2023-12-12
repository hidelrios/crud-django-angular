import { Component } from '@angular/core';
import { PersonService } from '../person.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Person } from '../person';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from '../home/home.component';
import { PersonListComponent } from '../person-list/person-list.component';
import { Observable } from 'rxjs';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { PersonFormDialogEditComponent } from '../person-form-dialog-edit/person-form-dialog-edit.component';

@Component({
  selector: 'app-person-search',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
  ],
  templateUrl: './person-search.component.html',
  styleUrl: './person-search.component.css',
})
export class PersonSearchComponent {
  resultSearch: any[] = [];
  selectedPerson: any = null;
  displayedColumns: string[] = [
    'name',
    'birth_date',
    'cpf',
    'sex',
    'height',
    'weight',
    'action',
  ];
  showPersonSearch$: Observable<boolean>;

  constructor(private personService: PersonService, private dialog: MatDialog) {
    this.showPersonSearch$ = this.personService.showPersonSearch$;
  }

  searchPersonForm = new FormGroup({
    name: new FormControl(''),
  });

  applyFilter() {
    const nome: string = this.searchPersonForm.value.name!;

    this.personService
      .getPersonByName(nome)
      .then((data) => {
        if (data && data.length > 0) {
          this.resultSearch = data;
          this.personService.togglePersonList(false);
          this.personService.togglePersonListSearch(true);
        } else {
          this.personService.openSnackBar('User not found', 'done');
          this.personService.togglePersonList(true);
          this.personService.togglePersonListSearch(false);
        }

        this.searchPersonForm.reset();
      })
      .catch((error) => {
        console.error('Error when searching for user:', error);
        this.personService.openSnackBar('Error when searching for user:');
      });
  }

  openPersonFormDialog(data: any): void {
    const dialogRef = this.dialog.open(PersonFormDialogEditComponent, {
      data: {
        id: data.id,
        name: data.name,
        birth_date: data.birth_date,
        cpf: data.cpf,
        sex: data.sex,
        height: data.height,
        weight: data.weight,
      },
    });

    dialogRef.afterClosed().subscribe((updatedData) => {
      this.personService.updateItemList();
    });
  }

  deletePerson(personId: number) {
    this.personService.deletePerson(personId).subscribe({
      next: (res) => {
        this.personService.openSnackBar('Person deleted', 'done');
        this.personService.updateItemList();
        this.personService.togglePersonList(true);
        this.personService.togglePersonListSearch(false);
      },
      error: (err) => {
        console.error('Error when deleting person:', err);
        this.personService.openSnackBar('Error when deleting person', 'error');
      },
    });
  }

  getIdealWeight(personId: number) {
    this.personService.calculateIdealWeight(personId).subscribe({
      next: (res) => {
        window.alert(`O peso ideal é: ${res.ideal_weight}`);
      },
      error: (err) => {
        console.error('Error when calculating weight:', err);
        this.personService.openSnackBar(
          'Error when calculating weight',
          'error'
        );
      },
    });
  }
}
