import { Component, OnInit } from '@angular/core';
import { SkbrandService } from '../../services/skbrand.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  [x: string]: any;

  constructor(
    protected _services: SkbrandService,
  ) { }

  companyCatelogObj:any = {};
  catelogBrandArr:any = [];
  catelogBrandItemArr:any = [];
  allCityArr:any = [];
  subcateid:any = 0;
  cityId:any = 0;
  categorType:string;
  activeClass:string = "nav-link";
  brandId:any = 0;

  ngOnInit(): void {
    this.getAllCityFun()
    // this.getCompanyCatelogBrandFun()
    // this.getCompanyCatelogBrandItemFun()
    this.subcateid = parseInt(localStorage.getItem('SubCatId'));
    this.companyCatelogObj = {}
    this.catelogBrandArr = [];
    this.catelogBrandItemArr = [];
    this.allCityArr= [];
    this.cityId = 0;
    this.brandId = 0;
    this.categorType = "TotalItem"
  }

  getAllCityFun() {    
    this._services.GetAllCity().subscribe(res=>{
      if(res){
        this.allCityArr = res;
        this.cityId = this.allCityArr[0]['Cityid'];
        this.getCompanyCatelogFun()
      }else{
        this.allCityArr = [];
      }
    }),(err)=>{
      alert("Server error :" +err)
    }
  }

  selectCity(e){
    this.cityId = Number(e);
    this.getCompanyCatelogFun()
  }

  getCompanyCatelogFun() {    
    const searchData = {
      "CompanyId": this.subcateid,
      "CityId": this.cityId
      }
    this._services.GetCompanyCatelog(searchData).subscribe(res=>{
      if(res){
        this.companyCatelogObj = res;
        this.getCompanyCatelogBrandFun()
         // TotalItem/ActiveItem/StockOut/LowStock
        this.categorType = "TotalItem";
      }else{
        this.companyCatelogObj = {};
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
    const searchData = {
      "CompanyId":this.subcateid,
      "CityId":this.cityId,
      "Type": this.categorType   //TotalSale/ActiveItem/StockOut/LowStock
      }
    this._services.GetCompanyCatelogBrand(searchData).subscribe(res=>{
      if(res){
        this.catelogBrandArr = res;
      
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
                  element['categorySameArray'] = dataArry
                }
            });
        });
        }
        this.catelogBrandArr = this.uniqueByKey(this.catelogBrandArr, "CategoryName") 
      }else{
        this.catelogBrandArr = [];
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
    this._services.GetCompanyCatelogBrandItem(searchData).subscribe(res=>{
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
