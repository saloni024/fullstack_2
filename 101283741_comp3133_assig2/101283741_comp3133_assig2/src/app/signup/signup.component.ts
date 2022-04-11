import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { subscribe } from 'graphql';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  username?: NgModel;
  firstname?: NgModel;
  lastname?: NgModel;
  email?: NgModel;
  password?: NgModel;
  type?: NgModel;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {}

  register(): void {
    
    this.apollo
      .mutate({
        mutation: gql`
          mutation addUser(
            $username: String!
            $firstname: String!
            $lastname: String!
            $password: String!
            $email: String!
            $type: String!
          ) {
            addUser(
              username: $username
              firstname: $firstname
              lastname: $lastname
              password: $password
              email: $email
              type: $type
            ) {
              username
              firstname
              lastname
              password
              email
              type
            }
          }
        `,
        variables: {
          username: this.username,
          firstname: this.firstname,
          lastname: this.lastname,
          password: this.password,
          email: this.email,
          type: this.type,
        },
      })
      .subscribe();
      window.location.reload();
  }
}
