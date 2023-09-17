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

    const BreakLine = (
        <div
            style={{
                backgroundColor: "black",
                height: 1,
                marginTop: 16,
                marginBottom: 24,
            }}
        ></div>
    )
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
                <Text style={{color: 'inherit'}}>
                    <span style={{fontWeight: 'bold'}}>Garlic Spotlight: </span>
                    {garlicEvent.garlickySpotlight}
                </Text>
                {garlicEvent.activityDate && garlicEvent.activityDate.length > 0 &&
                <Text style={{color: 'inherit'}}>
                    <span style={{fontWeight: 'bold'}}>Garlic Spotlight Date/Hours: </span>
                    {garlicEvent.activityDate}
                </Text>}
                {BreakLine}
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


                {(garlicEvent?.chef && garlicEvent.chef.length > 0) &&
                    <Text>
                        <span style={{ fontWeight: 'bold' }}>Garlic Supplied by: </span>
                        {garlicEvent.chef}
                    </Text>
                }
                {BreakLine}
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
                    {(garlicEvent?.tel && garlicEvent.tel.length > 0) &&
                        <Text>
                            <br/>
                            <span style={{ fontWeight: 'bold' }}>Tel: </span>
                            {garlicEvent.tel}
                        </Text>
                    }
                    {(garlicEvent?.email && garlicEvent.email.length > 0) &&
                        <Text>
                            <br/>
                            <span style={{ fontWeight: 'bold' }}>Email: </span>
                            {garlicEvent.email}
                        </Text>
                    }
                </div>
            );
    }
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
            <Text>
                <span style={{ fontWeight: 'bold' }}>Address: </span>
                {garlicEvent.address + ", " + garlicEvent.city + ', Ontario, Canada, ' + garlicEvent.postalCode}
            </Text>
            {garlicEvent.businessHours && garlicEvent.businessHours.length > 0 &&
                <Text>
                    <span style={{ fontWeight: 'bold' }}>Business Hours: </span>
                    {garlicEvent.businessHours}
                </Text>
            }
            {garlicEvent.lastDayOfSeason && garlicEvent.lastDayOfSeason.length > 0 &&
                <Text>
                    <span style={{ fontWeight: 'bold' }}>Last Day of Season: </span>
                    {garlicEvent.lastDayOfSeason}
                </Text>
            }
            {contactCard}
            {BreakLine}
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