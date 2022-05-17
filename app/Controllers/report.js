import ReportService from '../Services/reportPrint';
import Controller from './controller';
const { performance } = require('perf_hooks');

export default class AccountController extends Controller {
    constructor(response) {
      super(response);
      this.service = new ReportService();
    }
    printOutstanding (request) {
      try{  
        var startTime = performance.now()    
          const addUser = this.service.printReport("OutstandingReport.html")
          var endTime = performance.now()
  console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)   

          addUser.then(res => {
              this.sendResponse(res);
            })
            .catch (error => {
              this.handleException(error);
            }) 
      } catch (error) {
          this.handleException(error)
      }
    }
    printFeeledger (request) {
          try{     
          const addUser =  this.service.printReport("FeeLedgerReport.html")
          addUser.then(res => {
              this.sendResponse(res);
            })
            .catch (error => {
              this.handleException(error);
            }) 
      } catch (error) {
          this.handleException(error)
      }
    }
    printDailybalance (request) {
      try{     
        const addUser =  this.service.printReport("Dailybalance.html")
        addUser.then(res => {
            this.sendResponse(res);
          })
          .catch (error => {
            this.handleException(error);
          }) 
      } catch (error) {
        this.handleException(error)
      }
    }
}



