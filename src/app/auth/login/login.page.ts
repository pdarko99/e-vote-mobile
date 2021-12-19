import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EServicesService } from 'src/app/services/e-services.service';
import {LoadingController} from "@ionic/angular"

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  errormsg!: string
  id: string = this.route.snapshot.params.id;
  User = {
    email: '',
    password: ''
  }
  constructor(private route: ActivatedRoute,
    public loadingCtl: LoadingController,
    private eservice: EServicesService, private router: Router) { }

  ngOnInit() {
 
  }

  loginUser(){
    this.eservice.loginUser(this.User, this.id).subscribe(
      res => {
        console.log(res)
       
        if(this.checkendTime()){
          this.router.navigate(['/confirmation'])
          return
        }
        localStorage.setItem('token', JSON.stringify(res.token));
        localStorage.setItem('orgId', JSON.stringify(this.id));
        this.router.navigate(['/candidates'])
      },
      err => this.errormsg = err.message
    )
  }

  
  async presentLoading(){
    const loading = await this.loadingCtl.create({
      message: 'loading ...',
      duration: 100
    })

    await loading.present()
  }

  checkendTime(){
    let endTime = this.eservice.endTime
    let orgdateTime = this.eservice.startdate
   
    let orgEndTime = endTime.split(':')

    let todaysData = new Date()
    let orgDate = new Date(orgdateTime)

    let endhours = +orgEndTime[0]
    let endsecs = +orgEndTime[1]

    orgDate.setHours(endhours,endsecs)

    return todaysData.getTime() >= orgDate.getTime()

  }

}
