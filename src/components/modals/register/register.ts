import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { App } from '../../../providers/app';
import { User } from '../../../api/firebase-api-2.0/user';
import { Forum } from '../../../api/firebase-api-2.0/forum';
import { USER_REGISTRATION_FORM } from '../../../api/firebase-api-2.0/interfaces';
import { LMS } from '../../../providers/lms';
@Component({
    selector:'register-component',
    templateUrl: 'register.html'
})

export class RegisterComponent{

    isIDexists  :boolean;
    loading     : boolean = false;
    form = <USER_REGISTRATION_FORM> {};
    constructor (
        private app          : App,
        private activeModal  : NgbActiveModal,
        public user          : User,
        private forum        : Forum,
        private lms          : LMS
    ) {

            //this.fakeData();
            //this.register();


    }
    
    // testforumpost(){
    //     this.forum
    //         .data('post', 'another post test')
    //         .data('comment', 'comment test')
    //         .create('QnA', res =>{
    //             console.log('res :: ' + res);
    //     }, err =>{
    //         this.app.alert('error :: ' + err );
    //     }, ()=> console.info( 'completed ') )
    // }
    

    onEnterRegister(event){
       if( event.keyCode == 13){
           if( this.user.loggedIn ) this.updateProfile( callback => this.updateLMSprofile() );
           else this.register( callback => this.lmsregister( ) );
       }
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
            console.log( 'logged in' );
            this.getUserData(); 
        }
    }


  getUserData() {
    this.loading = true;
    console.info('userid ' + this.user.loginUser.uid )
    this.user.private_get( this.user.loginUser.uid, res => {
        this.form = res;
        console.log('data ::' + JSON.stringify( res ))
    }, error => {
        console.log('error ::' + error ); 
    }, () =>{ this.loading = false; });
  } 




  onClickSubmit() {
      this.register( callback => this.lmsregister() );
      
  }
  onClickUpdate() {
      this.updateProfile( callback => this.updateLMSprofile() );
  }


  register( callback ) {
      this.checkid( );
      setTimeout( () =>{
        if( this.isIDexists == false ) return this.app.alert('id already in used');
        if ( this.validate() == false ) return;
            console.log('form :: ' + JSON.stringify(this.form))
            console.log("Going to create user : " + this.form.name);
            this.loading = true;
                let data = {};
                data['id'] = this.form.id;
                data['mobile'] = this.form.mobile;
                data['birthday'] = this.form.birthdate;
                data['gender'] = this.form.gender;
                data['email'] = this.form.email;
                data['password'] = this.form.password;
                data['name'] = this.form.name;
            this.user.create( this.form.id, this.form ,
                    uid => { 
                        console.log(`create ${this.form.name} : success`); 
                        callback();
                    },
                    (e) => this.app.alert(`create ${this.form.name}: failure:`+ e),
                    () => { this.loading = false; console.log(`create ${this.form.name} : complete`); } ); 
      }, 300);
   
  }


  lmsregister(){
      this.lms.register( this.form, res =>{
          console.log(' registered on centerX ' + res );
          this.activeModal.close();
      }, error => console.error(' error on registration ' + error ) )
  }

  /**
   * @description: this method is for checking if user id exists.
   * 
   * @description: it'll set isIDexists to false if the key exists and true if not.
   */
  checkid(){
      let userid:string;
      this.user.get( 'id/'+this.form.id , res =>{
          userid = res;
          this.isIDexists = false;
      }, error => this.isIDexists = true )

      
  }

  updateProfile( callback ){
    this.loading = true;
    this.user.update( this.form.uid, this.form,
            () => {
                console.log(`user update: ${this.form.uid} : success.`);
                callback();
            } ,
            e => console.error( `user update: ${this.form.uid} : failure: `, e ),
            () => { this.loading = false; }
        );
  }

  updateLMSprofile(){
      this.lms.update( this.form , res =>{
          console.log(' lms user updated ' + res );
          this.activeModal.close();
      }, err =>{})
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