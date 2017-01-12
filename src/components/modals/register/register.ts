import { Component, Input, OnInit, NgZone } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../api/firebase-api-2.0/user';

interface form{
    email       : string;
    password    : string;
    firstname   : string;
    lastname    : string;
    gender      : string;
    birthdate   : Date;
}
@Component({
    selector:'register-component',
    templateUrl: 'register.html'
})

export class RegisterComponent{

    registrationForm:form = <form>{}

    @Input() userdata;
    constructor( 
        public activeModal  : NgbActiveModal,
        private userService : User,
        private ngZone      : NgZone 
        ){}


  onClickDismiss(){
    this.activeModal.dismiss( 'dismiss' );
  }

  ngOnInit(){
      if( this.userdata ) {
          console.log('userdata ' + JSON.stringify(this.userdata) )
          this.initializeData();
      }
  }

  initializeData(){
      this.ngZone.run( () =>{
          this.registrationForm.email       = this.userdata.email;
          this.registrationForm.firstname   = this.userdata.firstname;
          this.registrationForm.lastname    = this.userdata.lastname;
          this.registrationForm.gender      = this.userdata.gender;
          this.registrationForm.birthdate   = this.userdata.birthdate;
      })
  }

  onClickSubmit( ){
      if(! this.userdata ){
          this.register();
          return;
      }
      this.updateProfile();

  }


  register(){
      console.log('form :: ' + JSON.stringify(this.registrationForm))
        console.log("Going to create user : " + this.registrationForm.firstname);
        this.userService.data('key', this.registrationForm.firstname )
            .data('email', this.registrationForm.email)
            .data('password', this.registrationForm.password )
            .data('firstname', this.registrationForm.firstname)
            .data('lastname' , this.registrationForm.lastname)
            .data('gender' , this.registrationForm.gender)
            .data('birthdate', this.registrationForm.birthdate)
            .create(
                ( uid ) => { 
                    console.log(`create ${this.registrationForm.firstname} : success`); 
                    this.activeModal.close(); 
                },
                (e) => alert(`create ${this.registrationForm.firstname}: failure:`+ e),
                () => console.log(`create ${this.registrationForm.firstname} : complete`) );
  }

  updateProfile(){
        this.userService.clear()
            .data('key', this.userdata.uid)
            .data('firstname', this.registrationForm.firstname)
            .data('lastname' , this.registrationForm.lastname)
            .data('gender' , this.registrationForm.gender)
            .data('birthdate', this.registrationForm.birthdate)
            .update(
                () => {
                    console.log(`user update: ${this.userdata.uid} : success.`);
                    this.activeModal.close();
                } ,
                e => console.error( `user update: ${this.userdata.uid} : failure: `, e ),
                () => {}
            );
  }


}