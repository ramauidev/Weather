import { Component, OnInit } from '@angular/core';
import {AppService} from "../app.service";
import {FormGroup, FormBuilder} from "@angular/forms";
import {AppModel} from "../app.model";

@Component({
  selector: 'app-content',
  templateUrl: './app-content.component.html',
  styleUrls: ['./app-content.component.css']
})
// for git revert testing only.
export class AppContentComponent implements OnInit {
  activeDay: string;
  locationForm: FormGroup;
  dailyData;
  constructor(private appService: AppService, private fb: FormBuilder, private appModel: AppModel) { }

  ngOnInit() {
    this.dailyData = this.appModel.weatherData;
    this.activeDay = new Date().toDateString();
    this.locationForm = this.fb.group({location: ''});
    this.appService.getIpLocation().subscribe((rsp) => {
      const locationDetails = this.appModel.locationDetails;
      this.locationForm = this.fb.group({
        location: locationDetails.city
      })
      this.appService.getWeatherInfo(locationDetails.latitude, locationDetails.longitude ).subscribe((rsp) => {
        this.dailyData = this.appModel.weatherData;
      });
    });

  }

  submit(searchTerm: any): void {
    this.appService.getAddress(searchTerm).subscribe((rsp)=>{
      const locationDetails =this.appModel.locationDetails;
      this.locationForm = this.fb.group({
        location: locationDetails.city
      });
      this.appService.getWeatherInfo(locationDetails.latitude, locationDetails.longitude ).subscribe((rsp)=>{
        this.activeDay = new Date().toDateString();
        this.dailyData = this.appModel.weatherData;
      });
    })
  }

  changeDate(data: any): void {
    this.activeDay = new Date(data.time*1000).toDateString();
  }
}
