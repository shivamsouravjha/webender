import express from 'express';
import bodyParser from 'body-parser';
import Routes from './routes/routes'
const app = express();
require('dotenv').config();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
}); 


app.use('/api/report/', Routes.ReportApiRouter); 


app.use((req, res, next) => {
    const error = new Error('Could not find this route.', 404);      
    throw error;
});
  
  
app.use((error, req, res, next) => {          
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'An unknown error occurred!', success: error.success||false});
});
  
app.listen(process.env.PORT || 5001);

  