// ==============================================
// GALLERY LOGIC (js/gallery-logic.js)
// Rukuje Lightboxom, Slideshowom, i generisanjem thumbnailova.
// ==============================================

// === KLIJENTSKA LOGIKA ZA GALERIJU - UMETNUTA LISTA FAJLOVA ===
// NAPOMENA: Sve slike se očekuju u subfolderu 'slike/gallery/'
const imageFilenames = [
    '20180628_141406_result.webp', '20180628_144319_result.webp', '20180702_084645_result.webp', '20180711_113934_result.webp',
    '20180711_114028_result.webp', '20180713_175456_result.webp', '20180724_094021_result.webp', '20180809_165247_result.webp',
    '20181220_204329_result.webp', '20190305_171017_result.webp', '20190305_175501_result.webp', '20190315_181916_result.webp',
    '20190327_115716_result.webp', '20190411_102314_result.webp', '20190613_191351_result.webp', '20190618_143145_result.webp',
    '20190618_213435 (1)_result.webp', '20190618_213435_result.webp', '20190619_175133_result.webp', '20190620_233856 (1)_result.webp',
    '20190620_233856_result.webp', '20210420_215541_result.webp', '20210422_190129_result.webp', '20210422_201757_result.webp',
    '20210425_171800_result.webp', '20210425_220049_result.webp', '20210511_071530 (1)_result.webp', '20210511_071530_result.webp',
    '20210515_205921_result.webp', '20210626_181939_result.webp', '20210713_075717_result.webp', '20210715_100746_result.webp',
    '20210719_072859_result.webp', '20210805_174424_result.webp', '20210805_174427_result.webp', '20210805_174627_result.webp',
    '20210806_110244_result.webp', '20210806_111136_result.webp', '20210907_125844_result.webp', '20210907_125914_result.webp',
    '20210909_105425_result.webp', '20211023_133034_result.webp', '20211024_105640_result.webp', '20211206_114953_result.webp',
    '20220117_124753_result.webp', '20220117_130611_result.webp', '20220120_131200_result.webp', '20220121_171227_result.webp',
    '20220123_101030_result.webp', '20220123_153518 (1)_result.webp', '20220124_182254_result.webp', '20220410_130254_result.webp',
    '20220424_161843_result.webp', '20220501_162103_result.webp', '20220509_162924_result.webp', '20220510_123149_result.webp',
    '20220518_220601_result.webp', '20220518_222151_result.webp', '20220521_181126_result.webp', '20220526_171253_result.webp',
    '20220528_143651_result.webp', '20220529_202032_result.webp', '20220529_202123_result.webp', '20220529_203726_result.webp',
    '20220529_205724_result.webp', '20220529_210235_result.webp', '20220529_210758_result.webp', '20220529_211047_result.webp',
    '20220602_194023_result.webp', '20220602_194027_result.webp', '20220602_194036_result.webp', '20220611_173842_result.webp',
    '20220611_175008_result.webp', '20220616_180042_result.webp', '20220621_231605_result.webp', '20220622_133309_result.webp',
    '20220710_201300_result.webp', '20220710_201331_result.webp', '20220711_071324_result.webp', '20220712_193452_result.webp',
    '20220714_123728_result.webp', '20220714_172548_result.webp', '20220715_074823_result.webp', '20220715_114324_result.webp',
    '20220725_125821_result.webp', '20220725_130101_result.webp', '20220805_162343_result.webp', '20220808_203235_result.webp',
    '20220809_155503_result.webp', '20220809_163942_result.webp', '20220818_150119_result.webp', '20220823_085408_result.webp',
    '20220824_083229_result.webp', '20220831_111213_result.webp', '20221005_141144_result.webp', '20221005_141219_result.webp',
    '20221121_141104_result.webp', '20221130_164230_result.webp', '20221130_164233_result.webp', '20221201_025542_result.webp',
    '20221202_181637_result.webp', '20221202_181658_result.webp', '20221202_181909 (1)_result.webp', '20221202_181909_result.webp',
    '20221203_103703_result.webp', '20221203_140751_result.webp', '20221203_140754_result.webp', '20221204_081839_result.webp',
    '20221205_065322_result.webp', '20221205_094716_result.webp', '20221205_114309_result.webp', '20221206_150124_result.webp',
    '20221206_151103_result.webp', '20221206_151217_result.webp', '20221207_154311_result.webp', '20221207_171556_result.webp',
    '20221207_171818_result.webp', '20221207_171944_result.webp', '20221207_172006_result.webp', '20221209_132357_result.webp',
    '20221209_194030_result.webp', '20221210_224633_result.webp', '20221211_185209_result.webp', '20221212_172445_result.webp',
    '20221213_163209_result.webp', '20221215_084124_result.webp', '20221215_192619_result.webp', '20230115_111358_result.webp',
    '20230116_105039_result.webp', '20230116_175212_result.webp', '20230331_152409_result.webp', '20230403_081704_result.webp',
    '20230616_100223_result.webp', '20230621_051542_result.webp', '20230626_143133_result.webp', '20230704_150707_result.webp',
    '20230704_151912_result.webp', '20230704_174716_result.webp', '20230721_113008_result.webp', '20230721_113038_result.webp',
    '20230721_113303_result.webp', '20230721_152842_result.webp', '20230828_191056_result.webp', '20230922_111734_result.webp',
    '20230922_112538_result.webp', '20230922_112553_result.webp', '20230922_153614_result.webp', '20231001_171728_result.webp',
    '20231106_070539_result.webp', '20231116_155834_result.webp', '20231209_120007_result.webp', '20231210_132933_result.webp',
    '20231210_133025_result.webp', '20231212_083417_result.webp', '20231212_083606_result.webp', '20231227_163502_result.webp',
    '20240613_095904_result.webp', '20240719_200150_result.webp', '20250901_124118_result.webp', '20250901_124501_result.webp',
    '20250901_124735_result.webp', '20250901_125125_result.webp', '20250901_163256_result.webp', '2606d612-866d-49a6-b259-a2e520d776c3 (1)_result.webp',
    '2606d612-866d-49a6-b259-a2e520d776c3_result.webp', '4 (1)_result.webp', '6_result.webp', 'IMG-20220103-WA0004_result.webp',
    'IMG-20220527-WA0004 (1)_result.webp', 'IMG-20240216-WA0005_result.webp', 'IMG-20240216-WA0015_result.webp', 'IMG-20240721-WA0057_result.webp',
    'IMG-20240721-WA0058_result.webp', 'IMG20170210151215_result.webp', 'IMG20170224075916_result.webp', 'IMG20170227070811_result.webp',
    'IMG20170227095223_result.webp', 'IMG20170227174902_result.webp', 'IMG20170227175108_result.webp', 'IMG20170304090522_result.webp',
    'IMG20170308073015_result.webp', 'IMG20170321105402_result.webp', 'IMG20170531150523_result.webp', 'IMG20170601160227_result.webp',
    'IMG20170601162321_result.webp', 'IMG20170602092948_result.webp', 'IMG20170715152510_result.webp', 'IMG20170721144437_result.webp',
    'IMG20170725091617_result.webp', 'IMG20170728125127_result.webp', 'IMG20170809091938_result.webp', 'IMG20170823182319_result.webp',
    'IMG20170901081829_result.webp', 'IMG20171111085129_result.webp', 'IMG20171114152057_result.webp', 'IMG20171129202927_result.webp',
    'IMG20171130104752_result.webp', 'IMG20180211112741_result.webp', 'IMG20180219164534_result.webp', 'IMG20180220082613_result.webp',
    'IMG20180220191613_result.webp', 'IMG20180223104205_result.webp', 'IMG20180223144045_result.webp', 'IMG_20190625_123140_result.webp',
    'IMG_20190625_193834_result.webp', 'IMG_20190626_140300_result.webp', 'IMG_20190707_104324_result.webp', 'IMG_20190727_161220_result.webp',
    'IMG_20190731_162025_result.webp', 'IMG_20190731_164301_result.webp', 'IMG_20190808_190454_result.webp', 'IMG_20190820_140743_result.webp',
    'IMG_20190902_144732_result.webp', 'IMG_20190908_174848_result.webp', 'IMG_20190910_174831_result.webp', 'IMG_20190928_163940_result.webp',
    'IMG_20190928_184857_result.webp', 'IMG_20190930_073721_result.webp', 'IMG_20191005_140741_result.webp', 'IMG_20191005_140750_result.webp',
    'IMG_20191008_180606_result.webp', 'IMG_20191012_124134_result.webp', 'IMG_20191012_195541_result.webp', 'IMG_20191018_094059_result.webp',
    'IMG_20191106_155401_result.webp', 'IMG_20191119_161129_result.webp', 'IMG_20191127_094218_result.webp', 'IMG_20200122_160528_1_BURST002_result.webp',
    'IMG_20200122_160534_result.webp', 'IMG_20200122_160738_result.webp', 'IMG_20200122_160743_result.webp', 'IMG_20200129_165855_result.webp',
    'IMG_20200202_103501_result.webp', 'IMG_20200205_150434_result.webp', 'IMG_20200214_093709_result.webp', 'IMG_20200215_093308_result.webp',
    'IMG_20200306_142821_result.webp', 'IMG_20200307_092415_result.webp', 'IMG_20200509_162202_result.webp', 'IMG_20200518_104444_result.webp',
    'IMG_20200523_163930_BURST001_COVER_result.webp', 'IMG_20200523_164050_result.webp', 'IMG_20200524_154634-PANO_result.webp', 'IMG_20200524_154801_result.webp',
    'IMG_20200526_184043_result.webp', 'IMG_20200606_163721_result.webp', 'IMG_20200620_172530_result.webp', 'IMG_20200620_181149_result.webp',
    'IMG_20200716_133530_result.webp', 'IMG_20200720_175506_result.webp', 'IMG_20200720_175510_result.webp', 'IMG_20200814_101140_result.webp',
    'IMG_20200819_151743_result.webp', 'IMG_20200830_110917_result.webp', 'IMG_20200830_122414_result.webp', 'IMG_20200830_123017_result.webp',
    'IMG_20200830_153528_result.webp', 'IMG_20201106_182442_result.webp', 'IMG_20201110_090446_result.webp', 'IMG_20200110_090451_result.webp',
    'IMG_20201124_145540_result.webp', 'IMG_20210507_103611_result.webp', 'IMG_20210524_110135_result.webp', 'IMG_20210617_154844_result.webp',
    'IMG_20210721_112608_result.webp', 'IMG_20220112_102425_result.webp', 'IMG_20220119_155917_result.webp', 'IMG_20220120_133648_result.webp',
    'IMG_20220122_095139_result.webp', 'IMG_20220507_142027_result.webp', 'about_us_bckgrnd_result.webp', 'dji_export_1643216176907_result.webp',
    'dji_fly_20211227_110234_35_1661929513050_photo_optimized_result.webp', 'dji_fly_20220122_052858_71_1661929513087_photo_optimized_result.webp',
    'dji_fly_20220122_053532_76_1661929513078_photo_optimized_result.webp', 'dji_fly_20220125_122626_93_1661929513062_photo_optimized_result.webp',
    'dji_fly_20220125_135208_0_1661929513113_photo_result.webp', 'dji_fly_20230223_104412_171_1677120538107_photo_optimized_result.webp',
    'dji_fly_20230531_115606_231_1685508979619_photo_optimized_result.webp', 'dji_fly_20230608_093304_293_1686191623005_photo_optimized_result.webp',
    'dji_fly_20230630_105622_454_1688093955943_photo_optimized_result.webp', 'dji_fly_20230703_174842_482_1688377737493_photo_optimized_result.webp',
];

// Priprema galerije (putanja do slika)
const galleryImages = imageFilenames.map(filename => ({
    src: 'slike/gallery/' + filename, 
    caption: '' // Prazan opis
}));
 
let currentIndex = 0;
let slideshowInterval;
const totalImages = galleryImages.length;
let controlHideTimeout;
const LIGHTBOX_HIDE_DELAY = 5000; 

let modalElement;
let slideshowBtn;

// === FULL SCREEN LOGIKA (Dostupna globalno) ===
window.toggleFullScreen = () => {
    const element = document.getElementById('lightbox-window');
    if (!document.fullscreenElement) {
        element.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
        document.exitFullscreen();
    }
}

// === LOGIKA ZA SKRIVANJE/PRIKAZIVANJE KONTROLA ===
function showControls() {
    if (modalElement) {
        modalElement.classList.remove('controls-hidden');
    }
}

function hideControls() {
    if (modalElement && !slideshowInterval) { 
        modalElement.classList.add('controls-hidden');
    }
}

function resetControlTimeout() {
    clearTimeout(controlHideTimeout);
    showControls();
    
    if (slideshowBtn && !slideshowBtn.textContent.includes('Stop')) {
         controlHideTimeout = setTimeout(hideControls, LIGHTBOX_HIDE_DELAY); 
    }
}
// =================================================

// === KLIJENTSKA LOGIKA (GLAVNE FUNKCIJE) ===

window.openModal = (index) => {
    currentIndex = index;
    
    if (slideshowInterval) {
        window.toggleSlideshow(slideshowBtn);
    }
    
    updateImage(false); 
    modalElement.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    
    resetControlTimeout(); 
}

function updateImage(useTransition = true) {
    const container = document.getElementById('lightbox-image-wrapper');
    const img = galleryImages[currentIndex];
    
    const animationClass = useTransition ? 'animate-fade-in' : '';
    
    container.innerHTML = `
        <img src="${img.src}" alt="AnoHUB Gallery Image" class="max-w-full max-h-full object-contain ${animationClass}" style="animation-duration: 0.3s;">
    `;
    
    document.getElementById('lightbox-counter').textContent = `Image ${currentIndex + 1} of ${totalImages}`;
    
    document.getElementById('prev-btn').disabled = (currentIndex === 0);
    document.getElementById('next-btn').disabled = (currentIndex === totalImages - 1);
}

window.navigateGallery = (direction) => {
    const newIndex = currentIndex + direction;

    if (newIndex >= 0 && newIndex < totalImages) {
        currentIndex = newIndex;
        updateImage(true); 
        resetControlTimeout(); 
    }
};

window.toggleSlideshow = (button) => {
    if (slideshowInterval) {
        // ZAUSTAVLJANJE
        clearInterval(slideshowInterval);
        slideshowInterval = null;
        button.innerHTML = '▶️ Start Slideshow';
        button.classList.remove('bg-red-600');
        button.classList.add('bg-hydro-secondary');
        resetControlTimeout(); 
    } else {
        // POKRETANJE
        clearTimeout(controlHideTimeout); 
        showControls(); 

        if (currentIndex === totalImages - 1) {
            currentIndex = 0;
            updateImage(false);
        }

        button.innerHTML = '⏸️ Stop Slideshow';
        button.classList.remove('bg-hydro-secondary');
        button.classList.add('bg-red-600');
        
        slideshowInterval = setInterval(() => {
            if (currentIndex < totalImages - 1) {
                window.navigateGallery(1); 
            } else {
                currentIndex = 0;
                updateImage(true); 
            }
        }, 3500); 
    }
};

window.closeModal = () => {
    modalElement.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    
    if (slideshowInterval) {
         window.toggleSlideshow(slideshowBtn);
    }

    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
    clearTimeout(controlHideTimeout);
}

// === INICIJALIZACIJA ===

document.addEventListener("DOMContentLoaded", function() {
    modalElement = document.getElementById('lightbox-modal');
    slideshowBtn = document.getElementById('slideshow-btn');

    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    const grid = document.querySelector('.gallery-grid');
    if (grid) {
        // Generisanje svih thumbnailova (za brzinu)
        galleryImages.forEach((img, index) => {
            grid.innerHTML += `
                <div onclick="openModal(${index})" class="thumbnail-item">
                    <img src="${img.src}" alt="AnoHUB Gallery Image" 
                            class="thumbnail-img w-full h-36 object-cover rounded-lg" 
                            loading="lazy">
                </div>
            `;
        });
    }

    // KRITIČNO: POPRAVAK PRIKAZA BROJA SLIKA
    const totalCountElements = document.querySelectorAll('.total-images-placeholder');
    totalCountElements.forEach(el => {
        el.textContent = totalImages;
    });


    // Listener za navigaciju tastaturom
    document.addEventListener('keydown', (e) => {
        if (!modalElement.classList.contains('hidden')) {
            if (e.key === 'ArrowLeft') {
                window.navigateGallery(-1); 
            } else if (e.key === 'ArrowRight') {
                window.navigateGallery(1);
            } else if (e.key === 'Escape') {
                window.closeModal();
            }
        }
    });

    // Listener za automatsko skrivanje kontrola (unutar cijelog lightboksa)
    if (modalElement) {
        modalElement.addEventListener('mousemove', resetControlTimeout);
        
        // Zatvaranje klika na pozadinu
        modalElement.onclick = (event) => {
            if (event.target === modalElement) {
                window.closeModal();
            }
        };
    }
});