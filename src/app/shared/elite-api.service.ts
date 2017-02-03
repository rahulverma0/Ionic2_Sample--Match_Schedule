import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import 'rxjs'
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EliteApiService{
    private baseUrl='https://elite-schedule-app-i2-77c1d.firebaseio.com/';
    constructor(private http:Http){}
    currentTournament:any={};
    private tourneyData={};
    getTournaments(){
        return new Promise(resolve=>{
            this.http.get(`${this.baseUrl}/tournaments.json`)
            .subscribe(res=>resolve(res.json()))
        })
    }

    getTournamentData(tournamentId, forceRefresh:boolean=false):Observable<any>{
        console.log("Inside getTournaments methods");
        if(!forceRefresh && this.tourneyData[tournamentId]){
            console.log("reading from cache");
            this.currentTournament = this.tourneyData[tournamentId];
            return Observable.of(this.currentTournament);
        }
        return this.http.get(`${this.baseUrl}/tournaments-data/${tournamentId}.json`)
                .map(response=>{
                    console.log("reading from server");
                    this.tourneyData[tournamentId]=response.json();
                    this.currentTournament= this.tourneyData[tournamentId];
                    console.log("tournamentData form server: "+this.currentTournament);
                    return this.currentTournament;
                });

    }
    getCurrentTourney(){
        return this.currentTournament;
    }
    refreshCurrentTournament(){
        console.log("Inside refreshMethod EliteService");
        return this.getTournamentData(this.currentTournament.tournament.id,true);
    }
}