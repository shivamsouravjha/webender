const pdf = require('html-pdf');
var fs = require('fs');
var options = {
  format: "A4",
  orientation: "potrait",
};
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)
var clouud = require('cloudinary').v2;
var dateTime = require('node-datetime');
import GroupModel from "../Model/ReportModel.js";
import Database from "../Database-interaction/ReportRepositroy.js";
import * as STATUS from "../Constants/StatusEnum.js";

export default class AccountService {
  constructor() {
    this.repository = new Database();
  }
  async fileuploader(args, groupModel) {
    try {
      clouud.config({
        cloud_name: process.env.cloudinary_cloud_name,
        api_key: process.env.cloudinary_api_key,
        api_secret: process.env.cloudinary_api_secret
      })
      groupModel['uploadingStartAt'] = this.bringTime()
      await this.repository.updateReport(groupModel)
      let focc = await clouud.uploader.upload(args, {
        folder: `memes/posts`,
        use_filename: true
      })
      groupModel['status'] = STATUS.STATUS.UPLOADED
      groupModel['uploadingCompletedAt'] = this.bringTime()
      groupModel['link'] = focc.secure_url
      await this.repository.updateReport(groupModel)
      return focc.secure_url
    } catch (error) {
      if (!groupModel['errorstage']){
        groupModel['errorstage'] = STATUS.STATUS.FAILED_AT_UPLOADED
      }
      throw error;
    }
  }

  
  bringTime() {
    var dt = dateTime.create();
    var started = dt.format('Y-m-d H:M:S'); // YYYY-MM-DDTHH:MM:SS epoc time
    return started
  }


  async printReport(html, options) {
    const groupModel = new GroupModel({ startedAt: this.bringTime(), status: STATUS.STATUS.STARTED });
    try {
      await this.repository.createReport(groupModel)
      groupModel['creationStartAt'] = this.bringTime()
      pdf.create(html, options).toStream(async (err, pdfStream) => {
        if (err) {
          console.log(err)
        } else {
          groupModel['status'] = STATUS.STATUS.CREATED
          groupModel['creationCompletedAt'] = this.bringTime()
          await this.repository.updateReport(groupModel)
          const path = `./Print/${options.file}.pdf`;
          const filePath = fs.createWriteStream(path);
          pdfStream.pipe(filePath);
          pdfStream.on('close', async () => {
            try {
              filePath.close();
              await this.fileuploader(`./Print/${options.file}.pdf`, groupModel)
              await unlinkAsync(`./Print/${options.file}.pdf`)
              groupModel['completedAt'] = this.bringTime()
              groupModel['status'] = STATUS.STATUS.COMPLETED
              await this.repository.updateReport(groupModel)
            } catch (error) {
              if (!groupModel['errorstage']){
                groupModel['errorstage'] = STATUS.STATUS.FAILED_AT_COMPLETED
              }
              console.log(error)
            }
          })
        }
      })
      return { "success": true,"tracking_id":groupModel._id }
    } catch (error) {
        groupModel['status'] = "failed"
        if (!groupModel['errorstage']){
          groupModel['errorstage'] = STATUS.STATUS.FAILED_AT_STARTED
        }
        await this.repository.updateReport(groupModel)
      throw error;
    }
  }
}