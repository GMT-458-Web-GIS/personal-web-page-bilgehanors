
const points = [
    { lat: 39.8657897791856, lng: 32.73399034251141, name: "Hacettepe Geomatik Mühendisliği" },
    { lat: 39.93270203911648, lng: 32.882006867648364, name: "Harita Genel Müdürlüğü" },
    { lat: 39.91745218717708, lng:  32.826903424210066, name: "Milli Kütüphane" },
    { lat: 39.9007844709207, lng: 32.75689642196991, name: "Bilkent Şehir Hastanesi" },
    { lat: 39.9168286774389, lng: 32.860621404327944, name: "Kocatepe Cami" },
    { lat: 39.91222664845038,  lng: 32.8095615079649, name: "Armada" },
    { lat: 39.88740681360257,  lng: 32.934153096113405, name: "Nata Vega" },
    { lat: 39.99698485431062,   lng: 32.65403757457766, name: "Göksu Parkı" },
    { lat: 39.8502395556361,   lng: 32.83221965241264, name: "Panora" },
    { lat: 39.78095046892109,   lng: 32.787859987070924, name: "Mogan Parkı" },
    { lat: 39.92528071531934,   lng: 32.837094928979674, name: "Anıtkabir" },
    { lat: 39.918352552679806,   lng: 32.8124920202954, name: "AŞTİ" },
    { lat: 39.969935631478144,   lng: 32.82067820097397, name: "Antares AVM" },
    { lat: 39.9619451115672,   lng: 32.80451853631956, name: "Yenimahalle Metro" },
    { lat: 39.9008707850534,   lng: 32.69107604435375, name: "Gordion AVM" },
    { lat: 40.11512008773997,   lng: 32.99278148477903, name: "Esenboğa Havalimanı" },
    { lat: 39.95044723497731,   lng: 32.83128168171307, name: "Ankamall" },
    { lat: 39.93905014432318,   lng: 32.86542142801826, name: "Ankara Kalesi" },
    { lat: 39.88669751645219,   lng: 32.85545937719684, name: "Atakule" },
    { lat: 39.88612749130312,   lng: 32.84400186180994, name: "Dikmen Vadisi" },

   

];

let selectedPoint1, selectedPoint2, actualDistance;
let playerCount = 2;  

const map = L.map('map').setView([39.9334, 32.8597], 13);


const standardLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

const satelliteLayer = L.tileLayer('https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.esri.com/">Esri</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

standardLayer.addTo(map);

L.control.layers({
    'Standard Map': standardLayer,
    'Satellite Imagery': satelliteLayer
}).addTo(map);

function haversineDistance(point1, point2) {
    const toRad = angle => angle * (Math.PI / 180);
    
    const R = 6371; 
    const dLat = toRad(point2.lat - point1.lat);
    const dLng = toRad(point2.lng - point1.lng);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(point1.lat)) * Math.cos(toRad(point2.lat)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
    return R * c; 
}

function drawLine() {
    let point1Index, point2Index;
    
    do {
        point1Index = Math.floor(Math.random() * points.length);
        point2Index = Math.floor(Math.random() * points.length);
    } while (point1Index === point2Index); 
    
    selectedPoint1 = points[point1Index];
    selectedPoint2 = points[point2Index];
    
    actualDistance = haversineDistance(selectedPoint1, selectedPoint2);
    
    map.eachLayer(layer => {
        if (layer instanceof L.Marker || layer instanceof L.Polyline) {
            map.removeLayer(layer);
        }
    });

    const marker1 = L.marker([selectedPoint1.lat, selectedPoint1.lng]).addTo(map).bindPopup(selectedPoint1.name);
    const marker2 = L.marker([selectedPoint2.lat, selectedPoint2.lng]).addTo(map).bindPopup(selectedPoint2.name);

    const line = L.polyline([[selectedPoint1.lat, selectedPoint1.lng], [selectedPoint2.lat, selectedPoint2.lng]], {color: 'blue'}).addTo(map);

    map.fitBounds(line.getBounds());

    document.getElementById('locations').innerHTML = `
        ${selectedPoint1.name}<br>
        To <br>
        ${selectedPoint2.name}
    `;
}

function addPlayer() {
    playerCount++;
    const playerDiv = document.createElement('div');
    playerDiv.className = 'player';
    playerDiv.id = `player${playerCount}`;
    playerDiv.innerHTML = `
        <label>Player ${playerCount} Guess (km):</label>
        <input type="number" class="playerGuess" data-player="${playerCount}">
    `;
    document.getElementById('playersContainer').appendChild(playerDiv);
}

function submitGuesses() {
    const guesses = [];
    const guessInputs = document.querySelectorAll('.playerGuess');

    guessInputs.forEach(input => {
        const guess = parseFloat(input.value);
        guesses.push({ player: input.dataset.player, guess });
    });

    const results = guesses.map(guess => ({
        player: guess.player,
        difference: Math.abs(guess.guess - actualDistance)
    }));

    const minDifference = Math.min(...results.map(result => result.difference));
    results.forEach(result => {
        const playerElement = document.getElementById(`player${result.player}`);
        if (result.difference === minDifference) {
            playerElement.querySelector('input').classList.add('winner');
        } else {
            playerElement.querySelector('input').classList.add('loser');
        }
    });

    document.getElementById('result').innerHTML = `Actual Distance: ${actualDistance.toFixed(2)} km`;
}
