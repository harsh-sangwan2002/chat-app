import messageBundle from '../../locales/en.js';
import obj from '../config.js';

const notFound = (req, res, next) => {

    const STATUS_CODES = obj.STATUS_CODES;

    res.status(STATUS_CODES.FILE_NOT_FOUND).json({
        message: messageBundle['url.notFound']
    });
}

export default notFound;