import React, { useState } from 'react';
import { DropzoneDialog } from 'material-ui-dropzone';
import Button from '@material-ui/core/Button';

const Upload = (props) => {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSave = (files) => {
    setFiles(files);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>Add Image</Button>
      <DropzoneDialog
        open={open}
        onSave={handleSave}
        filesLimit={5}
        acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
        showPreviews={true}
        maxFileSize={5000000}
        onClose={handleClose}
      />
    </div>
  );

};

export default Upload;

