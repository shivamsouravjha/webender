
import  * as HttpError from '../app/Controllers/Controller.js';
module.exports = (req, res, next) => {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
  } catch (err) {
    const error = new CTRL.HttpError('Authentication failed!', 403);
    return next(error);
  }
};
