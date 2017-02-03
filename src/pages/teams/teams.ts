import { Component } from '@angular/core';
import { NavController,NavParams,LoadingController } from 'ionic-angular';
import { TeamHomePage } from '../pages';
import { EliteApiService } from '../../app/shared/shared';
import * as _ from 'lodash';
/*
  Generated class for the Teams page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html'
})
export class TeamsPage {
  private allTeams: any;
  private allTeamdivisions:any;
  teams=[];
  queryText:string="";
  constructor(public navCtrl: NavController,
              public navParams:NavParams,
              public eliteApiService: EliteApiService,
              public loadingController: LoadingController) {}

  ionViewDidLoad() {    
    console.log('Hello TeamsPage Page');
    let selectedTournament = this.navParams.data;

    let loader = this.loadingController.create({
      content:'Getting data...'
    });
    loader.present().then(()=>{    
      this.eliteApiService.getTournamentData(selectedTournament.id,false).subscribe(data=>
      {
        this.allTeams = data.teams;
        this.allTeamdivisions=
        _.chain(data.teams)
        .groupBy('division')
        .toPairs()
        .map(item=>_.zipObject(['divisionName','divisionTeams'],item))
        .value();
        this.teams = this.allTeamdivisions;
        console.log('division teams: ', this.teams);
        loader.dismiss();
      });
    });
  }
  itemTapped($event,team){
    console.log('itemTapped method in Teams.ts');
    this.navCtrl.push(TeamHomePage,team);
  }
  updateTeams(){
    console.log("Inside updateTeams method");
    let queryTextLower = this.queryText.toLowerCase();
    let filteredTeams = [];
    _.forEach(this.allTeamdivisions, td => {
      let teams = _.filter(td.divisionTeams, t => (<any>t).name.toLowerCase().includes(queryTextLower));
      if (teams.length) {
        filteredTeams.push({ divisionName: td.divisionName, divisionTeams: teams });
      }
    });

    this.teams = filteredTeams;
  }
}
