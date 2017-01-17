import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { App } from '../../../providers/app';
import { User } from '../../../api/firebase-api-2.0/user';
import { USER_REGISTRATION_FORM } from '../../../api/firebase-api-2.0/interfaces';
@Component({
    selector:'register-component',
    templateUrl: 'register.html'
})

export class RegisterComponent{

    loading:boolean = true;
    title:string;
    form = <USER_REGISTRATION_FORM> {}
    userdata;
    @Input() uid = null;
    constructor(
        private app: App,
        private activeModal  : NgbActiveModal,
        private user : User
    ) {

            //this.fakeData();
            //this.register();

    }

    fakeData() {
        let id = 'user' + (new Date).getHours() + (new Date).getMinutes() + (new Date).getSeconds();
        this.form.id = id;
        this.form.email = id + '@gmail.com';
        this.form.name = id;
        this.form.password = id;
        this.form.mobile = '09174678000';
        this.form.gender = 'M';
        this.form.birthdate = '1990-12-30';
    }

    onClickDismiss() {
        this.activeModal.close();
    }

  ngOnInit(){
     if( this.uid ) {
         console.log('logged in')
         this.getUserData(); 
         
     }
     this.title = 'Signup';
  }

  renderRegister(){
      
  }
  onchange(){
      console.log('ok ' + this.form.id );
      this.form.id = this.form.id.replace(/./g, '');
  }
  getUserData(){
      this.user.get( this.uid, res =>{
          
              this.userdata = res;
             this.initializeData();
             
             
      }, error => {
          console.log('error ' + error ); 
        }, () =>{});
  }

  initializeData(){
      
          console.log('gender ' + this.userdata.gender )
          this.form.id          = this.userdata.id;
          this.form.email       = this.userdata.email;
          this.form.name        = this.userdata.name;
          this.form.mobile      = this.userdata.mobile;
          this.form.gender      = this.userdata.gender;
          this.form.birthdate   = this.userdata.birthdate;
          this.title = 'Update';
          this.loading = false;
          
  }

    checkLogin(){


        // this.userService.checklogin( res =>{
        //     this.ngZone.run( () =>{
        //         this.userService.get( res.uid, res =>{
        //             this.userdata = res;
        //         }, error =>console.log('error ' + error ) )
        //     })
        // }, error => {
        //     console.log( 'error ' + error );
        // }, complete =>{
        //     console.log( 'complete check ' );
        //     this.renderRegister();
        // } )
    }

  onClickSubmit() {
      this.register();
  }


  register() {
      if( this.validate() == false ) return;
      console.log('form :: ' + JSON.stringify(this.form))
        console.log("Going to create user : " + this.form.name);
        this.user.data('key', this.form.id )
            .data('id', this.form.id)
            .data('email', this.form.email)
            .data('password', this.form.password )
            .data('name', this.form.name)
            .data('mobile' , this.form.mobile)
            .data('gender' , this.form.gender)
            .data('birthdate', this.form.birthdate)
            .create(
                ( uid ) => { 
                    console.log(`create ${this.form.name} : success`); 
                    this.activeModal.close();
                },
                (e) => this.app.alert(`create ${this.form.name}: failure:`+ e),
                () => console.log(`create ${this.form.name} : complete`) );
  }

  updateProfile(){
        this.user.clear()
            .data('key', this.userdata.uid)
            .data('name', this.form.name)
            .data('mobile' , this.form.mobile)
            .data('gender' , this.form.gender)
            .data('birthdate', this.form.birthdate)
            .update(
                () => {
                    console.log(`user update: ${this.userdata.uid} : success.`);
                    this.activeModal.close();
                } ,
                e => console.error( `user update: ${this.userdata.uid} : failure: `, e ),
                () => {}
            );
  }

  validate() {
      if ( ! this.form.id ) {
          this.app.alert('ID is required');
          return false;
      }
      if ( ! this.form.email ) {
          this.app.alert('Email is required');
          return false;
      }
      if ( ! this.form.name ) {
          this.app.alert('Name is required');
          return false;
      }
      if( ! this.form.mobile ) {
          this.app.alert('Provide your mobile number');
          return false;
      }
      if( ! this.form.password ){
          this.app.alert('Password is required' );
          return false;
      }
      if( this.form.gender == undefined ){
          this.app.alert('Please select your gender');
          return false;
      }
      if( this.form.birthdate == undefined ){
          this.app.alert('Please indicate your birthdate');
          return false;
      }
  }


}