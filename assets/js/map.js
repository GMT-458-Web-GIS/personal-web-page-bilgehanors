document.addEventListener('DOMContentLoaded', function() {

    // 1. Haritayı Başlatma
    var map = L.map('map').setView([45.0, 19.0], 4); 

    // 2. Arka Plan Haritası (Aydınlık Tema)
    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 20
    }).addTo(map);

    // 3. Gezilen Yerler (YENİ GALERİ YAPIŞIYLA)
    // Kanka, her konum için 'gallery' adında bir dizi oluşturdum.
    // Artık '..._full.jpg' yerine '..._gallery1.jpg', '..._gallery2.jpg' vb. fotoğraflar kullanacaksın.
    
    var locations = [
        {
            name: 'Sofya, Bulgaristan',
            coords: [42.65, 23.38],
            thumb_photo: 'images/thumbs/sofya_thumb.jpeg', 
            gallery: [
                { 'href': 'images/fulls/sofya_full1.jpeg' },
                { 'href': 'images/fulls/sofya_full2.jpeg'}
            ]
        },
        {
            name: 'Varşova, Polonya',
            coords: [52.16, 20.96],
            thumb_photo: 'images/thumbs/warsaw_thumb.jpeg',
            gallery: [
                { 'href': 'images/fulls/warsaw_full1.jpeg' },
            ]
        },
        {
            name: 'Telsiai, Litvanya',
            coords: [55.98, 22.25],
            thumb_photo: 'images/thumbs/telsiai_thumb.jpeg',
            gallery: [
                { 'href': 'images/telsiai_full1.jpeg' },
            ]
        },
        {
            name: 'Riga, Letonya',
            coords: [56.98, 24.12],
            thumb_photo: 'images/thumbs/riga_thumb.jpeg',
            gallery: [
                { 'href': 'images/fulls/riga_full1.jpg'},

            ]
        },
        {
            name: 'Roma, İtalya',
            coords: [41.90, 12.49],
            thumb_photo: 'images/thumbs/roma_thumb.jpeg',
            gallery: [
                { 'href': 'images/fulls/roma_full1.jpeg' },
                { 'href': 'images/fulls/roma_full2.jpeg' },
                { 'href': 'images/fulls/roma_full3.jpeg' },
            ]
        },
        {
            name: 'Trondheim, Norveç',
            coords: [63.42, 10.45],
            thumb_photo: 'images/thumbs/trondheim_thumb.jpeg',
            gallery: [
                { 'href': 'images/fulls/trondheim_full1.jpeg'},
                { 'href': 'images/fulls/trondheim_full2.jpeg'},
                { 'href': 'images/fulls/trondheim_full3.jpeg'},
                { 'href': 'images/fulls/trondheim_full4.jpeg'},
            ]
        },
        {
            name: 'Oslo, Norveç',
            coords: [59.94, 10.72],
            thumb_photo: 'images/thumbs/oslo_thumb.jpeg',
            gallery: [
                { 'href': 'images/fulls/oslo_full1.jpeg' }
            ]
        },
        {
            name: 'Milano, İtalya',
            coords: [45.45, 9.28],
            thumb_photo: 'images/thumbs/milano_thumb.jpeg',
            gallery: [
                { 'href': 'images/fulls/milano_full1.jpeg' },
            ]
        },
        {
            name: 'Barselona, İspanya',
            coords: [41.38, 2.15],
            thumb_photo: 'images/thumbs/barcelona_thumb.jpeg',
            gallery: [
                { 'href': 'images/fulls/barcelona_full1.jpeg'},
                { 'href': 'images/fulls/barcelona_full2.jpeg'},
                { 'href': 'images/fulls/barcelona_full3.jpeg'}
            ]
        },
        {
            name: 'Valensiya, İspanya',
            coords: [39.48, -0.36],
            thumb_photo: 'images/thumbs/valencia_thumb.jpeg',
            gallery: [
                { 'href': 'images/fulls/valencia_full1.jpeg'},
                { 'href': 'images/fulls/valencia_full2.jpeg'},
                { 'href': 'images/fulls/valencia_full3.jpeg'},
                { 'href': 'images/fulls/valencia_full4.jpeg'}
            ]
        },
        {
            name: 'Castellon, İspanya',
            coords: [39.98, -0.03],
            thumb_photo: 'images/thumbs/castellon_thumb.jpeg',
            gallery: [
                { 'href': 'images/fulls/castellon_full1.jpeg' }
            ]
        },
        {
            name: 'İstanbul, Türkiye',
            coords: [41.00, 28.96],
            thumb_photo: 'images/thumbs/istanbul_thumb.jpeg',
            gallery: [
                { 'href': 'images/fulls/istanbul_full1.jpeg'},
                { 'href': 'images/fulls/istanbul_full2.jpeg'}
                
            ]
        },
        {
            name: 'Dubai, BAE',
            coords: [25.06, 55.17],
            thumb_photo: 'images/thumbs/dubai_thumb.jpeg',
            gallery: [
                { 'href': 'images/fulls/dubai_full1.jpeg'},
                { 'href': 'images/fulls/dubai_full2.jpeg'},
                { 'href': 'images/fulls/dubai_full3.jpeg'},
                { 'href': 'images/fulls/dubai_full4.jpeg'},
                { 'href': 'images/fulls/dubai_full5.jpeg'},
            ]
        },
        {
            name: 'Abu Dabi, BAE',
            coords: [24.46, 54.36],
            thumb_photo: 'images/thumbs/abudhabi_thumb.jpeg',
            gallery: [
                 { 'href': 'images/fulls/abudhabi_full1.jpeg'},
            ]
        },
        {
            name: 'Larnaka, Güney Kıbrıs',
            coords: [34.92, 33.64],
            thumb_photo: 'images/thumbs/larnaca_thumb.jpeg',
            gallery: [
                 { 'href': 'images/fulls/larnaca_full1.jpeg'},
            ]
        },
        {
            name: 'Selanik, Yunanistan',
            coords: [40.64, 22.94],
            thumb_photo: 'images/thumbs/selanik_thumb.jpeg',
            gallery: [
                { 'href': 'images/fulls/selanik_full1.jpeg'},
                { 'href': 'images/fulls/selanik_full2.jpeg'},
            ]
        }
    ];

    // 4. Marker'ları ve Tıklama Olaylarını Ekleme (POPUP YERİNE LIGHTBOX)
    
    locations.forEach(function(location) {

        // Özel marker ikonu (HTML/CSS ile oluşturulmuş)
        var customIcon = L.divIcon({
            className: 'custom-marker-icon', // CSS ile stil verebilmek için sınıf adı
            html: `<div style="background-image: url(${location.thumb_photo});"></div>`,
            iconSize: [50, 50],   // CSS'deki width/height ile aynı olmalı
            iconAnchor: [25, 50]  // İkonun alt ortası
        });
        
        // Marker'ı (pini) haritaya özel ikon ile ekle
        var marker = L.marker(location.coords, { icon: customIcon }).addTo(map);

        // --- DEĞİŞİKLİK BURADA BAŞLIYOR ---
        // Pop-up bağlamak (.bindPopup) yerine, 'click' olayını dinliyoruz
        marker.on('click', function() {
            
            // GLightbox'ı bu konumun galeri dizisiyle başlat
            var galleryLightbox = GLightbox({
                elements: location.gallery, // Yukarıda tanımladığımız gallery dizisini ver
                touchNavigation: true,      // Mobilde kaydırmayı etkinleştir
                loop: true,                 // Galeride başa dön
                autoplayVideos: true,       // Varsa videoları ot. başlat
                closeOnOutsideClick: true   // Dışarı tıklayınca kapat
            });
            
            // Galeriyi aç
            galleryLightbox.open();
        });
        // --- DEĞİŞİKLİK BURADA BİTTİ ---
    });

});