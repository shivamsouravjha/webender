import express from 'express';
import StatusController from '../app/Controllers/status';

const StatusApiRouter = express.Router();

StatusApiRouter.get('/status/:id', (request, response) => {
  const statusController = new StatusController(response);
  statusController.getReportStatus(request);
});

export default StatusApiRouter;
