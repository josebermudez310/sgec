import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-configurations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './configurations.component.html',
  styleUrl: './configurations.component.css'
})
export class ConfigurationsComponent implements OnInit {

  public users = []

  constructor(
    private utilService: UtilsService,
  ) {}

  assignRole(user: number, rol: string): void {
    this.utilService.updateUser(user, {rol}).subscribe(
      (response) => {
        console.log(response);
        this.getUsers();
      },
      (error) => {
        console.log(error);
      }
    )
  }

  toggleStatus(button, userid: number): void {
    if (button.classList.contains('inactive')) {
      this.utilService.updateUser(userid, {estado: 'Activo'}).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
      button.classList.remove('inactive');
      button.textContent = 'Activo';
      button.style.backgroundColor = '#28a745';
    } else {
      this.utilService.updateUser(userid, {estado: 'Inactivo'}).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
      button.classList.add('inactive');
      button.textContent = 'Inactivo';
      button.style.backgroundColor = '#dc3545';
    }
  }

  goBack(): void {
    window.history.back();
  }

  openModal(name: string, id: string, email: string, photo: string, rol: string): void {
    document.getElementById('modalName').textContent = name;
    document.getElementById('modalId').textContent = id;
    document.getElementById('modalEmail').textContent = email;
    document.getElementById('Administrador').textContent = rol;
    (document.getElementById('modalImage') as HTMLImageElement).src = photo;
    document.getElementById('userModal').style.display = 'block';
  }

  closeModal(): void {
    document.getElementById('userModal').style.display = 'none';
  }

  handleWindowClick(event: Event): void {
    const modal = document.getElementById('userModal');
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  }

  ngOnInit(): void {
    window.onclick = this.handleWindowClick.bind(this);
    
    this.getUsers();
  }

  getUsers = () => {
    this.utilService.getUsers().subscribe(
      (response) => {
        console.log(response)
        this.users = response
      },
      (error) => {
        console.log(error)
      }
    )
  }
}
