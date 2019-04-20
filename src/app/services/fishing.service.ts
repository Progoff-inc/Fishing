import { Boat, Fishing, Bank } from "./models";
import { stringify } from "@angular/core/src/util";

export class FishingService{
    boats:Boat[] = [];
    banks:Bank[] = [];
    fishings:Fishing[] = [];

    constructor(){
        this.boats = this.getBoats();
        this.fishings = this.getFishings();
        this.banks = this.getBanks();
    }


    getBoats(){
        if(localStorage.getItem('boats')){
            return JSON.parse(localStorage.getItem('boats'));
        }
        return [];
    }

    getBanks(){
        if(localStorage.getItem('banks')){
            return JSON.parse(localStorage.getItem('banks'));
        }
        return [];
    }

    getFishings(){
        if(localStorage.getItem('fishings')){
            return JSON.parse(localStorage.getItem('fishings'));
        }
        return [];
    }

    save(){
        localStorage.setItem('boats', JSON.stringify(this.boats));
        localStorage.setItem('banks', JSON.stringify(this.banks));
        localStorage.setItem('fishings', JSON.stringify(this.fishings));
    }
}