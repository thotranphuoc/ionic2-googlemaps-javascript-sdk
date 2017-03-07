import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';

import { PopoverInfoPage } from './popover-info/popover-info';

/*
  Generated class for the MapIconPopover page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-map-icon-popover',
  templateUrl: 'map-icon-popover.html'
})
export class MapIconPopoverPage {
  @ViewChild('map') mapElement;
  map: any;
  constructor(
              public navCtrl: NavController, 
              public navParams: NavParams,
              private popOverCtrl: PopoverController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapIconPopoverPage');
    this.initMap();
  }

  initMap(){
    let latLng = new google.maps.LatLng(-34.99434, 138.5434);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    // display map
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        let position = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        }
        this.map.setCenter(position);
        // add marker
        this.addMarkerToMap(position);
        console.log('Your current position: ', position);
      }, (err) => {
        console.log(err)
      })
    } else {
      // browser doesnot support Geolocation
      console.log('your browser not support Geolocation');
    }
  }

    addMarkerToMap(latLng: any) {
      let marker = new google.maps.Marker({
        position: latLng,
        label: '<h4>Highlands coffee</h4>',
        map: this.map,
      })
      marker.addListener('click', () => {
        console.log('show popover here')
        let infoObject = {
          position: latLng,
          imgUrl: 'http://tanthoidai.com.vn/images/gallery/images/D%E1%BB%B1%20%C3%A1n%20Vinhomes%20Riverside/biet-thu-Vinhomes-Riverside-ngoai-tha.jpg',
          price: '1 tỷ 500',
          dtSan: '100m2 sàn',
          dtSd: '300m2 sử dụng'
        }
        let popover = this.popOverCtrl.create(PopoverInfoPage, infoObject);
        popover.present();
      })
    }
  

}
