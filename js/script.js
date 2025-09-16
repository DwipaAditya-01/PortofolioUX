document.addEventListener('DOMContentLoaded', function() {

    /**
     * ===================================================================
     * Navigasi Mobile (Hamburger Menu)
     * ===================================================================
     */
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        const toggleMenu = () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        };
        menuToggle.addEventListener('click', (e) => { e.stopPropagation(); toggleMenu(); });
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => { if (navLinks.classList.contains('active')) { toggleMenu(); } });
        });
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && !menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                toggleMenu();
            }
        });
    }

    /**
     * ===================================================================
     * Fungsionalitas Filter Dropdown Proyek (RESPONSIVE)
     * ===================================================================
     */
    const mainFilterBtn = document.getElementById('main-filter-btn');
    const filterMenu = document.getElementById('filter-menu');
    const galleryItems = document.querySelectorAll('.gallery .gallery-item');
    const filterBtnText = document.getElementById('filter-btn-text');
    const figmaSubmenuToggle = document.querySelector('.has-submenu > a');

    if (mainFilterBtn && filterMenu && galleryItems.length > 0) {
        
        const filterProjects = (filterValue) => {
            galleryItems.forEach(item => {
                const itemCategory = item.dataset.filter;
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.classList.remove('hide-by-filter');
                } else {
                    item.classList.add('hide-by-filter');
                }
            });
            setTimeout(() => { if (typeof AOS !== 'undefined') { AOS.refresh(); } }, 400);
        };

        mainFilterBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            filterMenu.classList.toggle('show');
        });

        filterMenu.addEventListener('click', (e) => {
            const target = e.target;
            if (target.tagName === 'A' && target.dataset.filter) {
                e.preventDefault();
                const filterValue = target.dataset.filter;
                const filterText = target.textContent;
                
                filterProjects(filterValue);
                
                if (filterBtnText) {
                    filterBtnText.textContent = filterText;
                }
                
                filterMenu.classList.remove('show');
            }
        });

        // Logika untuk membuka submenu dengan KLIK
        if (figmaSubmenuToggle) {
            figmaSubmenuToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation(); // Mencegah menu utama tertutup
                this.parentElement.classList.toggle('open');
            });
        }

        window.addEventListener('click', (e) => {
            if (!mainFilterBtn.contains(e.target) && !filterMenu.contains(e.target)) {
                filterMenu.classList.remove('show');
            }
        });
    }

    /**
     * ===================================================================
     * Fungsionalitas "View More" untuk Galeri Proyek
     * ===================================================================
     */
    const viewMoreButton = document.getElementById('view-more');
    const initialItemCount = 6;

    if (viewMoreButton && galleryItems.length > initialItemCount) {
        galleryItems.forEach((item, index) => {
            if (index >= initialItemCount) { item.classList.add('item-hidden'); }
        });
        viewMoreButton.addEventListener('click', function(e) {
            e.preventDefault();
            const isExpanded = this.dataset.expanded === 'true';
            galleryItems.forEach((item, index) => {
                if (index >= initialItemCount) { item.classList.toggle('item-hidden', isExpanded); }
            });
            this.textContent = isExpanded ? 'View More' : 'View Less';
            this.dataset.expanded = !isExpanded;
            if (isExpanded) {
                setTimeout(() => { this.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 400);
            }
            setTimeout(() => { if (typeof AOS !== 'undefined') { AOS.refresh(); } }, 400);
        });
    } else if (viewMoreButton) {
        viewMoreButton.style.display = 'none';
    }

    /**
     * ===================================================================
     * Efek 3D Tilt pada Kartu Kemampuan
     * ===================================================================
     */
    const skillCards = document.querySelectorAll('.skill-card');
    if (skillCards.length > 0 && typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(skillCards, { max: 15, speed: 400, glare: true, "max-glare": 0.5 });
    }

    /**
     * ===================================================================
     * Animasi "The Reveal" pada Section Kontak
     * ===================================================================
     */
    const ctaKontak = document.getElementById('cta-kontak');
    const kontakLinksContainer = document.getElementById('kontak-links-container');
    if (ctaKontak && kontakLinksContainer) {
        ctaKontak.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.add('hidden');
            kontakLinksContainer.classList.add('visible');
        });
    }

    /**
     * ===================================================================
     * Efek Neon Ripple pada Tombol
     * ===================================================================
     */
    const rippleButtons = document.querySelectorAll('.cta-button:not(#cta-kontak), .lihat-semua, .view-more');
    if (rippleButtons.length > 0) {
        const createRipple = function(e) {
            const btn = e.currentTarget;
            const circle = document.createElement('span');
            const diameter = Math.max(btn.clientWidth, btn.clientHeight);
            const radius = diameter / 2;
            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${e.clientX - btn.getBoundingClientRect().left - radius}px`;
            circle.style.top = `${e.clientY - btn.getBoundingClientRect().top - radius}px`;
            circle.classList.add('neon-ripple');
            const oldRipple = btn.querySelector('.neon-ripple');
            if (oldRipple) { oldRipple.remove(); }
            btn.appendChild(circle);
        };
        rippleButtons.forEach(btn => { btn.addEventListener('click', createRipple); });
    }

    if (!document.getElementById('neon-ripple-style')) {
        const style = document.createElement('style');
        style.id = 'neon-ripple-style';
        style.textContent = `
            .cta-button, .lihat-semua, .view-more, .kontak-link { position: relative; overflow: hidden; }
            .neon-ripple { position: absolute; border-radius: 50%; background: radial-gradient(circle, rgba(0, 255, 231, 0.7) 0%, transparent 70%); transform: scale(0); animation: neon-ripple-anim 0.6s linear; pointer-events: none; }
            @keyframes neon-ripple-anim { to { transform: scale(4); opacity: 0; } }
        `;
        document.head.appendChild(style);
    }
});