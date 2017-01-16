import { Injectable } from '@angular/core';
export const HEADER_HEIGHT: number = 86;
export const BIG_HEADER_HEIGHT: number = 12;
@Injectable()
export class App {
    width: number = 0;
    scrollId: string = null;
    constructor() {
    }
    /**
     * Everytime window resizes, this is set.
     */
    setWidth( width ) {
        this.width = width;
        // console.log("setWidth(): ", this._width);
    }
    private getWidth() {
        return this.width;
    }
    get widthSize() : 'small' | 'big' {
        if ( this.getWidth() < 760 ) return 'small';
        else return 'big';
    }
    get marginTop() {
        let margin_top = HEADER_HEIGHT;
        if ( this.widthSize == 'big' ) margin_top += BIG_HEADER_HEIGHT;
        return margin_top;
    }
    
        

    /**
     * @warning This may return false if this is called before 'deviceready'event fired.
     *  so, be sure you call it after 'deviceready' event.
     */
    isCordova () { 
        if ( !! window['cordova'] ) return true;
        if ( document.URL.indexOf('http://') === -1 && document.URL.indexOf('https://') === -1 ) return true;
        return false;
    }

    /**
     * @note No need to cache for speedup since it is only being called once every bounce time.
     */
    scrolled( event ) {
        console.log(event);
        let nodes = document.querySelectorAll('section.part');
        let parts = Array.from(nodes);
        let windowTop = this.getWindowOffset().top;
        console.log(`windows offset: `, windowTop);
        let selectedId = null;
        // console.log(parts);
        if ( parts && parts.length ) {
            for ( let i = 0, len = parts.length; i < len; i ++ ) {
                let el = parts[i];
                selectedId = el.id;
                let pos = null;
                if ( i < len - 1 ) {
                    let nextEl = parts[i + 1];
                    pos = this.getOffset( nextEl );
                    if ( pos.top > windowTop + this.marginTop ) break;
                }
                console.log( 'id:' + el.id + ', pos: ', pos);
            }
        }
        console.log('selected: ', selectedId);
        this.scrollId = selectedId;
        // console.log( this.getOffset(parts) );
    }

    /**
     * To get offset of an element.
     */
    getOffset(el) {
        el = el.getBoundingClientRect();
        return {
            left: el.left + window.scrollX,
            top: el.top + window.scrollY
        };
    }

    getWindowOffset() {
        return {
            top: window.pageYOffset || document.documentElement.scrollTop,
            left: window.pageXOffset || document.documentElement.scrollLeft
        };
    }

}