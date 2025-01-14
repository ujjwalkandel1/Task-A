
const carousel = document.querySelector('.carousel');
let cards = Array.from(document.querySelectorAll('.card'));
let isScrolling = false;
let isDragging = false;
let startY = 0;
let positions = ['outgoing', 'top', 'center', 'bottom', 'incoming'];

function moveCards(direction) {
    cards.forEach(card => {
        const currentPos = card.getAttribute('data-position');
        const currentIndex = positions.indexOf(currentPos);
        let newIndex = direction === 'up'
            ? (currentIndex - 1 + positions.length) % positions.length
            : (currentIndex + 1) % positions.length;
        card.setAttribute('data-position', positions[newIndex]);
    });
}

carousel.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (isScrolling) return;
    moveCards(e.deltaY > 0 ? 'up' : 'down');
});

document.addEventListener('keydown', (e) => {
    if (isScrolling) return;
    if (e.key === 'ArrowUp') {
        moveCards('down');
    } else if (e.key === 'ArrowDown') {
        moveCards('up');
    }
});

carousel.addEventListener('pointerdown', (e) => {
    isDragging = true;
    startY = e.clientY;
});

carousel.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const currentY = e.clientY;
    if (isScrolling) return;
    if (Math.abs(currentY - startY) > 20) { 
        moveCards(currentY > startY ? 'down' : 'up');
        isScrolling = true;
        setTimeout(() => {
            isScrolling = false;
        }, 200); 
    }
});

carousel.addEventListener('pointerup', () => {
    isDragging = false;
});

carousel.addEventListener('pointerleave', () => {
    isDragging = false;
});
