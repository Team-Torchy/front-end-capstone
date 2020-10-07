import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Modal, Fade, Backdrop, Grid, Paper, CssBaseline, Container, Button } from '@material-ui/core';
import StarMaker from './StarMaker.jsx';
import Image from 'react-image-resizer';
import AccurateDate from './AccurateDate.jsx';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  paper: {
    height: '600px',
    width: '950px',
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

const UserPhotosModal = (props) => {

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [spotLight, setSpotLight] = useState(props.photos[0].url);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Open Modal
    </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >

        <Fade in={open}>
          <div className={classes.paper}>
            <Grid container spacing={1} alignItems="center" justify="center" style={{ height: '580px' }}>
              <Grid item xs={12} style={{ position: 'relative', top: '-12px', minHeight: '40px', minWidth: '1014px', backgroundColor: 'lightgrey', borderBottom: '1px solid grey ' }}>
                <CloseIcon style={{ float: 'right' }} onClick={handleClose} />
              </Grid>
              <Grid item xs={2} container alignItems="center" justify="center" style={{ height: '560px' }}>
                {props.photos.map((photo, i) => {
                  return (
                    <Grid key={i} container alignItems="center" justify="center" className="gridPhoto">
                      <a onClick={() => setSpotLight(photo.url)}>
                        <Image
                          src={photo.url}
                          height={98}
                          width={93}
                        />
                      </a>
                    </Grid>
                  )
                })}
              </Grid>
              <Grid item xs={7} style={{ height: '560px' }}>
                <Grid container spacing={1} style={{ backgroundColor: 'black', height: '560px', width: '540px', display: 'flex' }} direction="column" alignItems="center" justify="center" >
                  <Image
                    src={spotLight}
                    height={560}
                    width={540}
                  />
                </Grid>
              </Grid>
              <Grid item xs={3} style={{ height: '560px' }}>
                <StarMaker rating={props.rating} />
                <Typography style={{ wordBreak: 'break-all' }} gutterBottom variant="subtitle1">
                  {props.summary}
                </Typography>
                {/* <Break /> */}
                <Typography variant="caption">{props.name + ", "} <AccurateDate date={props.date} /> </Typography>
                <Typography style={{ wordBreak: 'break-all' }} variant="body2" gutterBottom>
                  {props.body}
                </Typography>
              </Grid>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}


export default UserPhotosModal;



