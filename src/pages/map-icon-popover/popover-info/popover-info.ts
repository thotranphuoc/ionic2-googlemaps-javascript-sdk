import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-popover-info',
  templateUrl: 'popover-info.html'
})
export class PopoverInfoPage {
  data: any
  constructor(
              public navCtrl: NavController, 
              public navParams: NavParams,
              private viewCtrl: ViewController) {
                this.data = this.navParams.data;
              }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverInfoPage');
    console.log(this.data);
  }

  closePopover(){
    this.viewCtrl.dismiss();
  }

  goToDetail(){
    console.log('go to detailed page');
  }

}
