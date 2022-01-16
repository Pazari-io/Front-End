import React, { useEffect, useState } from 'react';
// FilePond
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export default function Uploader(props) {
  const [files, setFiles] = useState([]);

  // to avoid re-renders upload duplicate ;)
  const [fileName, setFileName] = useState(new Set());

  useEffect(() => {
    if (files.length > 0) {
      let file = files[0].file;

      // only unprocessed file
      if (fileName.has(file)) return;
      setFileName(fileName.add(file));

      const Moralis = props.Moralis;

      let moralisFile = new Moralis.File(file.name, file);;
      switch (props.type) {
        case 'profileCover':
          moralisFile.save().then(
            function () {
              // get the url only
              props.setData({ ...props.data, cover: moralisFile._url });
            },
            function (error) {
              console.log(error);
            }
          );
          break;
        case 'productPreviewUrl':
          moralisFile.save().then(
            function () {
              // get the url only
              props.setData({ ...props.data, previewUrl: moralisFile._url });
            },
            function (error) {
              console.log(error);
            }
          );
          break;
        case 'productImageUrls':
          moralisFile.save().then(
            //TODO handle multiple
            function () {
              // get the url only
              props.setData({ ...props.data, productImageUrls: [moralisFile._url] });
            },
            function (error) {
              console.log(error);
            }
          );
      }

      //   const formData = new FormData();
      //   formData.append('file', file);

      //   fetch('/api/uploader', {
      //     method: 'POST',
      //     body: formData
      //   })
      //     .then((res) => res.json())
      //     .then((json) => {
      //       if (json.error) {
      //         console.log(json.error);
      //       } else {
      //         console.log(json);
      //         //saveFile(json);
      //       }
      //     });
    }
  }, [files]);

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
        files={files}
        onupdatefiles={setFiles}
        allowMultiple={props.allowMultiple}
        name="files"
        ona
        labelIdle='Drag & Drop your files or <span class="dark:text-gray-300">Browse</span>'
      />
    </div>
  );
}
