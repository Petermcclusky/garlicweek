/* eslint-disable prettier/prettier */
import * as React from 'react';
import {useState, useMemo, useEffect, useRef} from 'react';
import Map, {
    Marker,
    Popup,
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl,
    MapRef
} from 'react-map-gl';
import { getEvents, GarlicEvents } from '@app/api/events.api';
import MapboxClient from '@mapbox/mapbox-sdk/lib/classes/mapi-client';
import GeocodingService, { GeocodeFeature, GeocodeRequest } from '@mapbox/mapbox-sdk/services/geocoding';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import mapboxgl, { Coordinate } from 'mapbox-gl';
import { Space } from 'antd';
import { useAppSelector } from '@app/hooks/reduxHooks';
import styled from 'styled-components';
import { FONT_FAMILY, FONT_SIZE, FONT_WEIGHT } from '@app/styles/themes/constants';
import { setSearchedItem } from '@app/store/slices/filterSlice';
import { useDispatch } from 'react-redux';

const { Title, Text, Link } = BaseTypography;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

import GeocoderControl from './GeocoderControl';
import Pin from './pin';

import CITIES from './cities.json';
import 'mapbox-gl/dist/mapbox-gl.css';
import {GarlicEventDetails} from "@app/components/apps/eventsFeed/GarlicEventDetails";

const TOKEN = process.env.REACT_APP_MAPBOX_API_TOKEN; // Set your mapbox token here

interface PopupInfo {
  city: string;
  population: string;
  image: string;
  state: string;
  latitude: number;
  longitude: number;
}

export default function Mapbox() {
    const popupMaxHeight = 300;
  const dispatch = useDispatch();
  const theme = useAppSelector((state) => state.theme.theme);
  const filter: Array<string> = useAppSelector((state) => state.filter.filter.category);

  // const [events, setEvents] = useState<GarlicEvents[]>();
  const [data, setData] = useState<GarlicEvents[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [popupInfo, setPopupInfo] = useState<GarlicEvents | null>(null);
  const selectedItem: GarlicEvents = useAppSelector((state) => state.filter.item);
  mapboxgl.accessToken = TOKEN ? TOKEN : '';
  const baseClient = new MapboxClient({
    accessToken: TOKEN ? TOKEN : '',
  });
  const events: GarlicEvents[] = useAppSelector((state) => state.filter.filteredEvents);
  const mapRef = useRef<MapRef>(null);
  const popUpRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (selectedItem._id) setPopupInfo(selectedItem);
        // if (selectedItem.businessName) setOverlayOpen(false);
    }, [selectedItem, setPopupInfo]);

    useEffect(() => {
        setTimeout(() =>{
            if (popUpRef.current != null) {
                popUpRef.current.scrollTop = 0;
            }
        },0);
    }, [popupInfo]);


  const garlickyFeature = (garlickyFeature: string | undefined) =>
    garlickyFeature && garlickyFeature.length > 0? (
      <Text style={{ color: 'inherit', fontSize: '13px' }}>
        {garlickyFeature}
      </Text>
    ) : null;
  const garlicSpotLight = (garlicSpotLight: string | null | undefined) =>
      garlicSpotLight && garlicSpotLight.length > 0 ? (
      <Text style={{ color: 'inherit', fontSize: '13px' }}>
        <span style={{ fontWeight: 'bold' }}>Garlic Spotlight: </span>
        {garlicSpotLight}
      </Text>
    ) : null;

  // console.log(data);
  const pins = useMemo(
    () =>
      events?.filter(value => value.coordinate && value.coordinate?.length > 1).map((city, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={city.coordinate ? city.coordinate[0] : 0}
          latitude={city.coordinate ? city.coordinate[1] : 0}
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            const map = mapRef.current
            if (map && city.coordinate) {
                map.panTo({
                    lat: city.coordinate[1],
                    lng: city.coordinate[0],
                }, { offset: [0, popupMaxHeight * 0.5]});
            }
            e.originalEvent.stopPropagation();
            setPopupInfo(city);
          }}
        >
          {popupInfo === null ? (
            <Pin
              title={
                <Space direction="vertical" style={{ color: '#f8fbff' }}>
                  <Title level={5} style={{ textAlign: 'center', color: 'inherit' }}>
                    {city.businessName}
                      {city.city && city.city.length > 0 &&
                        ` - ${city.city}`
                      }
                  </Title>
                  {garlickyFeature(city.garlickyFeature)}
                  {garlicSpotLight(city.garlickySpotlight)}
                </Space>
              }
              category={city.category}
            />
          ) : (
            <Pin title={undefined} category={city.category} />
          )}
        </Marker>
      )),
    [events, popupInfo],
  );
  const website = (data = '', type = '') =>
    data && data !== 'none' && data != 'N/A' ? (
      <Text>
        {type}
        <Link href={`https://${data}`} target="_blank">
          {data}
        </Link>
      </Text>
    ) : null;
  const StyledPopup = styled(Popup)`
    opacity: 0.5;
  `;
    return (
    <>
      <Map
        initialViewState={{
          latitude: 43.654499139678066,
          longitude: -79.37218608529203,
          zoom: 4.5,
          bearing: 0,
          pitch: 0,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        // mapStyle="mapbox://styles/mapbox/streets-v9"
        // mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxAccessToken={TOKEN}
        attributionControl={false}
        ref={mapRef}
      >
        <GeocoderControl mapboxAccessToken={TOKEN ? TOKEN : ''} position="top-left" placeholder="Enter your postal code or town" />
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />

        {pins}

        {popupInfo && (
          <Popup
            longitude={Number(popupInfo.coordinate ? popupInfo.coordinate[0] : 0)}
            latitude={Number(popupInfo.coordinate ? popupInfo.coordinate[1] : 0)}
            onClose={() => {
              setPopupInfo(null);
              dispatch(setSearchedItem({}));
            }}
            maxWidth="420px"
            style={{ fontFamily: FONT_FAMILY.main }}
          >
              <div
                  id={popupInfo._id}
                  style={{
                      maxHeight: popupMaxHeight,
                      overflowY: "auto",
                  }}
                  ref={popUpRef}
              >
                  <GarlicEventDetails garlicEvent={popupInfo}/>
              </div>
            {theme === 'dark' ? (
              <style>
                {`
                .mapboxgl-popup-content {
                  background: #1e2142 !important
                }
                .mapboxgl-popup-tip{
                border-bottom-color: #1e2142 !important;
                }
              `}
              </style>
            ) : (
              <style>
                {`
                .mapboxgl-popup-content {
                  background: #f8fbff !important
                }
                .mapboxgl-popup-tip{
                border-bottom-color: #f8fbff !important;
                }
              `}
              </style>
            )}
            {/* <div>{popupInfo.businessName}</div>
            <img
              width="100%"
              src="http://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Downtown_El_Paso_at_sunset.jpeg/240px-Downtown_El_Paso_at_sunset.jpeg"
            /> */}
          </Popup>
        )}
        <style>
          {`
            .mapboxgl-ctrl-logo {
                display: none !important;
            },
              `}
        </style>
      </Map>

      {/* <ControlPanel /> */}
    </>
  );
}
