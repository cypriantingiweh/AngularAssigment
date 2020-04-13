import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Students } from './student';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentServiceService {
  private studentUrl = './assets/students/students.json';
 private Grade:string;
 private GradePoints:number;
 private sumOfCredit_value:number;
 private sumOfCoursePoints:number;
 GPA:number;

  constructor(private http: HttpClient) { }

  //getting all the students list
  getStudents(): Observable<Students[]> {
    return this.http.get<Students[]>(this.studentUrl);
  }

  //getting a particular student
  getStudent(id: number): Observable<Students | undefined> {
    return this.getStudents()
      .pipe(
        map((students: Students[]) => students.find(p => p.studentId === id))
      );
  }

  //for calculating the grade end in a course 
  calculateLetGr(score:number):string{
   switch(true){
     case(score > 79): this.Grade = "A"; 
     break;
     case(score > 69 && score < 80):
     this.Grade = "B+";
     break;
     case(score > 59 && score < 70):this.Grade = "B";
     break;
     case(score > 54 && score < 60):this.Grade = "C+";
     break;
     case(score > 49 && score < 55):this.Grade = "C";
     break;
     case(score > 44 && score < 50):this.Grade = "D+";
     break;
     case(score > 39 && score < 45):this.Grade = "D";
     break;
     default:this.Grade = "F";
     break;      
   }
    return this.Grade; 
  }
//calculating grade points
calculateGradePoints(score:number):number{
  switch(true){
    case(score > 79): this.GradePoints =4.0; 
    break;
    case(score > 69 && score < 80): this.GradePoints =3.5;
    break;
    case(score > 59 && score < 70): this.GradePoints =3.0;
    break;
    case(score > 54 && score < 60): this.GradePoints =2.5;
    break;
    case(score > 49 && score < 55): this.GradePoints =2.0;
    break;
    case(score > 44 && score < 50): this.GradePoints =1.5; ;
    break;
    case(score > 39 && score < 45): this.GradePoints =1.0;
    break;
    default: this.GradePoints =0.0;
    break;      
  }
   return this.GradePoints;
}

calculatCoursePoints(credit_value:number,GradePoints:number):number{
  return credit_value*GradePoints;
}

//calculating the GPA
calculatingGPA(id:number, student:any):number{
  this.sumOfCredit_value = 0;
  this.sumOfCoursePoints = 0;
  for(let i = 0; i < student.course.length; i++){
    this.sumOfCredit_value += student.course[i].Credit_value; 
    this.sumOfCoursePoints += this.calculatCoursePoints(
      student.course[i].Credit_value, 
      this.calculateGradePoints(student.course[i].score
      ));
  }
 this.GPA = (this.sumOfCoursePoints / this.sumOfCredit_value);
  return this.GPA;
}

//error handling
  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
     
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
