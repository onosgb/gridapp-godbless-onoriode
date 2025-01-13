import { Component, ViewChild } from '@angular/core';
import {
  IgxGridComponent,
  IgxGridModule,
  IgxLinearProgressBarComponent,
  IgxRippleModule,
} from 'igniteui-angular';
import { athletesData } from '../../data/athletsData';
import { IgxPreventDocumentScrollModule } from '../../directives/prevent-scroll.directive';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-paging',
  standalone: true,
  imports: [
    IgxPreventDocumentScrollModule,
    IgxGridModule,
    IgxRippleModule,
    IgxLinearProgressBarComponent,
    DecimalPipe,
  ],
  templateUrl: './paging.component.html',
  styleUrl: './paging.component.scss',
})
export class PagingComponent {
  @ViewChild('grid1', { static: true }) public grid1!: IgxGridComponent;
  public data: any[] = [];

  public ngOnInit(): void {
    this.data = athletesData;
  }
}
