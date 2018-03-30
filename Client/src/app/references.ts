export class Location {
  city: string;
  region_code: string;
  latitude: string;
  longitude: string;

  constructor(obj:any) {
    if(!obj){return;}
    this.city = obj.city;
    this.region_code = obj.region_code;
    this.latitude = obj.latitude;
    this.longitude = obj.longitude;
  }
}
