import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ExportServiceService } from '../services/export-service.service';
import { HistoryService } from '../services/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  @ViewChild('table', { static: false }) table: ElementRef;
  @Input() entity : any;
  @Input() id : any;
  EntityHistory: any;
  isHistory : any;
  editPrice : boolean =false;
  constructor(private historyService : HistoryService , private exportService : ExportServiceService) { this.EntityHistory = {} }

  ngOnInit() {
  
    this.isHistory = true;
    this.historyService.getHistory(this.entity , this.id).subscribe(result => {
      console.log(result);
      if(result == null || result.AuditEntity == null){
        this.isHistory = false;
      }else{
        this.isHistory = true;
        this.EntityHistory = result;
      }
      
    })

  
}
onExport(){
 
      this.exportService.ExportToExcel(this.table,"history_data");
}

}

