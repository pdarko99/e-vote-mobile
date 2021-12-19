import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EServicesService {
  endTime!: string 
  startdate!: string
  constructor(private http: HttpClient) { }
  url = 'http://localhost:5000'
  ogrId = JSON.parse(localStorage.getItem('orgId')!)

  getAllOrgs(): Observable<any>{
    return this.http.get<any>(this.url + '/get/org')
    .pipe(
      catchError(this.handleError)
    )
  }

  getCandidates(id): Observable<any>{
    return this.http.get<any>(this.url + '/get/candidates'+ '?id=' + id)
    .pipe(
      catchError(this.handleError)
    )
  }

  getAllRegVoters(id): Observable<any>{
    return this.http.get<any>(this.url + '/post/votes/allvotes'+ '?id=' + id)
    .pipe(
      catchError(this.handleError)
    )
  }


  loginUser(data, id): Observable<any>{
    return this.http.post<any>(this.url + '/post/login/'+ '?id=' + id, data)
    .pipe(
      catchError(this.handleError)
    )
  }

  submitVotes(data): Observable<any>{
    return this.http.post<any>(this.url + '/post/votes', data)
    .pipe(
      catchError(this.handleError)
    )
  }

  getVotes(id): Observable<any>{
    return this.http.get<any>(this.url + '/post/votes' +'?id=' + id)
    .pipe(
      catchError(this.handleError)
    )
  }

  getIndividual():Observable<any>{
    if(!this.ogrId){
      return of(true)
    }
    return this.http.get<any>(this.url + '/post/votes/individual'+'?orgId=' + this.ogrId)
    .pipe(
      catchError(this.handleError)
    )
  }
  
  handleError(err:HttpErrorResponse){
    let message = '';


    //it seems i changed the arrangement in the erros at the backend side i think i have to turn the
    // super back to the original and see but not now
    if(err.error instanceof ErrorEvent){
      message = `an error occured: ${err.error.message}`
    }
    else{
      message =  err.error
    }

    return throwError(message)


  }
}
