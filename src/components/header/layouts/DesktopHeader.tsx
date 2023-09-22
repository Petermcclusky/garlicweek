import React from 'react';
import { NotificationsDropdown } from '../components/notificationsDropdown/NotificationsDropdown';
import { ProfileDropdown } from '../components/profileDropdown/ProfileDropdown/ProfileDropdown';
import { HeaderSearch } from '../components/HeaderSearch/HeaderSearch';
import { SettingsDropdown } from '../components/settingsDropdown/SettingsDropdown';
import { HeaderFullscreen } from '../components/HeaderFullscreen/HeaderFullscreen';
import { MapViewButton } from '../components/MapViewButton';
import { ListViewButton } from '../components/ListViewButton';
import { CalendarViewButton } from '../components/CalendarViewButton';
import * as S from '../Header.styles';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import useWindowSize from "@app/components/common/UseWindowSize";

interface DesktopHeaderProps {
  isTwoColumnsLayout: boolean;
}

// {/*<BaseCol lg={2} xxl={2} xl={3}>*/} // old logo
// {/*  {theme === 'light' ? (*/}
// {/*    <img src="/logo-light.png" style={{ height: '70px' }} />*/}
// {/*  ) : (*/}
// {/*    <img src="/logo-dark.png" style={{ height: '70px' }} />*/}
// {/*  )}*/}
// {/*background-image: radial-gradient(farthest-corner at center top,#ffffff00 10%, #f8fbff 80%), url(./header_image.jpg);*/}

export const DesktopHeader: React.FC<DesktopHeaderProps> = ({ isTwoColumnsLayout }) => {
    const { width, height } = useWindowSize();
    const headerHeight = Math.min(300, height * 0.3);

    // const imageWidth = 820;
    // const imageHeight = 820;
    // const headerImageAspectRatio = 820 / 312; // w / h
    // const endOfHeaderTextInImage = 66;
    // let headerScale = 0;
    // if (width / headerHeight > headerImageAspectRatio) {
    //     headerScale = width / imageWidth;
    // } else {
    //     headerScale = headerHeight / imageHeight;
    // }

    const theme = useAppSelector((state) => state.theme.theme);

    const logoTopOffset = 8;
    const logoHeight = 64;
    const endOfHeaderMainImage = logoTopOffset + logoHeight;

  return (
    <BaseRow justify="space-between" align="middle"
             style={{
                 display: "flex",
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
                    backgroundImage: `linear-gradient(#ffffff61, var(--layout-body-bg-color) 100%), url("./header_background.jpg")`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "50% 0%",
                    display: "inline-block",
                    maskImage: "linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))",

                }}
            >
            </div>
        </div>

        <div
            style={{
                position: "absolute",
                top: 8,
                right: 0,
                left: 0,
                height: logoHeight,
                backgroundImage: `url("./header_logo.png")`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
            }}
        >
        </div>

        <div></div>

      <S.ProfileColumn $isTwoColumnsLayout={isTwoColumnsLayout}
        style={{
            marginTop: endOfHeaderMainImage,
        }}
      >
        <BaseRow align="middle" justify="end" gutter={[5, 5]}>
          <BaseCol>
            <BaseRow gutter={[{ xxl: 5 }, { xxl: 5 }]}>
              <BaseCol>
                <S.JButton />
              </BaseCol>
              <BaseCol >
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
        </BaseRow>
      </S.ProfileColumn>
    </BaseRow>
  );
};
