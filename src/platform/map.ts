export const MY_ACCESS_TOKEN = 'pk.eyJ1Ijoidml0YWx5bHVrIiwiYSI6ImNrcjhyNzM5bzNreTEyd254d29kbTZ4dGgifQ.HUB7D7JPw_y9rcZcc4T_uA'

export const MAP_SETTINGS = {
    center: [37.5176819, 55.7379043],
    height: "100vh",
    zoom: 17.97,
}


export const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
        if('geolocation' in navigator) {
            navigator.geolocation
                .getCurrentPosition(position => resolve({lat: position.coords.latitude, lon: position.coords.longitude}), () => reject('Не удалось определить местоположение'))
        } else {
            reject(new Error('Geolocation is not supported'))
        }
    })
}
