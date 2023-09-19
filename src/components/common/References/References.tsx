import React from 'react';
import * as S from './References.styles';
import { FacebookOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons';

export const References: React.FC = () => {
  return (
    <S.ReferencesWrapper
      style={{
        color: "#008F3F",
      }}
    >
      <S.Text>
        {' '}
        <a href="https://www.ontariogarlicweek.ca/" target="_blank" rel="noreferrer"
           style={{
             color: "#008F3F",
           }}
        >
            <u>
                Ontario Garlic Week{' '}
            </u>
        </a>
        is a project of {' '}
        <a href="https://www.torontogarlicfestival.ca/" target="_blank" rel="noreferrer"
          style={{
            color: "#008F3F",
          }}
        >
          <u>
              Toronto Garlic Festival
          </u>
        </a>
        &nbsp;(an Ontario not-for-profit),&nbsp;

          <a href="./terms" target="" rel="noreferrer"
             style={{
                 color: "#008F3F",
             }}
          >
              <u>
                  Terms of use
              </u>
          </a>
      </S.Text>
      <S.Icons>
        <a href="https://twitter.com/ONGarlicWeek" target="_blank" rel="noreferrer"
           style={{
             color: "#008F3F",
           }}
        >
          <TwitterOutlined />
        </a>
        <a href="https://www.facebook.com/ontariogarlicweek" target="_blank" rel="noreferrer"
           style={{
             color: "#008F3F",
           }}
        >
          <FacebookOutlined />
        </a>
        <a href="https://www.instagram.com/ontariogarlicweek/" target="_blank" rel="noreferrer"
           style={{
             color: "#008F3F",
           }}
        >
          <InstagramOutlined />
        </a>
      </S.Icons>
    </S.ReferencesWrapper>
  );
};
