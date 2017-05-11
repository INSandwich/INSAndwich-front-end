import { Component, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import * as $ from 'jquery';

import { NotifService } from '../../services/index';

@Component({
    moduleId: module.id.toString(),
    selector: 'notification',
    template: `
    <div class="insandwich-notif" [class.insandwich-notif-failure]="!success" [class.insandwich-notif-success]="success">
      <div class="insandwich-notif-wrapper">
        <div class="insandwich-notif-title">{{ Title }}</div>
        <div class="insandwich-notif-message">{{ Message }}</div>
      </div>
    </div>
    `
})

export class NotificationsComponent implements OnInit, OnDestroy {
    private element: JQuery;
    private Title: string = "Sample Title";
    private Message: string = "Sample Message";
    private success: boolean = true;

    constructor(private notifService: NotifService, private el: ElementRef) {
        this.element = $(el.nativeElement);
    }

    ngOnInit(): void {
        let notif = this;
        this.notifService.setNotifElement(this);
        this.close();
    }

    // remove self from modal service when directive is destroyed
    ngOnDestroy(): void {
        this.element.remove();
    }

    // open modal
    open(title: string, message: string, success: boolean): void {
        this.Title = title;
        this.Message = message;
        this.success = success;
        this.element.show();
    }

    // close modal
    close(): void {
      //console.log(this.element);
      this.element.hide();
    }
}
