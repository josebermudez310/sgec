import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthServiceService } from '../../services/auth/auth-service.service';
import { USER_AUTH_TOKEN } from '../../constants/LocalStorageConstants';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(
    private router: Router,
    private authService: AuthServiceService
  ) {}

  logout(): void {
    this.authService.logout().subscribe(
      (response) => {
        localStorage.removeItem(USER_AUTH_TOKEN);
        console.log(response);

        this.router.navigate(['/login'], { replaceUrl: true });
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
