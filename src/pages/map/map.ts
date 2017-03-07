import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// declare var google;
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  @ViewChild('map') mapElement;
  map: any;
  locations = [
    { lat: -31.563910, lng: 147.154312 },
    { lat: -33.718234, lng: 150.363181 },
    { lat: -33.727111, lng: 150.371124 },
    { lat: -33.848588, lng: 151.209834 },
    { lat: -33.851702, lng: 151.216968 },
    { lat: -34.671264, lng: 150.863657 },
    { lat: -35.304724, lng: 148.662905 },
    { lat: -36.817685, lng: 175.699196 },
    { lat: -36.828611, lng: 175.790222 },
    { lat: -37.750000, lng: 145.116667 },
    { lat: -37.759859, lng: 145.128708 },
    { lat: -37.765015, lng: 145.133858 },
    { lat: -37.770104, lng: 145.143299 },
    { lat: -37.773700, lng: 145.145187 },
    { lat: -37.774785, lng: 145.137978 },
    { lat: -37.819616, lng: 144.968119 },
    { lat: -38.330766, lng: 144.695692 },
    { lat: -39.927193, lng: 175.053218 },
    { lat: -41.330162, lng: 174.865694 },
    { lat: -42.734358, lng: 147.439506 },
    { lat: -42.734358, lng: 147.501315 },
    { lat: -42.735258, lng: 147.438000 },
    { lat: -43.999792, lng: 170.463352 }
  ];
  labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.initMap();
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit');
    // this.initMap();
  }

  initMap() {
    let latLng = new google.maps.LatLng(-34.99434, 138.5434);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    console.log(latLng);

    // add a single marker
    this.addMarkerToMap(latLng);

    // add a list of markers
    this.locations.forEach((location, i) => {
      console.log(location, i);
      let label = this.labels[i % this.labels.length];
      this.addMarkerWithLabelToMapFromLatLng(location.lat, location.lng, label);
    })

    // add 

    

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        let position = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        }
        this.map.setCenter(position);

        // add marker
        this.addMarkerToMap(position);

        let infoWindow = new google.maps.InfoWindow({
          content: 'You are here',
          position: position
        }).open(this.map);

        console.log('Your current position: ', position);

      }, (err) => {
          console.log(err)
      })
    }else{
      // browser doesnot support Geolocation
      console.log('your browser not support Geolocation');
    }


  }

  addMarkerToMap(latLng: any) {
    let marker = new google.maps.Marker({
      position: latLng,
      map: this.map
    })

    marker.addListener('click', ()=>{
      console.log('marker clicked')
      let content = 'Lat: '+latLng.lat + ', Lng: '+latLng.lng;
      this.showInfoWindow(content, latLng, this.map, marker);
    })
  }

  addMarkerToMapFromLatLng(lat: number, lng: number) {
    let position = new google.maps.LatLng(lat, lng);
    new google.maps.Marker({
      position: position,
      map: this.map,
    })
  }

  addMarkerWithLabelToMapFromLatLng(lat: number, lng: number, label: string) {
    let position = new google.maps.LatLng(lat, lng);
    new google.maps.Marker({
      position: position,
      map: this.map,
      label: label
    })
  }

  handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
  }

  showInfoWindow(content: any, position: any, map: any, obj: any){
    let infoWindow = new google.maps.InfoWindow({
      content: content,
      position: position
    });
    infoWindow.open(map,obj);
  }

}
