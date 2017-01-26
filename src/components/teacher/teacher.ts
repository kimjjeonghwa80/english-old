import { Component, Input } from '@angular/core';
import { LMS } from '../../providers/lms';
@Component({
    selector: 'teacher-component',
    templateUrl: 'teacher.html'
})
export class TeacherComponent {
    @Input() teachers;
    constructor( public lms: LMS ) {}
}