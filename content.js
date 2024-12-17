console.log("Content script yüklendi! Airtable sayfasındayım.");

// Tüm sayfada tıklamaları dinle
document.addEventListener("click", function (event) {
    console.log("Tıklama algılandı:", event.target);

    let driveLink = null;

    // En derinden başlayarak en yakın <a> etiketini bul
    const linkElement = event.target.closest("a");
    console.log("En yakın <a> etiketi kontrolü:", linkElement);

    // <a> etiketi varsa ve Drive linkini içeriyorsa
    if (linkElement && linkElement.href.startsWith("https://drive.google.com/file/d/")) {
        event.preventDefault(); // Varsayılan davranışı engelle

        // Google Drive linkine autoplay parametresi ekle
        driveLink = linkElement.href;
        if (!driveLink.includes("?")) {
            driveLink += "?autoplay=1"; // Eğer query parametresi yoksa
        } else {
            driveLink += "&autoplay=1"; // Eğer query varsa
        }

        console.log("Google Drive linki tespit edildi (autoplay eklendi):", driveLink);

        // Popup boyutları ve konumunu ayarla
        const popupWidth = 500; // Dikey dikdörtgen genişlik
        const popupHeight = window.screen.height; // Tüm ekran yüksekliği
        const popupLeft = window.screen.width - popupWidth; // Sağ tarafa hizala
        const popupTop = 0; // En üste hizala

        console.log("Popup konumu ve boyutları ayarlandı.");

        // Popup penceresini aç
        window.open(
            driveLink,
            "DrivePopup",
            `width=${popupWidth},height=${popupHeight},top=${popupTop},left=${popupLeft},scrollbars=yes,resizable=yes`
        );
        console.log("Popup açıldı:", driveLink);
    } else {
        console.log("Google Drive linki bulunamadı.");
    }
}, true); // Capturing phase