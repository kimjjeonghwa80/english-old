import { Component, Input } from '@angular/core';
import { LMS } from '../../providers/lms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'teacher-component',
    templateUrl: 'teacher.html'
})
export class TeacherComponent {
    @Input() teachers;
    playVideo:boolean = false;
    showMore:boolean = false;
    first_9_teachers:any = [];
    whole_teacher:any = [];
    constructor( public lms: LMS,public sanitizer: DomSanitizer) {
    }
    ngOnChanges(changes) {
        if(changes['teachers']) {
            if(!this.teachers) return;
            this.teachers.forEach( (teacher) => {
                console.log(teacher);
                teacher.id = teacher.id.replace('ontue_', '');
                teacher.id = teacher.id.replace('_ontue', '');
                teacher.id = teacher.id.replace( /[0-9]+/, '' ); ////\\\\///
                teacher.play_video = false;
                teacher.show_more_greeting = false;
                if( teacher.url_youtube.match(/http :\/\//g))  teacher.url_youtube = teacher.url_youtube.replace(/http :\/\//g, 'http://');
                if( teacher.url_youtube.match(/^http:\/\//i)) teacher.url_youtube = teacher.url_youtube.replace(/^http:\/\//i, 'https://');//replace http to https
                if( teacher.url_youtube.match(/youtu.be/g)) teacher.url_youtube = teacher.url_youtube.replace(/youtu.be/g, 'youtube.com/embed');//replace youtu.be to youtube.com/embed
                if( teacher.greeting.match(/<img[^>]*>|<br.*>|&nbsp;/g)) teacher.greeting = teacher.greeting.replace(/<img[^>]*>|<br.*>|&nbsp;/g,"");//remove br tag img tag or &nbsp
                if( teacher.greeting.match(/(<([^>]+)>)/g)) teacher.greeting = teacher.greeting.replace(/(<([^>]+)>)/g,"");
                teacher.img_youtube = teacher.url_youtube.replace(/embed/g,"vi");
                teacher.img_youtube = teacher.img_youtube.replace(/youtube.com/g,"img.youtube.com")+"/mqdefault.jpg";
                teacher.img_youtube = this.sanitizer.bypassSecurityTrustUrl(teacher.img_youtube );//to fix unsafe
                teacher.url_youtube = teacher.url_youtube + "?autoplay=1&autohide=1&controls=0&border=0&scrolling=no";
                teacher.url_youtube = this.sanitizer.bypassSecurityTrustResourceUrl(teacher.url_youtube );//to fix unsafe
            });
        }
        console.log("teacher",this.teachers);
        this.whole_teacher = this.teachers;
        this.takeSomeTemporaryTeachers();
        //console.log(this.temp);
        // this.teachers = _.take( this.teachers, this.no_teacher_show_by_defualt);

    }
    takeSomeTemporaryTeachers() {
        this.teachers = this.teachers.slice( 0, 9 );
    }
    isArray( obj ) {
        if (obj.constructor.toString().indexOf('Array') == -1) return false;
        
        return true;
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
            this.teachers = this.whole_teacher;
        }
        else {
            this.takeSomeTemporaryTeachers();
            // this.teachers = _.take( this.teachers, this.no_teacher_show_by_defualt);
           
        }
    }
}