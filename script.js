/**
 * Zifra Threads - Interaction Engine
 * Clean, performant, and memory-efficient scroll reveals.
 */

const initScrollReveal = () => {
    const cards = document.querySelectorAll('.card');
    
    // Fallback for browsers that don't support IntersectionObserver
    if (!('IntersectionObserver' in window)) {
        cards.forEach(card => card.classList.add('visible'));
        return;
    }

    const observerOptions = {
        threshold: 0.15, // Trigger slightly earlier for a smoother feel
        rootMargin: '0px 0px -50px 0px' // Trigger 50px before it hits the viewport
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the visible class to the specific card that entered
                entry.target.classList.add('visible');
                
                // ACTION: Stop watching this card once it's revealed (Performance Boost)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Watch each card individually
    cards.forEach(card => observer.observe(card));
};

// Execution: Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    
    // Header Scroll Effect - Optional but recommended for "Boutique" feel
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.padding = '0.8rem 8%';
            nav.style.background = 'rgba(5, 5, 5, 0.95)';
        } else {
            nav.style.padding = '1.2rem 8%';
            nav.style.background = 'rgba(5, 5, 5, 0.8)';
        }
    });
});