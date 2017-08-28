import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AlertService } from './alert.service';

@Component({
    selector: 'alert',
    templateUrl: './alert.component.html'
})

export class AlertComponent implements OnDestroy {
    private subscription: Subscription;
    message: any;

    constructor(private _alertSrvc: AlertService) { 
        this.subscription = _alertSrvc.getMessage().subscribe(message => { this.message = message; });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}