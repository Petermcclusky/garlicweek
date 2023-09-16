import {GarlicEvents} from "@app/api/events.api";
import Papa, {ParseResult} from 'papaparse';

// const spreadsheetUrl = "https://docs.google.com/spreadsheets/d/1AqsxVS_zoEuxVEDeXvCG0BRVLJJXV_eA-L_nz9DxWx8/export?format=csv&gid=0";
const spreadsheetUrl = "https://docs.google.com/spreadsheets/d/1AqsxVS_zoEuxVEDeXvCG0BRVLJJXV_eA-L_nz9DxWx8/export?format=csv&gid=556673023";

let sharedEvent: Promise<GarlicEvents[]>| null = null;



export const getEvents = (): Promise<GarlicEvents[]> => {
    if (sharedEvent != null) {
        return sharedEvent;
    }

    sharedEvent = new Promise<GarlicEvents[]>((resolve, reject) => {

        Papa.parse(spreadsheetUrl, {
            download: true,
            header: false,
            complete: (results: ParseResult<Record<string, string>>) => {
                ProcessCSV(results, resolve);
            }
        });
    });
    return sharedEvent;
}


async function ProcessCSV(results: ParseResult<Record<string, string>>, resolve: (value: (GarlicEvents[] | PromiseLike<GarlicEvents[]>)) => void) {

    const events: GarlicEvents[] = [];
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
                console.log(lat, long);
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
            garlickyFeature: row[8], // Farm stand garlic sales, for culinary use and seed.
            address: row[12], //9887 flycreek rd,
            date: row[9], //Sept 22-Oct1
            city: row[14], // North augusta
            postalCode: row[15], //K0g1r0
            email: row[3],
            website: row[30],
            insta: row[32], //Flycreek_farm
            streetAddress2: '',
            tel: row[23], // 6132461884
            facebook: row[31],
            twitter: row[33],
            otherSocialMedia: row[35],
            details: row[7], // Farm stand garlic sales, culinary and seed.
            businessName: row[4], //Flycreek farm
            businessHours: row[50],
            credit: row[51],
            coordinate: latLongValues,
        };
        events.push(event);
    }

    resolve(events);
}