import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../api/firebase-api-2.0/user';

@Component({
    selector: 'findID-component',
    templateUrl: 'find-id.html'
})

export class FindIdModal{
    show:boolean = false;
    id:string = '';
    email:string;

    constructor(
        private activeModal : NgbActiveModal,
        private user        : User
    ){}

  onClickDismiss(){
    this.activeModal.close();
  }


  onClickFindID(){
      this.user.get( this.email.replace('@', '+').replace('.', '+'), res =>{
          console.log('res ' + JSON.stringify(res))
            this.user.get( res['uid'] , re =>{
                console.log('re ' + JSON.stringify(re))
                this.id = re['id'];
    
            })
      }, error => console.error(' error ' +error ), 
      ()=>{})
  }




}