import { Component, OnInit } from '@angular/core';import { gql,Apollo } from 'apollo-angular'
import { ActivatedRoute,Router } from '@angular/router'
import { Listing } from '../../models/listing'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  isError: boolean = false
  isLoading: boolean = false
  errorMessage: string = ""
  createListing: boolean = false
  bookingListing: boolean = false
  response: Listing[] = []
  search: object = {
    name: '',
    city: '',
    postal_code: ''
  }
  private GET_LISTING = gql`
    {
      getAllListing{
        listing_id
        listing_title
        description
        street
        city
        postal_code
        price
        email
        username
      }
    }
  `;
  private SEARCH_LISTING = gql`
    query search($name: String!, $city: String!, $postal_code: String!){
      searchListing(
        name: $name
        city: $city
        postal_code: $postal_code
      ){
        listing_id
        listing_title
        description
        street
        city
        postal_code
        price
        email
        username
      }
    }
  `;
  constructor(activateRoute: ActivatedRoute,private router: Router, private apolloClient: Apollo) { }

  ngOnInit(): void {
    this.getData()
    const user:any = localStorage.getItem("user")
    const userJson = JSON.parse(user);
    if (userJson.type == "customer") {
      this.bookingListing = true
      this.createListing = false
    } else {
      this.bookingListing = false
      this.createListing = true
    }
  }

  async getData() {
    this.isLoading = true
    this.isError = false
    this.errorMessage = ""
    this.apolloClient.watchQuery<any>({
      query: this.GET_LISTING
    }).valueChanges.subscribe(({ data, errors }) => {
      this.isLoading = false
      if (errors) {
        this.isError = true
        this.errorMessage = errors[0].message
        return
      }
      this.isError = false
      this.errorMessage = ""
      this.response = data?.getAllListing
    })
  }
  changeSearch(field: string,e: any) {
    this.search = {
      ...this.search,
      [field]: e.target.value
    }
  }
  onSearch(e: any) {
    this.isError = false
    e.preventDefault();
    this.apolloClient.watchQuery<any>({
      query: this.SEARCH_LISTING,
      variables: this.search
    }).valueChanges.subscribe(({ data,errors }) => {
      if (errors) {
        this.isError = true
        this.errorMessage = errors[0].message
        return
      }
      this.response = data?.searchListing
    })
  }
  onLogout() {
    localStorage.clear();
    this.router.navigate(['login']).then(() => {
      window.location.reload();
    });
  }
  addListing() {
    this.router.navigate(['new-listing'])
  }
  addBooking(listing_id: string) {
    this.router.navigate(['new-booking', listing_id])
  }
}
