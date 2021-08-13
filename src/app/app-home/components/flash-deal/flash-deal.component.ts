
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { AppHomeService } from '../../services/app-home.service';

@Component({
  selector: 'app-flash-deal',
  templateUrl: './flash-deal.component.html',
  styleUrls: ['./flash-deal.component.scss']
})
export class FlashDealComponent implements OnInit {

  @Input() mainimage: any;
  @Input() indexOfItem: any;
  @Input() BaseCategories: any;
  @Input() categorys: any;
  @Input() subsubcats: any;
  @Input() Items: any;
  @Input() j: any;
  @Input() showMobileView: any;
  @Input() currentToggleIndex: any;
  @Input() RedirectionID: any;
  @Output() addNewSection = new EventEmitter();
  @Output() addSection = new EventEmitter();
  @Output() removeTile = new EventEmitter();
  MoqList = [];
  blocked = false;
  itemidtemp; any;
  copyItems: any;
  IsEditable: boolean;
  MOQItemId: any;
  constructor(private appphomeservice: AppHomeService) { }

  ngOnInit() {
 
    console.log(this.mainimage);

    this.copyItems = this.Items;
    if (this.mainimage && this.mainimage.SectionItemID > 0 && this.mainimage.MOQ) {
      this.IsEditable = true;
    }
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
   
    this.itemidtemp = simpleChanges.RedirectionID.currentValue;
    if (!this.itemidtemp) {
      this.MOQItemId = null;
    }

    simpleChanges && simpleChanges.RedirectionID && simpleChanges.RedirectionID.currentValue ?
      this.appphomeservice.getMOQByItemId(simpleChanges.RedirectionID.currentValue).subscribe(result => {

        this.MoqList = result;
        if (this.mainimage && this.mainimage.MOQ == undefined) {
          this.IsEditable = false;
        }

        this.blocked = false;
      })
      : ''
  }

  ItemValue(MOqItemId) {
 
    console.log(this.itemidtemp);
    this.copyItems.forEach((item, index) => {
      if (item.ItemId == MOqItemId) {
        this.mainimage.UnitPrice = item.UnitPrice;
        this.mainimage.PurchasePrice = item.PurchasePrice;
        this.mainimage.MOQ = item.MinOrderQty;
        this.mainimage.ItemId = item.ItemId;

      }
    })
  }
}
