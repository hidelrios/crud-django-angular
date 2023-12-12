import { Component, inject } from '@angular/core';

import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { PersonService } from '../person.service';
import { Person } from '../person';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
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
// tslint:disable-next-line:no-duplicate-imports
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
  selector: 'app-person-editor',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatButtonModule,
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

  templateUrl: './person-editor.component.html',
  styleUrl: './person-editor.component.css',
})
export class PersonEditorComponent {
  constructor(
    private personService: PersonService,
    private dialogRef: MatDialogRef<PersonEditorComponent>
  ) {}

  private newPerson: Person = new Person();

  personForm = new FormGroup({
    name: new FormControl(''),
    birth_date: new FormControl(moment('').format('YYYY-MM-DD')),
    cpf: new FormControl(''),
    sex: new FormControl(''),
    height: new FormControl(''),
    weight: new FormControl(''),
  });

  onSubmit() {
    this.newPerson = {
      name: this.personForm.value.name!,
      birth_date: moment(this.personForm.value.birth_date).format(
        'YYYY-MM-DD'
      )!,
      cpf: this.personForm.value.cpf!,
      sex: this.personForm.value.sex!,
      height: this.personForm.value.height!,
      weight: this.personForm.value.weight!,
    };

    this.personService.addPerson(this.newPerson).subscribe(
      () => {
        this.personService.updateItemList();
        this.personService.openSnackBar('Employee added successfully');
        this.dialogRef.close(true);
      },

      (err: any) => {
        console.error(err);
        this.personService.openSnackBar(
          'Error when trying to add data check the information'
        );
        this.dialogRef.close(true);
      }
    );
  }
}
