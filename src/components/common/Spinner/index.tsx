import React, { useEffect } from 'react';

import { color } from '@/styles';
import { toBodyStyleHidden } from '@/utils';

import * as S from './index.style';

interface IProps {
  height?: number;
}

export const Spinner: React.FC<IProps> = () => {
  const circles = [...Array(4)].map((_, index) => (
    <div key={index} style={{ background: `${color.gray[850]}` }} />
  ));

  useEffect(() => {
    toBodyStyleHidden(true);

    return () => {
      toBodyStyleHidden(false);
    };
  }, []);

  return (
    <S.Container>
      <S.Spinner>{circles}</S.Spinner>
    </S.Container>
  );
};
