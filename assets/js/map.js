// Harita üzerinde göstermek istediğin yerler
// Koordinatları Google Maps'ten kolayca alabilirsin
const travelLocations = [
    {
        name: "Benicassim, İspanya",
        coords: [40.0528, 0.0638], // Enlem, Boylam
        photoUrl: "images/spain-benicassim.jpg", // Kendi fotoğrafının yolu
        description: "Erasmus+ Gençlik Değişimi Projesi."
    },
    {
        name: "Telšiai, Litvanya",
        coords: [55.9902, 22.2536],
        photoUrl: "images/lithuania-telsiai.jpg", // Kendi fotoğrafının yolu
        description: "Genç Girişimcilik Projesi."
    },
    // Buraya yeni yerler ekleyebilirsin
    // {
    //     name: "Yeni Yer",
    //     coords: [Yeni_Enlem, Yeni_Boylam],
    //     photoUrl: "images/yeni-yer.jpg",
    //     description: "Yeni bir anı!"
    // }
];

function initMap() {
    // 1. Haritayı oluştur ve varsayılan bir merkez belirle
    const mymap = L.map('travel-map').setView([39.9255, 32.8662], 4);

    // 2. Harita katmanını (Tile Layer) ekle
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mymap);

    // 3. Yer işaretçilerini (Markers) haritaya ekle
    // ... (Mevcut marker kodların burada kalacak) ...

    // HARİTA BOYUTUNU ZORLAMA ÇÖZÜMÜ
    // Bu, Strata teması gibi kaydırmalı (fixed sidebar) temalarda 
    // haritanın boyutunu doğru almasını garanti eder.
    
    // 1. Hızlı bir invalidateSize
    mymap.invalidateSize(); 

    // 2. 200 milisaniye sonra tekrar ve merkezleme yaparak emin olma
    // Bu, sayfadaki diğer animasyonlar bitince haritanın tam oturmasını sağlar.
    setTimeout(function() {
        mymap.invalidateSize(true); // true ile haritayı yeniden boyutlandır ve merkezle
    }, 200); 
}

// Haritanın div yüklendiğinde çalışmasını sağla
document.addEventListener('DOMContentLoaded', function() {
    initMap();
});