import { Component } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import { TournamentsPage,TeamHomePage } from '../pages';
import { EliteApiService,UserSettings } from '../../app/shared/shared';

/*
  Generated class for the MyTeams page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.html'
})
export class MyTeamsPage {
favourites = [];
  constructor(public navCtrl: NavController,
              public loadingController:LoadingController,
              public eliteApi: EliteApiService,
              public userSettings:UserSettings) {}
  goToTournaments(){
    console.log('goToTournaments function');
    this.navCtrl.push(TournamentsPage);
  }

  ionViewDidLoad() {
    console.log('Hello MyTeamsPage Page');
  }
  favoriteTapped($event, favorite){
        let loader = this.loadingController.create({
            content: 'Getting data...',
            dismissOnPageChange: true
        });
        loader.present();
        this.eliteApi.getTournamentData(favorite.tournamentId,false)
            .subscribe(t => this.navCtrl.push(TeamHomePage, favorite.team));
    }
    ionViewDidEnter(){
      this.favourites = this.userSettings.getAllFavorites();
    }
}
