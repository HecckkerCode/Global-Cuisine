(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 24
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Art isotope and filter
   */
  let artContainer = select('.art-container');
  if (artContainer) {
    let artIsotope = new Isotope(artContainer, {
      itemSelector: '.art-item',
      layoutMode: 'fitRows'
    });

    let artFilters = select('#art-flters li', true);

    on('click', '#art-flters li', function (e) {
      e.preventDefault();
      artFilters.forEach(function (el) {
        el.classList.remove('filter-active');
      });
      this.classList.add('filter-active');

      artIsotope.arrange({
        filter: this.getAttribute('data-filter')
      });
      artIsotope.on('arrangeComplete', function () {
        AOS.refresh()
      });
    }, true);
  }


  /**
   * Initiate art lightbox 
   */
  const artLightbox = GLightbox({
    selector: '.art-lightbox'
  });

  /**
   * art details slider
   */
  new Swiper('.art-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

/**
   * Porfolio isotope and filter  (Arwind)
   */
window.addEventListener('load', () => {
  let portfolioContainer = select('.portfolio-container');
  if (portfolioContainer) {
    let portfolioIsotope = new Isotope(portfolioContainer, {
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    let portfolioFilters = select('#portfolio-flters li', true);

    on('click', '#portfolio-flters li', function(e) {
      e.preventDefault();
      portfolioFilters.forEach(function(el) {
        el.classList.remove('filter-active');
      });
      this.classList.add('filter-active');

      portfolioIsotope.arrange({
        filter: this.getAttribute('data-filter')
      });
      portfolioIsotope.on('arrangeComplete', function() {
        AOS.refresh()
      });
    }, true);
  }

});

/**
 * Initiate portfolio lightbox （Arwind)
 */
const portfolioLightbox = GLightbox({
  selector: '.portfolio-lightbox'
});

/**
 * Portfolio details slider (Arwind)
 */
new Swiper('.portfolio-details-slider', {
  speed: 400,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
  }
});

/**
   * Testimonials slider (Arwind)
   */
new Swiper('.testimonials2-slider', {
  speed: 600,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  slidesPerView: 'auto',
  pagination: {
    el: '.swiper-pagination2',
    type: 'bullets',
    clickable: true
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 40
    },

    1200: {
      slidesPerView: 3,
    }
  }
});


  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40
      },

      1200: {
        slidesPerView: 3,
      }
    }
  });

  /**
   * Chinese Cuisine slider
   */
  new Swiper('.cuisine-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40
      },

      1200: {
        slidesPerView: 3,
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()


/**
 * Video Festival
 */
document.addEventListener("DOMContentLoaded", function () {
  const videoItems = document.querySelectorAll(".video-item");

  videoItems.forEach(function (videoItem) {
    const videoId = videoItem.getAttribute("data-video-id");
    const videoContainer = videoItem.querySelector(".video-container");

    videoItem.addEventListener("click", function () {
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1`;
      iframe.frameborder = "0";
      iframe.allowfullscreen = true;
      videoContainer.innerHTML = "";
      videoContainer.appendChild(iframe);
    });
  });
});

/*--------------------------------------------------------------
# Subscribe Session 
--------------------------------------------------------------*/
function redirect() {
  window.location.href = "subscribe.html"; // Redirect to subscribe.html
}



/*--------------------------------------------------------------
# Subscribe Form 
--------------------------------------------------------------*/
// Function to smoothly scroll to the target section
function scrollToSection(event) {
  event.preventDefault();
  const targetId = this.getAttribute("href").substring(1); // Get the target section's ID
  const targetSection = document.getElementById(targetId);

  if (targetSection) {
    window.scrollTo({
      top: targetSection.offsetTop,
      behavior: "smooth", // Enable smooth scrolling
    });
  }
}

// Attach the click event handler to the "Scroll To" button
const scrollToButton = document.getElementById("scrollToButton");
if (scrollToButton) {
  scrollToButton.addEventListener("click", scrollToSection);
}



/*--------------------------------------------------------------
# Cookie Storage 
--------------------------------------------------------------*/
// JavaScript for handling form submission and cookies
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

document.addEventListener("DOMContentLoaded", function() {
  const cookieConsent = document.getElementById('cookie-consent');
  const content = document.getElementById('content');
  
  // Check if the user has already accepted cookies
  if (localStorage.getItem('cookiesAccepted') === 'true') {
      cookieConsent.style.display = 'none';
      content.style.display = 'block';
  }

  document.getElementById('accept-cookies').addEventListener('click', function() {
      localStorage.setItem('cookiesAccepted', 'true');
      cookieConsent.style.display = 'none';
      content.style.display = 'block';
  });
});


