import {Directive, AfterViewInit } from '@angular/core';

declare var componentHandler: any;

@Directive({
    selector: '[mdl]'
})
export class MDLDirective implements AfterViewInit {

    ngAfterViewInit() {
        componentHandler.upgradeAllRegistered();
    }

}
