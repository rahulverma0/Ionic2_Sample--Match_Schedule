import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { MyTeamsPage,TournamentsPage,TeamsPage,TeamDetailPage,StandingsPage,TeamHomePage,GamePage,MapPage } from '../pages/pages';
import { EliteApiService,UserSettings } from './shared/shared';


@NgModule({
  declarations: [
    MyApp,
    MyTeamsPage,
    TournamentsPage,
    TeamsPage,
    TeamDetailPage,
    StandingsPage,
    TeamHomePage,
    GamePage,
    MapPage

  ],
  imports: [
    IonicModule.forRoot(MyApp),
    HttpModule,
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyBbsOlMryAHu2ESwHHSwrDBIUU7fiENNoM'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyTeamsPage,
    TournamentsPage,
    TeamsPage,
    TeamDetailPage,
    StandingsPage,
    TeamHomePage,
    GamePage,
    MapPage
  ],
  providers: [
    EliteApiService,HttpModule,UserSettings
  ]
})
export class AppModule {}
