import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup | any;
  Api: any;
  registerUser: any = {};



  constructor(private formBuilder: FormBuilder, private _route: Router,private http: HttpClient) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  get formControls() {
    return this.registrationForm.controls;
  }

  onSubmit() {
    if (this.registrationForm.invalid) {
      return;
    }

    const registrationData = {
      first_name: this.registrationForm.value.first_name,
      last_name: this.registrationForm.value.last_name,
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password,
      confirmPassword: this.registrationForm.value.confirmPassword
    };
    
    console.log(registrationData);

    this.http.post('http://localhost:3000/auth/signup', registrationData).subscribe(
      (response) => {
        console.log('Registration successful:', response);
        this.registrationForm.reset();
        this._route.navigate(['login'])
      },
      (error) => {
        console.error('Registration failed:', error);
      }
    );
  }
}


