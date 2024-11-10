import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configurations',
  standalone: true,
  imports: [],
  templateUrl: './configurations.component.html',
  styleUrl: './configurations.component.css'
})
export class ConfigurationsComponent implements OnInit {


  assignRole(user: string, role: string): void {
    alert(`${user} ahora tiene el rol de ${role}.`);
  }

  toggleStatus(button): void {
    if (button.classList.contains('inactive')) {
      button.classList.remove('inactive');
      button.textContent = 'Activo';
      button.style.backgroundColor = '#28a745';
    } else {
      button.classList.add('inactive');
      button.textContent = 'Inactivo';
      button.style.backgroundColor = '#dc3545';
    }
  }

  goBack(): void {
    window.history.back();
  }

  openModal(name: string, id: string, email: string, photo: string): void {
    document.getElementById('modalName').textContent = name;
    document.getElementById('modalId').textContent = id;
    document.getElementById('modalEmail').textContent = email;
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
  }
}
