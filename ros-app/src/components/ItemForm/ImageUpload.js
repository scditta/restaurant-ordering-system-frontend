import { useState } from 'react';
import { Image } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';

export default function ImageUpload(props) {
  const IMAGE_MAX_MB = 8;
  const IMAGE_FNAME_MAX = 100;

  // Common MIME types: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
  const IMAGE_ACCEPTED_FILETYPES = {
    'image/png': ['.png'],
    'image/bmp': ['.bmp'],
    'image/jpeg': ['.jpeg', '.jpg'],
    'image/webp': ['.webp'],
  };

  const [imgSrc, setImgSrc] = useState(props.defaultImage);

  function imageUpdate(src) {
    setImgSrc(src);
    props.imageUpdateCallback({
      success: true,
      imageBinary: src,
      message: null,
    });
  }

  const onDrop = (acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imgBinary = reader.result;
        //const data = reader.result.split(',');
        imageUpdate(imgBinary);
      };
      reader.readAsDataURL(file);
    });
  };

  const onDropRejected = (rejectedFiles) => {
    rejectedFiles.forEach(({ file, errors }) => {
      let message = `Unable to upload '${file.path}'.`;

      errors.forEach((e) => {
        message += ' ';

        switch (e.code) {
          case 'file-invalid-type':
            message += 'Valid file types include:';
            Object.values(IMAGE_ACCEPTED_FILETYPES).forEach((filetype) => {
              message += ' ' + filetype[0];
            });
            break;
          default:
            message += e.message;
        }
      });

      props.imageUpdateCallback({
        success: false,
        imageBinary: null,
        message: message,
      });
    });
  };

  const clearImage = () => {
    imageUpdate(null);
  };

  function imageValidator(file) {
    if (file.name.length > IMAGE_FNAME_MAX) {
      return {
        code: 'fname-too-large',
        message: `File name is too long (max length: ${IMAGE_FNAME_MAX} characters).`,
      };
    }

    if (file.size > IMAGE_MAX_MB * 1000000) {
      return {
        code: 'size-too-large',
        message: `Image is too large (max size: ${IMAGE_MAX_MB}MB).`,
      };
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDrop,
    onDropRejected: onDropRejected,
    accept: IMAGE_ACCEPTED_FILETYPES,
    maxFiles: 1,
    validator: imageValidator,
    disabled: props.disabled,
  });

  return (
    <div style={{ position: 'relative' }}>
      {imgSrc ? (
        <>
          <Image src={imgSrc} fluid thumbnail></Image>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            fill="currentColor"
            className="bi bi-circle-fill"
            viewBox="0 0 16 16"
            style={{
              position: 'absolute',
              top: '1em',
              right: '1em',
              cursor: 'pointer',
              color: 'white',
            }}
          >
            <circle cx="8" cy="8" r="8" />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            fill="currentColor"
            className="bi bi-x-circle"
            viewBox="0 0 16 16"
            style={{
              position: 'absolute',
              top: '1em',
              right: '1em',
              cursor: 'pointer',
            }}
            onClick={clearImage}
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </>
      ) : (
        <>
          <div
            className="d-flex align-items-center justify-content-center"
            style={{
              backgroundColor: 'rgb(233 233 233)',
              border: '3px dashed',
              marginBottom: '0.5em',
              aspectRatio: '1/1',
              color: 'rgb(122 122 122)',
              borderRadius: '0.5em',
              cursor: 'pointer',
              textAlign: 'center',
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <div>
              {isDragActive ? (
                'Drop file here...'
              ) : (
                <>
                  Drag and drop image here<br></br>(
                  {Object.values(IMAGE_ACCEPTED_FILETYPES).map((filetype, i, arr) => (
                    <span key={filetype[0]}>
                      {filetype[0]}
                      {i < arr.length - 1 ? ' ' : null}
                    </span>
                  ))}
                  )
                </>
              )}
            </div>
          </div>

          <span className="text-muted">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-info-circle"
              viewBox="0 0 16 16"
              style={{
                marginRight: '0.2em',
                transform: 'translate(0px, -2px)',
              }}
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
            </svg>
            Image size cannot exceed {IMAGE_MAX_MB}MB.
          </span>
        </>
      )}
    </div>
  );
}
