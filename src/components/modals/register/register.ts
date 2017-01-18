import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { App } from '../../../providers/app';
import { User } from '../../../api/firebase-api-2.0/user';
import { USER_REGISTRATION_FORM } from '../../../api/firebase-api-2.0/interfaces';
@Component({
    selector:'register-component',
    templateUrl: 'register.html'
})

export class RegisterComponent{

    loading: boolean = false;
    title: string = null;
    form = <USER_REGISTRATION_FORM> {};
    constructor (
        private app: App,
        private activeModal  : NgbActiveModal,
        public user : User
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
     if ( this.user.loggedIn ) {
         console.log('logged in')
         this.getUserData(); 
     }
     this.title = 'Signup';
  }


  getUserData() {
    this.loading = true;
    this.user.get( this.user.currentUser.uid, res => {
        this.form = res;
    }, error => {
        console.log('error ' + error ); 
    }, () =>{ this.loading = false; });
  }




  onClickSubmit() {
      this.register();
  }
  onClickUpdate() {
      this.updateProfile();
  }


  register() {
      if ( this.validate() == false ) return;
        console.log('form :: ' + JSON.stringify(this.form))
        console.log("Going to create user : " + this.form.name);
        this.loading = true;
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
                () => { this.loading = false; console.log(`create ${this.form.name} : complete`); } ); 
  }

  /**
   * @description: this method is for checking if user id exists.
   */
  checkid(id){
      let userid:string;
      this.user.get( id , res =>{
          userid = res;
          console.log('user id exist');
          return false;
      }, error => {return true})
      
  }

  updateProfile(){
    this.loading = true;
    this.user.clear()
        .data('key', this.form.uid)
        .data('name', this.form.name)
        .data('mobile' , this.form.mobile)
        .data('gender' , this.form.gender)
        .data('birthdate', this.form.birthdate)
        .update(
            () => {
                console.log(`user update: ${this.form.uid} : success.`);
                this.activeModal.close();
            } ,
            e => console.error( `user update: ${this.form.uid} : failure: `, e ),
            () => { this.loading = false; }
        );
  }

  validate() {
      console.log('form: ', this.form);
      if( this.form.id.match(/[.#$\[\]]/g)) return this.validateError('valid id')
      if ( this.user.loggedIn ) {

      }
      else {
        if ( ! this.form.id ) return this.validateError('ID');
        if ( ! this.form.email ) return this.validateError('Email');
        if( ! this.form.password )return this.validateError('Password');
      }
      if ( ! this.form.name ) return this.validateError('Name');
      if ( ! this.form.mobile ) return this.validateError('Mobile');
      if ( ! this.form.gender ) return this.validateError('Gender');
      if ( ! this.form.birthdate ) return this.validateError('BirthDay');
      return true;
  }
  
  validateError( name ) {
      this.app.alert( name + ' is required ...' );
      return false;
  }


}