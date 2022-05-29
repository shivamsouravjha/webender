import express from 'express';
import SourceController from '../app/Controllers/report.js';

const ReportApiRouter = express.Router();

ReportApiRouter.get('/outstanding', (request, response) => {
  const reportController = new SourceController(response);
  reportController.printOutstanding(request);
});

ReportApiRouter.get('/feeledger', (request, response) => {
  const reportController = new SourceController(response);
  reportController.printFeeledger(request);
});

ReportApiRouter.get('/dailybalance', (request, response) => {
  const reportController = new SourceController(response);
  reportController.printDailybalance(request);
});

ReportApiRouter.get('/mail', (request, response) => {
  const reportController = new SourceController(response);
  reportController.printMail(request);
});

ReportApiRouter.get('/feecollection', (request, response) => {
  const reportController = new SourceController(response);
  reportController.printFeeCollection(request);
});

export default ReportApiRouter;
