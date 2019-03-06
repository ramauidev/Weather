import {Component, OnInit, NgZone, ElementRef, ViewChild} from '@angular/core';
import {AppService} from "../app.service";
import {FormGroup, FormBuilder, FormControl} from "@angular/forms";
import {AppModel} from "../app.model";
import {MapsAPILoader, } from "@agm/core";

@Component({
  selector: 'app-content',
  templateUrl: './app-content.component.html',
  styleUrls: ['./app-content.component.css']
})
// for git revert testing only.
export class AppContentComponent implements OnInit {
  @ViewChild('search')
  public searchElementRef: ElementRef;
  public searchControl: FormControl;
  zoom: number;
  activeDay: string;
  locationForm: FormGroup;
  dailyData;
  locationDetails: any;



  constructor(private appService: AppService, private fb: FormBuilder, private appModel: AppModel, private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone) { }

  ngOnInit() {

   /* // create search FormControl
    this.searchControl = new FormControl();
    this.zoom = 4;

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          // get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.locationDetails.latitude = place.geometry.location.lat();
          this.locationDetails.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });*/


    this.dailyData = this.appModel.weatherData;
    this.activeDay = new Date().toDateString();
    this.locationForm = this.fb.group({location: ''});
    this.appService.getIpLocation().subscribe((rsp) => {
      this.locationDetails = this.appModel.locationDetails;
      this.locationForm = this.fb.group({
        location: this.locationDetails.city
      });
      // TODO: uncomment before submitting, commented to reduce api calls
      this.appService.getWeatherInfo(this.locationDetails.latitude, this.locationDetails.longitude ).subscribe((rsp) => {
        this.dailyData = this.appModel.weatherData;
      });
    });

  }

  submit(searchTerm: any): void {
    this.appService.getAddress(searchTerm).subscribe((rsp) => {
      this.locationDetails = this.appModel.locationDetails;
      this.locationForm = this.fb.group({
        location: this.locationDetails.city
      });
      // TODO: uncomment before submitting, commented to reduce api calls
      this.appService.getWeatherInfo(this.locationDetails.latitude, this.locationDetails.longitude ).subscribe((rsp)=>{
        this.activeDay = new Date().toDateString();
        this.dailyData = this.appModel.weatherData;
      });
    })
  }

  changeDate(data: any): void {
    this.activeDay = new Date(data.time*1000).toDateString();
  }
}
