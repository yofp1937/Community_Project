const multer = require('multer');

const multerStorage = multer.memoryStorage();
const upload = multer({storage: multerStorage});

const fileNameParser = fileName => Buffer.from(fileName, 'latin1').toString('utf8');

// 파일 데이터는 총 10개
const articleFormDataHandler = upload.fields([
    {name: 'files', maxCount: 10},
    {name: 'data', maxCount: 1},
]);

module.exports = {
    fileNameParser,
    articleFormDataHandler
};