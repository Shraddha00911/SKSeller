import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStogareService } from 'src/app/shared/services/local-stogare.service';
import { NgForm } from '@angular/forms';
import { SubcatmappingService } from '../../services/subcatmapping.service';
import { GlobalSettingService } from 'src/app/shared/services/global-setting.service';
import { DashboardService } from 'src/app/shared/services/dashboard/dashboard.service';

@Component({
  selector: 'app-subcatselection',
  templateUrl: './subcatselection.component.html',
  styleUrls: ['./subcatselection.component.scss']
})
export class SubcatselectionComponent implements OnInit {
  subcateid: any;
  subcategoryobj: any = null;
  MappingsubcatList: any;
  userid: any;
  
  constructor(private SubCatMappingService: SubcatmappingService, 
    private localStorageService: LocalStogareService, 
    private router: Router, 
    private globalSettingService: GlobalSettingService,
    private _dashBoardService : DashboardService
    ) { }
  ngOnInit(): void {
    this.userid = localStorage.getItem('userid');
    this.subcateid = parseInt(localStorage.getItem('SubCatId'));
    if (this.userid > 0) {
      this.SubCatMappingService.GetAllSubCatMapping().subscribe(result => {
        this.MappingsubcatList = result;
        if(this.MappingsubcatList.length>0){
        this.MappingsubcatList = result;
        }else{
          this.subcategoryobj = this.MappingsubcatList[0]
          this.subcateid = this.subcategoryobj.SubCategoryId;
          localStorage.setItem('SubCatId', this.subcateid);
          localStorage.setItem('subcateName', this.subcategoryobj.SubcategoryName);
          localStorage.setItem('SublogoUrl', this.subcategoryobj.LogoUrl);
          this._dashBoardService.refreshNavigationPageFun("Refresh");
          this.globalSettingService.changeSubCategory();
          this.router.navigateByUrl('/skbrand/businessdashboard');
        }
        // console.log("BrandMapping", this.MappingsubcatList);
      })
    } else {
      this.router.navigateByUrl('user-pages/login');

    }
  }

  SetSubcateId(subcatform: NgForm) {

    if (subcatform.valid) {
      this.subcateid = this.subcategoryobj.SubCategoryId;
      localStorage.setItem('SubCatId', this.subcateid);
      localStorage.setItem('subcateName', this.subcategoryobj.SubcategoryName);
      localStorage.setItem('SublogoUrl', this.subcategoryobj.LogoUrl);
      this._dashBoardService.refreshNavigationPageFun("Refresh");
      this.globalSettingService.changeSubCategory();

      this.router.navigateByUrl('/skbrand/businessdashboard');
    }
    // else {
    //   alert("Please select subcategory");
    // }
  }
}
