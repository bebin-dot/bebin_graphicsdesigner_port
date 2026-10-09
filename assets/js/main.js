/* Bebin V Portfolio Main JavaScript */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Navbar Scroll Spy & Background Effect
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Navbar shadow on scroll
    if (window.scrollY > 50) {
      navbar.classList.add('shadow-xl', 'bg-[#070709]/95');
    } else {
      navbar.classList.remove('shadow-xl', 'bg-[#070709]/95');
    }

    // Scroll spy for active link
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Custom Cursor Glow Follower
  const cursorGlow = document.getElementById('cursor-glow');
  if (cursorGlow && window.innerWidth > 768) {
    window.addEventListener('mousemove', (e) => {
      cursorGlow.style.left = `${e.clientX}px`;
      cursorGlow.style.top = `${e.clientY}px`;
    });
  }

  // Project Category Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active', 'bg-accent-blue', 'text-white'));
      filterBtns.forEach(b => b.classList.add('bg-white/5', 'text-gray-300'));

      // Set active on clicked button
      btn.classList.add('active', 'bg-accent-blue', 'text-white');
      btn.classList.remove('bg-white/5', 'text-gray-300');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
});

/* Global Project Modal Functions */
function openProjectModal(title, category, imageSrc, description, tools) {
  const modal = document.getElementById('project-modal');
  document.getElementById('modal-title').innerText = title;
  document.getElementById('modal-category').innerText = category;
  document.getElementById('modal-image').src = imageSrc;
  document.getElementById('modal-image').alt = title;
  document.getElementById('modal-description').innerText = description;
  document.getElementById('modal-tools').innerText = tools;

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  modal.classList.add('hidden');
  document.body.style.overflow = 'auto';
}



/* Contact Form Submit Handler */
function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  
  showToast(`Thank you, ${name}! Your message has been received.`);
  document.getElementById('contact-form').reset();
}

/* Toast Notification Helper */
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  
  if (toast && toastMessage) {
    toastMessage.innerText = message;
    toast.classList.remove('hidden');
    
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 4000);
  }
}
