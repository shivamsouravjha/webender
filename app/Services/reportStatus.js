import * as Database from "../Database-interaction/ReportRepositroy.js";

import * as STATUS from "../Constants/StatusEnum.js";

export default class AccountService {
  constructor() {
    this.repository = new Database();
  }
  async fetchStatus(args) {
    try {
      const status = await this.repository.fetchReport(args)
      return {status:status}
    } catch (error) {
      throw error;
    }
  }
}
