import { Component, Input } from '@angular/core';
import { LMS } from '../../providers/lms';
@Component({
    selector: 'teacher-component',
    templateUrl: 'teacher.html'
})
export class TeacherComponent {
    @Input() teachers;
    playYoutube:boolean = false;
    constructor( public lms: LMS ) {
    }
    ngOnChanges(changes) {
        if(changes['teachers']) {
            if(!this.teachers) return;
            console.log(this.teachers)
            this.teachers.forEach( (teacher) => {
                if( teacher.url_youtube.match('^http://')){
                    teacher.url_youtube = teacher.url_youtube.replace(/^http:\/\//i, 'https://');
                }
                if( teacher.url_youtube.match(/youtu.be/g)){
                    teacher.url_youtube = teacher.url_youtube.replace(/youtu.be/g, 'youtube.com/embed');
                }
                console.log(teacher);
            });
        }
    }
}