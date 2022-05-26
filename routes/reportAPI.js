import express from 'express';
import SourceController from '../app/Controllers/report';

const ReportApiRouter = express.Router();

ReportApiRouter.get('/report/outstanding', (request, response) => {
  const reportController = new SourceController(response);
  reportController.printOutstanding(request);
});

ReportApiRouter.get('/report/feeledger', (request, response) => {
  const reportController = new SourceController(response);
  reportController.printFeeledger(request);
});

ReportApiRouter.get('/report/dailybalance', (request, response) => {
  const reportController = new SourceController(response);
  reportController.printDailybalance(request);
});

ReportApiRouter.get('/report/mail', (request, response) => {
  const reportController = new SourceController(response);
  reportController.printMail(request);
});

ReportApiRouter.get('/report/feecollection', (request, response) => {
  const reportController = new SourceController(response);
  reportController.printFeeCollection(request);
});

export default ReportApiRouter;
