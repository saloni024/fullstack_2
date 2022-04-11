import { Apollo, gql } from 'apollo-angular';
import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  bookings?: any[];
  session = localStorage.getItem('session');
  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    if (!this.session) {
      return;
    }
  }
  getBookings(uname?: NgForm):void{
    let username;
    if (!uname) {
      username = '';
    } else {
      username = uname.form.controls['query'].value;
    }

    
    this.apollo
    .watchQuery({
      query: gql`
        {
          query getBookings($username: String!) {
          getBookings(username: $username) {
            listing_id
            booking_id
            booking_date
            booking_start
            booking_end
            username
          }
        }
            
        }
      `,
      variables: { uname: uname },
    })
    .valueChanges.subscribe((result: any) => {
      this.bookings = result?.data?.getBookings;
    });

}
}
  
    
