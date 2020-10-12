import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Modal, Fade, Backdrop, Grid, Paper, CssBaseline, Container, Button } from '@material-ui/core';
import StarMaker from './StarMaker.jsx';
import Image from 'react-image-resizer';
import AccurateDate from './AccurateDate.jsx';
import CloseIcon from '@material-ui/icons/Close';
import Rating from '@material-ui/lab/Rating';
import Radio from '@material-ui/core/Radio';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';

// ADD REACT HOOKS SO ThAT YOU CAN MAKE STATE IN HERE AND DEClARE A BOOLEAN ONCLICK THAT WILL CHANGE BOOLEAN AND IF TRUE WILL RENDER ACCORDION UNDER THE BUTTON
const useStyles = makeStyles((theme) => ({
  paper: {

    maxWidth: 450,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));


const AddAReview = (props) => {

  const validate = values => {

    const errors = {};
    if (!values.rating) {
      errors.rating = 'Required';
    }
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (Object.keys(values.characteristics).length !== Object.keys(props.meta.characteristics).length) {
      console.log('yes')
      errors.characteristics = {};
      Object.entries(props.meta.characteristics).map((x, i) => {
        if (!values.characteristics[x[1].id]) {
          errors.characteristics[x[1].id] = "Required"
        }
      });
    }
    if (values.recommended === 0) {
      errors.recommended = "Required";
    }
    return errors;
  };

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = React.useState('a');
  const [empty, setEmpty] = useState(false);

  const handle = () => {
    setEmpty(true);
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      rating: 0,
      characteristics: {},
      recommended: 0,
      summary: '',
      body: '',
      nickname: '',
    },
    validate,
    validationSchema: Yup.object({
      summary: Yup.string()
        .max(60, 'Must be 60 characters or less')
        .required('required'),
      body: Yup.string()
        .max(1000, 'Must be 1000 characters or less')
        .min(50, 'Must be atleast 50 characters or more')
        .required('required'),
      nickname: Yup.string()
        .max(60, 'Must be 60 characters or less')
        .required('required'),
    }),
    onSubmit: values => {
      props.postAReview({product_id: props.id, rating: Number(values.rating), summary: values.summary, body: values.body, recommend: values.recommended, name: values.nickname, email: values.email, characteristics: values.characteristics});
      // alert(JSON.stringify(values, null, 2));
    },
  });

  const formBool = (id) => {
    if (formik.errors.characteristics) {
      if (formik.errors.characteristics[id]) {
        return <Typography variant="caption">{formik.errors.characteristics[id]}</Typography>;
      } else {
        return null;
      }
    }
  };

  const radioButtons = () => {
    return (
      <Grid item xs={12} container>
        {Object.entries(props.meta.characteristics).map((x, i) => {
          return (
            <Grid item xs={12} key={i}>
              <Typography caption="body1">{x[0]}*</Typography>
              <RadioGroup required id="characteristics" name="characteristics" row aria-label="position" name="position" defaultValue="top" onChange={formik.handleChange} >
                <FormControlLabel value="1" control={<Radio color="primary" />} label="1" onClick={(e) => { formik.values.characteristics[x[1].id] = Number(e.target.value); validate(formik.values) }} />
                <FormControlLabel value="2" control={<Radio color="primary" />} label="2" onClick={(e) => { formik.values.characteristics[x[1].id] = Number(e.target.value); validate(formik.values) }} />
                <FormControlLabel value="3" control={<Radio color="primary" />} label="3" onClick={(e) => { formik.values.characteristics[x[1].id] = Number(e.target.value); validate(formik.values) }} />
                <FormControlLabel value="4" control={<Radio color="primary" />} label="4" onClick={(e) => { formik.values.characteristics[x[1].id] = Number(e.target.value); validate(formik.values) }} />
                <FormControlLabel value="5" control={<Radio color="primary" />} label="5" onClick={(e) => { formik.values.characteristics[x[1].id] = Number(e.target.value); validate(formik.values) }} />
              </RadioGroup>
              {formBool(x[1].id)}
            </Grid>
          );
        })}
      </Grid>
    )
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>ADD A REVIEW +</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        overflow= "scroll"
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >

        <Fade in={open}>
          <div className={classes.paper}>
            <form onSubmit={formik.handleSubmit}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography caption="subtitle1">Write Your Review</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography caption="subtitle2">About the product name</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography caption="body1">Overall Rating*</Typography>
                  <Rating
                    required
                    id="rating"
                    name="rating"
                    size="small"
                    onChange={formik.handleChange}
                    value={Number(formik.values.rating)}
                  />
                  {formik.errors.rating ? <Typography variant="caption">{formik.errors.rating}</Typography> : null}
                </Grid>
                {radioButtons()}
                <Grid item xs={12}>
                  <Typography caption="body1">Do you recommend this product?*</Typography>
                  <RadioGroup row aria-label="position" name="position" defaultValue="top" onChange={formik.handleChange}>
                    <FormControlLabel value="true" control={<Radio color="primary" />} label="Yes" onClick={(e) => { formik.values.recommended = Boolean(e.target.value); validate(formik.values) }} />
                    <FormControlLabel value="false" control={<Radio color="primary" />} label="No" onClick={(e) => { formik.values.recommended = !Boolean(e.target.value); validate(formik.values) }} />
                  </RadioGroup>
                  {formik.errors.recommended ? <Typography variant="caption">{formik.errors.recommended}</Typography> : null}
                </Grid>
                <Grid item xs={12}>
                  <Typography caption="body1">Review Summary</Typography>
                  <TextField
                    required
                    fullWidth
                    id="summary"
                    name="summary"
                    variant="outlined"
                    // multiline
                    rows={1}
                    placeholder="Example: Best purchase ever!"
                    inputProps={{ maxLength: 60 }}
                    onChange={formik.handleChange}
                    value={formik.values.summary}
                  />
                  {formik.touched.summary && formik.errors.summary ? <Typography variant="caption">{formik.errors.summary}</Typography> : null}
                </Grid>
                <Grid item xs={12}>
                  <Typography caption="body1">Review Body*</Typography>
                  <TextField
                    required
                    fullWidth
                    id="body"
                    name="body"
                    variant="outlined"
                    multiline
                    placeholder="Why did you like the product or not?"
                    rows={2}
                    inputProps={{ maxLength: 1000 }}
                    onChange={formik.handleChange}
                    value={formik.values.body}
                  />
                  {formik.touched.body && formik.errors.body ? <Typography variant="caption">{formik.errors.body}</Typography> : null}
                </Grid>
                <Grid item xs={12}>
                  <Typography caption="body1">What is your nickname?*</Typography>
                  <TextField
                    required
                    fullWidth
                    id="nickname"
                    name="nickname"
                    variant="outlined"
                    // multiline
                    placeholder="Example: jackson11!"
                    onChange={formik.handleChange}
                    value={formik.values.nickname}
                  />
                  {formik.touched.nickname && formik.errors.nickname ? <Typography variant="caption">{formik.errors.nickname}</Typography> : null}
                  <Typography variant="caption">For privacy reasons, do not use your full name or email address</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography caption="body1">Your Email?*</Typography>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    name="email"
                    type="email"
                    variant="outlined"
                    placeholder="Example: jackson11@email.com"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  {formik.errors.email ? <Typography variant="caption">{formik.errors.email}</Typography> : null}
                  <Typography variant="caption">For authentication reasons, you will not be emailed</Typography>
                </Grid>
              </Grid>
              <Button type="submit" variant="outlined">submit</Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default AddAReview;