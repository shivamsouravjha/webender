import ReportService from '../Services/reportPrint';
import Controller from './controller';
const fs = require('fs');
import ejs from 'ejs';
const { performance } = require('perf_hooks');
import * as STATUS from "../Constants/StatusEnum";
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
      //fetch html file text
      console.log(html[0])

      const addUser = await this.service.printReport(html, printOptions)
      this.sendResponse(addUser);
    } catch (error) {
      this.handleException(error)
    }
  }

  async printFeeledger(request) {
    try {
      const { format, orientation } = request.body;
      var args = { "file": "FeeLedgerReport", "format": format, "orientation": orientation }
      const addUser = await this.service.printReport(args)
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



