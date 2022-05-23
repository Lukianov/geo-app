export const MY_ACCESS_TOKEN = 'pk.eyJ1Ijoidml0YWx5bHVrIiwiYSI6ImNrcjhyNzM5bzNreTEyd254d29kbTZ4dGgifQ.HUB7D7JPw_y9rcZcc4T_uA'

interface IPosition {
  lat: number
  lng: number
}

export const CIRCLE_DIAMETER = 0.05

export const MAP_SETTINGS = {
    center: [37.5176819, 55.7379043],
    height: "100vh",
    zoom: 17.97,
}


const GEO_OPTIONS = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 15000
};

export const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
        if('geolocation' in navigator) {
            navigator.geolocation
                .getCurrentPosition(position => resolve({lat: position.coords.latitude, lon: position.coords.longitude}), () => reject('Не удалось определить местоположение'), GEO_OPTIONS)
        } else {
            reject(new Error('Geolocation is not supported'))
        }
    })
}

const MAXIMUM_CACHE_POSITION_TIME = 1000 * 5; // 10 seconds

const WATCH_OPTIONS = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: MAXIMUM_CACHE_POSITION_TIME
};

const checkUserPosition = ({targetPosition, currentPosition}: {targetPosition: IPosition, currentPosition: IPosition}) => Math.pow((currentPosition.lng - targetPosition.lng), 2) + Math.pow((currentPosition.lat - targetPosition.lat), 2) <= Math.pow(0.25, 2)

const checkEntryInField = ({distance, circleDiameter}: {distance: number, circleDiameter: number}) => {
    const radius = circleDiameter * 1000 / 2

    console.log('distance', distance, 'radius', radius, 'is in field', distance - radius <= radius)

    return distance - radius <= radius
}

function geoDistance({targetPosition, currentPosition}: {targetPosition: IPosition, currentPosition: IPosition}): number {
    const {lat: lat1, lng: lon1} = targetPosition

    const {lat: lat2, lng: lon2} = currentPosition

    const R = 6371e3, PI = Math.PI;
    const { sin, cos, atan2 } = Math;

    const fi1 = lat1 * PI / 180
    const fi2 = lat2 * PI / 180

    const  lambda1 = lon1 * PI / 180;
    const lambda2 = lon2 * PI / 180;

    const deltaFi = fi2 - fi1
    const deltaLambda = lambda2 - lambda1;

    const a = sin(deltaFi/2)**2 + cos(fi1) * cos(fi2) * sin(deltaLambda/2)**2;
    const c = 2 * atan2(a**.5, (1-a)**.5);

    const distance = R * c;

    return distance;
};

export const watchUserPosition = ({position, targetPosition, circleDiameter}: {position: Ref<number[] | null>, targetPosition: IPosition, circleDiameter: number}) => {
    return new Promise((resolve, reject) => {
        if('geolocation' in navigator) {
            navigator.geolocation
                .watchPosition(currentPosition => {
                    const userPosition = {lat: currentPosition.coords.latitude, lng: currentPosition.coords.longitude}

                    position.value = [userPosition.lng, userPosition.lat]

                    const distanceBetweenPoints = geoDistance({targetPosition, currentPosition: userPosition})

                    checkEntryInField({distance: distanceBetweenPoints, circleDiameter})

                    return resolve({lon: currentPosition.coords.longitude, lat: currentPosition.coords.latitude})
                },
                () => {
                    console.warn('Не удалось определить местоположение')

                    reject('Не удалось определить местоположение')
                },
                    WATCH_OPTIONS)
        } else {
            reject(new Error('Geolocation is not supported'))
        }
    })
}
