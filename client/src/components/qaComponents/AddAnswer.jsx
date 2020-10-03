import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Upload from './Upload.jsx';

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

const AddAnswer = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  // const [answerModal, setAnswerModal] = useState({answer: '', email: '', nickname: '', images: []);
  const formik = useFormik({
    initialValues: {
      email: '',
      nickname: '',
      answer: '',
      images: []
    },
    validationSchema: Yup.object({
      answer: Yup.string()
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
  //   setAnswerModal({...answerModal, [e.target.name]: e.target.value});
  // };

  const body = (
    <div className={classes.paper}>
      <h2 id="add-answer-title">Submit Your Answer</h2>
      <h3 id="add-answer-subtitle">[PRODUCT NAME]:[QUESTION BODY]</h3>

      <h4 id="add-answer-description">Your Answer *</h4>
      <TextField
        required
        fullWidth
        id="answer"
        name="answer"
        variant="outlined"
        multiline
        rows={6}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.answer}
      />
      {formik.touched.answer && formik.errors.answer ? <div>{formik.errors.answer}</div> : null}

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

      <Upload />

      <Button disabled={!(formik.isValid && formik.dirty)} variant="outlined" type="submit" className={classes.button}>Submit</Button>
    </div>
  );


  return (
    <div>
      <Button
        variant="text"
        onClick={handleOpen}
        className={classes.button}
      >
        Add Answer
      </Button>

      <Modal
        onSubmit={formik.handleSubmit}
        open={open}
        onClose={handleClose}
        aria-labelledby="add-answer-modal"
        aria-describedby="add-answer-modal"
      >
        {body}
      </Modal>
    </div>
  );
};

export default AddAnswer;
