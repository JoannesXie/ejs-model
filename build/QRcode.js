const config = require('./config.js') // 获取配置
var qr_image = require('qr-image')
var fs = require('fs')

function qrcode(name, path) {
  qr_image.image(path, {
    ec_level: 'M',
    margin: 3,
    size: 8
  }).pipe(fs.createWriteStream(config.PUBLIC_PATH + '/QRcode/' + name + '.png'))
}

const qrArry = config.QRcode
for (const key in qrArry) {
  qrcode(key, qrArry[key])
}

