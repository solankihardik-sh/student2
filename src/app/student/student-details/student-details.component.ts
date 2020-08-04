import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';

import { TimeZoneService } from 'src/app/Share/time-zone.service';
@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css'],
})
export class StudentDetailsComponent implements OnInit {
  studentData: any = [];

  constructor(private _timeZoneService: TimeZoneService,private location: Location ) {}

  ngOnInit() {
    this.getDataList();
  }

  getDataList(){
    this.studentData = this._timeZoneService.getStudentDetails();
    console.log(this.studentData);
  }

  goBack() {
    this.location.back();
  }
}
