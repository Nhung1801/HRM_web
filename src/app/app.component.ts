import { Component, effect, OnInit } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';

import { ToolbarModule } from 'primeng/toolbar';
import { Observable } from 'rxjs';
import { LoadingService } from './core/services/global/loading.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    providers: [MessageService],
})
export class AppComponent implements OnInit {
    isLoading$: Observable<boolean>;
    constructor(
        private primengConfig: PrimeNGConfig,
        private loadingService: LoadingService
    ) {
        this.isLoading$ = this.loadingService.loading$;
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }
}
