const pdf = require('html-pdf');
var fs = require('fs');
var options = { format: 'Letter' };

export default class AccountService{
    async printReport(args) {
        try {
            var html = fs.readFileSync(`./app/Services/${args}`, 'utf8');
            await pdf.create(html, options).toFile(`./Print/${args}.pdf`, (err, res) => {
              if (err) {
                console.log(err);
              }
            });
            return {"success":true}
        } catch (error) {
            throw error;
        }
    }
}