const Moralis = require('moralis/node');

export default async function handler(req, res) {
  let TaskID = req.query.taskID;

  const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_ID;
  const appId = process.env.NEXT_PUBLIC_MORALIS_APP_ID;
  const masterKey = process.env.MORALIS_MASTER_KEY;
  Moralis.start({ serverUrl, appId, masterKey });
console.log('handling');

  if (TaskID != '') {
    const response = await fetch(
      process.env.PAZARI_ENGINE_ENDPOINT + '/auth/download?fileID=' + TaskID,
      {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + process.env.PAZARI_ENGINE_API_KEY
        }
      }
    );

    // extract file name and type
    let contentType = response.headers.get('content-type');
    let cd = response.headers.get('content-disposition');
    let fileName = cd.split(' ')[1].split('filename=')[1].replace('"', '').replace('"', '');
    //.replaceAll('"', ''); node avaiable on node 14 x :(

    //extract extention
    const regex = /\.[0-9a-z]+$/i;
    const extention = fileName.match(regex)[0];

    // make a base64 string of file
    const buffer = await response.buffer();
    const base64 = buffer.toString('base64');

    if (response) {
      return res.status(200).json({base64: base64, extension: extention, contentType: contentType, fileName: fileName });
    }

    return res.status(400);
  }
}