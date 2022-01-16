// connects to backend and uploads and to watermark and encrypt
// pure magic
export default async function handler(req, res) {
  //get file to upload from request

  const fs = require('fs');

  const formidable = require('formidable');
  const form = new formidable.IncomingForm();

  form.parse(req, (err, nill, files) => {
    if (err) {
      return res.status(400).json({ error: err });
    }
    // console.log(files);
    const fileName = files.file.originalFilename;
    const filePath = files.file.filepath;

    let boundary = 'X-PAZARI-BOUNDARY';
    let data = '';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        console.log(err);
        return res.status(400);
      }

      data += '--' + boundary + '\r\n';
      data += 'Content-Disposition: form-data; name="file"; filename="' + fileName + '"\r\n';
      data += 'Content-Type:application/octet-stream\r\n\r\n';
      let payload = Buffer.concat([
        Buffer.from(data, 'utf8'),
        Buffer.from(content, 'binary'),
        Buffer.from('\r\n--' + boundary + '--\r\n', 'utf8')
      ]);

      //console.log(payload.toString('base64'));

      fetch(process.env.PAZARI_ENGINE_ENDPOINT + '/auth/upload', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + process.env.PAZARI_ENGINE_API_KEY,
          'Content-Type': 'multipart/form-data; boundary=X-PAZARI-BOUNDARY'
        },
        body: payload
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.error) {
            return res.status(400).json({ error: json.error });
          } else {
            return res.status(200).json({ data: json, error: null });
          }
        });
    });
  });
}

export const config = {
  api: {
    bodyParser: false
  }
};
