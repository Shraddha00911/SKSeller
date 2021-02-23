import { Component, OnInit } from '@angular/core';
import { SubcatmappingService } from 'src/app/user-pages/services/subcatmapping.service';
import * as XLSX from "xlsx";

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
  constructor(private SubCatMappingService: SubcatmappingService) { }

  ngOnInit(): void {

    this.SubCatMappingService.GetAllSubCatMapping().subscribe(result => {
      this.MappingsubcatList = result;
    })
  }
  onFileChange(ev) {
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
      const dataString = JSON.stringify(jsonData);
      this.CfrPostList = jsonData.Sheet1;
    };
    reader.readAsBinaryString(file);
  }

  UploadCfr() {

    if (this.subcatid > 0 && this.cfruploadfile) {
      let formData = new FormData();
      formData.append('xlsfile', this.cfruploadfile);
      formData.append('SubCatId', this.subcatid);
      // this.blocked = true;
      this.SubCatMappingService.UploadExcel(formData).subscribe(result => {
        // this.blocked = false;
        if (result) {
          alert("Your Excel data is uploaded succesfully.")
          
        }
        else {
          alert("Your Excel data is Not uploaded.")
          window.location.reload();
        }
      });
    }
    else {
      alert("empty file");
    }
  }

  reset() {
    window.location.reload();
  }
}
