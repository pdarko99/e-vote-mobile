import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { map, tap } from 'rxjs/operators';
import { EServicesService } from '../services/e-services.service';
import { sortCands } from '../services/sortCandidates';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.page.html',
  styleUrls: ['./candidates.page.scss'],
})
export class CandidatesPage implements OnInit {
  ifVoted = false;
  endTime = false;
  private sortcand = new sortCands()
  id: string = this.eservice.ogrId
  displayVotedCands = {}
  votedCands = {
    orgId: this.id
  }

  allCands = []
  constructor(private eservice: EServicesService,
    public toastController: ToastController, private route: ActivatedRoute,
     private router: Router, public alertController: AlertController) { }

  ngOnInit() {
    this.eservice.getIndividual().subscribe(
      res =>{
        if(res.num){
          this.ifVoted = true
        }
      }
    )


    this.getCandidates().subscribe(
      res => {this.allCands = this.sortcand.sortCandidates(res)}
    )


    this.checkendTime()

    
  }

  getCandidates(){
    return this.eservice.getCandidates(this.id).pipe(
      map(x => x.allCands)
    )
  }


  async selected(position, id, firstname){
    this.votedCands[position] = id
    this.displayVotedCands[position] = firstname
    await this.presentToast(position, firstname)
   
  }

  submit(){
    this.eservice.submitVotes(this.votedCands).subscribe(
      res => {console.log(res); this.router.navigate(['/confirmation']) },
      err => console.log(err)
    )
  }

  async presentToast(position, firstname) {
    const toast = await this.toastController.create({
      message: `You voted for ${firstname} as ${position}`,
      duration: 2000,
      position: 'top',
      animated: true
    });
    toast.present();
  }



  async presentAlertConfirm() {
    let b =  ``
    let voted = this.displayVotedCands
    for (const key in voted ){
      b += `<p>${key}: ${voted[key]}</p>`
    }
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message:b,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
          
        }, {
          text: 'Confirm',
          handler: () => {
            this.submit()
          }
        }
      ]
    });

    await alert.present();
  }


  checkendTime(){
    let endTime = this.eservice.endTime

    let orgdateTime = this.eservice.startdate
    if(!endTime){
      this.endTime = true;
      return 
    }
    let orgEndTime = endTime.split(':')

    let todaysData = new Date()
    let orgDate = new Date(orgdateTime)

    let endhours = +orgEndTime[0]
    let endsecs = +orgEndTime[1]

    orgDate.setHours(endhours,endsecs)

    if (todaysData.getTime() >= orgDate.getTime()){
      this.endTime = true
    }

  }





}
