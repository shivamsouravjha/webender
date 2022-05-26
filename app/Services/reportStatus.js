import Database from "../Database-interaction/ReportRepositroy";
import * as STATUS from "../Constants/StatusEnum";

export default class AccountService {
  constructor() {
    this.repository = new Database();
  }
  async fetchStatus(args) {
    try {
      const status = await this.repository.fetchReport(args)
      if (status.status == "COMPLETED" ){
        return {link:status.link,status:status.status}
      }
      return {status:status.status}
    } catch (error) {
      throw error;
    }
  }
}