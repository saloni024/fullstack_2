import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { gql,Apollo } from 'apollo-angular'
import { Booking } from '../../models/booking';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {
  form: object = {
    listing_id: '',
    booking_id: '',
    booking_date: '',
    booking_start: '',
    booking_end: ''
  }
  isError: boolean = false
  isSuccess: boolean = false
  errorMessage: string = ""
  response: Booking | undefined
  private BOOKING = gql`
    mutation booking(
        $listing_id: String!,
        $booking_id: String!,
        $booking_date: String!,
        $booking_start: String!,
        $booking_end: String!
      ){
      createBooking(booking: {
        listing_id: $listing_id
        booking_id: $booking_id
        booking_date: $booking_date
        booking_start: $booking_start
        booking_end: $booking_end
      }){
        listing_id
        booking_id
        booking_date
        booking_start
        booking_end
        username
      }
    }
  `;

  constructor(private activateRouter: ActivatedRoute, private router: Router, private apolloClient: Apollo) { }

  ngOnInit(): void {
    const user:any = localStorage.getItem("user")
    const userJson = JSON.parse(user);
    if (userJson.type == "customer") {
      this.form = {
        ...this.form,
        listing_id: this.activateRouter.snapshot.paramMap.get("listing_id")
      }
    } else {
      this.router.navigate(['']).then(() => {
        window.location.reload();
      });
    }
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
    this.isSuccess = false
    this.apolloClient.mutate<any>({
      mutation: this.BOOKING,
      variables: this.form
    }).subscribe(({data}) => {
      this.response = data?.createBooking
      this.isSuccess = true
    },(error) => {
      this.isError = true
      this.errorMessage = error.message
    })
  }

}
