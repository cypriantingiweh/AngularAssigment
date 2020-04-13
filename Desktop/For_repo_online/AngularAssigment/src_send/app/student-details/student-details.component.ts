import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Students } from '../student';
import { StudentServiceService } from '../student-service.service';
import { Course } from '../course';

@Component({
  selector: 'pm-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {
  pageTitle = 'Student Detail';
  errorMessage = '';
  student: Students | undefined;
  stdId: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private studentService: StudentServiceService) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getStudent(id);
      this.stdId = id;
    }

    console.log(this.student)
  }

  getStudent(id: number) {
    this.studentService.getStudent(id).subscribe({
      next: student => this.student = student,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/students']);
  }
}
