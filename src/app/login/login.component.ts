import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private _route: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  // get f() {
  //   return this.loginForm.controls;
  // }

  onSubmit() {
    // if (this.loginForm.invalid) {
    //   return;
    // }

    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;

    const payload = {
      email: email,
      password: password
    }
    console.log(payload);

    this.http.post('http://localhost:3000/auth/signin', payload)
      .subscribe(
        (res) => {
          const user = ((a: any) => {          //res.find  
            return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
          });

          if (user) {
            console.log('Login successful:', res);
            this.loginForm.reset();
            this._route.navigate(['dashboard']);
          } else {
            console.log('User Not Found');
            this._route.navigate(['login'])
          }
        },
        (error) => {
          console.log('Login failed:', error);
        }
      )

  }
}
