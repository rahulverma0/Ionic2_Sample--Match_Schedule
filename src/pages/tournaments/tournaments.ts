import { Component } from '@angular/core';
import {LoadingController, NavController } from 'ionic-angular';
import { TeamsPage } from '../pages';
import { EliteApiService } from '../../app/shared/shared';
/*
  Generated class for the Tournaments page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html'
})
export class TournamentsPage {
  tournaments:any;
  
  constructor(public navCtrl: NavController,
              public eliteApiService:EliteApiService,
              public loadingController:LoadingController) {

  }

  ionViewDidLoad() {
    console.log('Hello TournamentsPage Page => ionViewDidLoad');
    let loader = this.loadingController.create({
      content:'Getting Tournaments...',
      spinner:'dots'
    })
    loader.present().then(()=>{
      this.eliteApiService.getTournaments().then(data=>{
          console.log('Hello TournamentsPage Page => INSIDE RESPONSE');
          this.tournaments=data;
          loader.dismiss();
        });
    });
    
  }
  ionViewWillEnter(){
    console.log('Hello TournamentsPage Page => ionViewWillEnter');
  }
  ionViewWillLeave(){
    console.log('Hello TournamentsPage Page => ionViewWillLeave');
  }
  ionViewDidUnload(){
      console.log('Hello TournamentsPage Page => ionViewDidUnload');
  }
  itemTapped($event,tournament){
    this.navCtrl.push(TeamsPage,tournament);
  }
  
}
