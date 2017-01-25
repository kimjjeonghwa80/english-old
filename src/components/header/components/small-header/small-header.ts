import { Component } from '@angular/core';
import { App } from '../../../../providers/app';
@Component({
    selector: 'small-header-component',
    templateUrl: 'small-header.html'
})
export class SmallHeaderComponent {
    constructor( public app: App ) {

    }
}