import { IconCalendar } from '@svg';
import React from 'react';

import * as S from './index.style';

export const HomeContainer: React.FC = () => {
  return (
    <S.Container>
      <p>Hello, HomContainer!</p>
      <S.Image src="/images/event1.png" />
      <div style={{ width: 20, height: 20 }}>
        <IconCalendar />
      </div>
    </S.Container>
  );
};
