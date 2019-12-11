import { Injectable } from '@angular/core';
import { Person } from './person.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  personListChanged = new Subject();
  // private persons: Person[] = [
  //   new Person(
  //     1,
  //     'Motish',
  //     'motish.mehta@varian.com',
  //     new Date('11/11/1997'),
  //     'India'
  //   ),
  //   new Person(
  //     2,
  //     'Atul',
  //     'atul.gunjal@varian.com',
  //     new Date('07/01/1997'),
  //     'India'
  //   )
  // ];

  getPerson(id: number) {
    return this.http.get<Person>('https://localhost:5001/api/persons/' + id);
  }

  getPersonsList() {
    return this.http.get<Person[]>('https://localhost:5001/api/persons');
  }

  addPerson(person: Person) {
    this.http
      .post<Person>('https://localhost:5001/api/persons', person)
      .subscribe(person2 => {
        console.log('Added ' + person2.name);
        this.personListChanged.next();
      });
  }

  updatePerson(person: Person) {
    this.http
      .put<Person>('https://localhost:5001/api/persons/' + person.id, person)
      .subscribe(
        person2 => {
          console.log('Updated ' + person2.name);
          this.personListChanged.next();
        },
        error => {
          console.log('error ');
          console.log(error);
        }
      );
  }

  constructor(private http: HttpClient) {}
}
