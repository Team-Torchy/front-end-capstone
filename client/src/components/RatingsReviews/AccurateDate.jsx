import React from 'react';
import { Date } from 'prismic-reactjs';
import moment from 'moment';


//IMPORT THIS COMPONENT AND PAsS IT STRING DATE WITH KEY "date"
const AccurateDate = (props) => {
  const dataArray = props.date.split("T")[0].split("-");
  const newArray = [dataArray[1], dataArray[2], dataArray[0]].join("-");
  const date = Date(newArray);
  const formattedDate = moment(date).format("LL");
  return formattedDate;
};

export default AccurateDate;