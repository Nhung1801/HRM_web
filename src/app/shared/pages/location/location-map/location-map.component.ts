import { Component, AfterViewInit } from '@angular/core';
// import * as L from 'leaflet';
@Component({
  selector: 'app-location-map',
  templateUrl: './location-map.component.html',
  styleUrl: './location-map.component.scss'
})
export class LocationMapComponent {
  private map: any;
  public latitude: number | null = null;
  public longitude: number | null = null;
  // ngAfterViewInit(): void {
  //   // Tạo bản đồ
  //   this.map = L.map('map').setView([21.02495781422888, 105.85765605273095], 13);

  //   // Thêm tile layer từ OpenStreetMap
  //   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //     maxZoom: 19,
  //     attribution: '© OpenStreetMap'
  //   }).addTo(this.map);

  //   // Thêm sự kiện click để lấy tọa độ
  //   this.map.on('click', (e: any) => {
  //     this.latitude = e.latlng.lat;
  //     this.longitude = e.latlng.lng;

  //     // Thêm một marker tại vị trí vừa click
  //     L.marker([this.latitude, this.longitude]).addTo(this.map);
  //   });
  // }
}
