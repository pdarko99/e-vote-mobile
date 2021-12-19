import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  constructor(public alertController: AlertController) { }

  ngOnInit() {
  }


  feedback(){
    alert('hey wel')
  }


  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Submitted!',
      message:`thanks your feedback has been submitted!`,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.feedback()
          }
        }
      ]
    });

    await alert.present();
  }



  

}
