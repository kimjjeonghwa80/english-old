import { Component } from '@angular/core';
import { App } from '../../../../providers/app';
@Component({
    selector: 'big-header-component',
    templateUrl: 'big-header.html'
})
export class BigHeaderComponent {
    constructor( public app: App ) {
        
    }
}