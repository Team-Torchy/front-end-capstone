import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import { useFormik } from 'formik';
import * as Yup from 'yup';

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
//FORMIK VALIDATE FUNCTION (CURRENTLY USING YUP)
// const validate = values => {
//   const errors = {};
//   if (!values.question) {
//     errors.question = 'required';
//   } else if (values.question.length > 1000) {
//     errors.question = 'Must be 1000 characters or less';
//   }

//   if (!values.nickname) {
//     errors.nickname = 'required';
//   } else if (values.nickname.length > 60) {
//     errors.nickname = 'Must be 60 characters or less';
//   }

//   if (!values.email) {
//     errors.email = 'required';
//   } else if (values.email.length > 60) {
//     errors.email = 'Must be 60 characters or less';
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = 'Invalid email address';
//   }

//   return errors;
// };

const AddQuestion = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  // const [questionModal, setQuestionModal] = useState({question: '', email: '', nickname: ''});
  const formik = useFormik({
    initialValues: {
      email: '',
      nickname: '',
      question: ''
    },
    validationSchema: Yup.object({
      question: Yup.string()
        .max(1000, 'Must be 1000 characters or less')
        .required('required'),
      nickname: Yup.string()
        .max(60, 'Must be 60 characters or less')
        .required('required'),
      email: Yup.string()
        .max(60, 'Must be 60 characters or less')
        .email('Invalid email address')
        .required('required'),
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleChange = e => {
  //   setQuestionModal({...questionModal, [e.target.name]: e.target.value});
  // };

  const body = (
    <div className={classes.paper}>
      <h2 id="add-question-title">Ask Your Question</h2>
      <h3 id="add-question-subtitle">About the [PRODUCT NAME]</h3>

      <h4 id="add-question-description">Your Question *</h4>
      <TextField
        required
        fullWidth
        id="question"
        name="question"
        variant="outlined"
        multiline
        rows={6}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.question}
      />
      {formik.touched.question && formik.errors.question ? <div>{formik.errors.question}</div> : null}

      <h4 id="add-nickname-description">What is your Nickname? *</h4>
      <TextField
        required
        fullWidth
        id="nickname"
        name="nickname"
        variant="outlined"
        placeholder="Example: Jackson11!"
        {...formik.getFieldProps('nickname')}
      />
      {formik.touched.nickname && formik.errors.nickname ? <div>{formik.errors.nickname}</div> : null}
      <h5 id="nickname-description-warning"><em>For privacy reasons, do not use your full name or email address.</em></h5>

      <h4 id="add-email-description">Your Email *</h4>
      <TextField
        required
        fullWidth
        id="email"
        name="email"
        variant="outlined"
        placeholder="Why did you like the product or not?"
        {...formik.getFieldProps('email')}
      />
      {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
      <h5 id="nickname-description-warning"><em>For authentication reasons, you will not be emailed.</em></h5>

      <Button variant="outlined" type="submit" className={classes.button}>Submit</Button>
    </div>
  );


  return (
    <div>
      <Button
        variant="contained"
        onClick={handleOpen}
        className={classes.button}
      >
        ADD A QUESTION +
      </Button>

      <Modal
        onSubmit={formik.handleSubmit}
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


//DIALOG SYSTEM SCAFFOLDING
{/* <Button variant="contained" onClick={handleOpen} className={classes.button}>ADD A QUESTION +
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
      </Dialog> */}