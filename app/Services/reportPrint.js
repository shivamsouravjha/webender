const pdf = require('html-pdf');
var fs = require('fs');
var options = { format: 'Letter' };
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)
var clouud= require('cloudinary').v2;
const { pipeline } = require('stream');
const { createWriteStream } = require('fs');
const { performance } = require('perf_hooks');

export default class AccountService{
        async fileremover(args){
          try{
            await unlinkAsync(args)
          }catch (error) {
            console.log(error)
            throw error;
        }
          return 
      }
      async fileuploader(args){

        try{
          clouud.config({
            cloud_name:process.env.cloudinary_cloud_name,
            api_key:process.env.cloudinary_api_key,
            api_secret:process.env.cloudinary_api_secret
          })
  
          let  focc = await clouud.uploader.upload(args, 
              {
                      folder: `memes/posts`,
                      use_filename: true
                    })
                    console.log("focc")
  
          console.log(focc.secure_url)
          return focc.secure_url
        }catch (error) {
            console.log(error)
            throw error;
        }
       
      }
    async printReport(args) {
        try {
          let link

            var html = fs.readFileSync(`./app/Services/${args}.html`, 'utf8');
            pdf.create(html, options).toStream((err, pdfStream) => {
              if (err) {   
                console.log(err)
              } else {

                pipeline(pdfStream, createWriteStream(`./Print/${args}.pdf`), (err) => {
                  console.log(err);
                });
                pdfStream.on('close',async () => {
                  try{
                    var startTime = performance.now()    
                    link =  await this.fileuploader(`./Print/${args}.pdf`) 
                    var endTime = performance.now()
                    console.log(`Call to doSomething took ${endTime - startTime} milliseconds`)   
                    return link
                  }catch (error) {
                    console.log(error)
                }
                  
                })
                pdfStream.on('close', async () => {
                  try{
                    await this.fileremover(`./Print/${args}.pdf`)
                  }catch (error) {
                    console.log(error)
                }
                  
                })
                return
              }
            })
            return {"success":true,"link":link}
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
}