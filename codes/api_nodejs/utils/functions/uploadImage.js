const path = require('path')

// Personal moduls
const message = require('../../utils/config/messages').message
const resizeMiddleWare = require('../../app/middlewares/resizeMiddleware')

exports.imageUploadFunction = async (req, res, ImagefolderName) => {
  var error = true;
    // console.log(req.file);

  var imageSaveFolderName = '../../src/public/' + ImagefolderName;
  const imagePath = path.join(__dirname, imageSaveFolderName);
  try {
    const fileUpload = new resizeMiddleWare(imagePath)
    //   console.log('*****************************************')
    //   console.log(fileUpload)
    if (!req.file) {
      return {
        status: 400,
        success : false,
        error: message.error.file_upload_error,
        error: message.error.file_upload_error
      }
    } else {
      try {
        // save image in folder
        const filename = await fileUpload.save(req.file.buffer)
        console.log('---------------------filename')
        console.log(filename)
        // verify if image is saved
        if (filename != '' && filename != null) {
          // we give false to error to tell that all is ok
          error = false
          // return image  info after save
          console.log('Image sauvegarder avec succès')
          var imageSaveState = [
            error,
            {
              status: 200,
              picturename: filename,
              error : error,
              success : true
            }
          ]
          return imageSaveState
        } else {
          error = true;
          return [
            error,
            {
              status: 400,
              success : false,
              message: message.error.file_unsave,
              error : message.error.file_unsave
            }
          ]
        }
      } catch (error) {
        error = true;
        return [
          error,
          {
            status: 400,
            success : false,
            message: message.error.file_unsave,
            error: error
          }
        ]
      }
    }
  } catch (error) {
    error = true;
    return [
      error,
      {
        status: 400,
        success : false,
        message: message.error.file_upload_error,
        error: error
      }
    ]
  }
}
