const zoomContainer = document.getElementById('zoomContainer');
let scale = 1;

function updateScale(change) {
    scale *= change;
    zoomContainer.style.transform = `translateX(-50%) scale(${scale})`;
}

document.addEventListener('wheel', function(event) {
    if (event.deltaY < 0) {
        updateScale(1.1);
    } else {
        updateScale(0.9);
    }
});

let startDistance = null;

document.addEventListener('touchmove', function(event) {
    if (event.touches.length == 2) {
        event.preventDefault();
        const dx = event.touches[0].pageX - event.touches[1].pageX;
        const dy = event.touches[0].pageY - event.touches[1].pageY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (startDistance === null) {
            startDistance = distance;
        } else {
            const ratio = distance / startDistance;
            updateScale(ratio);
            startDistance = distance;
        }
    }
}, { passive: false });

document.addEventListener('touchend', function(event) {
    if (event.touches.length < 2) {
        startDistance = null;
    }
});