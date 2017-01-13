import { Component, Input, NgZone } from '@angular/core';
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

    loading:boolean = true;
    title:string;
    registrationForm = <form>{}
    userdata;
    @Input() uid = null;
    constructor( 
        public activeModal  : NgbActiveModal,
        private userService : User,
        private ngZone      : NgZone 
        ){
            
            
        }


  onClickDismiss(){
    this.activeModal.dismiss( 'dismiss' );
  }

  ngOnInit(){
     if( this.uid ) {
         this.getUserData(); 
         
     }

 
     this.title = 'Signup';
     
  
  }

  renderRegister(){
      this.ngZone.run( () =>{
          this.loading = false;
      })
  }

  getUserData(){
      this.userService.get( this.uid, res =>{
          this.ngZone.run( () =>{
              this.userdata = res;
             this.initializeData();
             this.renderRegister();
          })
      }, error => {
          console.log('error ' + error ); 
        }, () => this.renderRegister());
  }

  initializeData(){
      this.ngZone.run( () =>{
          console.log('gender ' + this.userdata.gender )
          this.registrationForm.email       = this.userdata.email;
          this.registrationForm.firstname   = this.userdata.firstname;
          this.registrationForm.lastname    = this.userdata.lastname;
          this.registrationForm.gender      = this.userdata.gender;
          this.registrationForm.birthdate   = this.userdata.birthdate;
          this.title = 'Update';
    
      })
  }

    checkLogin(){


        this.userService.checklogin( res =>{
            this.ngZone.run( () =>{
                this.userService.get( res.uid, res =>{
                    this.userdata = res;
                }, error =>console.log('error ' + error ) )
            })
        }, error => {
            console.log( 'error ' + error );
        }, complete =>{
            console.log( 'complete check ' );
            this.renderRegister();
        } )
    }

  onClickSubmit( ){
      if(! this.userdata ){
          this.register();
          return;
      }
      this.updateProfile();

  }


  register(){
      if( this.validate() == false ) return;
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

  validate(){
      if( this.registrationForm.firstname == '' || this.registrationForm.firstname == null){
          alert('First Name is required');
          return false;
      }
      if( this.registrationForm.lastname == '' || this.registrationForm.lastname == null ){
          alert('Last Name is required');
          return false;
      }
      if( this.registrationForm.password == '' || this.registrationForm.password == null ){
          alert('Password is required' );
          return false;
      }
      if( this.registrationForm.gender == undefined ){
          alert('Please select your gender');
          return false;
      }
      if( this.registrationForm.birthdate == undefined ){
          alert('Please indicate your birthdate');
          return false;
      }
  }


}