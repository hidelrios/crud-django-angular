import { Injectable } from '@angular/core';
import { Person } from './person';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private url = 'http://127.0.0.1:8000/api/person';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private itemsSubject = new BehaviorSubject<Person[]>([]);

  private showPersonListSubject = new BehaviorSubject<boolean>(false);
  showPersonList$ = this.showPersonListSubject.asObservable();

  private showPersonListSearch = new BehaviorSubject<boolean>(false);
  showPersonSearch$ = this.showPersonListSearch.asObservable();


  togglePersonList(value: boolean) {
    this.showPersonListSubject.next(value);
  }

  togglePersonListSearch(value: boolean) {
    this.showPersonListSearch.next(value);
  }

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  openSnackBar(message: string, action: string = 'ok') {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
    });
  }


  get itemList$() {
    return this.itemsSubject.asObservable();
  }

  async getPersonList(): Promise<[Person]> {
    const data = await fetch(this.url);

    return (await data.json()) ?? [];
  }

  async getPersonByName(name: string): Promise<[Person]> {
    const url = `${this.url}/${name}`;

    const data = await fetch(url);
    return (await data.json()) ?? [];
  }

  calculateIdealWeight(personId: number): Observable<any> {
    const url = `${this.url}/calculate_ideal_weight/${personId}/`;

    return this.http.get<any>(url);
  }

  addPerson(person: Person): Observable<any> {
    return this.http.post<Person>(this.url, person, this.httpOptions);
  }

  updateItemList() {
    // Fazer um GET para obter a lista atualizada do backend
    this.http.get<Person[]>(this.url).subscribe((items) => {
      this.itemsSubject.next(items);
    });
  }

  deletePerson(personId: number) {
    // Lógica para excluir uma pessoa com base no ID
    const deleteUrl = `${this.url}/${personId}`;

    return this.http.delete(deleteUrl)
  }

  updatePerson(person: Person): Observable<any>{
    return this.http.put<any>(`${this.url}/${person.id}/`, person, this.httpOptions);
  }

}
