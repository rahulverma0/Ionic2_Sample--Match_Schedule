import { Component } from '@angular/core';
import { AlertController,NavController,NavParams,ToastController } from 'ionic-angular';
import * as _ from 'lodash';
import { GamePage } from '../pages';
import { EliteApiService,UserSettings } from '../../app/shared/shared';
import * as moment from 'moment';
/*
  Generated class for the TeamDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html'
})
export class TeamDetailPage {
  allGames:any[];
  games:any[];
  team:any;
  teamStanding:any;
  tourneyData:any;
  dateFilter:string;
  useDateFilter=false;
  isFollowing=false;
  constructor(public navCtrl: NavController, 
              public navParams:NavParams,
              public eliteApiService:EliteApiService,
              public alertController: AlertController,
              public toastController: ToastController,
              public userSettings: UserSettings) {
   
    console.log("**Nav Params: "+this.navParams);
  }
  ionViewDidLoad(){
    console.log("ionViewWillEnter method start");
     
     this.tourneyData = this.eliteApiService.getCurrentTourney();
     this.team=this.navParams.data;      
    this.games = _.chain(this.tourneyData.games)
                  .filter(g => g.team1Id === this.team.id || g.team2Id === this.team.id)
                  .map(g => {
                      let isTeam1 = (g.team1Id === this.team.id);
                      let opponentName = isTeam1 ? g.team2 : g.team1;
                      let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
                      return {
                          gameId: g.id,
                          opponent: opponentName,
                          time: Date.parse(g.time),
                          location: g.location,
                          locationUrl: g.locationUrl,
                          scoreDisplay: scoreDisplay,
                          homeAway: (isTeam1 ? "vs." : "at")
                      };
                  })
                  .value();
    this.allGames = this.games;
    this.teamStanding = _.find(this.tourneyData.standings, { 'teamId': this.team.id });
    this.userSettings.isFavoriteTeam(this.team.id).then(value=>this.isFollowing=value);
    console.log('Hello TeamDetailPage Page');
  }
  getScoreDisplay(isTeam1, team1Score, team2Score) {
        if (team1Score && team2Score) {
            var teamScore = (isTeam1 ? team1Score : team2Score);
            var opponentScore = (isTeam1 ? team2Score : team1Score);
            var winIndicator = teamScore > opponentScore ? "W: " : "L: ";
            return winIndicator + teamScore + "-" + opponentScore;
        }
        else {
            return "";
        }
    }

    gameClicked($event, game){
    let sourceGame = this.tourneyData.games.find(g => g.id === game.gameId);
    this.navCtrl.parent.parent.push(GamePage, sourceGame);
  }
  dateChanged(){
    if(this.useDateFilter){
      this.games = _.filter(this.allGames, g => moment(g.time).isSame(this.dateFilter, 'day'));
    }else{
      this.games = this.allGames;
    }     
  }
  getScoreWorL(game){
    return game.scoreDisplay ? game.scoreDisplay[0] : '';
  } 
   getScoreDisplayBadgeClass(game){
    return game.scoreDisplay.indexOf('W:') === 0 ? 'badge-primary' : 'badge-danger';
  }
  toggleFollow(){
    console.log("Indide toggleFollow method");
    if(this.isFollowing){
      let confirm = this.alertController.create({
        title:"Unfollow?",
        message:"Are you sure?",
        buttons:[{
          text:"Yes",
          handler:()=>{
            this.isFollowing=false;
            let toast = this.toastController.create({
              message:"You have unfollowed this team.",
              duration:2000,
              position:'bottom'
            });
            toast.present();
            this.userSettings.unFavoriteTeam(this.team);
          }
        },
        {
          text:"No"
        }]
      });
      confirm.present();
    }else{
      this.isFollowing=true;
      this.userSettings.favoriteTeam(this.team,
                                     this.tourneyData.tournament.id,
                                     this.tourneyData.tournament.name);
    }
  }

  refreshAll(refresher){
    console.log("Inside the start of refresher");
    this.eliteApiService.refreshCurrentTournament().subscribe(()=>{
      refresher.complete();
      this.ionViewDidLoad();
    });
  }

}
