import React from 'react';

import { color } from '@/styles';

import * as S from './index.style';

interface IProps {
  height?: number;
}

export const ShopSpinner: React.FC<IProps> = ({ height }) => {
  const circles = [...Array(4)].map((_, index) => (
    <div key={index} style={{ background: `${color.gray[850]}` }} />
  ));

  return (
    <S.Container height={height}>
      <S.Spinner>{circles}</S.Spinner>
    </S.Container>
  );
};
