<script type="text/javascript">
// Tawk.to Inicijalizacija i Konfiguracija
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();

// --- NOVO: KONFIGURACIJA POZIVA I PRIKUPLJANJA PODATAKA ---

// 1. Postavljanje Obaveznih Polja pre nego što se započne chat
Tawk_API.setPrechatForm(
    {
        name : 'required', // Ime je obavezno
        email : 'required', // Email je obavezno
        tel : 'optional',  // Telefon je opcionalan
        message : 'required'
    }
);

// 2. Postavljanje automatskog pozdrava nakon učitavanja widgeta
Tawk_API.onLoad = function(){
    Tawk_API.setWelcomeMessage("Hydro-Prijatelj je spreman. Kako možemo odmah da optimizujemo Vaše postrojenje?");
    // Opciono: Dodavanje tagova za internu klasifikaciju upita
    Tawk_API.addTags(['AnoHUB-Site-Visit', 'Risk_Inquiry'], function(error){});
};

// -----------------------------------------------------------

// Standardni Tawk.to kod za učitavanje widgeta (Ovaj deo se zadržava)
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/68f2740637b879194e5d831e/1j7phaeik';
s1.charset='UTF-8';
s0.parentNode.insertBefore(s1,s0);
})();
</script>