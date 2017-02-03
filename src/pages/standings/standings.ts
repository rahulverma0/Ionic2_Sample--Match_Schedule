import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { EliteApiService } from '../../app/shared/shared';
import * as _ from 'lodash';
/*
  Generated class for the Standings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html'
})
export class StandingsPage {
  standings:any[];
  team:any;
  allStandings:any[];
  divisionFilter="divisions";
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public eliteApi: EliteApiService) {}

  ionViewDidLoad() {
    console.log('Hello StandingsPage Page');
    this.team = this.navParams.data;
    let tourneyData = this.eliteApi.getCurrentTourney();
    this.standings = tourneyData.standings;
    /*
    this.allStandings = _.chain(this.standings)
                        .groupBy('division')
                        .toPairs()
                        .map(item =>_.zipObject(['divisionName','divisionStandings'],item))
                        .value();
                        */
    this.allStandings = tourneyData.standings;
    this.filterDivision();
  }
  filterDivision(){
    if(this.divisionFilter==='all'){
      this.standings=this.allStandings;
    }else{
      this.standings=_.filter(this.allStandings,s=>s.division===this.team.division);
    }
  }
  getHeader(record, recordIndex,records){
    if(recordIndex===0 || record.division!== records[recordIndex-1].division){
      return record.division;
    }
  }

}
