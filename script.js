const cursor = document.getElementById('cursor');
const buttons = document.querySelectorAll('.btn');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let x = mouseX;
let y = mouseY;
let lockTarget = null;
let lockRect = null;
let isSelecting = false;
let isClicking = false;
let overText = false;

window.addEventListener('mousemove', e => {
mouseX = e.clientX;
mouseY = e.clientY;
overText = e.target.classList.contains('selectable');
});

buttons.forEach(btn => {
btn.addEventListener('mouseenter', () => {
const r = btn.getBoundingClientRect();
lockTarget = { x: r.left + r.width / 2, y: r.top + r.height / 2 };
lockRect = r;
});

btn.addEventListener('mouseleave', () => {
lockTarget = null;
lockRect = null;
});
});

window.addEventListener('selectionchange', () => {
const selection = window.getSelection();
isSelecting = selection && !selection.isCollapsed;
});

window.addEventListener('mousedown', () => isClicking = true);
window.addEventListener('mouseup', () => isClicking = false);

function animate() {
const targetX = lockTarget ? lockTarget.x : mouseX;
const targetY = lockTarget ? lockTarget.y : mouseY;

x += (targetX - x) * 0.15;
y += (targetY - y) * 0.15;

cursor.style.left = x + 'px';
cursor.style.top = y + 'px';

if (lockRect) {
cursor.style.width = lockRect.width + 'px';
cursor.style.height = lockRect.height + 'px';
cursor.style.borderRadius = '14px';
cursor.style.background = 'rgba(136,136,136,0.8)';
}
else if (overText || isSelecting) {
cursor.style.width = isClicking ? '4px' : '6px';
cursor.style.height = isClicking ? '24px' : '30px';
cursor.style.borderRadius = '3px';
cursor.style.background = 'rgba(0,150,255,0.7)';
}
else {
cursor.style.width = isClicking ? '16px' : '20px';
cursor.style.height = isClicking ? '16px' : '20px';
cursor.style.borderRadius = '50%';
cursor.style.background = 'rgba(136,136,136,0.8)';
}

requestAnimationFrame(animate);
}

animate();