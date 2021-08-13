import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { OfferService } from 'src/app/offers/services/offer.service';
import { CityService } from 'src/app/shared/services/dashboard/city.service';
import { environment } from 'src/environments/environment';
import { SubcatmappingService } from '../../../../user-pages/services/subcatmapping.service';

@Component({
  selector: 'app-offerlist',
  templateUrl: './offerlist.component.html',
  styleUrls: ['./offerlist.component.scss']
})
export class OfferlistComponent implements OnInit {
  @ViewChild(Table, { static: false }) dataTableComponent: Table;
  Id: number = null;
  Cityid: number = null;
  cities = [];
  offerLists: any;
  blocked: boolean;
  TotalRecords: any;
  searchModel: any;
  BrandList: any;
  isInvalid: boolean;
  baseURL: any;
  displayOfferDetail: boolean;
  ShowDetail: any;
  AddOffer: any;
  columns = [
    // { field: 'OfferId', header: 'OfferId' },
    { field: 'OfferName', header: 'OfferName' },
    { field: 'OfferCode', header: 'Code' },
    { field: 'OfferOn', header: 'OfferOn' },
    { field: 'start', header: 'start' },
    { field: 'end', header: 'end' },
    { field: 'WarehouseName', header: 'Warehouse' },
    // { field: 'OfferAppType', header: 'AppType' },
    { field: 'IsActive', header: 'IsActive' },
    { field: 'CreatedDate', header: 'Created' }
  ];
  subcateid: number;
  subcateName: string;
  constructor(private router: Router, private r: ActivatedRoute, private cityService: CityService, private OfferService: OfferService, private messageService: MessageService, public SubcatmappingService: SubcatmappingService) { this.searchModel = {}; this.baseURL = environment.apiBaseUrl; }

  ngOnInit() {
    this.subcateid = parseInt(localStorage.getItem('SubCatId'));
    this.subcateName = localStorage.getItem('subcateName');

    if (!this.subcateid) {
      this.router.navigateByUrl('/user-pages/subcatselection');
    }
    this.cityService.GetAllCity().subscribe(results => {
      this.cities = results;
    });
  }
  onCityChange() {

    if (this.Cityid > 0 && this.subcateid > 0) {
      this.searchModel.cityId = this.Cityid;
      this.dataTableComponent.reset();
    }
  }
  load(event) {

    this.searchModel.First = (event.first == 0 || event.first) ? event.first + 1 : this.searchModel.First;
    this.searchModel.Last =20;// event.rows ? event.first + event.rows : this.searchModel.Last;

    var page = this.searchModel.Last / event.rows;
    if (this.Cityid > 0 && this.subcateid > 0) {
      this.searchModel.CityId = this.Cityid;
      this.blocked = true;
      this.offerLists = [];
      this.TotalRecords = 0;
      this.OfferService.getOfferMaster(this.searchModel).subscribe(res => {
        this.blocked = false;
        if (res.total_count > 0) {
          this.offerLists = res.OfferListDTO;
          this.TotalRecords = res.total_count;
        }
      });
    }

  }
  addoffer() { this.router.navigateByUrl('/offer/addoffer'); }


  ShowDetails(row) {
 
    this.ShowDetail = null;

    // this.ShowDetail = row;
    this.AddOffer = row;
    this.displayOfferDetail = true;
  }
  updateOffer(OfferId, IsActive) {
    if (this.Cityid > 0 && this.subcateid > 0) {
      this.OfferService.ActiveOrDeactiveOffer(OfferId, IsActive).subscribe(res => {
        this.blocked = false;
        alert(res);
      });
    }

  }
}
