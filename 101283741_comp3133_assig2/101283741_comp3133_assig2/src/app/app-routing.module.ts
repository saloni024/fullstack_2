import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ListingsComponent } from './listings/listings.component';
import { BookingsComponent } from './bookings/bookings.component';
import { ListingsFormComponent } from './listings-form/listings-form.component';
import { BookingsFormComponent } from './bookings-form/bookings-form.component';

const routes: Routes = [
  { path: '', component: ListingsComponent },
  { path: 'listings', component: ListingsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'add/listing', component: ListingsFormComponent },
  { path: 'add/booking/:id', component: BookingsFormComponent },
  { path: 'bookings', component: BookingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
