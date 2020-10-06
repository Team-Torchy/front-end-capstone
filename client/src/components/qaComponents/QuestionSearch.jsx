import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import questionsData from '../../questionsData.js';


const questions = questionsData.results.map((question) => question);

const QuestionSearch = (props) => {
  const [questionsData, setQuestionsData] = useState(questions);



  return (
    <Autocomplete
      id="combo-box-demo"
      options={questions}
      getOptionLabel={(option) => option.question_body}
      fullWidth
      renderInput={(params) => <TextField {...params} label="HAVE A QUESTION? SEARCH FOR ANSWERS..." variant="outlined" />}
    />
  );
};

export default QuestionSearch;