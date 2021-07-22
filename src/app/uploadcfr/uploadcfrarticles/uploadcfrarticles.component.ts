import { Component, OnInit } from '@angular/core';
import { SubcatmappingService } from 'src/app/user-pages/services/subcatmapping.service';
import * as XLSX from "xlsx";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-uploadcfrarticles',
  templateUrl: './uploadcfrarticles.component.html',
  styleUrls: ['./uploadcfrarticles.component.scss']
})
export class UploadcfrarticlesComponent implements OnInit {
  MappingsubcatList: any;
  CfrPostList: any;
  cfruploadfile: any;
  subcatid: any;
  subcateName: any;
  blocked: boolean;

  constructor(private router: Router, private r: ActivatedRoute, private SubCatMappingService: SubcatmappingService) { }

  ngOnInit(): void {

    // this.SubCatMappingService.GetAllSubCatMapping().subscribe(result => {
    //   this.MappingsubcatList = result;
    // })
    this.subcatid = parseInt(localStorage.getItem('SubCatId'));
    this.subcateName = localStorage.getItem('subcateName');

    if (!this.subcatid) {
      this.router.navigateByUrl('/user-pages/subcatselection');
    }
  }
  onFileChange(ev) {
    this.blocked = true;

    let workBook = null;
    let jsonData = null;
    this.CfrPostList = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    this.cfruploadfile = file;
    reader.onload = event => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: "binary" });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      if (jsonData.Sheet1 && jsonData.Sheet1[0].ItemNumber) {
        this.CfrPostList = jsonData.Sheet1;
      }
      else {
        this.CfrPostList = null;
        workBook = null;
        jsonData = null;
        this.cfruploadfile = null; this.blocked = false;

        alert("Sheet is not in correct format");
      }
    };
    this.blocked = false;

    reader.readAsBinaryString(file);
  }

  UploadCfr() {
   
    if (this.subcatid > 0 && this.cfruploadfile) {

      let formData = new FormData();
      formData.append('xlsfile', this.cfruploadfile);
      formData.append('SubCatId', this.subcatid);
      this.blocked = true;
      this.SubCatMappingService.UploadExcel(formData).subscribe(result => {
        this.blocked = false;
        if (result) {
          alert(result);
          window.location.reload();
          this.CfrPostList = null;
          this.subcatid = null;
          this.cfruploadfile = null;
        }
      });
    }
    else {
      alert("empty file");
    }
  }

  reset() {
    this.CfrPostList = null;
    this.subcatid = null;
    this.cfruploadfile = null;
  }
}
