import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/observable';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AppModel} from "./app.model";
import {environment} from '../environments/environment';

@Injectable()
export class AppService{

  constructor(private http: Http, private appModel: AppModel) {
  }

  getIpLocation(): Observable<any> {
    let ipLocationUrl: string = "https://freegeoip.net/json/";
    return this.http.get(ipLocationUrl).map(res=>{
      this.appModel.pplLocationDetailsFromIP(res.json());
    });
  }

  getAddress(city): Observable <any> {
    const url:string = environment.requestUrl+"/api/getLocationGeoCodes/"+city;
    return this.http.get(url).map(res=>{
      let rsp = res.json();
      this.appModel.pplLocationDetailsFromCity(rsp[0]);
    });
  }

  getWeatherInfo(latitude: any, longitude: any): Observable<any> {
    const weatherUrl: string = environment.requestUrl+"/api/getWeatherForLocation/"+latitude+'/'+longitude;
    return this.http.get(weatherUrl).map(res=>{
      this.appModel.pplWeatherData(res.json());
    });
  }
}
