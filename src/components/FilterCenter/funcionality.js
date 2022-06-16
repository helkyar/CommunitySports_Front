export const distanceToPoint = (latitudeYourPoint, longitudeYourPoint, otherLatitude, otherLongitude) => {
    const rad = (x) => {
        return x * Math.PI / 180;
    }
    const R = 6378.137; //Radio de la tierra en km
    const dLat = rad(otherLatitude - latitudeYourPoint);
    const dLong = rad(otherLongitude - longitudeYourPoint);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(latitudeYourPoint)) * Math.cos(rad(otherLatitude)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d.toFixed(3); //Retorna tres decimales
}