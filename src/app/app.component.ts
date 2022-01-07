import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CrudServiceService } from './crud-service.service';
import { PersonModel } from './person.details.model';
import { ToastrService } from 'ngx-toastr';     

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crudAngular';

  allPerson !: any;
  formvalue!: FormGroup;
  personModelobj : PersonModel = new PersonModel();
  
  showAdd! : boolean;
  showUpdate! : boolean;

  constructor(private formbuider: FormBuilder, private CrudServiceService : CrudServiceService, private toastr:ToastrService){}

  ngOnInit(){

    // this.getLastPerson();
    this.formvalue = this.formbuider.group({
      name : [''],
      email : [''],
      age : [''],
      avatar : [''],
      country : ['']
    })
    this.getLastPerson();
  }

  clickAddPerson(){
    this.formvalue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
       //console.log(formobj)
//add Person records
  addPerson()
  {
     this.personModelobj.name = this.formvalue.value.name;
     this.personModelobj.email = this.formvalue.value.email;
     this.personModelobj.age = this.formvalue.value.age;
     this.personModelobj.avatar = this.formvalue.value.avatar;
     this.personModelobj.country = this.formvalue.value.country;
     
     this.CrudServiceService.createPersonDetails(this.personModelobj).subscribe(response=>{
      this.toastr.success("Toastr Success message",'Success')  
      console.log(response);
     // this.toastr.success("Add Successfully");
   

     //  alert("Person Added Successfully")
        let ref = document.getElementById("myModal")
        ref?.click();
       this.formvalue.reset();
       this.getLastPerson();

     },
     err=>{
       alert("Something want wrong");
     }
     )
    
  }

  // View records person 
  getLastPerson(){
     this.CrudServiceService.getAllPerson().subscribe(response =>{
       this.allPerson = response
     })
    // this.CrudServiceService.getAllPerson().subscribe((response)=>{
    //   this.allPerson = response
    // })
  }
 
  //Delete Record Person 
  deletePerson(person : any){
    this.CrudServiceService.deletePersonrecords(person).subscribe(respons=>{
      alert("Person records Delete");
      this.getLastPerson();
    })
  }

  //show Records Person in edit Form 

  onEdit(person: any)
  {
    this.showUpdate = true;
    this.showAdd = false;
    this.personModelobj.id = person.id;
    this.formvalue.controls['name'].setValue(person.name);
    this.formvalue.controls['email'].setValue(person.email);
    this.formvalue.controls['age'].setValue(person.age);
    this.formvalue.controls['avatar'].setValue(person.avatar);
    this.formvalue.controls['country'].setValue(person.country);

  }

  //Edit Person Records 
  updatePersonRecords()
  {
    this.personModelobj.name = this.formvalue.value.name;
    this.personModelobj.email = this.formvalue.value.email;
    this.personModelobj.age = this.formvalue.value.age;
    this.personModelobj.avatar = this.formvalue.value.avatar;
    this.personModelobj.country = this.formvalue.value.country;

    this.CrudServiceService.updatePersonrecords(this.personModelobj).subscribe(response=>{
      alert('Update Person Records successfully')

      let ref = document.getElementById("myModal")
      ref?.click();
     this.formvalue.reset();
     this.getLastPerson();
    })
  }

  // resertValue(){
  //   this.formvalue.reset();
  // }
}
