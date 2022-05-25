import ReportService from '../Services/reportPrint';
import Controller from './controller';
const fs = require('fs');
import ejs from 'ejs';
const { performance } = require('perf_hooks');

const ReportSettings = {
  dailybalance: {
    orientation: 'potrait',
    format: 'A4',
  }
}
export default class AccountController extends Controller {
  constructor(response) {
    super(response);
    this.service = new ReportService();
  }

  async printOutstanding(request) {
    try {
      const settings = ReportSettings.dailybalance;
      const { data } = request.body;
      const htmlData = await fs.readFile('../Resource/Dailybalance.ejs', { encoding: 'utf8' });
      let html = ejs.render(htmlData, data);
      var printOptions = {
        "file": "OutstandingReport",
        "format": settings.format,
        "orientation": settings.orientation
      }
      //fetch html file text

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
      const { format, orientation } = request.body;
      var args = { "file": "Dailybalance", "format": format, "orientation": orientation }
      const addUser = await this.service.printReport(args)
      this.sendResponse(addUser);
    } catch (error) {
      console.log("sdds")
      this.handleException(error)
    }
  }
}



