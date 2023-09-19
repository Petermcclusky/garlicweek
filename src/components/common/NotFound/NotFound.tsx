import React from 'react';
import { useTranslation } from 'react-i18next';
import notFoundImg from 'assets/images/nothing-found.webp';
import * as S from './NotFound.styles';
import { BaseImage } from '../BaseImage/BaseImage';

interface NotFoundProps {
    message?: string
}
export const NotFound: React.FC<NotFoundProps> = ({message}) => {
  const { t } = useTranslation();
  message = message ?? t('common.notFound');

  return (
    <S.NotFoundWrapper>
      <S.ImgWrapper>
        <BaseImage src={notFoundImg} alt="Not found" preview={false} />
      </S.ImgWrapper>
      <S.Text>{message}</S.Text>
    </S.NotFoundWrapper>
  );
};
