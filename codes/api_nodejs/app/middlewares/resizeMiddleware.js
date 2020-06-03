//./utils/middlewares/resizeMiddleware.js
const sharp = require('sharp');
const uuidv4 = require('uuid/v4');
const path = require('path');

class Resize {
    constructor(folder){
        this.folder = folder;
    }
    async save(buffer){
        //we get the picture here
        const filename = Resize.filename();
        const filepath = this.filepath(filename);
        await sharp(buffer)
        //we resiez the picture 
        .resize(300, 300,{
            fit : sharp.fit.inside,
            withoutEnlargement: true
        })
        //we save in destination file
        .toFile(filepath);
        return filename;
    }

    static filename(){
        return `${uuidv4()}.png`
    }

    filepath(filename){
        return path.resolve(`${this.folder}/${filename}`);
    }
}

module.exports = Resize;