/* eslint-disable prettier/prettier */
import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BaseTooltip } from '@app/components/common/BaseTooltip/BaseTooltip';
import { UnorderedListOutlined } from '@ant-design/icons';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { HeaderActionWrapper } from '../Header.styles';

export const ListViewButton: React.FC = () => {
  const location = useLocation();
  return (
    <Link to="/">
      <HeaderActionWrapper>
          <BaseButton
              style={{
                  display: "flex",
                  flexDirection: "row-reverse",
              }}
              type={location.pathname === '/' ? 'ghost' : 'text'}
              icon={<UnorderedListOutlined style={{marginLeft: 4}} />}
          >
              List View
          </BaseButton>
      </HeaderActionWrapper>
    </Link>
  );
};
