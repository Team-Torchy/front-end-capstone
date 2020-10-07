import React, {useState, useEffect} from 'react';

const AltQuestionSearch = (props) => {

  return (
    <div className='AltQuestionSearch'>

      <ul>
        {props.searchResults.map((question) => (
          <li> {question.question_body}</li>
        ))}
      </ul>
    </div>
  );
};

export default AltQuestionSearch;


// const [searchTerm, setSearchTerm] = useState('');
// const [searchResults, setSearchResults] = useState([]);
// const handleChange = (e) => {
//   setSearchTerm(e.target.value);
// };

// useEffect(() => {
//   const results = people.filter((person) =>
//     person.toLowerCase().includes(searchTerm)
//   );
//   setSearchResults(results);
// }, [searchTerm]);

{/* <input
        type='text'
        placeholder='Search'
        value={searchTerm}
        onChange={handleChange}
      /> */}