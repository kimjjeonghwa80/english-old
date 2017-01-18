import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../../api/firebase-api-2.0/user';

@Component({
    selector: 'findID-component',
    templateUrl: 'find-id.html'
})

export class FindIdModal implements OnInit{
    loading:boolean = false;
    id:string = '';
    email:string;

    constructor(
        private activeModal : NgbActiveModal,
        private user        : User
    ){}
  ngOnInit(){
      
  }
  onClickDismiss(){
    this.activeModal.close();
  }


  onClickFindID(){
      this.loading = true;
      this.user.get( this.email.replace('@', '+').replace('.', '+'), res =>{
          console.log('res ' + JSON.stringify(res))        
            this.user.get( res.uid , re =>{
                
                this.id = re['id'];
                console.log('id ' + this.id )
            })
      }, error => console.error(' error ' +error ), 
      ()=>this.loading = false)
  }

}