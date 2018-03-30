import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Location} from './../references';
import {AppModel} from "../app.model";

@Component({
  selector: 'app-forecast-details',
  templateUrl: './forecast-details.component.html',
  styleUrls: ['./forecast-details.component.css']
})
export class ForecastDetailsComponent implements OnInit {
  @Input() dayData;
  @Input() activeDay;
  @Output() changeActiveDate: EventEmitter<any> = new EventEmitter();

  imgSrc: string;
  activeDayFlag: boolean = false;
  weatherDate: string;
  weatherDay: string;
  location: Location;

  constructor(private appModel: AppModel) { }

  ngOnInit() {
    this.location = this.appModel.locationDetails;
    let weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    this.weatherDay = weekday[new Date(this.dayData.time*1000).getDay()];
    this.weatherDate = new Date(this.dayData.time*1000).toString().substr(4,6);
    switch(this.dayData.icon){
      case 'partly-cloudy-day': this.imgSrc = 'assets/images/icons/partly-cloudy-day.svg';
        break;
      case 'clear-day': this.imgSrc = 'assets/images/icons/clear-day.svg';
        break;
      case 'cloudy': this.imgSrc = 'assets/images/icons/cloudy.svg';
        break;
      case 'rain': this.imgSrc = 'assets/images/icons/rain.svg';
        break;
      case 'snow': this.imgSrc = 'assets/images/icons/snow.svg';
        break;
      case 'fog': this.imgSrc = 'assets/images/icons/fog.svg';
        break;
      case 'wind': this.imgSrc = 'assets/images/icons/wind.svg';
        break;
    }

    if( new Date(this.dayData.time*1000).toDateString() === this.activeDay){
      this.activeDayFlag = true;
    }
  }

  ngOnChanges() {
    this.activeDayFlag =  false;
    this.location = this.appModel.locationDetails;
    if( new Date(this.dayData.time*1000).toDateString() === this.activeDay){
      this.activeDayFlag = true;
    }
  }

  setActiveDay(data): void {
    this.activeDayFlag = false;
    this.changeActiveDate.emit(data);
  }
}
