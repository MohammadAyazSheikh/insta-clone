// import Geolocation from 'react-native-geolocation-service';
import GetLocation from 'react-native-get-location'

import { requestLocationPermission } from './permissions';

export const GeoapifyApiKey = "ff583e69de0d4e81bdd57c35d610f93e-999999999";
type addr = {
    city?: string,
    area?: string
}
export const getLocation = (onSuccess: (address: addr) => void) => {

    // Geolocation.getCurrentPosition(
    //     (position) => {

    //         const latitude = position.coords.latitude;
    //         const longitude = position.coords.longitude;

    //         fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${GeoapifyApiKey}`)
    //             .then(response => response.json())
    //             .then(result => {

    //                 if (result.features.length) {
    //                     onSuccess({ area: "other", city: result.features[0].properties.city })

    //                 } else {
    //                     onSuccess({ area: "other", city: "other" })
    //                     console.log("No address found");
    //                 }
    //             }).catch(err => {
    //                 console.error("geopygy error geocoding")
    //             });
    //     },
    //     (error) => {
    //         console.log(error.code, error.message);
    //     },
    //     { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    // );

}

type coord = {
    longitude: number,
    latitude: number
}

export const getCurrentCoord = (callBack: (coord: coord) => void) => {

    requestLocationPermission().then(()=>{
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 3000,
        })
        .then(location => {
            callBack(location)
        })
        .catch(error => {
            const { code, message } = error;
            console.log(code, message);
        })
    }

   ).catch((err) => {
        console.error(err)
    })

}


export const autoComplete = (text:string) => {

    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&limit=10&lang=en&apiKey=${GeoapifyApiKey}`

    return fetch(url)
        .then(response => response.json())
        .catch(err => { console.error("goeopyfy autocomplete error") });

}

export const getLocationAddress = (coord:coord) => {

    const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${coord?.latitude}&lon=${coord?.longitude}&apiKey=${GeoapifyApiKey}`;


    return fetch(url)
        .then(response => response.json())
        .then(result => {

            if (result.features.length) {
                // console.log(result.features[0]);
                // const addr = result.features[0].properties.formatted.split(',');
                // alert(JSON.stringify(addr, null, 2))
                // setAddress({ area: addr[0], city: addr[1] }) //
                return result.features[0].properties.formatted;

            } else {
                return "";
            }
        }).catch(err => {
            console.error("geopygfy error geocoding")
        });

}




