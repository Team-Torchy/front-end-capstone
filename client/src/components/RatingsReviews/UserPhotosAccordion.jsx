import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Collapse, Accordion, AccordionSummary, AccordionDetails, Typography, GridList, GridListTile, GridListTileBar } from '@material-ui/core';
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
}));


const UserPhotosAccordion = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root, classes.root2}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{ height: "10px", width: "50px" }}
        >
          <Typography className={classes.heading}>PHOTOS</Typography>
        </AccordionSummary>
        <AccordionDetails>
            <div className={classes.root2}>
              <GridList className={classes.gridList} cols={2.5}>
                {props.photos.map((tile, i) => (
                  <GridListTile key={tile.url}>
                    <img src={tile.url} />
                  </GridListTile>
                ))}
              </GridList>
            </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default UserPhotosAccordion;