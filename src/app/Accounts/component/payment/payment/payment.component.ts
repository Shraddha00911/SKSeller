import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExportServiceService } from 'src/app/shared/services/export-service.service';
import { PaymentService } from '../../../services/payment.service'
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  blocked: boolean;
  subcateid: number;
  subcateName: string;
  Isdisplay: boolean;
  Months = [
    { "Name": "January", id: 1 },
    { "Name": "February", id: 2 },
    { "Name": "March", id: 3 },
    { "Name": "April", id: 4 },
    { "Name": "May", id: 5 },
    { "Name": "June", id: 6 },
    { "Name": "July", id: 7 },
    { "Name": "August", id: 8 },
    { "Name": "September", id: 9 },
    { "Name": "October", id: 10 },
    { "Name": "November", id: 11 },
    { "Name": "December", id: 12 }
  ];
  YearList = [
    { "Name": "2021", id: 2021 },
    { "Name": "2022", id: 2022 },
    { "Name": "2023", id: 2023 },
    { "Name": "2024", id: 2024 }
  ];
  MonthId: number;
  YearId: number;
  charges: any;
  chargesdetail: any;
  ActivetedItemsdetail: any;
  SellerClosingLineItems: any;
  constructor(private router: Router, private exportService: ExportServiceService, private PaymentService: PaymentService) { }

  ngOnInit(): void {
    this.subcateid = parseInt(localStorage.getItem('SubCatId'));
    this.subcateName = localStorage.getItem('subcateName');
    if (!this.subcateid) {
      this.router.navigateByUrl('/user-pages/subcatselection');
    }
  }
  Search() {

    if (this.MonthId > 0 && this.YearId > 0) {
      this.blocked = true;
      this.PaymentService.GetSellerMonthlyChargeMaster(this.subcateid, this.MonthId, this.YearId).subscribe((res: any) => {
        this.blocked = false;
        this.charges = res;
      }, error => {
        this.blocked = false;
        alert('Something went wrong ');
      });
    } else {
      alert("Select Month and Year first");
    }
  }
  Detail(eventtype) {
    
    this.chargesdetail = null;
    this.ActivetedItemsdetail = null;
    this.SellerClosingLineItems = null;
    if (eventtype == "OPCharge" || eventtype == "DeliveryCharge") {
      this.blocked = true;
      this.PaymentService.GetSellerMonthlyChargeDetail(this.subcateid, this.MonthId, this.YearId, eventtype).subscribe((res: any) => {
        this.blocked = false;
        this.Isdisplay = true;
        this.chargesdetail = res;

      }, error => {
        this.blocked = false;
        alert('Something went wrong ');
      });
    } else if (eventtype == "ActivationCharge") {
      this.blocked = true;
      this.PaymentService.GetActivetedLineItems(this.subcateid, this.MonthId, this.YearId).subscribe((res: any) => {
        this.blocked = false;
        this.Isdisplay = true;
        this.ActivetedItemsdetail = res;

      }, error => {
        this.blocked = false;
        alert('Something went wrong ');
      });
    }
    else if (eventtype == "WarehouseCharge") {
      this.blocked = true;
      this.PaymentService.GetSellerClosingLineItems(this.subcateid, this.MonthId, this.YearId).subscribe((res: any) => {
        this.blocked = false;
        this.Isdisplay = true;
        this.SellerClosingLineItems = res;
      }, error => {
        this.blocked = false;
        alert('Something went wrong ');
      });
    }
    else {

    }
  }
  Export(eventtype) {

    if (this.MonthId > 0 && this.YearId > 0 && eventtype) {
      if (eventtype == "OPCharge") {
        this.blocked = true;
        this.PaymentService.GetExportSellerOPLineItems(this.subcateid, this.MonthId, this.YearId).subscribe((res: any) => {
          this.blocked = false;

          this.exportService.exportAsExcelFile(res, 'result');
        }, error => {
          this.blocked = false;
          alert('Something went wrong ');
        });
      }
      else if (eventtype == "DeliveryCharge") {
        this.blocked = true;
        this.PaymentService.GetExportDelChargeLineItems(this.subcateid, this.MonthId, this.YearId).subscribe((res: any) => {
          this.blocked = false;
          this.exportService.exportAsExcelFile(res, 'result');
        }, error => {
          this.blocked = false;
          alert('Something went wrong ');
        });
      }
      else if (eventtype == "ActivationCharge") {
        this.blocked = true;
        this.PaymentService.GetActivetedLineItems(this.subcateid, this.MonthId, this.YearId).subscribe((res: any) => {
          this.blocked = false;
          this.exportService.exportAsExcelFile(res, 'result');
        }, error => {
          this.blocked = false;
          alert('Something went wrong ');
        });
      }
      else if (eventtype == "WarehouseCharge") {
        this.blocked = true;
        this.PaymentService.GetSellerClosingLineItems(this.subcateid, this.MonthId, this.YearId).subscribe((res: any) => {
          this.blocked = false;
          this.exportService.exportAsExcelFile(res, 'result');
        }, error => {
          this.blocked = false;
          alert('Something went wrong ');
        });
      } else { }

    }
  }
  getTotalAmount() {  
    if (this.charges) {  
        return this.charges.map(t => t.ChargeAmount).reduce((a, value) => a + value, 0);  
    }  
    return 0;  
} 
}

