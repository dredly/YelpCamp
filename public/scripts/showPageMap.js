mapboxgl.accessToken = mbToken;
const geometry = JSON.parse(campground).geometry;
console.log(geometry);
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/satellite-streets-v11', // style URL
    center: geometry.coordinates, // starting position [lng, lat]
    zoom: 8 // starting zoom
});
const marker1 = new mapboxgl.Marker()
    .setLngLat(geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h3>${JSON.parse(campground).title}</h3>
                <p>${JSON.parse(campground).location}</p>`
            )
    )
    .addTo(map);