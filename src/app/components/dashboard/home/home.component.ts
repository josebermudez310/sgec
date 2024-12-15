import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UtilsService } from '../../../services/utils.service';
import { AuthServiceService } from '../../../services/auth/auth-service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(
    private utilService: UtilsService,
    private authService: AuthServiceService
  ) {}

  public salas = []

  ngOnInit(): void {
    this.getSalas()
  }

  getSalas = () => {
    this.utilService.getSalas().subscribe(
      (response) => {
        console.log(response)
        this.salas = response
      },
      (error) => {
        console.log(error)
      }
    )
  }

}
