import { Injectable } from '@angular/core';
import { Person } from './person';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

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

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private snackBar: MatSnackBar
  ) {}

  openSnackBar(message: string, action: string = 'ok') {
    this.snackBar.open(message, action, {
      duration: 1000,
      verticalPosition: 'top',
    });
  }

  get itemList$() {
    return this.itemsSubject.asObservable();
  }

  async getAllPerson(): Promise<[Person]> {
    const data = await fetch(this.url);

    return (await data.json()) ?? [];
  }

  async getPersonByName(name: string): Promise<[Person]> {
    const url = `${this.url}/${name}`;

    const data = await fetch(url);
    return (await data.json()) ?? [];
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
    this.http.delete(deleteUrl).subscribe(() => {
      this.updateItemList();
    });
  }

  updatePerson(person: Person){
    return this.http.put<any>(`${this.url}/${person.id}/`, person, this.httpOptions);
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
