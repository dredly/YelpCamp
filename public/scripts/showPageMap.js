mapboxgl.accessToken = mbToken;
const getMap = async () => {
    const response = await fetch(window.location.href.replace('campgrounds', 'api'));
    const campgroundData = await response.json();
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/satellite-streets-v11', // style URL
        center: campgroundData.coordinates, // starting position [lng, lat]
        zoom: 8 // starting zoom
    });
    map.addControl(new mapboxgl.NavigationControl());
    const marker1 = new mapboxgl.Marker()
        .setLngLat(campgroundData.coordinates)
        .setPopup(
            new mapboxgl.Popup({ offset: 25 })
                .setHTML(
                    `<h3>${campgroundData.title}</h3>
                    <p>${campgroundData.location}</p>`
                )
        )
        .addTo(map);
}
getMap();
