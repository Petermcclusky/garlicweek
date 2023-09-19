/* eslint-disable prettier/prettier */

import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { activityStatuses } from '@app/constants/config/activityStatuses';
import { Dates } from '@app/constants/Dates';
import { GarlicEvents } from '@app/api/events.api';
import * as S from './ListViewItem.styles';
import { categoriesList } from '@app/constants/categoriesList';

interface ListViewItemProps {
  key: number;
  activity: GarlicEvents;
  onClick: (e: any) => void;
}

export const ListViewItem: React.FC<ListViewItemProps> = ({ activity, onClick }) => {
  const { t } = useTranslation();

  const currentActivity = useMemo(
    () => categoriesList.find((dbStatus) => dbStatus.name === activity.category),
    [activity.category],
  );

  const chefText = activity.chef && activity.chef.length > 0 ? (
      <S.Text>
        <span style={{ fontWeight: 'bold' }}>Locally Grown Garlic Supplied By: </span>
        {activity.chef}
      </S.Text>
  ) : null;

  const garlickyFeatureText = activity.garlickyFeature && activity.garlickyFeature.length > 0 ? (
    <S.Text>
      {activity.garlickyFeature}
    </S.Text>
  ) : null;

  const garlicSpotlightText = activity.garlickySpotlight && activity.garlickySpotlight.length > 0 ? (
    <S.Text>
      <span style={{ fontWeight: 'bold' }}>Garlicky Spotlight: </span>
      {activity.garlickySpotlight}

        { activity.activityDate && activity.activityDate.length > 0 ? ` (${activity.activityDate})` : ""}
    </S.Text>
  ) : null;

  return (
    <S.ActivityCard onClick={onClick} style={{ cursor: 'pointer' }}>
      <S.Wrapper>
        {/* <S.ImgWrapper>
          <img src={image} alt={title} width={84} height={84} />
        </S.ImgWrapper> */}

        <S.InfoWrapper>
          <S.InfoHeaderWrapper>
            <S.TitleWrapper>
              <div
                  style={{
                      display: "flex",
                    alignItems: "center",
                  }}
              >
                  { activity.logoUrl && activity.logoUrl.length > 0 &&
                      <div
                          style={{
                              width: 64,
                              height: 64,
                              marginRight: 8,
                              backgroundImage: `url("${activity.logoUrl}")`,
                              backgroundSize: "100%",
                              backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                              display: "inline-block",
                          }}
                      ></div>
                  }
                  <S.Title level={5}>{activity.businessName}</S.Title>
                  { activity.city && activity.city.length > 0 &&
                      <S.Text>&nbsp;- {activity.city}</S.Text>
                  }
              </div>

              {/* <S.IconWrapper>{currentActivity?.icon}</S.IconWrapper> */}
            </S.TitleWrapper>

            { currentActivity &&
                <S.Text>{currentActivity?.title}</S.Text>
            }
            {garlickyFeatureText}
            {chefText}
            {garlicSpotlightText}
          </S.InfoHeaderWrapper>
            { activity.businessHours && activity.businessHours.length > 0 &&
                <S.InfoBottomWrapper>
                  <S.DateText>
                    Business hour:<br/>
                    {activity.businessHours}
                  </S.DateText>
                </S.InfoBottomWrapper>
            }
        </S.InfoWrapper>
      </S.Wrapper>
    </S.ActivityCard>
  );
};
