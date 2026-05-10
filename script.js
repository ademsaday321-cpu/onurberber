document.addEventListener('DOMContentLoaded', () => {

    // 1. Scroll Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // 2. WhatsApp Form Submit
    const whatsappForm = document.getElementById('whatsappForm');
    
    if (whatsappForm) {
        whatsappForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const isim = document.getElementById('isim').value.trim();
            const telefon = document.getElementById('telefon').value.trim();
            const islem = document.getElementById('islem').value;
            const tarih = document.getElementById('tarih').value;
            const saat = document.getElementById('saat').value;

            // Tarih formatını (YYYY-MM-DD) daha okunabilir yapalım
            const dateObj = new Date(tarih);
            const formatliTarih = dateObj.toLocaleDateString('tr-TR');

            // Mesaj Şablonu
            const mesaj = `Merhaba Onur Bey, ben ${isim}. 
Siteniz üzerinden randevu talebi oluşturuyorum.

🗓️ Tarih: ${formatliTarih}
⏰ Saat: ${saat}
💇‍♂️ İşlem: ${islem}
📞 İletişim: ${telefon}

Müsaitlik durumunuzu onaylamak için dönüş yaparsanız sevinirim. İyi çalışmalar!`;

            const encodedMesaj = encodeURIComponent(mesaj);
            const phoneNumber = "905436408562";
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMesaj}`;

            // Yeni sekmede aç
            window.open(whatsappUrl, '_blank');
        });
    }

});

// 3. Modal Kontrolleri (Global)
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        // Vücut kaydırmasını engelle
        document.body.style.overflow = 'hidden';
    }
}

function forceCloseModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        // Vücut kaydırmasını geri aç
        document.body.style.overflow = '';
    }
}

function closeModal(event, modalId) {
    // Sadece backdrop alanına tıklandığında (içeriğe tıklanmadığında) kapat
    if (event.target.id === modalId) {
        forceCloseModal(modalId);
    }
}
