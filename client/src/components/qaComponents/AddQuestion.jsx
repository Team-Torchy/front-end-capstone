import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const AddQuestion = (props) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  // const [modalStyle] = useState(getModalStyle); style={modalStyle}(this last part goes on line 31 if needed)
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div className={classes.paper}>
      <h2 id="add-question-title">Ask Your Question</h2>
      <h3 id="add-question-subtitle">About the [PRODUCT NAME]</h3>

      <h4 id="add-question-description">Your Question *</h4>
      <TextareaAutosize aria-label="minimum height" rowsMin={6}/>

      <h4 id="add-nickname-description">What is your Nickname? *</h4>
      <TextField fullWidth variant="outlined" placeholder="Example: Jackson11!"/>
      <h5 id="nickname-description-warning"><em>For privacy reasons, do not use your full name or email address.</em></h5>

      <h4 id="add-email-description">Your Email *</h4>
      <TextField fullWidth variant="outlined" placeholder="Why did you like the product or not?"/>
      <h5 id="nickname-description-warning"><em>For authentication reasons, you will not be emailed.</em></h5>

      <AddQuestion />
    </div>
  );

  return (
    <div>
      <Button variant="contained" onClick={handleOpen} className={classes.button}>ADD A QUESTION +</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default AddQuestion;





// import React from 'react';
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle
// } from '@material-ui/core';
// import PropTypes from 'prop-types';

// const AddQuestion = ({
//   isOpen,
//   handleClose,
//   title,
//   subtitle,
//   children
// }) => {

//   return (
//     <div>
//       <Dialog
//         fullWidth
//         maxWidth='md'
//         open={isOpen}
//         onClose={handleClose}
//         aria-labelledby='max-width-dialog-title'
//       >
//         <DialogTitle id='max-width-dialog-title'>{title}</DialogTitle>
//         <DialogContent>
//           <DialogContentText>{subtitle}</DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} color='primary'>
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };