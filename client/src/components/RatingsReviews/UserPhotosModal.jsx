import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Collapse, Accordion, AccordionSummary, AccordionDetails, Typography, GridList, GridListTile, GridListTileBar, Modal, Fade, Backdrop, Grid, Paper } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// import tileData from './tileData';

const useStyles = makeStyles((theme) => ({
  root: {
    // width: '30%',
    padding: theme.spacing(2, 0),
    // background: 'grey',
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
    height: '500px',
    width: '800px',
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
    border: '2px solid #000',
    maxWidth: '650px',
    maxHeight: '480px',
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
            <div className={classes.root}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      {props.photos.map((photo, i) => {
                        return (
                          <Grid key={i}>
                            <a>
                              <img className="photoStyle" src={photo.url} onClick={() => setSpotLight(photo.url)} />
                            </a>
                          </Grid>
                        )
                      })}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid>
                  <img className={classes.fit} src={spotLight} />
                </Grid>
              </Grid>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}


export default UserPhotosModal;



