export function getHost(){
    if( window.location.hostname === "localhost" ) {
        return `http://localhost`;
    } else {
        return `${window.location.protocol}://${window.location.host}`
    }
}