import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { gql,Apollo } from 'apollo-angular'
import { User } from '../models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form: object = {
    username: '',
    firstname: '',
    lastname: '',
    password: '',
    email: '',
    type: ''
  }
  isError: boolean = false
  isSuccess: boolean = false
  errorMessage: string = ""
  response: User | undefined

  private REGISTER = gql`
    mutation register(
        $username: String!
        $firstname: String!
        $lastname: String!
        $password: String!
        $email: String!
        $type: String!
      ){
      createUser(user: {
        username: $username
        password: $password
        firstname: $firstname
        lastname: $lastname
        email: $email
        type: $type
      }){
        id
        username
        firstname
        lastname
        password
        email
      }
    }
  `;
  constructor(route: ActivatedRoute, private apolloClient: Apollo) { }

  ngOnInit(): void {
  }
  changeInput(field: string,e: any) {

    this.form = {
      ...this.form,
      [field]: field==="type"?e.value: e.target.value
    }
  }
  onSubmit(e: any) {
    e.preventDefault();
    this.isError = false
    this.isSuccess = false
    this.apolloClient.mutate<any>({
      mutation: this.REGISTER,
      variables: this.form
    }).subscribe(({data}) => {
      this.response = data?.createUser
      this.isSuccess = true
    },(error) => {
      this.isError = true
      this.errorMessage = error.message
    })
  }

}
