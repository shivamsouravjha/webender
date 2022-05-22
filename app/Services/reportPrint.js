const pdf = require('html-pdf');
var fs = require('fs');
var options = {
  format: "A4",
  orientation: "potrait",
};
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)
var clouud= require('cloudinary').v2;
var dateTime = require('node-datetime');
import GroupModel from "../Model/ReportModel";
import Database from "../Database-interaction/ReportRepositroy";

export default class AccountService{
      constructor() {
        this.repository = new Database();
    }
    async fileuploader(args,groupModel){
        try{
          clouud.config({
            cloud_name:process.env.cloudinary_cloud_name,
            api_key:process.env.cloudinary_api_key,
            api_secret:process.env.cloudinary_api_secret
          })
          groupModel['uploadingStartAt'] =this.bringTime()  
          await this.repository.updateReport(groupModel)
          let  focc = await clouud.uploader.upload(args,{
                      folder: `memes/posts`,
                      use_filename: true
          })
          groupModel['upload'] = true
          groupModel['uploadingCompletedAt'] = this.bringTime()  
          groupModel['link'] = focc.secure_url 
          return focc.secure_url
        }catch (error) {
            console.log(error)
            throw error;
        }
    }
    bringTime(){
        var dt = dateTime.create();
        var started = dt.format('Y-m-d H:M:S');
        return started
    }
    async printReport(args) {
        try {  
            const groupModel = new GroupModel({startedAt:this.bringTime(),started:true,creation:false,uploading:false,completed:false});
            await this.repository.createReport(groupModel)
            groupModel['creationStartAt'] = this.bringTime()
            groupModel['creation'] = this.bringTime()
            var html = fs.readFileSync(`./app/Resource/${args.file}.html`, 'utf8');
            pdf.create(html, options).toStream(async (err, pdfStream) => {
              if (err) {   
                console.log(err)
              } else {
                groupModel['creation'] = true
                groupModel['creationCompletedAt'] = this.bringTime()
                await this.repository.updateReport(groupModel)
                const path = `./Print/${args.file}.pdf`;
                const filePath = fs.createWriteStream(path);
                pdfStream.pipe(filePath);               
                pdfStream.on('close',async () => {
                  try{
                    filePath.close();
                    let link =  await this.fileuploader(`./Print/${args.file}.pdf`,groupModel) 
                    await unlinkAsync(`./Print/${args.file}.pdf`)
                    groupModel['completedAt'] = this.bringTime()
                    groupModel['completed'] =true
                    await this.repository.updateReport(groupModel)
                    return link
                  }catch (error) {
                    console.log(error)
                }        
               })              
              }
            })
            return {"success":true}
        } catch (error) {
            throw error;
        }
    }
}