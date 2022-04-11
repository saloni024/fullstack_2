import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { gql,Apollo } from 'apollo-angular'
import { Login } from '../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: object = {
    username: '',
    password: ''
  }
  isError: boolean = false
  errorMessage: string = ""
  response: Login | undefined
  private LOGIN = gql`
    query login($username: String!, $password: String!){
      authenticateUser(user: {
        username: $username
        password: $password
      }){
        token
        user{
          id
          username
          firstname
          lastname
          type
        }
      }
    }
  `;
  constructor(activateRoute: ActivatedRoute, private router: Router,private apolloClient: Apollo) {
  }

  ngOnInit(): void {
  }

  changeInput(field: string, e: any) {
    this.form = {
      ...this.form,
      [field]: e.target.value
    }
  }
  onSubmit(e: any) {
    e.preventDefault();
    this.isError = false
    this.apolloClient.watchQuery<any>({
      query: this.LOGIN,
      variables: this.form
    }).valueChanges.subscribe(({ data,errors }) => {
      if (errors) {
        this.isError = true
        this.errorMessage = errors[0].message
        return
      }
      console.log(data)
      this.response = data?.authenticateUser
      localStorage.setItem("token", JSON.stringify(this.response?.token));
      localStorage.setItem("user", JSON.stringify(this.response?.user));
      if (this.response?.user?.type == "admin") {
        this.router.navigate(['listing']).then(() => {
          window.location.reload();
        });
      } else if (this.response?.user?.type == "customer") {
        this.router.navigate(['booking']).then(() => {
          window.location.reload();
        });
      } else {
        this.isError = true
        this.errorMessage = "User type not found"
        return
      }
    })
  }

}
