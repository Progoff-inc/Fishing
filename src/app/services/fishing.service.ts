import { Boat, Fishing, Bank, FishTypes, BoatTypes, FishingBank } from "./models";
import { Injectable} from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LoadService } from "./load.service";
import { Changes } from "../update-boat/update-boat.component";

@Injectable()
export class FishingService{
    boats:Boat[] = [];
    banks:Bank[] = [];
    baseUrl:string='http://client.nomokoiw.beget.tech/fishing/';
    

    constructor(private http: HttpClient, private ls:LoadService){
        this.getBoats();
        this.getBanks();
    }

    /**
     * Получение списка катеров
     * 
     * @param dateStart подгрузка рейсов для каждой лодки (начало периода)
     * @param dateFinish подгрузка рейсов для каждой лодки (конец периода)
     */
    getBoats(type?:BoatTypes, dateStart?:Date, dateFinish?:Date){
        this.ls.showLoad = true;
        if(type && dateStart && dateFinish){
            const params = new HttpParams().set('DateStart', dateStart.toISOString()).set('DateFinish', dateFinish.toISOString()).set('Type', type);
            return this.http.get<any>(this.baseUrl + 'FishingController.php?Key=get-boats-fishings', {params})
        }else{
            this.http.get<Boat[]>(this.baseUrl + 'FishingController.php?Key=get-boats').subscribe(boats => {
                this.boats = boats;
                this.ls.showLoad = false;
            })
        }
        
    }

    /**
     * Получение всех моряков
     */
    getSailors(){
        return this.http.get<any>(this.baseUrl + 'FishingController.php?Key=get-sailors');
    }

    /**
     * Добавление моряка
     * @param sailor Новый моряк
     */
    addSailor(sailor){
        return this.http.post<number>(this.baseUrl + 'FishingController.php?Key=add-sailor', sailor);
    }

    /**
     * Получение списка банок
     */
    getBanks(){
        this.ls.showLoad = true;
        this.http.get<Bank[]>(this.baseUrl + 'FishingController.php?Key=get-banks').subscribe(banks => {
            this.banks = banks;
            this.ls.showLoad = false;
        })
    }

    /**
     * Получение списка рейсов
     */
    getFishings(dateStart:Date, dateFinish:Date){
        const params = new HttpParams().set('DateStart', dateStart.toISOString()).set('DateFinish', dateFinish.toISOString());
        return this.http.get<any>(this.baseUrl + 'FishingController.php?Key=get-fishings', {params})
    }

    /**
     * Поиск катеров с максимальным уловом для сорта рыбы
     * @param fishType сорт рыбы
     * @param dateStart дата начала периода поиска
     * @param dateFinish дата конца периода поиска
     */
    getMaxCatchBoats(fishType:FishTypes, dateStart:Date, dateFinish:Date){
        const params = new HttpParams().set('FishType', fishType).set('DateStart', dateStart.toISOString()).set('DateFinish', dateFinish.toISOString());
        return this.http.get<any>(this.baseUrl + 'FishingController.php?Key=get-max-catch-fidhings', {params});
    }

    /**
     * Получение списка банок с указанием среднего улова за период и списком катеров, осуществляющих лов
     * @param dateStart дата начала периода поиска
     * @param dateFinish дата конца периода поиска
     */
    getBanksAvgCatch(dateStart, dateFinish){
        const params = new HttpParams().set('DateStart', dateStart.toISOString()).set('DateFinish', dateFinish.toISOString());
        return this.http.get<any>(this.baseUrl + 'FishingController.php?Key=get-banks-avg-catch', {params});
    }

    /**
     * Получение списка катеров получивших на выбранной банке улов выше среднего
     * @param bankId идентификатор выбранной банки
     */
    getBankBoatsAboveAvg(bankId){
        return this.http.get<any>(this.baseUrl + 'FishingController.php?Key=get-bank-boats-above-avg&Id='+bankId);
    }
    
    /**
     * Получение сортов рыбы, с выводом для каждого сорта списка рейсов в пределах указанных дат
     * @param dateStart дата начала периода поиска
     * @param dateFinish дата конца периода поиска
     */
    getFish(dateStart:Date, dateFinish:Date){
        const params = new HttpParams().set('DateStart', dateStart.toISOString()).set('DateFinish', dateFinish.toISOString());
        return this.http.get<any>(this.baseUrl + 'FishingController.php?Key=get-fish', {params});
    }

    /**
     * Получение списка рейсов и улова для указанной банки и сорта рыбы
     * @param fishType сорт рыбы
     * @param bankId идентификатор банки
     */
    getBankFishFishings(fishType:FishTypes, bankId){
        const params = new HttpParams().set('FishType', fishType);
        return this.http.get<any>(this.baseUrl + 'FishingController.php?Key=get-bank-fish-fishings&Id='+bankId, {params});
    }

    //--------------------------Добавление элементов--------------------------

    /**
     * Добавление нового судна
     * @param boat новое судно
     * 
     * @returns идентификатор добавленного судна
     */
    addBoat(boat:NewBoat){
        return this.http.post<number>(this.baseUrl + 'FishingController.php?Key=add-boat', boat);
    }

    /**
     * Добавление нового рейса
     * @param fishing новый рейс
     * 
     * @returns идентификатор добавленного рейса
     */
    addFishing(fishing:NewFishing){
        return this.http.post<number>(this.baseUrl + 'FishingController.php?Key=add-fishing', fishing);
    }

    /**
     * Добавление банки, посещенной во время рейса
     * @param bank банка, которую посетило судно
     * @param fishingId идентификатор рейса
     */
    addFishingBank(bank){
        return this.http.post<any>(this.baseUrl + 'FishingController.php?Key=add-fishing-bank', bank);
    }

    /**
     * Добавление новой банки
     * @param bank новая банка
     * 
     * @returns идентификатор добавленной банки
     */
    addBank(bank:NewBank){
        return this.http.post<number>(this.baseUrl + 'FishingController.php?Key=add-bank', bank);
    }

    /**
     * Изменение судна
     * @param changes внесенные изменения
     * @param boatId идентификатор судна
     */
    updateBoat(changes:Changes, boatId){
        return this.http.post<any>(this.baseUrl + 'FishingController.php?Key=update-boat&Id='+boatId, changes);
    }
}

export interface NewBoat{
    Type:BoatTypes,
    Name:string,
    Displacement:number,
    BuildDate:Date
}

export interface NewFishing{
    BoatId:number,
    DateStart:Date,
    DateFinish:Date
}

export interface NewBank{
    Name:string
}