/* eslint-disable prettier/prettier */
import Papa, {ParseResult} from "papaparse";

const spreadsheetUrl = "https://docs.google.com/spreadsheets/d/1AqsxVS_zoEuxVEDeXvCG0BRVLJJXV_eA-L_nz9DxWx8/export?format=csv&gid=168762648";

let sharedEvent: Promise<GarlicEvents[]>| null = null;

export let IsLoadingGarlicEvents = false; // so dumb

export interface GarlicEvents {
  _id: string;
  category: string;
  typeOfParticipant: string;
  participationDetails?: string;
  garlickyFeature?: string;
  garlickySpotlight?: string;
  address: string;
  activityDate?: string;
  city: string;
  postalCode?: string;
  email?: string;
  website?: string;
  insta?: string;
  hours?: string;
  streetAddress2?: string;
  tel?: string;
  facebook?: string;
  twitter?: string;
  otherSocialMedia?: string;
  details?: string;
  businessName: string;
  businessNameSortable: string;
  restaurant?: string;
  coordinate?: Array<number>;
  businessHours?: string;
  credit?: string;
  logoUrl?: string;
  chef?: string;
  lastDayOfSeason?: string;
  cuisineType?: string;
  dietaryOptions?: string;
  amenities?: string;
  accessibility?: string;
  garlicSupplier?: string;
}
export const EmptyGarlicEvents = {
  _id: "",
  category: '',
  typeOfParticipant: '',
  participationDetails: '',
  garlickyFeature: '',
  address: '',
  activityDate: '',
  city: '',
  postalCode: '',
  email: '',
  website: '',
  insta: '',
  hours: '',
  streetAddress2: '',
  tel: '',
  facebook: '',
  twitter: '',
  otherSocialMedia: '',
  details: '',
  businessName: '',
  businessNameSortable: '',
  restaurant: '',
  coordinate: [],
  chef: '',
  lastDayOfSeason: '',
  cuisineType: "",
  dietaryOptions: "",
  amenities: "",
  accessibility: "",
  garlicSupplier: "",
}

export const getEvents = (): Promise<GarlicEvents[]> => {
  if (sharedEvent != null) {
    return sharedEvent;
  }

  IsLoadingGarlicEvents = true;
  sharedEvent = new Promise<GarlicEvents[]>((resolve, reject) => {
    Papa.parse(spreadsheetUrl, {
      download: true,
      header: false,
      complete: (results: ParseResult<Record<string, string>>) => {
        IsLoadingGarlicEvents = false;
        ProcessCSV(results, resolve);
      }
    });
  });
  return sharedEvent;
}


async function ProcessCSV(results: ParseResult<Record<string, string>>, resolve: (value: (GarlicEvents[] | PromiseLike<GarlicEvents[]>)) => void) {
  let events: GarlicEvents[] = [];
  for (let i = 0; i < results.data.length; i++) {
    if (i == 0) {
      continue;
    }
    const row = results.data[i];
    const isValid = row[2].toUpperCase() === "Y";
    if (isValid === false) {
      continue;
    }
    const latRaw = row[16];
    const longRaw = row[17];
    const latLongValues: number[] = []
    if (latRaw && longRaw) {
      try {
        const lat = parseFloat(latRaw);
        const long = parseFloat(longRaw);
        if (!isNaN(lat) && !isNaN(long) && lat > -90 && lat < 90 && long > -180 && long < 180) {
          latLongValues.push(long);
          latLongValues.push(lat);
        }
      } catch (e) { }
    }

    const fakeId = (i - 1).toString();
    const event = {
      _id: fakeId,
      category: row[1], //
      typeOfParticipant: row[5],
      participationDetails: row[7],
      garlickyFeature: row[8], // Farm stand garlic sales, for culinary use and seed.
      garlickySpotlight: row[10],
      address: row[12], //9887 flycreek rd,
      activityDate: row[9], //Sept 22-Oct1
      city: row[14], // North augusta
      postalCode: row[15], //K0g1r0
      email: row[3],
      website: row[30],
      insta: row[32], //Flycreek_farm
      streetAddress2: '',
      tel: row[28], // 6132461884 row 23 appears to be the older one
      facebook: row[31],
      twitter: row[33],
      otherSocialMedia: row[35],
      details: row[7], // Farm stand garlic sales, culinary and seed.
      businessName: row[4], //Flycreek farm
      businessNameSortable: row[4].toUpperCase(), //Flycreek farm
      businessHours: row[50],
      credit: row[51],
      coordinate: latLongValues,
      logoUrl: row[53],
      chef: row[40],
      lastDayOfSeason: row[52],
      cuisineType: row[38],
      dietaryOptions: row[37],
      amenities: row[39],
      accessibility: row[11],
      garlicSupplier: row[43]
    };
    events.push(event);
  }

  //default sort
  events = events.sort(GetSortFunction(SortBy.ALPHABETIC));
  resolve(events);
}

export enum SortBy {
  ALPHABETIC = "ALPHABETIC",
  ALPHABETIC_REVERSE = "ALPHABETIC_REVERSE",
  TOWN = "TOWN",
  TOWN_REVERSE = "TOWN_REVERSE",
}
export function GetSortFunction(sort: SortBy): (lft: GarlicEvents, rht: GarlicEvents) => number {
  switch (sort) {
    case SortBy.ALPHABETIC:
      return AlphabeticalSort;
    case SortBy.ALPHABETIC_REVERSE:
      return (lft, rht) => AlphabeticalSort(lft, rht, true);
    case SortBy.TOWN:
      return TownSort;
    case SortBy.TOWN_REVERSE:
      return (lft, rht) => TownSort(lft, rht, true);
  }

}
export function AlphabeticalSort(lft: GarlicEvents, rht: GarlicEvents, reverse = false): number {
  if (lft.businessNameSortable < rht.businessNameSortable) {
    return reverse ? 1 : -1;
  }

  if (lft.businessNameSortable > rht.businessNameSortable) {
    return reverse ? -1 : 1;
  }

  return 0;
}
export function TownSort(lft: GarlicEvents, rht: GarlicEvents, reverse = false): number {
  if (lft.city < rht.city) {
    return reverse ? 1 : -1;
  }

  if (lft.city > rht.city) {
    return reverse ? -1 : 1;
  }

  return 0;
}