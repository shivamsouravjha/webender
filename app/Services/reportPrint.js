const pdf = require('html-pdf');
var fs = require('fs');
var options = { format: 'Letter' };
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)
var clouud= require('cloudinary').v2;

export default class AccountService{
        async fileremover(args){
          await unlinkAsync(args)
          return 
      }
      async fileuploader(args){
        clouud.config({
          cloud_name:process.env.cloudinary_cloud_name,
          api_key:process.env.cloudinary_api_key,
          api_secret:process.env.cloudinary_api_secret
        })
        let  focc
            focc= await clouud.uploader.upload(args, {
                    folder: `memes/posts`,
                    use_filename: true
                  })
            
        return focc.secure_url
      }
    async printReport(args) {
        try {
          
            var html = fs.readFileSync(`./app/Services/${args}.html`, 'utf8');
            pdf.create(html, options).toFile(`./Print/${args}.pdf`, (err, res) => {
              if (err) {
                console.log(err);
              }
            });
            let url = await this.fileuploader(`./Print/${args}.pdf`)
            await this.fileremover(`./Print/${args}.pdf`)
            return {"success":true,"link":url}
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
}