import { Component } from '@angular/core';
import { Students } from '../student';
import { StudentServiceService } from '../student-service.service';

@Component({
  templateUrl: './welcome.component.html'
})
export class WelcomeComponent {
  public pageTitle = 'Welcome';

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
