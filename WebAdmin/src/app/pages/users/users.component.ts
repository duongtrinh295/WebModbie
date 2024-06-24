import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink ,Router } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  students = [
    { name: 'Alexa Liras', email: 'alexa@creative-tim.com', role: 'Programator', position: 'Developer', status: 'offline', employedDate: '23/04/18', imageUrl: 'https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg' },
    // Add more students here
  ];

  constructor(private router: Router) {}

  onAddMember(): void {
    this.router.navigate(['/userform'], { queryParams: { student: null } });
  }

  editStudent(student: any): void {
    this.router.navigate(['/userform'], { queryParams: { student: JSON.stringify(student) } });
  }
}
