import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { HolidaysComponent } from './dashboard/holidays/holidays.component';
import { EmployeesComponent } from './dashboard/employees/employees.component';
import { CreateAttendenceComponent } from './dashboard/create-attendence/create-attendence.component';
import { AttendenceComponent } from './dashboard/attendence/attendence.component';


const routes: Routes = [
  // { redirectTo: '', path: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent },

  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      { path: 'holidays', component: HolidaysComponent },
      { path: 'employees', component: EmployeesComponent },
      { path: 'create-attendence', component: CreateAttendenceComponent },
      { path: 'attendence', component: AttendenceComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
