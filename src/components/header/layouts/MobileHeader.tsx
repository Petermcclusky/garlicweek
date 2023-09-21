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
import useWindowSize from "@app/components/common/UseWindowSize";

interface MobileHeaderProps {
  toggleSider: () => void;
  isSiderOpened: boolean;
}



export const MobileHeader: React.FC<MobileHeaderProps> = ({ toggleSider, isSiderOpened }) => {
    const theme = useAppSelector((state) => state.theme.theme);

    const { width, height } = useWindowSize();
    const headerHeight = Math.min(160, height * 0.2);

    const logoTopOffset = 8;
    const logoHeight = 48;
    const endOfHeaderMainImage = logoTopOffset + logoHeight - 8;

    return (
    <BaseRow align="middle"
        style={{
        }}
    >
        <div
            style={{
                position: "absolute",
                top: 0,
                right: 0,
                left: 0,
                height: headerHeight,
            }}
        >
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    backgroundImage: `linear-gradient(#ffffff91, var(--layout-body-bg-color) 100%), url("./header_background.jpg")`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "50% 0%",
                }}
            >
            </div>
        </div>

        {/*<div*/}
        {/*    style={{*/}
        {/*        position: "absolute",*/}
        {/*        top: 8,*/}
        {/*        right: 0,*/}
        {/*        left: 0,*/}
        {/*        height: logoHeight,*/}
        {/*        backgroundImage: `url("./logo-light.png")`,*/}
        {/*        backgroundSize: "contain",*/}
        {/*        backgroundRepeat: "no-repeat",*/}
        {/*        backgroundPosition: "center",*/}
        {/*    }}*/}
        {/*>*/}
        {/*</div>*/}

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
