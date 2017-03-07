import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// declare var google;
@Component({
  selector: 'page-map-icon',
  templateUrl: 'map-icon.html'
})
export class MapIconPage {
  @ViewChild('map') mapElement;
  map: any;
  currentPosition: any;
  iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
  icons = {
    parking: {
      icon: this.iconBase + 'parking_lot_maps.png'
    },
    library: {
      icon: this.iconBase + 'library_maps.png'
    },
    info: {
      icon: this.iconBase + 'info-i_maps.png'
    }
  };

  features: iConItem[] = [
    {
      position: new google.maps.LatLng(-33.91721, 151.22630),
      type: 'info'
    }, {
      position: new google.maps.LatLng(-33.91539, 151.22820),
      type: 'info'
    }, {
      position: new google.maps.LatLng(-33.91747, 151.22912),
      type: 'info'
    }, {
      position: new google.maps.LatLng(-33.91910, 151.22907),
      type: 'info'
    }, {
      position: new google.maps.LatLng(-33.91725, 151.23011),
      type: 'info'
    }, {
      position: new google.maps.LatLng(-33.91872, 151.23089),
      type: 'info'
    }, {
      position: new google.maps.LatLng(-33.91784, 151.23094),
      type: 'info'
    }, {
      position: new google.maps.LatLng(-33.91682, 151.23149),
      type: 'info'
    }, {
      position: new google.maps.LatLng(-33.91790, 151.23463),
      type: 'info'
    }, {
      position: new google.maps.LatLng(-33.91666, 151.23468),
      type: 'info'
    }, {
      position: new google.maps.LatLng(-33.916988, 151.233640),
      type: 'info'
    }, {
      position: new google.maps.LatLng(-33.91662347903106, 151.22879464019775),
      type: 'parking'
    }, {
      position: new google.maps.LatLng(-33.916365282092855, 151.22937399734496),
      type: 'parking'
    }, {
      position: new google.maps.LatLng(-33.91665018901448, 151.2282474695587),
      type: 'parking'
    }, {
      position: new google.maps.LatLng(-33.919543720969806, 151.23112279762267),
      type: 'parking'
    }, {
      position: new google.maps.LatLng(-33.91608037421864, 151.23288232673644),
      type: 'parking'
    }, {
      position: new google.maps.LatLng(-33.91851096391805, 151.2344058214569),
      type: 'parking'
    }, {
      position: new google.maps.LatLng(-33.91818154739766, 151.2346203981781),
      type: 'parking'
    }, {
      position: new google.maps.LatLng(-33.91727341958453, 151.23348314155578),
      type: 'library'
    }
  ];

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
    // display map
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.features.forEach(feature=>{
      this.addIconToMap(feature);
    })

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
      map: this.map,
      icon: this.icons.parking.icon
    })
    marker.addListener('click', () => {
      console.log('marker clicked')
      let content = 'Lat: ' + latLng.lat + ', Lng: ' + latLng.lng;
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

  showInfoWindow(content: any, position: any, map: any, obj: any) {
    let infoWindow = new google.maps.InfoWindow({
      content: content,
      position: position
    });
    infoWindow.open(map, obj);
  }

  addIconToMap(iConItem: iConItem){
    let marker = new google.maps.Marker({
      position: iConItem.position,
      icon: this.icons[iConItem.type].icon,
      map: this.map
    })
  }

}

interface iConItem {
  position: google.maps.LatLng,
  type: string
}