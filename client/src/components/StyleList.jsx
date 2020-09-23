import React from 'react';

var StyleList = ({ styleList, handleSelect }) => {
  return (
    <div className='styleList'>
      {styleList.map((style) => {
        return (
          <a className='styleContainer' key={style.id} onClick={handleSelect}>
            <img className="style" id={style.id} src={style.url} />
          </a>
        )
      })}
    </div>
  )
}

export default StyleList;