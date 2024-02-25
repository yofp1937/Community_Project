const multer = require('multer');

const multerStorage = multer.memoryStorage();
const upload = multer({storage: multerStorage});

// 기본적으로 파싱을 latin1로해서 파일명이 한글이면 깨짐 그걸 방지하기위해 utf8로 파싱
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