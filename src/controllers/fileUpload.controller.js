require("dotenv").config()
const multer = require("multer")
const multerS3 = require("multer-s3")
const aws = require("aws-sdk")
const PORT = process.env.PORT

console.log('>', PORT)
const s3 = new aws.S3({
    region: process.env.STORAGE_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
})

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, `${file.fieldname}${Date.now().toString()}`)
        }
    })
})

const files =(req,res)=>{
    res.status(201).json({
        linkAccessFile: `http://localhost:${PORT}/link-files/${req.file.key}`,
        key: req.file.key
    })
}


const linkFiles = (request, response) => {
    console.log({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: request.params.fileId,
    })

    const presignedUrl = s3.getSignedUrl('getObject', {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: request.params.fileId,
    });
    console.log('======',response.redirect(presignedUrl))
    return response.redirect(presignedUrl)
}



module.exports = {
    files,
    linkFiles,
    upload
}