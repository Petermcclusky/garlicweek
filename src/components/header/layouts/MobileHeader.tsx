import React from 'react';
import { NotificationsDropdown } from '../components/notificationsDropdown/NotificationsDropdown';
import { ProfileDropdown } from '../components/profileDropdown/ProfileDropdown/ProfileDropdown';
import { HeaderSearch } from '../components/HeaderSearch/HeaderSearch';
import { SettingsDropdown } from '../components/settingsDropdown/SettingsDropdown';
import * as S from '../Header.styles';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { MapViewButton } from '../components/MapViewButton';
import { ListViewButton } from '../components/ListViewButton';
import { CalendarViewButton } from '../components/CalendarViewButton';
import { JoinMobileButton } from '../components/JoinMobileButton';
import {useAppSelector} from "@app/hooks/reduxHooks";

interface MobileHeaderProps {
  toggleSider: () => void;
  isSiderOpened: boolean;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({ toggleSider, isSiderOpened }) => {
    const theme = useAppSelector((state) => state.theme.theme);

    return (
    <BaseRow align="middle">
        <BaseCol>
            {theme === 'light' ? (
                <img src="/logo-light.png" style={{ height: '60px' }} />
            ) : (
                <img src="/logo-dark.png" style={{ height: '60px' }} />
            )}
        </BaseCol>
      <BaseCol
      >
        <JoinMobileButton />
      </BaseCol>
      <BaseCol
          style = {{
              marginLeft: "auto",
          }}>
        <BaseRow align="middle">
          <BaseCol>
            <ListViewButton />
          </BaseCol>
          <BaseCol>
            <MapViewButton />
          </BaseCol>
          {/*<BaseCol>*/}
          {/*  <CalendarViewButton />*/}
          {/*</BaseCol>*/}
        </BaseRow>
      </BaseCol>
      <S.BurgerCol
      style = {{
          marginLeft: "auto",
      }}>
        <BaseCol>
          <SettingsDropdown />
        </BaseCol>
      </S.BurgerCol>
    </BaseRow>
  );
};
