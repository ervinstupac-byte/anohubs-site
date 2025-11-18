// ==============================================
// TURBINE 3D LOGIC (js/turbine-3d-logic.js)
// Rukuje Google Model Viewer učitavanjem i progress barom.
// ==============================================

document.addEventListener("DOMContentLoaded", function() {
    const modelViewer = document.querySelector('model-viewer');

    if (modelViewer) {
        // Funkcija za ažuriranje custom progress bara
        modelViewer.addEventListener('progress', (event) => {
            const barContainer = document.querySelector('.update-bar');
            if (barContainer) {
                const progress = event.detail.totalProgress;
                const bar = barContainer.querySelector('div');
                if(bar) bar.style.width = `${progress * 100}%`;
            }
        });

        // Funkcija za skrivanje progress bara nakon učitavanja modela
        modelViewer.addEventListener('load', () => {
             const progressBar = document.querySelector('.progress-bar');
             if (progressBar) progressBar.style.display = 'none';
        });
    }
});