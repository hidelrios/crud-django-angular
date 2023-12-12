import { Component, Inject } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PersonService } from '../person.service';
import { Person } from '../person';

import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';

import * as _moment from 'moment';

import { default as _rollupMoment } from 'moment';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: ['YYYY-MM-DD'],
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-person-form-dialog-edit',
  standalone: true,
  imports: [
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
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  templateUrl: './person-form-dialog-edit.component.html',
  styleUrl: './person-form-dialog-edit.component.css',
})
export class PersonFormDialogEditComponent {
  editPersonForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PersonFormDialogEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private personService: PersonService
  ) {
    this.editPersonForm = this.createEditForm(data);
  }

  createEditForm(data: any): FormGroup {
    return this.formBuilder.group({
      id: [data.id],
      name: [data.name, Validators.required],
      birth_date: [data.birth_date, Validators.required],
      cpf: [data.cpf, Validators.required],
      sex: [data.sex, Validators.required],
      height: [data.height, Validators.required],
      weight: [data.weight, Validators.required],
    });
  }

  saveUpdatePerson() {
    if (this.editPersonForm.valid) {
      const updatedPersonData: Person = {
        id: this.editPersonForm.value.id,
        name: this.editPersonForm.value.name!,
        birth_date: moment(this.editPersonForm.value.birth_date).format(
          'YYYY-MM-DD'
        )!,
        cpf: this.editPersonForm.value.cpf!,
        sex: this.editPersonForm.value.sex!,
        height: this.editPersonForm.value.height!,
        weight: this.editPersonForm.value.weight!,
      };

      this.personService.updatePerson(updatedPersonData).subscribe({
        next: (res) => {
          this.personService.openSnackBar('Person altered', 'done');
          this.personService.updateItemList();
          this.personService.togglePersonList(true);
          this.personService.togglePersonListSearch(false);
          this.dialogRef.close(res);
        },
      });
    }
  }
}
