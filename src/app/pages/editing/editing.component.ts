import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  IgxSummaryResult,
  IgxNumberSummaryOperand,
  IgxGridComponent,
  IgxDialogComponent,
  IgxToastComponent,
  VerticalAlignment,
  IgxButtonModule,
  IgxCheckboxModule,
  IgxComboModule,
  IgxDatePickerModule,
  IgxDialogModule,
  IgxGridModule,
  IgxIconModule,
  IgxInputGroupModule,
  IgxRippleModule,
  IgxToastModule,
  IgxFocusDirective,
} from 'igniteui-angular';
import { DATA, LOCATIONS } from '../../data/nwindData';
import { Product } from '../../data/product';
import { IgxPreventDocumentScrollModule } from '../../directives/prevent-scroll.directive';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
class NumberSummary {
  public operate(data: any[]): IgxSummaryResult[] {
    const result = [];
    result.push({
      key: 'max',
      label: 'Max',
      summaryResult: IgxNumberSummaryOperand.max(data),
    });
    result.push({
      key: 'sum',
      label: 'Sum',
      summaryResult: IgxNumberSummaryOperand.sum(data),
    });
    result.push({
      key: 'avg',
      label: 'Avg',
      summaryResult: IgxNumberSummaryOperand.average(data),
    });
    return result;
  }
}
@Component({
  selector: 'app-editing',
  standalone: true,
  imports: [
    IgxPreventDocumentScrollModule,
    IgxButtonModule,
    IgxCheckboxModule,
    IgxDatePickerModule,
    IgxDialogModule,
    IgxGridModule,
    IgxInputGroupModule,
    IgxIconModule,
    IgxComboModule,
    IgxToastModule,
    IgxRippleModule,
    IgxFocusDirective,
    DatePipe,
    FormsModule,
  ],
  templateUrl: './editing.component.html',
  styleUrl: './editing.component.scss',
})
export class EditingComponent implements OnInit, AfterViewInit {
  @ViewChild('grid1', { read: IgxGridComponent, static: true })
  public grid1!: IgxGridComponent;
  @ViewChild('dialogAdd', { read: IgxDialogComponent, static: true })
  public dialog!: IgxDialogComponent;
  @ViewChild('toast', { read: IgxToastComponent, static: false })
  public toast!: IgxToastComponent;
  public data: any[] = [];
  public locations: {
    shop: string;
    lastInventory: string;
  }[] = [];
  public product: any;
  public customOverlaySettings: any;
  public id!: number;
  public numSummary = NumberSummary;

  public ngOnInit() {
    this.data = DATA.map((e) => {
      const index = Math.floor(Math.random() * LOCATIONS.length);
      const count = Math.floor(Math.random() * 3) + 1;
      e.Locations = [...LOCATIONS].splice(index, count);
      return e;
    });
    this.id = this.data.length;
    this.product = new Product(this.id);
    this.locations = LOCATIONS;
  }

  public ngAfterViewInit() {
    this.customOverlaySettings = {
      outlet: this.grid1.outlet,
    };
  }

  public removeRow(rowIndex: any): void {
    const row: any = this.grid1.getRowByIndex(rowIndex);
    if (row) {
      row.delete();
    }
  }

  public addRow() {
    const id = this.product.ProductID;
    this.grid1.addRow(this.product);
    this.grid1.cdr.detectChanges();
    this.cancel();
    this.grid1.paginator.page = this.grid1.paginator.totalPages - 1;
    this.grid1.cdr.detectChanges();
    let row: any;
    requestAnimationFrame(() => {
      const index = this.grid1.filteredSortedData
        ? this.grid1.filteredSortedData
            .map((rec) => rec['ProductID'])
            .indexOf(id)
        : (row = this.grid1.getRowByKey(id) ? row.index : undefined);
      this.grid1.navigateTo(index, -1);
    });
  }

  public cancel() {
    this.dialog.close();
    this.id++;
    this.product = new Product(this.id);
  }

  // eslint-disable-next-line @typescript-eslint/member-delimiter-style
  public parseArray(arr: { shop: string; lastInventory: string }[]): string {
    return (arr || []).map((e) => e.shop).join(', ');
  }

  public show(args: any) {
    const message = `The product: {name: ${args.data.ProductName}, ID ${args.data.ProductID} } has been removed!`;
    this.toast.positionSettings.verticalDirection = VerticalAlignment.Middle;
    this.toast.open(message);
  }
}
