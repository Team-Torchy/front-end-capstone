import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme) => ({
  paper: {
    top: '10%',
    left: '10%',
    position: 'absolute',
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 0
  },
  button: {
    margin: theme.spacing(1),
  }
}));

const AddQuestion = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [questionModal, setQuestionModal] = useState({question: '', email: '', nickname: ''});
  //use props instead of hooks for questionsData access


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = e => {
    setQuestionModal({...questionModal, [e.target.name]: e.target.value});
  };

  const body = (
    <div className={classes.paper}>
      <h2 id="add-question-title">Ask Your Question</h2>
      <h3 id="add-question-subtitle">About the [PRODUCT NAME]</h3>

      <h4 id="add-question-description">Your Question *</h4>
      <TextField required fullWidth name="question" variant="outlined" multiline rows={6} onChange={handleChange}/>

      <h4 id="add-nickname-description">What is your Nickname? *</h4>
      <TextField required fullWidth name="nickname" variant="outlined" placeholder="Example: Jackson11!" onChange={handleChange}/>
      <h5 id="nickname-description-warning"><em>For privacy reasons, do not use your full name or email address.</em></h5>

      <h4 id="add-email-description">Your Email *</h4>
      <TextField required fullWidth name="email" variant="outlined" placeholder="Why did you like the product or not?" helperText="Incorrect entry." onChange={handleChange}/>
      <h5 id="nickname-description-warning"><em>For authentication reasons, you will not be emailed.</em></h5>

      <Button variant="outlined" type="submit" className={classes.button}>Submit</Button>
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