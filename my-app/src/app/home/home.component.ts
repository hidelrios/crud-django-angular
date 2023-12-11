import { Component, Input, ViewChild, inject } from '@angular/core';
import { PersonListComponent } from '../person-list/person-list.component';
import { PersonService } from '../person.service';
import { Person } from '../person';
import { PersonEditorComponent } from '../person-editor/person-editor.component';
import { PersonSearchComponent } from '../person-search/person-search.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ThemePalette } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PersonEditorComponent,
    PersonListComponent,
    PersonSearchComponent,
    MatToolbarModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  @Input()
  color: ThemePalette;

  constructor(
    private dialog: MatDialog,
  ){}

  openAddEditPersonForm() {
    const dialogRef = this.dialog.open(PersonEditorComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {

        }
      },
    });
  }
}
