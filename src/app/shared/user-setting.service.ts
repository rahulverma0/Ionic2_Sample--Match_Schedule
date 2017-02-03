import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import * as localforage from "localforage";
import * as _ from 'lodash';

@Injectable()
export class UserSettings{
    
    constructor(private events:Events){}
    favoriteTeam(team,tournamentId,tournamentName){
        let item = {team:team,tournamentId:tournamentId,tournamentName:tournamentName};
        localforage.setItem(team.id,JSON.stringify(item));
        this.events.publish("favorites:changed");
    }
    unFavoriteTeam(team){
       localforage.removeItem(team.id);
       this.events.publish("favorites:changed");
    }
    isFavoriteTeam(teamId){
        return localforage.getItem(teamId).then(value=>value?true:false);        
    }
    getAllFavorites(){
        let item = [];

        console.log("Inside getAllFavorites");
        localforage.iterate(function(value, key, iterationNumber) {
            // Resulting key/value pair -- this callback
            // will be executed for every item in the
            // database.
            
            item.push(JSON.parse(value));
        }).then(function(value) {        
            return item.length?item:null;
                        
        }).catch(function(err) {
            // This code runs if there were any errors
            console.log(err);            
        });
        return item;
    }
}