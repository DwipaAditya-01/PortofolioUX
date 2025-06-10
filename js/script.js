document.addEventListener('DOMContentLoaded', function() {
    // Animasi Fade-in untuk Hero Section
    // const heroSection = document.querySelector('.hero');
    // if (heroSection) {
    //     heroSection.style.opacity = 0;
    //     let opacity = 0;
    //     const fadeInInterval = setInterval(function() {
    //         if (opacity < 1) {
    //             opacity += 0.02; // Kecepatan fade-in
    //             heroSection.style.opacity = opacity;
    //         } else {
    //             clearInterval(fadeInInterval);
    //         }
    //     }, 30); // Interval waktu fade-in
    // }

    // Fungsionalitas Hamburger Menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active'); // Untuk animasi hamburger menjadi X
        });

        // Menutup menu saat link di klik (berguna untuk navigasi satu halaman)
        const allNavLinks = navLinks.querySelectorAll('a');
        allNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        });
    }

    // Fungsionalitas View More untuk Galeri Proyek
    const viewMoreButton = document.getElementById('view-more');

    if (viewMoreButton) {
        viewMoreButton.addEventListener('click', function (e) {
            e.preventDefault();

            const allItems = document.querySelectorAll('.gallery-item');
            const isExpanded = viewMoreButton.dataset.expanded === 'true';

            if (isExpanded) {
                // View LESS: Tambahkan efek hilang
                allItems.forEach((item, index) => {
                    if (index >= 3) {
                        item.classList.add('hidden');
                    }
                });
                viewMoreButton.textContent = 'View More';
                viewMoreButton.dataset.expanded = 'false';
            } else {
                // View MORE: Tampilkan dengan animasi
                allItems.forEach(item => item.classList.remove('hidden'));

                viewMoreButton.textContent = 'View Less';
                viewMoreButton.dataset.expanded = 'true';

                // Scroll halus ke flagship section
                const flagship = document.getElementById('proyek');
                if (flagship) {
                    flagship.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    }


    flagship.scrollIntoView({ behavior: 'smooth' });

});
