export enum BoatTypes{
    Trawler = "траулер",
    SwimmingBase = "плавучая база",
    Drifter = "дрифтер",
    Seiner = "сейнер"

}

export enum Qualities{
    
    Excellent = "Отлично",
    Good = "Хорошо",
    Normal = "Нормально",
    Bad = "Плохо"

}

export enum Positions{
    Captain = "Капитан",
    Navigator = "Штурман",
    Engineer = "Механик",
    RadioStaff = "Радист",
    ChiefMate = "Старший помошник",
    Boatswain = "Боцман",
    Shopman = "Шкипер",
    Sailor = "Матрос"
}

export enum FishTypes{
    
    Perch = "Окунь",
    Grouper  = "Морской окунь",
    Sturgeon  = "Осётр",
    Gudgeon  = "Пескарь",
    Сarp  = "Карп",
    Saury  = "Сайра",
    Salmon  = "Сёмга",
    Mackerel  = "Скумбрия",
    Sheatfish  = "Сом",
    Zander = "Судак",
    Greenling  = "Терпуг",
    Cod  = "Треска",
    Eel  = "Угорь",
    Trout  = "Фарель",
    Pike = "Щука"

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
    Banks?:FishingBank[] = [];
    Sailors:Sailor[] = [];
}

export class Bank{
    BankId:number;
    Name:string;
}

export class FishingBank{
    Bank:Bank;
    DateStart:Date;
    DateFinish:Date;
    Quality:string;

    Catches:Catch[];
}

export class Catch{
    FishType:FishTypes;
    Weight:number = 0;
}

export class Sailor{
    SalorId:number;
    Name:string = '';
    Surname:string = '';
    Address:string = '';
}