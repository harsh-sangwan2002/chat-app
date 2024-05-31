import messageBundle from '../../locales/en.js';
import obj from '../config.js';

const handleError = (res, err) => {

    const statusCode = err.status ? err.status : obj.STATUS_CODES.INTERNAL_SERVER_ERROR;
    const msg = err.msg ? err.msg : messageBundle['error.internalServerError'];

    res.status(statusCode).json({
        message: msg
    });
}

export default handleError;