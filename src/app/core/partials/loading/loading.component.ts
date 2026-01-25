import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../services/global/loading.service';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.css'],
})
export class LoadingComponent implements OnInit {
    loading$ = this.loadingService.loading$;
    constructor(private loadingService: LoadingService) {}
    ngOnInit() {}
}
