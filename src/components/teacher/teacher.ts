import { Component, Input } from '@angular/core';
import { LMS } from '../../providers/lms';
import { DomSanitizer } from '@angular/platform-browser';
import * as _ from 'lodash';
@Component({
    selector: 'teacher-component',
    templateUrl: 'teacher.html'
})
export class TeacherComponent {
    @Input() teachers;
    playVideo:boolean = false;
    showMore:boolean = false;
    temp:any = [];
    constructor( public lms: LMS,public sanitizer: DomSanitizer) {
    }
    ngOnChanges(changes) {
        if(changes['teachers']) {
            if(!this.teachers) return;
            this.teachers.forEach( (teacher) => {
                teacher.play_video = false;
                if( teacher.url_youtube.match(/^http:\/\//i)) teacher.url_youtube = teacher.url_youtube.replace(/^http:\/\//i, 'https://');//replace http to https
                if( teacher.url_youtube.match(/youtu.be/g)) teacher.url_youtube = teacher.url_youtube.replace(/youtu.be/g, 'youtube.com/embed');//replace youtu.be to youtube.com/embed
                if( teacher.greeting.match(/<img[^>]*>|&nbsp;/g)) teacher.greeting = teacher.greeting.replace(/<img[^>]*>|&nbsp;/g,"");//remove img tag or &nbsp
                teacher.url_youtube = teacher.url_youtube + "?autoplay=1";
                teacher.url_youtube = this.sanitizer.bypassSecurityTrustResourceUrl(teacher.url_youtube );//to fix unsafe
            });
        }
        this.temp = this.teachers;
        //console.log(this.temp);
        this.teachers = _.take( this.teachers, 6);
    }
    // changeHttpToHttps( data ) {
    //     if( data.match('^http://')) data = data.replace(/^http:\/\//i, 'https://');
    // }
    // changeYoutubeEmbed( data ) {
    //     if( data.match(/youtu.be/g)) data = data.replace(/youtu.be/g, 'youtube.com/embed');
    // }
    // removeImageTag( data ) {
    //     if( data.match(/<img[^>]*>/g)) data = data.replace(/<img[^>]*>/g,"");
    // }
    onClickShowMore() {
        this.showMore =!this.showMore;
        if(this.showMore) {
            this.teachers = this.temp;
        }
        else {
            this.temp = this.teachers;
            this.teachers = _.take( this.teachers, 6);
        }
    }
}