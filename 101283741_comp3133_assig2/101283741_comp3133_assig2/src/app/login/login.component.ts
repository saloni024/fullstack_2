import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import jwtDecode from 'jwt-decode';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username?: NgModel;
  password?: NgModel;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {}


    login(): void {
      console.log(this.username);
      this.apollo
        .mutate({
          mutation: gql`
            mutation login($username: String!, $password: String!) {
              login(username: $username, password: $password)
            }
          `,
          variables: {
            username: this.username,
            password: this.password,
          },
        })
        .subscribe((data: any) => {
          let response = data?.data?.login;
          if (
            response === 'password is incorrect' ||
            response === 'user not found'
          ) {
            console.log(response);
            window.alert(response);
          } else {
            console.log(response);
            let token: any = jwtDecode(response);
            
            localStorage.setItem('username', token.username);
            localStorage.setItem('user_type', token.type);
            localStorage.setItem('email', token.email);
            localStorage.setItem('session', response);
            window.location.reload();
          }
        });
}
}
