import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-listings-form',
  templateUrl: './listings-form.component.html',
  styleUrls: ['./listings-form.component.css']
})
export class ListingsFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
