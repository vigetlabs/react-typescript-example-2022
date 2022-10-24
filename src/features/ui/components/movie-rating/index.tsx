import { Wrapper } from './styled';
import React from 'react';
import { MdStarHalf, MdStar, MdStarBorder } from 'react-icons/md';

export function MovieRating({ rating }: { rating: number }) {
  const stars: React.ReactNode[] = [];
  let remainder = Math.round(rating) / 2;

  for (let i = 0; i < 5; i++) {
    if (remainder >= 1) {
      stars.push(<MdStar key={i} />);
      remainder--;
    } else if (remainder > 0) {
      stars.push(<MdStarHalf key={i} />);
      remainder = 0;
    } else {
      stars.push(<MdStarBorder key={i} />);
    }
  }

  return <Wrapper>{stars}</Wrapper>;
}
