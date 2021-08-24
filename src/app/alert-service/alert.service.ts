import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  
  // alert me method
  alertMe(message:string){
    alert(message)
  }

  constructor() { }
}
