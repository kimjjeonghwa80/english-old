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
    constructor( public lms: LMS,public sanitizer: DomSanitizer) {
    }
    ngOnChanges(changes) {
        if(changes['teachers']) {
            if(!this.teachers) return;
            console.log(this.teachers)
            this.teachers.forEach( (teacher) => {
                teacher.play_video = false;
                if( teacher.url_youtube.match('^http://')) teacher.url_youtube = teacher.url_youtube.replace(/^http:\/\//i, 'https://');//replace http to https
                if( teacher.url_youtube.match(/youtu.be/g)) teacher.url_youtube = teacher.url_youtube.replace(/youtu.be/g, 'youtube.com/embed');//replace youtu.be to youtube.com/embed
                teacher.url_youtube = teacher.url_youtube + "?autoplay=1";
                teacher.url_youtube = this.sanitizer.bypassSecurityTrustResourceUrl(teacher.url_youtube );//to fix unsafe
            });
        }
    }
}