import { Component,OnInit } from '@angular/core';
import { gql,Apollo } from 'apollo-angular'
import { ActivatedRoute,Router } from '@angular/router'
import { Booking } from '../../models/booking'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  isError: boolean = false
  isLoading: boolean = false
  errorMessage: string = ""
  response: Booking[] = []
  private GET_BOOKING = gql`
    {
      getAllBooking{
        listing_id
        booking_id
        booking_date
        booking_start
        booking_end
        username
      }
    }
  `;
  constructor(activateRoute: ActivatedRoute,private router: Router, private apolloClient: Apollo) { }

  ngOnInit(): void {
    const user:any = localStorage.getItem("user")
    const userJson = JSON.parse(user);
    if (userJson.type == "customer") {
      this.getData()
    } else {
      this.router.navigate(['']).then(() => {
        window.location.reload();
      });
    }
  }

  onLogout() {
    localStorage.clear();
    this.router.navigate(['']).then(() => {
      window.location.reload();
    });
  }

  getData() {
    this.isLoading = true
    this.isError = false
    this.errorMessage = ""
    this.apolloClient.watchQuery<any>({
      query: this.GET_BOOKING
    }).valueChanges.subscribe(({ data, errors }) => {
      this.isLoading = false
      if (errors) {
        this.isError = true
        this.errorMessage = errors[0].message
        return
      }
      this.isError = false
      this.errorMessage = ""
      this.response = data?.getAllBooking
      console.log(this.response)
    })
  }

  addBooking() {
    this.router.navigate(['listing']).then(() => {
      window.location.reload();
    });
  }

}
