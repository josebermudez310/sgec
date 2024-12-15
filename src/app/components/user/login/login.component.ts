import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { timer } from 'rxjs';
import { AuthServiceService } from '../../../services/auth/auth-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup
  constructor(
    private router: Router,
    private authService: AuthServiceService,
    private fb : FormBuilder,
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  login(): void {

    this.router.navigate(['/dashboard'], { replaceUrl: true });
  }

  buildForm(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
  });
  }

  submit(): void {
    console.log(this.loginForm);
    if (this.loginForm.invalid){
      return Object.values(this.loginForm.controls).forEach(control=>{
        control.markAsTouched();
      })
    }

    this.authService.login(this.loginForm.value).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/dashboard'], { replaceUrl: true });
      },
      (error) => {
        console.log(error);
      }
    )
  }
}
