import {Injectable} from "@angular/core";
import {Location} from "./references";

@Injectable()
export class AppModel {
  weatherData: Array<any>;
  fullWeatherData: {};
  locationDetails: Location;

  constructor(){}

  pplLocationDetailsFromIP(obj: any): void {
    this.locationDetails = new Location(obj);
  }

  pplWeatherData(obj: any): void{
    this.weatherData = [];
    this.fullWeatherData = obj;
    obj.forEach(item => {
      this.weatherData.push(item.daily.data[0]);
    });
    this.weatherData.reverse();
  }

  pplLocationDetailsFromCity(obj: any): void {
    this.locationDetails = new Location({});
    this.locationDetails['latitude'] = obj.geometry.location.lat;
    this.locationDetails['longitude'] = obj.geometry.location.lng;
    let formAddrss = obj.formatted_address;
    let sep = formAddrss.search(",");

    this.locationDetails['city'] = formAddrss.substr(0,sep);
    this.locationDetails['region_code'] = formAddrss.substr(sep+2,2);
  }
}
