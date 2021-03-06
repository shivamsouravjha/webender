import * as ReportService from '../Services/reportPrint.js';

import * as Controller from './Controller.js';
const fs = require('fs');
import ejs from 'ejs';
const { performance } = require('perf_hooks');
import * as STATUS from "../Constants/StatusEnum.js";
const { promisify } = require('util')
const readFileAsync = promisify(fs.readFile)

export default class AccountController extends Controller {
  constructor(response) {
    super(response);
    this.service = new ReportService();
  }

  async printOutstanding(request) {
    try {
      const settings = STATUS.ReportSettings.dailybalance;
      const { data ,school,address,date} = request.body;
      const htmlData = await readFileAsync('./app/Resource/OutstandingReport.ejs', { encoding: 'utf8' });
      let html = await ejs.render(htmlData, {data:data,school:school,address:address,date:date},{async:true});
      var printOptions = {
        "file": "OutstandingReport",
        "format": settings.format,
        "orientation": settings.orientation
      }

      const addUser = await this.service.printReport(html, printOptions)
      this.sendResponse(addUser);
    } catch (error) {
      this.handleException(error)
    }
  }

  async printFeeledger(request) {
    try {
      const settings = STATUS.ReportSettings.dailybalance;
      const { data ,school,address,date,months} = request.body;
      const htmlData = await readFileAsync('./app/Resource/FeeLedgerReport.ejs', { encoding: 'utf8' });

      let html = await ejs.render(htmlData, {data:data,school:school,address:address,date:date,months:months},{async:true});
      var printOptions = {
        "file": "FeeLedgerReport",
        "format": settings.format,
        "orientation": settings.orientation
      }

      const addUser = await this.service.printReport(html, printOptions)
      this.sendResponse(addUser);
    } catch (error) {
      this.handleException(error)
    }
  }

  async printDailybalance(request) {
    try {
      const settings = STATUS.ReportSettings.dailybalance;
      const { data ,school,address,date} = request.body;
      const htmlData = await readFileAsync('./app/Resource/Dailybalance.ejs', { encoding: 'utf8' });

      let html = await ejs.render(htmlData, {data:data,school:school,address:address,date:date},{async:true});
      var printOptions = {
        "file": "Dailybalance",
        "format": settings.format,
        "orientation": settings.orientation
      }

      const addUser = await this.service.printReport(html, printOptions)
      this.sendResponse(addUser);
    } catch (error) {
      this.handleException(error)
    }
  }

  async printFeeCollection(request) {
    try {
      const settings = STATUS.ReportSettings.dailybalance;
      const { data ,school,address,date} = request.body;
      const htmlData = await readFileAsync('./app/Resource/FeeCollectionReport.ejs', { encoding: 'utf8' });

      let html = await ejs.render(htmlData, {data:data,school:school,address:address,date:date},{async:true});
      var printOptions = {
        "file": "FeeCollectionReport",
        "format": settings.format,
        "orientation": settings.orientation
      }

      const addUser = await this.service.printReport(html, printOptions)
      this.sendResponse(addUser);
    } catch (error) {
      this.handleException(error)
    }
  }

  async printMail(request) {
    try {
      const settings = STATUS.ReportSettings.dailybalance;
      const { data ,school,address,date,receipt,name,category,amountpaid,remaining,total,totalAmount} = request.body;
      const htmlData = await readFileAsync('./app/Resource/Mail.ejs', { encoding: 'utf8' });

      let html = await ejs.render(htmlData, {data:data,school:school,address:address,date:date,receipt:receipt,name:name,category:category,amountpaid:amountpaid,remaining:remaining,total:total,totalAmount:totalAmount},{async:true});
      var printOptions = {
        "file": "Mail",
        "format": settings.format,
        "orientation": settings.orientation
      }

      const addUser = await this.service.printReport(html, printOptions)
      this.sendResponse(addUser);
    } catch (error) {
      this.handleException(error)
    }
  }
}



