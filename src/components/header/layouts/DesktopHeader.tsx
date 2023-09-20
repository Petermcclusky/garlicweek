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

interface DesktopHeaderProps {
  isTwoColumnsLayout: boolean;
}

// {/*<BaseCol lg={2} xxl={2} xl={3}>*/} // old logo
// {/*  {theme === 'light' ? (*/}
// {/*    <img src="/logo-light.png" style={{ height: '70px' }} />*/}
// {/*  ) : (*/}
// {/*    <img src="/logo-dark.png" style={{ height: '70px' }} />*/}
// {/*  )}*/}
export const DesktopHeader: React.FC<DesktopHeaderProps> = ({ isTwoColumnsLayout }) => {
  const theme = useAppSelector((state) => state.theme.theme);
  const leftSide = isTwoColumnsLayout ? (
    <S.SearchColumn xl={16} xxl={17}>
      <BaseRow justify="space-between">
        <BaseCol xl={15} xxl={12}>
          <HeaderSearch />
        </BaseCol>
        <BaseCol>
          <S.JButton />
        </BaseCol>
      </BaseRow>
    </S.SearchColumn>
  ) : (
    <>
        <div
            style={{
                marginRight: 8,
                flex: 1,
                maxWidth: 465,
                height: 140,
            }}
        >
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    backgroundImage: `url("./header_image.jpg")`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    display: "inline-block",
                }}
            >
            </div>
        </div>
    </>
  );

  return (
    <BaseRow justify="space-between" align="middle"
             style={{
                 display: "flex",
             }}
    >
      {leftSide}

      <S.ProfileColumn $isTwoColumnsLayout={isTwoColumnsLayout}>
        <BaseRow align="middle" justify="end" gutter={[5, 5]}>
          <BaseCol>
            <BaseRow gutter={[{ xxl: 5 }, { xxl: 5 }]}>
              <BaseCol>
                <S.JButton />
              </BaseCol>
              <BaseCol
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: 4,
                }}
              >
                  <div
                    style={{marginRight: 4}}
                  >
                      List View:
                  </div>
                <ListViewButton />
              </BaseCol>

                <BaseCol
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{marginRight: 4}}
                    >
                        Map View:
                    </div>
                    <MapViewButton />
                </BaseCol>
              {/*<BaseCol>*/}
              {/*  <CalendarViewButton />*/}
              {/*</BaseCol>*/}
              <BaseCol>
                <HeaderFullscreen />
              </BaseCol>
              <BaseCol>
                <SettingsDropdown />
              </BaseCol>
            </BaseRow>
          </BaseCol>
        </BaseRow>
      </S.ProfileColumn>
    </BaseRow>
  );
};
