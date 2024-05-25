import fs from 'fs';
import { bucket } from '../config/firebaseConfig';
import { UploadError } from '../service/errors/upload-error';

export function uploadFile(file: any) {
  var filePath = file.path;

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log(err);
    }

    var uploadTask = bucket.file(file.filename).createWriteStream();

    uploadTask.on('error', function (error) {
      throw new UploadError('Error ao fazer upload');
    });

    uploadTask.on('finish', function () {});

    uploadTask.end(data);
  });

  fs.unlink(filePath, (err) => {
    if (err) {
      console.log(err);
    }
  });
}

export function getUrlFile(filename: string) {
  const file = bucket.file(filename);

  if (!file) {
    throw new UploadError('File not found');
  }

  return new Promise((resolve, reject) => {
    file.getSignedUrl(
      {
        action: 'read',
        expires: '03-09-2491',
      },
      (err, url) => {
        if (err) {
          reject(new UploadError('Internal server error'));
        }

        resolve(url);
      },
    );
  });
}
