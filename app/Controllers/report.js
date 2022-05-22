import ReportService from '../Services/reportPrint';
import Controller from './controller';
const { performance } = require('perf_hooks');

export default class AccountController extends Controller {
    constructor(response) {
      super(response);
      this.service = new ReportService();
    }
    async printOutstanding (request) {
      try{  
          const { format, orientation} = request.body;
          var args = {"file":"OutstandingReport","format":format,"orientation":orientation}
          const addUser =  await this.service.printReport(args)
          this.sendResponse(addUser);   
      } catch (error) {
          this.handleException(error)
      }
    }
    async printFeeledger (request) {
          try{     
            const { format, orientation} = request.body;
            var args = {"file":"FeeLedgerReport","format":format,"orientation":orientation}
            const addUser =  await this.service.printReport(args)
            this.sendResponse(addUser);     
      } catch (error) {
          this.handleException(error)
      }
    }
     async printDailybalance (request) {
      try{
        const { format, orientation} = request.body;
        var args = {"file":"Dailybalance","format":format,"orientation":orientation}
        const addUser = await this.service.printReport(args)
        this.sendResponse(addUser); 
      } catch (error) {
        console.log("sdds")
        this.handleException(error)
      }
    }
}



