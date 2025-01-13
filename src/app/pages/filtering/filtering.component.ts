import { Component, ViewChild } from '@angular/core';
import { DATA } from '../../data/nwindData';
import {
  IgxGridComponent,
  IgxStringFilteringOperand,
  IgxGridModule,
  IgxRippleModule,
  IgxInputGroupModule,
} from 'igniteui-angular';
import { IgxPreventDocumentScrollModule } from '../../directives/prevent-scroll.directive';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-filtering',
  standalone: true,
  imports: [
    IgxPreventDocumentScrollModule,
    IgxGridModule,
    IgxRippleModule,
    IgxInputGroupModule,
    CurrencyPipe,
  ],
  templateUrl: './filtering.component.html',
  styleUrl: './filtering.component.scss',
})
export class FilteringComponent {
  @ViewChild('grid1', { read: IgxGridComponent, static: true })
  public grid1!: IgxGridComponent;

  public data: any[] = [];

  constructor() {}
  public ngOnInit(): void {
    this.data = DATA;
  }

  public filter(target: EventTarget) {
    this.grid1.filter(
      'ProductName',
      (target as HTMLInputElement).value,
      IgxStringFilteringOperand.instance().condition('contains')
    );
  }

  public formatDate(val: Date) {
    return new Intl.DateTimeFormat('en-US').format(val);
  }

  public formatCurrency(val: string) {
    return parseInt(val, 10).toFixed(2);
  }
}
