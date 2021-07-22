import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '../spinner/spinner.component';
import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BlockUIModule } from 'primeng/blockui';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Checkbox, CheckboxModule } from 'primeng/checkbox';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {MultiSelectModule} from 'primeng/multiselect';
import { NgSelectModule } from '@ng-select/ng-select';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { HistoryComponent } from '../history/history.component';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    SpinnerComponent,
    HistoryComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    AccordionModule,
    CalendarModule,
    BlockUIModule,
    ToastModule,
    AutoCompleteModule,
    AgmCoreModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    SpinnerComponent,
    AccordionModule,
    CalendarModule,
    TableModule,
    BlockUIModule,
    ToastModule,
    DialogModule,
    ConfirmDialogModule,
    CheckboxModule,
    ProgressSpinnerModule,
    MultiSelectModule,
    NgSelectModule,
    AutoCompleteModule,
    AgmCoreModule,
    HistoryComponent
  ],
  providers: [
    ConfirmationService,
    MessageService,
  ]
})
export class SellerExportSharedModule { }
