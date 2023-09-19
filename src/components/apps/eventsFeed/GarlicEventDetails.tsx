/* eslint-disable prettier/prettier */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {GarlicEvents, GetSortFunction, SortBy} from '@app/api/events.api';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { Space } from 'antd';

const { Title, Text, Link } = BaseTypography;

export function GarlicEventDetails({garlicEvent, logoSize}: {garlicEvent: GarlicEvents, logoSize?: number}) {
    const actualLogoSize: number = logoSize ?? 72

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
    const TextWithBoldHeader = function (headerText: string, text?: string, lineBreakAfterHeader = false, lineBreakBefore = false): JSX.Element| null {
        if (text && text.length > 0) {
            return (
                <>
                    {lineBreakBefore &&
                        <br/>
                    }
                    <Text style={{color: 'inherit'}}>
                        <span style={{fontWeight: 'bold'}}>{headerText} </span>
                        {lineBreakAfterHeader &&
                            <br/>
                        }
                        {text}
                    </Text>
                </>
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

    let participationDetailsSection: JSX.Element| null = null;
    if ((garlicEvent?.garlickyFeature && garlicEvent.garlickyFeature.length > 0) ||
        (garlicEvent?.chef && garlicEvent.chef.length > 0)) {
        participationDetailsSection = (
            <div >
                {(garlicEvent?.garlickyFeature && garlicEvent.garlickyFeature.length > 0) &&
                    <div>
                        {garlicEvent.garlickyFeature}
                    </div>
                }
                {TextWithBoldHeader("Locally Grown Garlic Supplied By:", garlicEvent.chef)}
                <BreakLine/>
            </div>
        )
    }

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

    let contactCard: JSX.Element| null = null;
    if ((garlicEvent?.tel && garlicEvent.tel.length > 0) ||
                (garlicEvent?.email && garlicEvent.email.length > 0)) {
        contactCard = (
                <div >
                    <Text>
                        <span style={{ fontWeight: 'bold' }}>Contact:</span>
                    </Text>

                    {TextWithBoldHeader("Tel:", garlicEvent.tel, false, true)}
                    {TextWithBoldHeader("Email:", garlicEvent.email, false, true)}
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
                    minHeight: actualLogoSize,
                    position: "relative",
                }}
            >

                { garlicEvent.logoUrl && garlicEvent.logoUrl.length > 0 &&
                    <div
                        style={{
                            width: actualLogoSize,
                            height: actualLogoSize,
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
                    paddingLeft: actualLogoSize,
                    paddingRight: actualLogoSize,
                }}>
                    {garlicEvent.businessName}, {garlicEvent.city}
                </Title>
            </div>
            {participationDetailsSection}
            {garlicSpotlightSection}
            {TextWithBoldHeader("Address:", garlicEvent.address + ", " + garlicEvent.city + ', Ontario, Canada, ' + garlicEvent.postalCode)}
            {TextWithBoldHeader("Business hours:", garlicEvent.businessHours)}
            {TextWithBoldHeader("Last Day of Season:", garlicEvent.lastDayOfSeason)}
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
                        fontSize: 12,
                        fontWeight: "500",
                    }}
                >
                    {garlicEvent.credit}
                </div>
            }
        </Space>
    )
}