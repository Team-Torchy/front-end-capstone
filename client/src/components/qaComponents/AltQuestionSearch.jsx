import React, {useState, useEffect} from 'react';

// const people = [
//   'Siri',
//   'Alexa',
//   'Google',
//   'Facebook',
//   'Twitter',
//   'Linkedin',
//   'Sinkedin',
// ];
const AltQuestionSearch = (props) => {
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

  return (
    <div className='AltQuestionSearch'>
      {/* <input
        type='text'
        placeholder='Search'
        value={searchTerm}
        onChange={handleChange}
      /> */}
      <ul>
        {props.searchResults.map((item) => (
          <li> {item}</li>
        ))}
      </ul>
    </div>
  );
};

export default AltQuestionSearch;
