let map;
let userMarker;
let heatLayer;
let markers = [];
let currentLayer = 0;
let userLat = 22.5726;
let userLng = 88.3639;
let centerMarker;
let zoneCircle;

// 🔑 ADD YOUR API KEY HERE
const API_KEY = "eb58ff0428f74f66835134855260305";

// ICONS
const hospitalIcon = L.icon({
    iconUrl: 'data:image/jpeg;base64,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',
    iconSize: [30, 20]
});

// const waterIcon = L.icon({
//     iconUrl: 'https://cdn-icons-png.flaticon.com/512/728/728093.png',
//     iconSize: [30, 30]
// });

// INIT
function initMap() {
    map = L.map('map').setView([userLat, userLng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
        .addTo(map);

    // Initial layers & weather
    fetchWeather(userLat, userLng);

    // 📍 Create center marker (weather source)
    centerMarker = L.marker([userLat, userLng])
        .addTo(map)
        .bindPopup("📍 Weather source location")
        .openPopup();

    // ⏱ Debounce variable
    let weatherTimeout;

    // 🔄 Update weather when map stops moving
    map.on("moveend", () => {
        clearTimeout(weatherTimeout);

        weatherTimeout = setTimeout(() => {
            const center = map.getCenter();

            userLat = center.lat;
            userLng = center.lng;

            // 📍 Move marker to new center
            if (centerMarker) {
                centerMarker.setLatLng([userLat, userLng]);
            }

            // 🌦 Fetch new weather
            fetchWeather(userLat, userLng);

        }, 1000); // 1 sec delay (safe for API)
    });
}

// WEATHER FETCH
async function fetchWeather(lat, lng) {
    try {
        const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${lng}&aqi=no`;

        const res = await fetch(url);
        const data = await res.json();

        console.log(data); // DEBUG

        displayWeather(data);
        checkAlerts(data);

    } catch (err) {
        console.log("Weather error:", err);
    }
}

// DISPLAY WEATHER
function displayWeather(data) {
    const temp = data.current.temp_c;
    const condition = data.current.condition.text;

    const feels = data.current.feelslike_c;
    const humidity = data.current.humidity;
    const wind = data.current.wind_kph;

    const location = data.location.name + ", " + data.location.region;

    document.getElementById("location-name").innerText = "📍 " + location;
    document.getElementById("temp").innerText = "🌡 Temp: " + temp + "°C";
    document.getElementById("condition").innerText = "🌥 " + condition;

    document.getElementById("feels").innerText = "🌡️ Feels Like: " + feels + "°C";
    document.getElementById("humidity").innerText = "💧 Humidity: " + humidity + "%";
    document.getElementById("wind").innerText = "🌬 Wind: " + wind + " km/h";

    if (centerMarker) {
        centerMarker.bindPopup(`
            <b>📍 ${data.location.name}</b><br>
            🌡 ${temp}°C<br>
            🌥 ${condition}<br>
            💧 ${humidity}% humidity
        `)};
    
    showHeatLayer(temp);

    // remove old circle
    if (zoneCircle) {
        map.removeLayer(zoneCircle);
    }

    let color;
    if (temp > 40) color = "red";
    else if (temp >= 30) color = "yellow";
    else color = "green";

    zoneCircle = L.circle([userLat, userLng], {
        radius: 2000,
        color: color,
        fillColor: color,
        fillOpacity: 0.3
    }).addTo(map);

}

//ALERT WEATHER
function checkAlerts(data) {
    const temp = data.current.temp_c;
    const condition = data.current.condition.text.toLowerCase();

    let message = "";  // ✅ DEFINE HERE

    if (temp > 40) {
        message = "🔥 Heatwave Alert!";
    }

    if (condition.includes("rain")) {
        message = "🌧 Rain Alert!";
    }

    document.getElementById("alert-box").innerText = message;

    if (message) {
        if (Notification.permission === "granted") {
            new Notification(message);
        } else {
            Notification.requestPermission();
        }
    }
}


// LOCATION
function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(pos => {
        userLat = pos.coords.latitude;
        userLng = pos.coords.longitude;

        if (userMarker) map.removeLayer(userMarker);

        userMarker = L.marker([userLat, userLng]).addTo(map)
            .bindPopup("You are here").openPopup();

        map.flyTo([userLat, userLng], 15);

        searchNearby(userLat, userLng);
        fetchWeather(userLat, userLng); // 🔥 weather update
    });
}

// LAYERS
function toggleLayer(layer) {
    currentLayer = layer;

    document.querySelectorAll("button").forEach((btn, i) => {
        btn.classList.toggle("active", i === layer);
    });

    searchNearby(userLat, userLng);
}

function searchNearby(lat, lng) {
    clearAll();

    if (currentLayer === 0) return showHeatLayer();
    // if (currentLayer === 1) fetchWater(lat, lng);
    if (currentLayer === 2) fetchHospitals(lat, lng);
}

// HEATMAP
function showHeatLayer(temp = 30) {
    clearAll();

    let gradient;

    if (temp > 40) {
        gradient = {
            0.4: "red",
            0.7: "darkred",
            1.0: "black"
        };
    } else if (temp >= 30) {
        gradient = {
            0.4: "yellow",
            0.7: "orange",
            1.0: "red"
        };
    } else {
        gradient = {
            0.4: "green",
            0.7: "lime",
            1.0: "yellow"
        };
    }

    const heatPoints = [
        [userLat, userLng, 1],
        [userLat + 0.01, userLng + 0.01, 0.8],
        [userLat - 0.01, userLng - 0.01, 0.9]
    ];

    heatLayer = L.heatLayer(heatPoints, {
        radius: 50,
        blur: 30,
        gradient: gradient
    }).addTo(map);
}

// HOSPITALS
async function fetchHospitals(lat, lng) {
    const query = `
        [out:json];
        node["amenity"="hospital"](around:8000, ${lat}, ${lng});
        out body;
    `;

    const res = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: query
    });

    const data = await res.json();

    data.elements.forEach(place => {
        const name = place.tags?.name || "Hospital";
        const address = place.tags?.["addr:full"] || "Address not available";
        const phone = place.tags?.phone || "No contact";
        const emergency = place.tags?.emergency ? "Yes" : "No";

        const marker = L.marker([place.lat, place.lon], {
            icon: hospitalIcon
        }).addTo(map);

        const container = document.createElement("div");

        const title = document.createElement("b");
        title.innerText = name;

        const btn = document.createElement("button");
        btn.innerText = "View Details";
        btn.style.marginTop = "5px";

        btn.onclick = () => {
            showDetails(name, address, phone, emergency);
        };

        container.appendChild(title);
        container.appendChild(document.createElement("br"));
        container.appendChild(btn);

        marker.bindPopup(container);

        markers.push(marker);
    });
}

// // WATER
// async function fetchWater(lat, lng) {
//     const query = `[out:json];node["amenity"="drinking_water"](around:8000, ${lat}, ${lng});out;`;
//     const res = await fetch("https://overpass-api.de/api/interpreter", { method: "POST", body: query });
//     const data = await res.json();

//     data.elements.forEach(place => {
//         const marker = L.marker([place.lat, place.lon], { icon: waterIcon }).addTo(map);
//         markers.push(marker);
//     });
// }

// CLEAR
function clearAll() {
    if (heatLayer) map.removeLayer(heatLayer);
    markers.forEach(m => map.removeLayer(m));
    markers = [];
    if (zoneCircle) map.removeLayer(zoneCircle);
}

window.onload = initMap;