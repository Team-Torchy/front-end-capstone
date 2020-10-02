import React from 'react';

var StyleList = ({ styleList, handleSelect, setStyle }) => {

  const options = styleList.map(style => {
    return {'id': style.style_id, 'name': style.name, 'url': style.photos[0].thumbnail_url, 'selected': (style['default?'] === 1 ? true : false)};
  });

  // console.log('StyleOptions: ', options);
  //TODO: reintroduce click logic



  return (
    <div className='styleList'>
      {options.map(option => {
        if (options.indexOf(option)%4 !== 0) {
          return (
            <span className='frame' key={options.indexOf(option)}>
              <img id={option.id} className='style' src={option.url} onClick={handleSelect}></img>
            </span>
          );
        } else {
          return (
            <span className='frame' key={options.indexOf(option)}>
              <br />
              <img id={option.id} className='style' src={option.url} onClick={handleSelect}></img>
            </span>
          );
        }
      })}
    </div>
  );
};

export default StyleList;