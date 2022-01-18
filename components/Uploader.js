import React, { useEffect, useState } from 'react';
// FilePond
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export const uploadToMoralis = async (files, Moralis) => {
  if (files.length === 0) {
    return [];
  }

  let fileNames = [];
  for (let file of files) {
    file = file.file;

    let moralisFile = new Moralis.File(file.name, file);
    let res = await moralisFile.save();
    fileNames.push(res._url);
  }
  return fileNames;
};

export default function Uploader(props) {
  return (
    <div className="dark:bg-gray-800">
      {/* customizing uploader  */}
      <style jsx global>{`
        .filepond--item-panel {
          background-color: #fff;
        }

        /* the text color of the drop label*/
        .filepond--drop-label {
          color: #565e6c;
        }

        .filepond--panel-root {
          background-color: #374151;
        }
      `}</style>

      <FilePond
        files={props.files}
        onupdatefiles={props.setFiles}
        allowMultiple={props.allowMultiple}
        name="files"
        ona
        labelIdle='Drag & Drop your files or <span class="dark:text-gray-300">Browse</span>'
      />
    </div>
  );
}
