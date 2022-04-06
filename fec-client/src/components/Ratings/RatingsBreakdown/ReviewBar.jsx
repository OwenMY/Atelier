import React, { useState } from 'react';
import styled from 'styled-components';

const Bar = styled.div`
font-size: 0.8rem;
display: flex;
flex-direction: row;
gap: 5%;

&:hover {
  background-color: lightgray;
}

&.clicked {
  font-weight: bold;
}

`;


const ReviewBar = ({ rating, num, total, filterByRating }) => {
  const [clicked, setClicked] = useState(false);
  const percent = num / total * 100;

  const toggleColor = () => {
    setClicked(!clicked);
  };

  const handleClick = () => {
    toggleColor();
    filterByRating(rating);
  };

  return (
    <Bar className = { clicked ? 'clicked' : ''} onClick = {handleClick}>
      <span>{rating} stars:</span>
      <svg viewBox = '0, 0, 50, 5' width = '150' height = '15'>
        <linearGradient id = {`gradient-${percent}`}>
          <stop offset = {'0%'} stopColor = "#3D463D"></stop>
          <stop offset = {`${percent}%`} stopColor = "#3D463D"></stop>
          <stop offset = {`${percent}%`} stopColor = "#BAC3BA"></stop>
        </linearGradient>
        <rect fill = {`url(#gradient-${percent})`} width = '100%' height = '100%' />
      </svg>
      <span>{num}</span>
    </Bar>
  );
};

export default ReviewBar;