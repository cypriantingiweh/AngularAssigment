import { Component, OnInit } from '@angular/core';
import { Students } from '../student';
import { StudentServiceService } from '../student-service.service';
import { Course } from '../course';

@Component({
  selector: 'app-students',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

  pageTitle = "List of Students";

  students:Students[] = [];
  errorMessage = '';

  constructor(private studentService:StudentServiceService) { }
   

  ngOnInit(): void {
    this.studentService.getStudents().subscribe({
      next: students => {
        this.students = students;
      },
      error: err => this.errorMessage = err
    });
  }

}
