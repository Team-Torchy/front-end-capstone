import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import questionsData from '../../questionsData.js';
import SearchBar from "material-ui-search-bar";
// import IconButton from "@material-ui/core/IconButton";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import SearchIcon from "@material-ui/icons/Search";

//STRATEGY
//

const questions = questionsData.results.map((question) => question);
// console.log('questions: ', questions);

const QuestionSearch = (props) => {
  console.log('QuestionSearch Props', props);
  const [questionsData, setQuestionsData] = useState(props.questions);
  const [searchTerm, setSearchTerm] = useState('');
  console.log('questionsData: ', questionsData);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    console.log('event.target.value: ', event.target.value);
    console.log('searchTerm: ', searchTerm);
  };

  const filteredQuestions = () => {
    console.log(questionsData.filter(question => question.question_body.toLowerCase().includes(searchTerm.toLowerCase())));
  };

  // console.log(filteredQuestions);

  return (
    <Autocomplete
      id="combo-box"
      options={questions}
      getOptionLabel={(option) => option.question_body}
      fullWidth
      renderInput={(params) => <TextField {...params} onChange={handleSearchChange} label="HAVE A QUESTION? SEARCH FOR ANSWERS..." variant="outlined" />}


    />
  );
};

export default QuestionSearch;