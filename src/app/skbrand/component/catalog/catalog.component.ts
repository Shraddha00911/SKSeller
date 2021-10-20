import { Component, OnInit } from '@angular/core';
import { SkbrandService } from '../../services/skbrand.service';
import {ToastrService} from 'ngx-toastr'
@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  [x: string]: any;

  constructor(
    protected _services: SkbrandService,
    public toastr: ToastrService
  ) {
    this.setSubcateId = localStorage.getItem("SubCatId");
   }

  companyCatelogObj:any = {};
  catelogBrandArr:any = [];
  catelogBrandItemArr:any = [];
  allCityArr:any = [];
  subcateid:any = 0;
  cityId:any = 0;
  categorType:string;
  activeClass:string = "nav-link";
  brandId:any = 0;
  allCatListName:any = [];
  setSubcateId:any = 0;
  intialLoader :boolean = false;
  noRecordFound:boolean = true;

  ngOnInit(): void {
    this.getAllCityFun()
    this.getAllCatList();
    this.subcateid = parseInt(localStorage.getItem('SubCatId'));
    this.companyCatelogObj = {}
    this.catelogBrandArr = [];
    this.catelogBrandItemArr = [];
    this.allCityArr= [];
    this.cityId = 0;
    this.brandId = 0;
    this.categorType = "TotalItem";
    this.allCatListName = [];
    this.intialLoader = false;
    this.noRecordFound = true;
    this.getCompanyCatelogFun();

  }

  searchResult(){
    this.getCompanyCatelogFun();
  }

  getAllCityFun() {    
    this._services.GetAllCity().subscribe(res=>{
      if(res){
        this.allCityArr = res;
        // this.cityId = this.allCityArr[0]['Cityid'];
      }else{
        this.allCityArr = [];
      }
    }),(err)=>{
      alert("Server error :" +err)
    }
  }

  selectCity(e){
    this.cityId = Number(e);
  }

  getAllCatList() {
    this._services.GetAllSubCatMapping().subscribe(result=>{
      this.allCatListName = result; 
      this.intialLoader = false;

    })
  }

  selectCatValue(catValue,selectType) {
    switch (selectType) {
      case 'Category': {
        this.catSelctValue =  catValue;
        localStorage.setItem('SubCatId', this.catSelctValue);
        break
      }
    }
    
  }

  getCompanyCatelogFun() {  
    this.intialLoader = true;
    this.noRecordFound = false;
    this.companyCatelogObj = {};  
    const searchData = {
      "CompanyId": this.subcateid,
      "CityId": this.cityId
      }
    this._services.GetCompanyCatelog(searchData).subscribe(res=>{
      if(res){
        console.log(res);
        this.companyCatelogObj = res;
        this.getCompanyCatelogBrandFun()
         // TotalItem/ActiveItem/StockOut/LowStock
        this.intialLoader = false;
        this.noRecordFound = false;
        this.categorType = "TotalItem";
      }else{
        this.companyCatelogObj = {};
        this.intialLoader = false;
        this.noRecordFound = true;
        this.toastr.info('No Record Found', 'Info!', {
          timeOut: 1000
        });
      }
    }),(err)=>{
      alert("Server error :" +err)
    }
  }

  selectCategoryTab(tab){
   this.categorType = tab;
   this.activeClass = "nav-link active";
   this.getCompanyCatelogBrandFun()
  }


  getCompanyCatelogBrandFun() { 
    this.intialLoader = true;
    const searchData = {
      "CompanyId":this.subcateid,
      "CityId":this.cityId,
      "Type": this.categorType   //TotalSale/ActiveItem/StockOut/LowStock
      }
      this.catelogBrandArr = [];
      this.catelogBrandItemArr = [];
      this._services.GetCompanyCatelogBrand(searchData).subscribe(res=>{
        if(res){
          this.catelogBrandArr = res;
          console.log(this.catelogBrandArr);

          const lookupObj = this.catelogBrandArr.reduce((a, e) => {
            a[e.CategoryName] = ++a[e.CategoryName] || 0;
            return a;
          }, {});

          var arrayData = this.catelogBrandArr.filter(e => lookupObj[e.CategoryName])
          if(arrayData.length>0){
            this.catelogBrandArr.forEach(element => {
              var dataArry = [];
              arrayData.forEach(ele => {
                  if(element['CategoryName'] == ele['CategoryName']){
                    dataArry.push(ele)
                    element['categorySameArray'] = dataArry;
                  }
              });
          });
          }else{
            this.catelogBrandArr['categorySameArray'] = [];
          }
          this.catelogBrandArr = this.uniqueByKey(this.catelogBrandArr, "CategoryName") 

          this.catelogBrandArr.forEach(element => {
              if(element &&  element['categorySameArray']  && element['categorySameArray'].length>0 ){
                var total_item = 0;
                element['categorySameArray'].forEach(ele => {
                  total_item += ele['ItemCount'];
                });
                element['TotalItem'] = "Total Item "+"("+total_item +")";
              }else{
                element['TotalItem'] = "Total Item "+"("+ element["ItemCount"]+")"; 
              }
          });
          this.intialLoader = false;  
          this.noRecordFound = false;    
        }else{
          this.catelogBrandArr = [];
          this.intialLoader = false;  
          this.noRecordFound = true;    
        }
      }),(err)=>{
        alert("Server error :" +err)
      }
  }

  selectBrandName(brandId){
    this.brandId = brandId;
    this.getCompanyCatelogBrandItemFun()
   }

  getCompanyCatelogBrandItemFun() {    
    const searchData = {
      "CompanyId": this.subcateid,
      "CityId": this.cityId,
      "Type": this.categorType,   //TotalSale/ActiveItem/StockOut/LowStock
      "BrandId": this.brandId
      }
    this.catelogBrandItemArr = [];
    this._services.GetCompanyCatelogBrandItem(searchData).subscribe(res=>{
      console.log(res)
      if(res){
        this.catelogBrandItemArr = res;
      }else{
        this.catelogBrandItemArr = [];
      }
    }),(err)=>{
      alert("Server error :" +err)
    }

  }

  uniqueByKey(array, key) {
    return [...new Map(array.map((x) => [x[key], x])).values()];
  }


}
