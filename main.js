// Smooth scroll on click (You already have this)
document.addEventListener('DOMContentLoaded', () => {
  // menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navbar = document.getElementById('navbar');

  menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });

  // favorite hearts toggle
  document.querySelectorAll('.bx-heart').forEach(icon=>{
    icon.addEventListener('click', () => {
      icon.classList.toggle('bxs-heart');
      icon.classList.toggle('liked');
      icon.style.color = icon.classList.contains('bxs-heart') ? '#ff4081' : 'var(--accent)';
    });

    // keyboard accessibility
    icon.addEventListener('keydown', e=>{
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        icon.click();
      }
    });
  });

  // Smooth scroll for internal links
  const navLinks = document.querySelectorAll('#navbar li a');

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

// ---- NEW: highlight nav link while scrolling ----
const sections = document.querySelectorAll('section[id]'); // all sections with id

function activateNavOnScroll() {
  let scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 150; // offset so it switches a bit earlier
    const sectionId = current.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      // remove active class from all
      navLinks.forEach(link => link.classList.remove('active'));
      // add active to the one that matches sectionId
      document.querySelector('#navbar a[href="#' + sectionId + '"]').classList.add('active');
    }
  });
}

window.addEventListener('scroll', activateNavOnScroll);
window.addEventListener('load', activateNavOnScroll);
});

// Car Section Animation
const carCards = document.querySelectorAll('.car-card');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target); // animate once
    }
  });
}, {
  threshold: 0.2
});

carCards.forEach(card => observer.observe(card));

carCards.forEach((card, index) => {
  card.style.transitionDelay = `${index * 0.1}s`;
  observer.observe(card);
});

// About Section Typing Effect
const aboutParagraph = document.querySelector('.about-text p');
const fullText = aboutParagraph.textContent;
aboutParagraph.textContent = '';

let index = 0;
let typingStarted = false;

function typeText() {
  if (index < fullText.length) {
    aboutParagraph.textContent += fullText.charAt(index);
    index++;
    setTimeout(typeText, 25);
  }
}

const typingObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !typingStarted) {
        typingStarted = true;
        typeText();
      }
    });
  },
  {
    root: null,
    rootMargin: "0px 0px -150px 0px",
    threshold: 0
  }
);

typingObserver.observe(aboutParagraph);

// Blog Section Animation
const blogCards = document.querySelectorAll('.blog-card');

const blogObserver = new IntersectionObserver(
  entries => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('show');
        }, index * 150);
      }
    });
  },
  {
    threshold: 0.2
  }
);

blogCards.forEach(card => {
  blogObserver.observe(card);
});

// Contact Form Validation
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = contactForm.querySelector('input[type="text"]');
  const email = contactForm.querySelector('input[type="email"]');
  const message = contactForm.querySelector('textarea');

  if (name.value.trim() === '') {
    alert('Please enter your name');
    name.focus();
    return;
  }

  if (!validateEmail(email.value)) {
    alert('Please enter a valid email address');
    email.focus();
    return;
  }

  if (message.value.trim().length < 10) {
    alert('Message must be at least 10 characters');
    message.focus();
    return;
  }

  alert('Message sent successfully!');
  contactForm.reset();
});

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Alternative Contact Form Validation with inline errors
// const contactForm = document.querySelector('.contact-form');
// const formGroups = contactForm.querySelectorAll('.form-group');

// contactForm.addEventListener('submit', function (e) {
//   e.preventDefault();

//   let isValid = true;

//   const name = formGroups[0].querySelector('input');
//   const email = formGroups[1].querySelector('input');
//   const message = formGroups[2].querySelector('textarea');

//   clearErrors();

//   if (name.value.trim() === '') {
//     showError(formGroups[0], 'Name is required');
//     isValid = false;
//   }

//   if (!validateEmail(email.value)) {
//     showError(formGroups[1], 'Enter a valid email');
//     isValid = false;
//   }

//   if (message.value.trim().length < 10) {
//     showError(formGroups[2], 'Message must be at least 10 characters');
//     isValid = false;
//   }

//   if (isValid) {
//     contactForm.reset();
//     alert('Message sent successfully!');
//   }
// });

// function showError(group, message) {
//   group.classList.add('error');
//   group.querySelector('small').innerText = message;
// }

// function clearErrors() {
//   formGroups.forEach(group => {
//     group.classList.remove('error');
//     group.querySelector('small').innerText = '';
//   });
// }

// function validateEmail(email) {
//   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
// }



let favCount = 0;
let orderCount = 0

const favDisplay = document.getElementById("fav-count");
const orderDisplay = document.getElementById("order-count");

// Favorite Buttons 
document.querySelectorAll(".bx-heart").forEach(btn => {
  btn.addEventListener("click", () => {
    favCount++;
    favDisplay.style.display = "inline-block";
    favDisplay.textContent = favCount;
  });
});

// Rent Buttons
document.querySelectorAll(".rent-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    orderCount++;
    orderDisplay.style.display = "inline-block";
    orderDisplay.textContent = orderCount;
  });
});