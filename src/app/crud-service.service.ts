import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudServiceService {

  constructor(private http:HttpClient) { }

  // Add Date in json server 
  createPersonDetails(person: any){
    return this.http.post<any>("http://localhost:3000/People",person)
    .pipe(map((res:any)=>{
      return res;
    }));
  }

  // View data in json server 
  getAllPerson(){
    return this.http.get<any>("http://localhost:3000/People")
    .pipe(map((res:any)=>{
      return res;
    }));

  }

  //Update record in json server

  updatePersonrecords(person: any){
    return this.http.put<any>("http://localhost:3000/People/"+person.id, person)
    .pipe(map((res:any)=>{
      return res;
    }));

  }


  //delete record in json server

  deletePersonrecords(person: any){
    return this.http.delete<any>("http://localhost:3000/People/"+person.id)
    .pipe(map((res:any)=>{
      return res;
    }));

  }

  // createPersonDetails(person: any){

  //   return this._http.post("http://localhost:3000/People",person);
  // }

  // getAllPerson(){
  //   return this._http.get("http://localhost:3000/People");
  // }
}
