import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { EServicesService } from '../services/e-services.service';
import { sortCands } from '../services/sortCandidates';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {
  private sortcands = new sortCands()
  id: string = this.eservice.ogrId
  candidates = []
  voters = []
  allRegVotersLen!: number

  constructor(private router: Router, private eservice: EServicesService) { }

  ngOnInit() {
    console.log(this.id)
    this.getCandiatesAndVoters();
    this.getAllRegVoters()
  }

  returnpercentage(value){
    return value / this.allRegVotersLen
  }

  


  getCandiatesAndVoters(){
    this.eservice.getCandidates(this.id).subscribe(
      res => {
        this.candidates = res.allCands;
        this.eservice.getVotes(this.id).subscribe(
          res => {
            this.voters = res.allvoters; this.totalVotes()
          }
        )
      }
    )

    

    
  }

  totalVotes(){
   
      this.candidates.forEach(candidate => {
        let num = this.voters.filter(x => x[candidate.position] === candidate._id).length
        candidate.totalvotes = num
      })
  
     this.candidates =  this.sortcands.sortCandidates(this.candidates)
    
  }

  getAllRegVoters(){
    this.eservice.getAllRegVoters(this.id).subscribe(
      res => this.allRegVotersLen = res.allVoters.length
    )
  }

}
