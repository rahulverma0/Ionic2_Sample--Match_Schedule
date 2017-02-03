import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { EliteApiService } from '../../app/shared/shared';
declare var window: any;

/*
  Generated class for the Map page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
 map: any;
  constructor(public navParams: NavParams,
              public eliteApi:EliteApiService) {}

 
  ionViewWillLoad(){
    let games = this.navParams.data;
    let tourneyData = this.eliteApi.getCurrentTourney();
    let location = tourneyData.locations[games.locationId];
    console.log("location: "+location);
    console.log(location.latitude +"  :  "+location.longitude);
    this.map = {
      lat: location.latitude,
      lngt: location.longitude,
      zoom: 12,
      markerLabel: games.location 
    };
    console.log("Map: "+this.map.lat+" : "+this.map.lngt);

  }

  getDirections() { 
    window.location = `geo:${this.map.lat},${this.map.lngt};u=35`; 
  }

}
