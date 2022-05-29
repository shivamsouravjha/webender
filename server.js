import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import Routes from './routes/routes.js'
import HeaderMiddleware from './middlewares/headerMiddleware.js'
const app = express();
require('dotenv').config();

app.use(HeaderMiddleware)
app.use(bodyParser.json());


app.use('/api/report', Routes.ReportApiRouter); 
app.use('/api/upload', Routes.StatusApiRouter); 


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
    
mongoose
    .connect(
      `mongodb://${process.env.name}:${process.env.password}@cluster0-shard-00-00.dm1xw.mongodb.net:27017,cluster0-shard-00-01.dm1xw.mongodb.net:27017,cluster0-shard-00-02.dm1xw.mongodb.net:27017/${process.env.db}?ssl=true&replicaSet=atlas-x6eag6-shard-0&authSource=admin&retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true }
      
    )
    .then(() => {
      console.log('listening at port',process.env.PORT || 5001 )
      app.listen(process.env.PORT || 5001);
    })
    .catch(err => {
      console.log(err);
    });
  