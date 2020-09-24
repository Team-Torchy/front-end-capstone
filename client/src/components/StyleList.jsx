import React from 'react';

var StyleList = ({ styleList, handleSelect }) => {
  return (
    <div className='styleList'>
      {styleList.map((style) => {
        return (
          <a className='styleContainer' key={style.id}>
            <img className="style" id={style.id} src={style.url} onClick={handleSelect}/>
          </a>
        )
      })}
    </div>
  )
}

export default StyleList;