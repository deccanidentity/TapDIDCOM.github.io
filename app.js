/**
 * TapDID  - Digital Identity Platform
 * Client-side Interactive Logic ( & Rupees ₹ Tailored)
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initHeaderScroll();
  initMobileNav();
  initCardCustomizer();
  initQrEngine();
  initAiAssistant();
  initRoiCalculator();
  initFaqAccordion();
  initTapSimulator();
});

// Remove preload class after page load to enable smooth transitions without load flickering
window.addEventListener('load', () => {
  setTimeout(() => {
    document.documentElement.classList.remove('preload');
  }, 50);
});

/* ==========================================================================
   Mobile Navigation Toggle
   ========================================================================== */
function initMobileNav() {
  const toggles = document.querySelectorAll('.mobile-nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!toggles || !navLinks) return;

  function closeMenu() {
    navLinks.classList.remove('mobile-open');
    toggles.forEach(toggle => {
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.innerHTML = '☰';
    });
  }

  function openMenu() {
    navLinks.classList.add('mobile-open');
    toggles.forEach(toggle => {
      toggle.classList.add('active');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.innerHTML = '✕';
    });
  }

  toggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.contains('mobile-open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('mobile-open') && !navLinks.contains(e.target)) {
      let isToggleClick = false;
      toggles.forEach(t => {
        if (t.contains(e.target)) isToggleClick = true;
      });
      if (!isToggleClick) {
        closeMenu();
      }
    }
  });

  // Close menu on Escape keypress
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('mobile-open')) {
      closeMenu();
    }
  });

  // Close menu when a nav link is clicked
  const links = navLinks.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });
}

/* ==========================================================================
   Theme Switcher (Dark / Light Mode)
   ========================================================================== */
function initThemeToggle() {
  const themeBtn = document.getElementById('themeToggle');
  const currentTheme = document.documentElement.getAttribute('data-theme') || localStorage.getItem('tapdid_theme') || 'dark';
  
  updateThemeIcon(currentTheme);

  if (!themeBtn) return;

  themeBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('tapdid_theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('themeIcon');
  const mainLogo = document.getElementById('mainLogo');
  const footerLogo = document.getElementById('footerLogo');

  if (icon) {
    if (theme === 'light') {
      icon.innerHTML = `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>`;
    } else {
      icon.innerHTML = `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`;
    }
  }

  const logoSrc = theme === 'dark' ? 'assets/tapdid_h_dark.png' : 'assets/logo_h_nobg.png';
  if (mainLogo && !mainLogo.src.endsWith(logoSrc)) mainLogo.src = logoSrc;
  if (footerLogo && !footerLogo.src.endsWith(logoSrc)) footerLogo.src = logoSrc;
}

/* ==========================================================================
   Header Scroll Styling
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   3D NFC Card Customizer & Flip
   ========================================================================== */
function initCardCustomizer() {
  const card3d = document.getElementById('nfcCard3D');
  const nameInput = document.getElementById('inputName');
  const roleInput = document.getElementById('inputRole');
  const companyInput = document.getElementById('inputCompany');
  const materialBtns = document.querySelectorAll('.material-btn');

  const cardName = document.getElementById('cardName');
  const cardRole = document.getElementById('cardRole');
  const cardCompany = document.getElementById('cardCompany');

  if (!card3d) return;

  // Card Flip on Click
  card3d.addEventListener('click', () => {
    card3d.classList.toggle('flipped');
  });

  // Inputs real-time reflection
  if (nameInput && cardName) {
    nameInput.addEventListener('input', (e) => {
      cardName.textContent = e.target.value || 'Rohan Sharma';
    });
  }

  if (roleInput && cardRole) {
    roleInput.addEventListener('input', (e) => {
      cardRole.textContent = e.target.value || 'Founder & CEO';
    });
  }

  if (companyInput && cardCompany) {
    companyInput.addEventListener('input', (e) => {
      cardCompany.textContent = e.target.value || 'Apex Innovations Pvt Ltd';
    });
  }

  const submitBtn = document.getElementById('submitCardOrderBtn');

  function updateSubmitPrice() {
    if (!submitBtn) return;
    const activeBtn = document.querySelector('.material-btn.active');
    if (activeBtn) {
      const match = activeBtn.textContent.match(/₹[\d,]+/);
      const price = match ? match[0] : '₹300';
      submitBtn.textContent = `Submit Card Order Details (${price})`;
    }
  }

  // Material Switcher
  materialBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      materialBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const mat = btn.getAttribute('data-mat');
      card3d.setAttribute('data-material', mat);
      updateSubmitPrice();
    });
  });

  updateSubmitPrice();

  // Submit Card Order Button Handler
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const name = nameInput ? nameInput.value.trim() : '';
      const role = roleInput ? roleInput.value.trim() : '';
      const company = companyInput ? companyInput.value.trim() : '';
      const emailInput = document.getElementById('inputEmail');
      const email = emailInput ? emailInput.value.trim() : '';
      const phoneInput = document.getElementById('inputPhone');
      const phone = phoneInput ? phoneInput.value.trim() : '';

      if (!name) {
        alert('Please enter your full name for the card print.');
        if (nameInput) nameInput.focus();
        return;
      }

      const selectedMatBtn = document.querySelector('.material-btn.active');
      const finishText = selectedMatBtn ? selectedMatBtn.textContent : 'Classic PVC (₹300)';

      alert(`✅ Thank you, ${name}!\n\nYour order details for "${finishText}" have been captured successfully.\n\nSummary:\n• Name: ${name}\n• Designation: ${role}\n• Company: ${company}\n• Email: ${email || 'N/A'}\n• Phone: ${phone || 'N/A'}\n\nOur team will contact you via WhatsApp (+91 8186 035869) or email with your digital card proof & tracking details.`);
    });
  }
}

/* ==========================================================================
   Dynamic QR & UPI Canvas Engine
   ========================================================================== */
function initQrEngine() {
  const canvas = document.getElementById('qrCanvas');
  const qrInput = document.getElementById('qrDataInput');
  const qrDownloadBtn = document.getElementById('downloadQrBtn');

  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  function renderQr(text) {
    const size = 220;
    canvas.width = size;
    canvas.height = size;

    // Draw white background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, size, size);

    // Draw QR pattern simulation (accurate grid alignment)
    const gridSize = 23;
    const cellSize = size / gridSize;

    // Seed hash from input string
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = (hash << 5) - hash + text.charCodeAt(i);
      hash |= 0;
    }

    ctx.fillStyle = '#060B19';

    // Position detection patterns (corners)
    drawFinderPattern(ctx, 0, 0, cellSize);
    drawFinderPattern(ctx, (gridSize - 7) * cellSize, 0, cellSize);
    drawFinderPattern(ctx, 0, (gridSize - 7) * cellSize, cellSize);

    // Data matrix modules
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        // Skip finder pattern zones
        if ((r < 7 && c < 7) || (r < 7 && c >= gridSize - 7) || (r >= gridSize - 7 && c < 7)) {
          continue;
        }

        // Pseudo-random deterministic module placement
        const val = Math.abs(Math.sin(r * 12.9898 + c * 78.233 + hash) * 43758.5453);
        if (val % 1 > 0.40) {
          ctx.fillRect(c * cellSize + 0.5, r * cellSize + 0.5, cellSize - 1, cellSize - 1);
        }
      }
    }

    // Centered TapDID Badge Logo
    const centerSize = size * 0.24;
    const centerPos = (size - centerSize) / 2;
    ctx.fillStyle = '#0052FF';
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, centerSize / 2 + 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 14px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('TD', size / 2, size / 2);
  }

  function drawFinderPattern(ctx, x, y, cellSize) {
    ctx.fillStyle = '#060B19';
    ctx.fillRect(x, y, 7 * cellSize, 7 * cellSize);
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(x + cellSize, y + cellSize, 5 * cellSize, 5 * cellSize);
    ctx.fillStyle = '#0052FF';
    ctx.fillRect(x + 2 * cellSize, y + 2 * cellSize, 3 * cellSize, 3 * cellSize);
  }

  const initialVal = qrInput ? qrInput.value : 'https://tapdid.in/p/rohan-sharma';
  renderQr(initialVal);

  if (qrInput) {
    qrInput.addEventListener('input', (e) => {
      renderQr(e.target.value || 'https://tapdid.in');
    });
  }

  if (qrDownloadBtn) {
    qrDownloadBtn.addEventListener('click', () => {
      const link = document.createElement('a');
      link.download = 'TapDID--QR.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  }
}

/* ==========================================================================
   AI Assistant Interactive Simulator ( Context)
   ========================================================================== */
function initAiAssistant() {
  const sendBtn = document.getElementById('aiSendBtn');
  const aiInput = document.getElementById('aiInput');
  const chatMessages = document.getElementById('chatMessages');

  if (!sendBtn || !aiInput || !chatMessages) return;

  const responses = {
    'summary': 'Namaste! TapDID AI created your bio: "Rohan Sharma is Founder & CEO at Apex Innovations, driving digital transformation in . Tap to connect on WhatsApp, view portfolio, or pay via UPI."',
    'analytics': 'TapDID  Cloud Insights: You received 380 card taps across Mumbai, Bengaluru & Delhi events this month. Top channel: WhatsApp direct share (+62%).',
    'contact': 'TapDID AI automatically generated a VCF contact card, formatted the n mobile (+91) format, and prepared a auto-WhatsApp greeting message for your lead!'
  };

  sendBtn.addEventListener('click', () => {
    const text = aiInput.value.trim();
    if (!text) return;

    // Append User Message
    appendMessage(text, 'user');
    aiInput.value = '';

    // Simulated AI Typing delay
    setTimeout(() => {
      let reply = 'TapDID AI Assistant is processing your request. All digital profiles, WhatsApp links, and UPI QR codes are synced in real-time across  AWS servers.';
      const lower = text.toLowerCase();
      if (lower.includes('bio') || lower.includes('summary')) reply = responses['summary'];
      else if (lower.includes('analytic') || lower.includes('tap') || lower.includes('rupee')) reply = responses['analytics'];
      else if (lower.includes('lead') || lower.includes('whatsapp') || lower.includes('contact')) reply = responses['contact'];

      appendMessage(reply, 'ai');
    }, 600);
  });

  function appendMessage(msg, sender) {
    const div = document.createElement('div');
    div.className = `chat-bubble ${sender}`;
    div.textContent = msg;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}

/* ==========================================================================
   Interactive ROI Calculator (Rupees ₹)
   ========================================================================== */
function initRoiCalculator() {
  const teamSlider = document.getElementById('teamSizeSlider');
  const cardsSlider = document.getElementById('cardsPerYearSlider');

  const teamVal = document.getElementById('teamSizeVal');
  const cardsVal = document.getElementById('cardsPerYearVal');

  const savedDollars = document.getElementById('savedDollars');
  const treesSaved = document.getElementById('treesSaved');
  const leadBoost = document.getElementById('leadBoost');

  if (!teamSlider || !cardsSlider) return;

  function calculateRoi() {
    const team = parseInt(teamSlider.value, 10);
    const cardsPerUser = parseInt(cardsSlider.value, 10);

    teamVal.textContent = team;
    cardsVal.textContent = cardsPerUser;

    // Calculations in n Rupees (₹)
    const costPerPaperCardINR = 5.5; // ₹5.50 avg cost per paper card in 
    const totalPaperCards = team * cardsPerUser;
    const yearlyPaperCostINR = totalPaperCards * costPerPaperCardINR;
    const tapdidOneTimeCostINR = team * 999; // ₹999 TapDID Pro NFC card

    // Net savings in rupees over 2 years
    const yearlySavingsINR = Math.max(0, Math.round(yearlyPaperCostINR - (tapdidOneTimeCostINR / 2)));
    const trees = (totalPaperCards / 10000).toFixed(1);
    const boost = Math.round(team * 3.4);

    // Format with n Rupee currency (₹)
    savedDollars.textContent = `₹${yearlySavingsINR.toLocaleString('en-IN')}`;
    treesSaved.textContent = `${trees} Trees`;
    leadBoost.textContent = `+${boost}%`;
  }

  teamSlider.addEventListener('input', calculateRoi);
  cardsSlider.addEventListener('input', calculateRoi);
  calculateRoi();
}

/* ==========================================================================
   NFC Tap Simulation Modal
   ========================================================================== */
function initTapSimulator() {
  const tapBtn = document.getElementById('simulateTapBtn');
  const overlay = document.getElementById('tapOverlay');
  const closeBtn = document.getElementById('closeTapModal');

  if (!tapBtn || !overlay) return;

  tapBtn.addEventListener('click', () => {
    overlay.classList.add('active');

    // Trigger haptic vibration if supported on device
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      overlay.classList.remove('active');
    });
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('active');
    }
  });
}

/* ==========================================================================
   FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}
