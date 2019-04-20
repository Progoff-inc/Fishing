export enum BoatTypes{
    
    Trawler = "траулер",
    SwimmingBase = "плавучая база",
    Drifter = "дрифтер",
    Seiner = "сейнер"

}

export class Boat{
    BoatId:number;
    Name:string;
    Type:BoatTypes;
    Displacement:number;
    BuildDate:Date;
}

export class Fishing{
    FishingId:number;
    BoatId:number;
    DateStart:Date;
    DateFinish:Date;

    Boat:Boat;
    Banks?:Bank[] = [];
}

export class Bank{
    BankId:number;
    Name:string;
    Quality?:string;
}