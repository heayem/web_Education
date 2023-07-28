const multer = require('multer')
const path = require('path')
const image_Path = "D:/wamp64/www/Videos"

// storage engine
const storage = multer.diskStorage({
    // destination: './upload/images',
    destination: function (req, file, callback) {
        callback(null, image_Path);
    },
    filename: (req, file, callback) => {
        if (!file.originalname.match(/\.(webm|mp4|ogg)$/)) {
            // upload only webm mp4 and ogg format9
            return callback(new Error('Please upload a Image'))
        }
        return callback(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024  // maximal upload size is 10MB
    }
})

module.exports = { upload }