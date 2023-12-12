import { Component, Input, ViewChild, inject } from '@angular/core';
import { PersonListComponent } from '../person-list/person-list.component';
import { PersonEditorComponent } from '../person-editor/person-editor.component';
import { PersonSearchComponent } from '../person-search/person-search.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ThemePalette } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NgIf } from '@angular/common';

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
    MatDialogModule,
    NgIf,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  @Input()
  color: ThemePalette;

  constructor(private dialog: MatDialog) {}

  openAddEditPersonForm() {
    const dialogRef = this.dialog.open(PersonEditorComponent);
    dialogRef.afterClosed();
  }
}
