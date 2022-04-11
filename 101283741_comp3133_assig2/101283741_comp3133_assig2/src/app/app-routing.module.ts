import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate, Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ListComponent as BookingListComponent } from './booking/list/list.component';
import { NewComponent as BookingNewComponent } from './booking/new/new.component';
import { ListComponent as ListingListComponent} from './listing/list/list.component';
import { NewComponent as ListingNewComponent } from './listing/new/new.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "listing",
    component: ListingListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "new-listing",
    component: ListingNewComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "booking",
    component: BookingListComponent,
    canActivate: [AuthGuard]
  },{
    path: "new-booking/:listing_id",
    component: BookingNewComponent,
    canActivate: [AuthGuard]
  },{ path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
