import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { combineLatest, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { EServicesService } from '../services/e-services.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  userInput: string = ''
  
  getAllOrgs$ = this.eservice.getAllOrgs()
  
  private searchedptn = new Subject<string>();
  insertedSearchedptn$ = this.searchedptn.asObservable();


  PatientWithSearch$ =  combineLatest([
    this.getAllOrgs$,
    this.insertedSearchedptn$

  ]).pipe(
    map(([orgs, org]) => orgs.filter((i: { name: string; }) => org ?  i.name.includes(org.trim()) : true) )

  )

  constructor(private eservice: EServicesService, private router: Router, 
  public alertController: AlertController) {}

  login(org){

    let orgStartTime = org.starttime.split(':')

    let starthours = +orgStartTime[0]
    let startsecs = +orgStartTime[1]

   
    let todaysData = new Date()
    let orgDate = new Date(org.startdate)

    orgDate.setHours(starthours,startsecs)
   
    if(todaysData.getTime() < orgDate.getTime()){
      this.alertNotYetTime()
      return
    }

    this.eservice.endTime = org.endtime
    this.eservice.startdate = org.startdate
    this.router.navigate(['/login', org._id])
  }

  ngOnInit(){
 
  }

  fire(event){
    
    this.searchedptn.next(this.userInput)
  }



   async alertNotYetTime() {
    const alert = await this.alertController.create({
      header: 'Ooops!',
      message:`Elections hasn't yet started please confirm from email!`,
      buttons: [
        {
          text: 'Ok',
        }
      ]
    });

    await alert.present();
  }


  
}
