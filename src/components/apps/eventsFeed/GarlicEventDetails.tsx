/* eslint-disable prettier/prettier */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BaseFeed } from '@app/components/common/BaseFeed/BaseFeed';
import { NotFound } from '@app/components/common/NotFound/NotFound';
import { ListViewItem } from '@app/pages/GarlicWeekPages/ListViewPage/ListViewFeed/ListViewItem/ListViewItem';
import {GarlicEvents, GetSortFunction, SortBy} from '@app/api/events.api';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { Space } from 'antd';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { setSearchedItem } from '@app/store/slices/filterSlice';
import { useDispatch } from 'react-redux';

const { Title, Text, Link } = BaseTypography;

export function GarlicEventDetails({garlicEvent}: {garlicEvent: GarlicEvents}) {

    function BreakLine(): JSX.Element {
        return (<div
            style={{
                backgroundColor: "black",
                height: 1,
                marginTop: 16,
                marginBottom: 24,
            }}
        ></div>
        )
    }
    const TextWithBoldHeader = function (headerText: string, text?: string, lineBreakAfterHeader = false): JSX.Element| null {
        if (text && text.length > 0) {
            return (
                <Text style={{color: 'inherit'}}>
                    <span style={{fontWeight: 'bold'}}>{headerText} </span>
                    {lineBreakAfterHeader &&
                        <br/>
                    }
                    {text}
                </Text>
            );
        }

        return null;
    }
    const website = (data = '', type = '') =>
        data && data !== 'none' && data != 'N/a' ? (
            <Text>
                {type}
                <Link href={`https://${data}`} target="_blank">
                    {data}
                </Link>
            </Text>
        ) : null;

    let garlicSpotlightSection: JSX.Element| null = null;
    if (garlicEvent?.garlickySpotlight && garlicEvent.garlickySpotlight.length > 0) {
        garlicSpotlightSection = (
            <>
                {TextWithBoldHeader("Garlic Spotlight:", garlicEvent.garlickySpotlight)}
                {TextWithBoldHeader("Garlic Spotlight Date/Hours:", garlicEvent.activityDate)}
                <BreakLine/>
            </>
        );
    }

    let participationDetailsSection: JSX.Element| null = null;
    if ((garlicEvent?.participationDetails && garlicEvent.participationDetails.length > 0) ||
        (garlicEvent?.chef && garlicEvent.chef.length > 0)) {
        participationDetailsSection = (
            <div >
                {(garlicEvent?.participationDetails && garlicEvent.participationDetails.length > 0) &&
                    <div>
                        {garlicEvent.participationDetails}
                    </div>
                }
                {TextWithBoldHeader("Garlic Supplied by:", garlicEvent.chef)}
                <BreakLine/>
            </div>
        )
    }

    let contactCard: JSX.Element| null = null;
    if ((garlicEvent?.tel && garlicEvent.tel.length > 0) ||
                (garlicEvent?.email && garlicEvent.email.length > 0)) {
        contactCard = (
                <div >
                    <Text>
                        <span style={{ fontWeight: 'bold' }}>Contact:</span>
                    </Text>

                    {TextWithBoldHeader("Tel:", garlicEvent.tel)}
                    {TextWithBoldHeader("Email:", garlicEvent.email)}
                </div>
            );
    }

    const cuisineTypeSection: JSX.Element| null = TextWithBoldHeader("Cuisine:", garlicEvent.cuisineType);
    const dietaryOptionsSection: JSX.Element| null = TextWithBoldHeader("Dietary Options:", garlicEvent.dietaryOptions, true);
    const amenitiesSection: JSX.Element| null = TextWithBoldHeader("Amenities:", garlicEvent.amenities, true);
    const accessibilitySection: JSX.Element| null = TextWithBoldHeader("Accessibility:", garlicEvent.accessibility);
    return (
        <Space direction="vertical">
            <div
                style={{
                    textAlign: 'center',
                    paddingTop: 8,
                    color: "#008F3F",
                    fontWeight: "600",
                }}
            >
                Ontario Garlic Week Sept 22 - Oct 1, 2023
            </div>
            <div
                style={{
                    minHeight: 48,
                    position: "relative",
                }}
            >

                { garlicEvent.logoUrl && garlicEvent.logoUrl.length > 0 &&
                    <div
                        style={{
                            width: 48,
                            height: 48,
                            marginRight: 8,
                            backgroundImage: `url("${garlicEvent.logoUrl}")`,
                            backgroundSize: "100%",
                            backgroundRepeat: "no-repeat",
                            display: "inline-block",
                            marginLeft: 0,
                            position: "absolute"
                        }}
                    ></div>
                }
                <Title level={5} style={{
                    textAlign: 'center',
                    paddingTop: 8,
                }}>
                    {garlicEvent.businessName}, {garlicEvent.city}
                </Title>
            </div>
            {participationDetailsSection}
            {garlicSpotlightSection}
            {TextWithBoldHeader("Address:", garlicEvent.address + ", " + garlicEvent.city + ', Ontario, Canada, ' + garlicEvent.postalCode)}
            {TextWithBoldHeader("Business Hours:", garlicEvent.lastDayOfSeason)}
            {TextWithBoldHeader("Last Day of Season:", garlicEvent.businessHours)}
            {contactCard}
            <BreakLine/>
            {cuisineTypeSection}
            {dietaryOptionsSection}
            {amenitiesSection}
            {accessibilitySection}
            {(cuisineTypeSection || dietaryOptionsSection || amenitiesSection || accessibilitySection) &&
                <BreakLine/>
            }
            {website(garlicEvent.website, 'Website: ')}
            {website(garlicEvent.facebook, 'Facebook: ')}
            {website(garlicEvent.insta, 'Instagram: ')}
            {website(garlicEvent.twitter, 'Twitter: ')}
            {garlicEvent.credit && garlicEvent.credit.length > 0 &&
                <div
                    style={{
                        textAlign: 'left',
                        color: "#008F3F",
                        fontSize: 14,
                        fontWeight: "500",
                    }}
                >
                    {garlicEvent.credit}
                </div>
            }
        </Space>
    )
}