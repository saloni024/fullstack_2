import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//all the components
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ListComponent as BookingListComponent } from './booking/list/list.component';
import { NewComponent as BookingNewComponent } from './booking/new/new.component';
import { ListComponent as ListingListComponent } from './listing/list/list.component';
import { NewComponent as ListingNewComponent } from './listing/new/new.component';

import { HttpClientModule } from '@angular/common/http'
import { ApolloModule,APOLLO_OPTIONS } from 'apollo-angular'
import { HttpLink } from 'apollo-angular/http'
import { InMemoryCache } from '@apollo/client/core'
import { HttpHeaders } from '@angular/common/http';

//css modules
import { MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'
import { MatSelectModule } from '@angular/material/select'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { GraphQLModule } from './graphql.module'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    BookingListComponent,
    BookingNewComponent,
    ListingListComponent,
    ListingNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    ReactiveFormsModule,
    HttpClientModule,
    ApolloModule,
    GraphQLModule
  ],
  providers: [{
    provide: APOLLO_OPTIONS,
    useFactory: (httpLink: HttpLink) => {
      const getToken = () => {
        const token = localStorage.getItem('token');
        if (!token) {
          return ""
        }
        return JSON.parse(token);
      }
      return {
        cache: new InMemoryCache(),
        link: httpLink.create({
          uri: "http://localhost:8000/graphql",
          headers: new HttpHeaders({
            "Authorization": `${getToken()}`
          })
        }),
        defaultOptions: {
          watchQuery: {
            errorPolicy: 'all'
          }
        },
      }
    },
    deps: [HttpLink]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
