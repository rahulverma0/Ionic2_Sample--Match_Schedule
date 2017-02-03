import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,LoadingController,Events } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { HttpModule } from '@angular/http';
import { MyTeamsPage,TournamentsPage,TeamHomePage} from '../pages/pages.ts';
import { UserSettings,EliteApiService } from './shared/shared';



@Component({
  templateUrl: 'app.html',
  providers:[  ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  favoriteTeams:any[];
  rootPage: any = MyTeamsPage;

  //pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
              public userSettings: UserSettings,
              public loadingController:LoadingController,
              public eliteApi: EliteApiService,
              public events:Events) {
    this.initializeApp();

   

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.refreshFavorites();
      this.events.subscribe("favorites:changed",()=>this.refreshFavorites());
    });
  }

 goHome(){
   this.nav.push(MyTeamsPage);
 }
 goToTournaments(){
   console.log('goToTournaments function from left menu');
   this.nav.push(TournamentsPage);
 }
 refreshFavorites(){
   console.log("Refresh called");
   this.favoriteTeams = this.userSettings.getAllFavorites();
 }
 goToTeam(favorite){
   let loader = this.loadingController.create({
     content:"getting data",
     dismissOnPageChange:true
   });
   loader.present();
   console.log("Team details: "+ favorite.team);
   this.eliteApi.getTournamentData(favorite.tournamentId,false).subscribe(l=>this.nav.push(TeamHomePage,favorite.team));

    loader.present();
 }
}
