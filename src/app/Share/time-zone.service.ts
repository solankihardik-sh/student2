import { Injectable } from '@angular/core';

import { Moment } from 'moment';

import * as moments from 'moment-timezone';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
const momentTimeZone = require('moment-timezone');
@Injectable()
export class TimeZoneService {
  public tenantTimeZone: string;
  moment: any;

  constructor() {
    this.tenantTimeZone = 'GMT';
    this.moment = require('moment-timezone');
  }

  public setTenantTimeZone(tenantTz: string) {
    this.tenantTimeZone = tenantTz;
  }

  public utcToTenant(utcDateTime: Moment): Moment {
    return this.moment.tz(utcDateTime, this.tenantTimeZone);
  }

  public utcToTenantString(utcDateTime: Moment, format: string): string {
    format =
      this.moment.tz.guess() === this.tenantTimeZone
        ? format
        : format + ' (UTC Z)';
    return this.moment.tz(utcDateTime, this.tenantTimeZone).format(format);
  }

  public tenantToUtc(tenantDateTime: Moment): Moment {
    return this.moment(tenantDateTime).utc();
  }

  getStudentDetails() {
    const data = localStorage.getItem('Users');
    if (data !== undefined && data !== null) {
      const finalData = CryptoJS.AES.decrypt(
        data,
        environment.encryptedPassword
      ).toString(CryptoJS.enc.Utf8);

      const datas = JSON.parse(finalData);
      return datas;
    }
  }

  getCountriesData() {
    return momentTimeZone.tz.names();
  }
}
