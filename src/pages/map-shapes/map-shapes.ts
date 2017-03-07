import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the MapShapes page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-map-shapes',
  templateUrl: 'map-shapes.html'
})
export class MapShapesPage {
  @ViewChild('mapshapes') mapElement;
  map: any;
  currentPosition: iPosition = {
    lat: 0,
    lng: 0
  }
  currentLatLng: google.maps.LatLng;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapShapesPage');
    this.initMap();
  }

  initMap(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((pos)=>{
        this.currentLatLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        this.currentPosition.lat = pos.coords.latitude;
        this.currentPosition.lng = pos.coords.longitude;
        let mapOptions = {
          center: this.currentPosition,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions)

      })
    }
    
  }

  getCurrentPosition(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((pos)=>{
        this.currentPosition = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        this.currentLatLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      })
    }

    console.log('position', this.currentPosition);
    console.log('LatLng', this.currentLatLng);
  }

  ondrawCircle(distance){
    this.getCurrentPosition();
    let radius = parseInt(distance);
    console.log(radius);
    this.drawCircle(this.map,this.currentLatLng, radius)

  }

  drawCircle(map: any, position: google.maps.LatLng, radius: number){
    let circle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.2,
      strokeWeight:1,
      fillColor: '#FF0000',
      fillOpacity: 0.1,
      map: map,
      center: position,
      radius: radius
    })

    circle.addListener('click',()=>{
      console.log('click....')
      circle.setMap(null);
    })
  }



}

interface iPosition {
  lat: number,
  lng: number
}
