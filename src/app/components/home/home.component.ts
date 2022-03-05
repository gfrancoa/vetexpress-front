import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  center: google.maps.LatLngLiteral = { lat: 10.32944, lng: -75.41137 };

  constructor() {}

  ngOnInit(): void {}
}
