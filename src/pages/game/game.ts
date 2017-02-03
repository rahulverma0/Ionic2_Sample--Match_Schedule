import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { EliteApiService } from '../../app/shared/shared';
import { TeamHomePage,MapPage } from '../pages';
declare var window: any;

/*
  Generated class for the Game page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-game',
  templateUrl: 'game.html'
})
export class GamePage {
  game:any;
  
  constructor(public navCtrl: NavController,
              public navParams:NavParams,
              public eliteApiService:EliteApiService) {
                this.game = this.navParams.data;
              }

  ionViewDidLoad() {
    console.log('Hello GamePage Page');        
    console.log(this.game);
    this.game.gameTime = Date.parse(this.game.time);
   
  }
teamTapped(teamId){
    console.log('Hello GamePage Page - TeamTapped');
    let tourneyData = this.eliteApiService.getCurrentTourney();
    let team = tourneyData.teams.find(t => t.id === teamId);
    this.navCtrl.push(TeamHomePage, team);
  }

 

  goToDirections(){
    let tourneyData = this.eliteApiService.getCurrentTourney();
    let location = tourneyData.locations[this.game.locationId];
    window.location = `geo:${location.latitude},${location.longitude};u=35;`;
  }

  goToMap(){
    this.navCtrl.push(MapPage, this.game);
  }

  isWinner(score1, score2){
    return Number(score1) > Number(score2);
  }

}
