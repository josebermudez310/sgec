import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  public user: any;
  constructor(
    private utilsService: UtilsService,
  ) { }

  ngOnInit(): void {
    // Initialize modal elements
    const modalCambiarContraseña = document.getElementById("modal-cambiar-contraseña");

    // Mostrar el modal de cambiar contraseña
    document.querySelector(".btn-cambiar-contraseña").addEventListener('click', () => {
      modalCambiarContraseña.style.display = "flex";
    });

    this.utilsService.me().subscribe(
      (response) => {
        console.log(response);
        this.user = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  mostrarImagen(event): void {
    const modal = document.getElementById('modal');
    const imagenAmpliada = document.getElementById('imagen-ampliada') as HTMLImageElement;
    imagenAmpliada.src = event.src;
    modal.style.display = "flex";
  }

  cerrarModal(): void {
    const modal = document.getElementById('modal');
    modal.style.display = "none";
  }

  closePasswordModal(): void {
    const modalCambiarContraseña = document.getElementById("modal-cambiar-contraseña");
    modalCambiarContraseña.style.display = "none";
  }

  saveNewPassword(): void {
    alert("Nueva contraseña guardada");
    this.closePasswordModal();
  }

}
