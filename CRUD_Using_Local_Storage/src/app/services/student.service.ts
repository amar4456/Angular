import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../pages/student/model/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  baseUrl = 'http://localhost:3000/posts';

  constructor(private http: HttpClient) {}

  getStudent() {
    return this.http.get<Student[]>(this.baseUrl);
  }

  postStudent(employee: Student) {
    return this.http.post<Student>(this.baseUrl, employee);
  }

  deleteStudent(id: string) {
    return this.http.delete(this.baseUrl + '/' + id);
  }
}
