import ReportStatusService from '../Services/reportStatus';
import Controller from './controller';

export default class AccountController extends Controller {
  constructor(response) {
    super(response);
    this.service = new ReportStatusService();
  }

  async getReportStatus(request) {
    try {
      const _id = request.params.id;
      console.log(request.params)
      const addUser = await this.service.fetchStatus(_id)
      this.sendResponse(addUser);
    } catch (error) {
      this.handleException(error)
    }
  }
}



