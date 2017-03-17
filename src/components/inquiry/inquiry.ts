import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QnaPostComponent } from '../modals/qna_post/post';
import { Post } from './../../angular-backend/post';
import { POST_RESPONSE } from './../../angular-backend/interface';
import { App } from '../../providers/app';
@Component({
    selector: 'inquiry-component',
    templateUrl: 'inquiry.html'
})
export class InquiryComponent {
    postList: Array<POST_RESPONSE>;
    constructor( private modal: NgbModal,
                private post: Post,
                private app: App ) {
                this.getPostList();
                this.listenEvents();
    }
    listenEvents(){
        this.app.myEvent.subscribe( item =>{
            if( item.eventType == 'post'  ){
              this.getPostList()
            }
        })
    }
    getPostList() {
        this.post.list().subscribe( (res: Array<POST_RESPONSE>) => {
            this.getDataSuccess( res );
            console.log("getPostList:",res);
        }, error => {
            this.error( error );
        } );
    }
    getDataSuccess( res: Array<POST_RESPONSE> ) {
        res.forEach( ( re:POST_RESPONSE )=> {
            re.created = new Date(parseInt(re.created)).toLocaleDateString();
        });
        this.postList = res;
    }
    error( error ) {
        return this.post.errorResponse( error );
    }
    onClickPost() {
        this.modal.open( QnaPostComponent ).result.then( () => {
        }).catch( e => console.log('exit ' + e ) );
    }


}