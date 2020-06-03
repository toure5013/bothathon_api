//./utils/middlewares/uploadPictureMiddleware

const multer = require('multer');
//set Storage
const upload = multer({
    limits : {
        fileSize: 4 * 1024 * 1024,
    }
});

module.exports = upload;

