import { Injectable } from '@angular/core';
import { Person } from './person.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private persons: Person[] = [];

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

  getPersons() {
    return this.persons.slice();
  }

  getPersonsList() {
    return this.http.get<Person[]>('https://localhost:5001/api/persons');
  }

  constructor(private http: HttpClient) {}
}
