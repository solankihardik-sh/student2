import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import * as uuid from 'uuid';
import { TimeZoneService } from '../Share/time-zone.service';
declare var NgForm: any;
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  studentData: any = [];
  diffrentTimeZoneData: any;
  public now: string;

  clearIntervalTime: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _timeZoneService: TimeZoneService,
    private translate: TranslateService
  ) {}

  registerForm: FormGroup;
  submitted = false;

  User: any = {};

  languageSupport = [
    { support: 'en', language: 'English' },
    { support: 'ta', language: 'Tamil' },
    // { support: 'za', language: 'Chinese' },
  ];

  ngOnInit() {
    this.studentData = this._timeZoneService.getStudentDetails();
    if (this.studentData === undefined) this.studentData = [];

    this.diffrentTimeZoneData = this._timeZoneService.getCountriesData();

    this.CreateRegistrationForm();
    this.translate.use('en');
  }

  CreateRegistrationForm() {
    this.registerForm = this.formBuilder.group({
      id: [uuid.v4()],
      fullName: ['', Validators.required],
      meetingDate: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });
  }
  get fval() {
    return this.registerForm.controls;
  }

  resetForm() {  
    this.registerForm.reset();  
  }  

  signup() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    alert('form fields are validated successfully!');
    console.log(this.registerForm.value);

    this.studentData.push(this.registerForm.value);

    const data = JSON.stringify(this.studentData);
    const finalData = CryptoJS.AES.encrypt(
      data,
      environment.encryptedPassword
    ).toString();

    localStorage.setItem('Users', finalData);
  }

  goToStudentDetails() {
    this.router.navigateByUrl('student-details');
  }

  selectedTimeZone(event) {
    const timeZone = event.target.value;
    this.clearTimeZone();
    this.settimeZoneInterval(timeZone);
  }

  settimeZoneInterval(timeZone) {
    this.clearIntervalTime = setInterval(() => {
      this.now = new Date().toLocaleString('en-US', {
        timeZone: `${timeZone}`,
      });
    }, 1);
  }

  clearTimeZone() {
    clearInterval(this.clearIntervalTime);
  }
  useLanguage(event) {
    this.translate.use(event.target.value);
  }
}
