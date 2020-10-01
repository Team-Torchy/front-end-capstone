import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
  paper: {
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

  return (
    <div>
      <Button variant="contained" onClick={handleOpen} className={classes.button}>ADD A QUESTION +
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddQuestion;


// const body = (
//   <div className={classes.paper}>
//     <h2 id="add-question-title">Ask Your Question</h2>
//     <h3 id="add-question-subtitle">About the [PRODUCT NAME]</h3>

//     <h4 id="add-question-description">Your Question *</h4>
//     <TextField
//       required
//       fullWidth
//       name="question"
//       variant="outlined"
//       multiline
//       rows={6}
//       onChange={handleChange}
//     />

//     <h4 id="add-nickname-description">What is your Nickname? *</h4>
//     <TextField required fullWidth name="nickname" variant="outlined" placeholder="Example: Jackson11!" onChange={handleChange}/>
//     <h5 id="nickname-description-warning"><em>For privacy reasons, do not use your full name or email address.</em></h5>

//     <h4 id="add-email-description">Your Email *</h4>
//     <TextField
//       required
//       fullWidth
//       name="email"
//       variant="outlined"
//       placeholder="Why did you like the product or not?" helperText="Incorrect entry."
//       onChange={handleChange}
//     />
//     <h5 id="nickname-description-warning"><em>For authentication reasons, you will not be emailed.</em></h5>

//     <Button variant="outlined" type="submit" className={classes.button}>Submit</Button>
//   </div>
// );

// return (
//   <div>
//     <Button variant="contained" onClick={handleOpen} className={classes.button}>ADD A QUESTION +
//     </Button>

//     <Modal
//       open={open}
//       onClose={handleClose}
//       aria-labelledby="simple-modal-title"
//       aria-describedby="simple-modal-description"
//     >
//       {body}
//     </Modal>
//   </div>
// );
// };
