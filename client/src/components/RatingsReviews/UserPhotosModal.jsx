import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Collapse, Accordion, AccordionSummary, AccordionDetails, Typography, GridList, GridListTile, GridListTileBar, Modal, Fade, Backdrop, Grid, Paper, Box } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import StarMaker from './StarMaker.jsx';
// import sizeOf from 'image-size';
// import tileData from './tileData';
import Image from 'react-image-resizer';
import AccurateDate from './AccurateDate.jsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    // width: '30%',
    padding: theme.spacing(2, 0),
  },
  heading: {
    fontSize: theme.typography.pxToRem(7),
    fontWeight: theme.typography.fontWeightRegular,
  },
  root2: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
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
  fit: {

  },

}));

// fit: {
//   maxWidth: '650px',
//   minWidth: '500px',
// },
// fit2: {
//   minHeight: '435px',
//   maxHeight: '435px',
// },
// const stylesObj = makeStyles((theme) => ({
//   fit: {
//     backgroundColor:'red',
//   },
// }));

const UserPhotosModal = (props) => {

  function getMeta(url, callback) {
    var img = new Image();
    img.src = url;
    img.onload = function () { callback(this.width, this.height); }
  }



  const classes = useStyles();
  // const stylesObj = stylesObj();
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
                <Typography style={{wordBreak: 'break-all'}} gutterBottom variant="subtitle1">
                  {props.summary}
                </Typography>
                {/* <Break /> */}
                <Typography  variant="caption">{props.name + ", "} <AccurateDate date={props.date} /> </Typography>
                <Typography style={{wordBreak: 'break-all'}} variant="body2" gutterBottom>
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



