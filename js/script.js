document.addEventListener('DOMContentLoaded', function() {

    // ==================================================
    // Fungsionalitas Hamburger Menu
    // ==================================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Mencegah event 'click' menyebar ke document
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Menutup menu saat link di klik (untuk navigasi satu halaman)
        const allNavLinks = navLinks.querySelectorAll('a');
        allNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        });

        // Menutup menu jika mengklik di luar area menu
        document.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }


    // ==================================================
    // Fungsionalitas "View More" dengan Animasi Halus
    // ==================================================
    const viewMoreButton = document.getElementById('view-more');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (viewMoreButton && galleryItems.length > 3) {
        // Sembunyikan item lebih dari 3 saat halaman pertama kali dimuat
        galleryItems.forEach((item, index) => {
            if (index >= 3) {
                item.classList.add('item-hidden');
            }
        });

        viewMoreButton.addEventListener('click', function(e) {
            e.preventDefault();

            const isExpanded = this.dataset.expanded === 'true';

            if (isExpanded) {
                // Sembunyikan item (View Less)
                galleryItems.forEach((item, index) => {
                    if (index >= 3) {
                        item.classList.add('item-hidden');
                    }
                });
                this.textContent = 'View More';
                this.dataset.expanded = 'false';

                // Scroll ke atas ke tombol setelah item disembunyikan
                this.scrollIntoView({ behavior: 'smooth', block: 'center' });

            } else {
                // Tampilkan item (View More)
                galleryItems.forEach(item => {
                    item.classList.remove('item-hidden');
                });
                this.textContent = 'View Less';
                this.dataset.expanded = 'true';
            }
        });
    } else if (viewMoreButton) {
        // Jika item kurang dari atau sama dengan 3, sembunyikan tombol "View More"
        viewMoreButton.style.display = 'none';
    }

});