import { DecimalPipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  DefaultSortingStrategy,
  IgxGridComponent,
  IgxGridModule,
  IgxLinearProgressBarComponent,
  IgxRippleModule,
} from 'igniteui-angular';
import { FinancialData } from '../../data/financialData';
import { generateRandomInteger, generateRandomFloat } from '../../data/utils';
import { IgxPreventDocumentScrollModule } from '../../directives/prevent-scroll.directive';

@Component({
  selector: 'app-sorting',
  standalone: true,
  imports: [IgxPreventDocumentScrollModule, IgxGridModule, IgxRippleModule],
  templateUrl: './sorting.component.html',
  styleUrl: './sorting.component.scss',
})
export class SortingComponent implements OnInit, AfterViewInit {
  @ViewChild('grid1', { static: true }) public grid!: IgxGridComponent;
  public data: any;

  public ngOnInit(): void {
    const typeArr = ['Gold', 'Silver', 'Coal'];
    this.data = FinancialData.generateData(1000).map((dataObj) => {
      const type = typeArr[generateRandomInteger(0, 2)];
      switch (type) {
        case 'Gold':
          dataObj['Type'] = 'Gold';
          dataObj['Price'] = generateRandomFloat(1261.78, 1302.76);
          dataObj['Buy'] = generateRandomFloat(1261.78, 1280.73);
          break;
        case 'Silver':
          dataObj['Type'] = 'Silver';
          dataObj['Price'] = generateRandomFloat(17.12, 17.73);
          dataObj['Buy'] = generateRandomFloat(17.12, 17.43);
          break;
        case 'Coal':
          dataObj['Type'] = 'Coal';
          dataObj['Price'] = generateRandomFloat(0.4, 0.42);
          dataObj['Buy'] = generateRandomFloat(0.42, 0.46);
          break;
      }
      return dataObj;
    });
  }

  public ngAfterViewInit() {
    const expressions: any[] = [];
    this.grid.columns.forEach((c) => {
      const sortExpr = {
        dir: generateRandomInteger(1, 2),
        fieldName: c.field,
        ignoreCase: true,
        strategy: DefaultSortingStrategy.instance(),
      };
      expressions.push(sortExpr);
    });
    this.grid.sortingExpressions = expressions;
    this.grid.cdr.detectChanges();
  }
  public formatCurrency(value: number) {
    return '$' + value.toFixed(2);
  }
}
