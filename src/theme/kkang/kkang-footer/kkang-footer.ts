import { Component } from '@angular/core';
import { App } from '../../../providers/app';
@Component({
    selector: 'kkang-footer-component',
    templateUrl: 'kkang-footer.html'
})
export class KkangFooterComponent {
    constructor( private app: App) {}
    onClickPanelMenu( name ) {
        this.app.scrollTo( name );
    }
}