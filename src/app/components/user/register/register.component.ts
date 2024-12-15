import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthServiceService } from '../../../services/auth/auth-service.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  
  public registerForm: FormGroup

  constructor(
    private router: Router,
    private authService: AuthServiceService,
    private fb : FormBuilder,
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.registerForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      cedula: new FormControl('', [Validators.required]),
  });
  }

  register(): void {
    this.router.navigate(['/dashboard'], { replaceUrl: true });
  }

  submit = () => {
    console.log(this.registerForm);
    if (this.registerForm.invalid){
      return Object.values(this.registerForm.controls).forEach(control=>{
        control.markAsTouched();
      })
    }

    const body = { ...this.registerForm.value, rol: 'Visitante', estado: 'Activo' }

    this.authService.register(body).subscribe(
      (response) => {

        console.log(response);
        this.setToken({ email: body.email, password: body.password });
      },
      (error) => {
        console.log(error);
      }
    )
  }

  setToken = (data) => {
    this.authService.login(data).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/dashboard'], { replaceUrl: true });
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
