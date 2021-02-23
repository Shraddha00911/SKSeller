import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '../spinner/spinner.component';
import { TableModule } from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmationService, MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    AccordionModule,
    CalendarModule,
  ], 
  exports: [
    FormsModule,
    SpinnerComponent,
    AccordionModule,
    CalendarModule,
    TableModule,
  ],
  providers: [
    ConfirmationService,
    MessageService,
  ]
})
export class SellerExportSharedModule { }
