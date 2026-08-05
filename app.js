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
  initScenarioScreen();
  initDemoForm();
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
  const currentTheme = document.documentElement.getAttribute('data-theme') || localStorage.getItem('tapdid_theme') || 'light';
  
  updateThemeIcon(currentTheme);

  if (!themeBtn) return;

  themeBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-theme') || 'light';
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

  const resetBtn = document.getElementById('resetFormBtn');
  const submitBtn = document.getElementById('submitCardOrderBtn');

  if (!card3d) return;

  const DEFAULT_NAME = 'Your Name';
  const DEFAULT_ROLE = 'Your Designation';
  const DEFAULT_COMPANY = 'Your Company / Brand';

  // Card Flip on Click
  card3d.addEventListener('click', () => {
    card3d.classList.toggle('flipped');
  });

  // Inputs real-time reflection
  if (nameInput && cardName) {
    nameInput.addEventListener('input', (e) => {
      cardName.textContent = e.target.value.trim() || DEFAULT_NAME;
    });
  }

  if (roleInput && cardRole) {
    roleInput.addEventListener('input', (e) => {
      cardRole.textContent = e.target.value.trim() || DEFAULT_ROLE;
    });
  }

  if (companyInput && cardCompany) {
    companyInput.addEventListener('input', (e) => {
      cardCompany.textContent = e.target.value.trim() || DEFAULT_COMPANY;
    });
  }

  function updateSubmitPrice() {
    if (!submitBtn) return;
    const activeBtn = document.querySelector('.material-btn.active');
    if (activeBtn) {
      const text = activeBtn.textContent;
      const isFree = text.includes('FREE') || text.includes('₹0');
      const match = text.match(/₹[\d,]+/);
      if (isFree) {
        submitBtn.textContent = `Claim Free Profile (₹0)`;
      } else {
        const price = match ? match[0] : '₹300';
        submitBtn.textContent = `Submit Order (${price})`;
      }
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

  // Reset Form & Preview Function
  function resetFormAndPreview() {
    if (nameInput) nameInput.value = '';
    if (roleInput) roleInput.value = '';
    if (companyInput) companyInput.value = '';
    const emailInput = document.getElementById('inputEmail');
    if (emailInput) emailInput.value = '';
    const phoneInput = document.getElementById('inputPhone');
    if (phoneInput) phoneInput.value = '';
    const addressInput = document.getElementById('inputAddress');
    if (addressInput) addressInput.value = '';

    if (cardName) cardName.textContent = DEFAULT_NAME;
    if (cardRole) cardRole.textContent = DEFAULT_ROLE;
    if (cardCompany) cardCompany.textContent = DEFAULT_COMPANY;

    // Reset material to Classic PVC (₹300)
    materialBtns.forEach(b => b.classList.remove('active'));
    const defaultMatBtn = document.querySelector('.material-btn[data-mat="classic-pvc"]');
    if (defaultMatBtn) {
      defaultMatBtn.classList.add('active');
    }
    card3d.setAttribute('data-material', 'classic-pvc');
    card3d.classList.remove('flipped');
    updateSubmitPrice();
  }

  // Clear Form Button Click
  if (resetBtn) {
    resetBtn.addEventListener('click', (e) => {
      e.preventDefault();
      resetFormAndPreview();
    });
  }

  // App Success Modal Handler
  const successModal = document.getElementById('orderSuccessModal');
  const closeModalBtn = document.getElementById('closeOrderModalBtn');
  const summaryBox = document.getElementById('orderSummaryBox');

  function showSuccessModal(name, role, company, finishText, email, phone) {
    if (!successModal) return;
    if (summaryBox) {
      summaryBox.innerHTML = `
        <div style="text-align: left; font-size: 0.88rem; line-height: 1.6; color: var(--text-main);">
          <p style="margin-bottom: 0.35rem;"><strong>Customer Name:</strong> ${name}</p>
          ${role ? `<p style="margin-bottom: 0.35rem;"><strong>Designation:</strong> ${role}</p>` : ''}
          ${company ? `<p style="margin-bottom: 0.35rem;"><strong>Company:</strong> ${company}</p>` : ''}
          <p style="margin-bottom: 0.35rem;"><strong>Card Finish:</strong> <span style="color: var(--accent-cyan); font-weight: 700;">${finishText}</span></p>
          ${email ? `<p style="margin-bottom: 0.35rem;"><strong>Email:</strong> ${email}</p>` : ''}
          ${phone ? `<p style="margin-bottom: 0.35rem;"><strong>Phone/WhatsApp:</strong> ${phone}</p>` : ''}
        </div>
      `;
    }
    successModal.classList.add('active');
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      if (successModal) successModal.classList.remove('active');
      resetFormAndPreview();
    });
  }

  if (successModal) {
    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        successModal.classList.remove('active');
        resetFormAndPreview();
      }
    });
  }

  // Submit Card Order Button Handler (Google Form Integration)
  if (submitBtn) {
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const name = nameInput ? nameInput.value.trim() : '';
      const role = roleInput ? roleInput.value.trim() : '';
      const company = companyInput ? companyInput.value.trim() : '';
      const emailInput = document.getElementById('inputEmail');
      const email = emailInput ? emailInput.value.trim() : '';
      const phoneInput = document.getElementById('inputPhone');
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const addressInput = document.getElementById('inputAddress');
      const address = addressInput ? addressInput.value.trim() : '';

      if (!name) {
        alert('Please enter your full name for your card/profile.');
        if (nameInput) nameInput.focus();
        return;
      }

      if (!phone && !email) {
        alert('Please enter at least a Phone/WhatsApp number or Email address.');
        if (phoneInput) phoneInput.focus();
        return;
      }

      const selectedMatBtn = document.querySelector('.material-btn.active');
      const finishText = selectedMatBtn ? selectedMatBtn.textContent.trim() : 'Classic PVC (₹300)';

      const formId = '1FAIpQLScyRO4jVOfS2HoQg1iRjGeIJQARl2Z5jXUPWas_MslEOhETAA';
      const formResponseUrl = `https://docs.google.com/forms/d/e/${formId}/formResponse`;

      // Post entries directly to Google Form Response
      const formData = new FormData();
      formData.append('entry.1274786449', name);
      formData.append('entry.546882646', role);
      formData.append('entry.2037005705', company);
      formData.append('entry.19666781', email);
      formData.append('entry.76794006', phone);
      formData.append('entry.239897770', address);
      formData.append('entry.309807849', finishText);

      const originalBtnText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting Order...';

      fetch(formResponseUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      }).then(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;

        showSuccessModal(name, role, company, finishText, email, phone);
      }).catch((err) => {
        console.error('Submit error:', err);
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;

        showSuccessModal(name, role, company, finishText, email, phone);
      });
    });
  }
}

/* ==========================================================================
   Dynamic QR & UPI Canvas Engine (Real Scannable QR Generator)
   ========================================================================== */
function initQrEngine() {
  const canvas = document.getElementById('qrCanvas');
  const qrInput = document.getElementById('qrDataInput');
  const qrDownloadBtn = document.getElementById('downloadQrBtn');

  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  function renderQr(text) {
    const raw = (text && text.trim()) ? text.trim() : 'https://www.tapdid.com';
    const targetUrl = (raw.startsWith('http://') || raw.startsWith('https://') || raw.startsWith('upi:')) ? raw : `https://${raw}`;
    const size = 260;
    canvas.width = size;
    canvas.height = size;

    // Draw clean background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, size, size);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      ctx.drawImage(img, 0, 0, size, size);
    };
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(targetUrl)}`;
  }

  function updateCardBackQr(text) {
    const cardBackImgs = document.querySelectorAll('.card-back-qr-img');
    const raw = (text && text.trim()) ? text.trim() : 'https://www.tapdid.com';
    const targetUrl = (raw.startsWith('http://') || raw.startsWith('https://') || raw.startsWith('upi:')) ? raw : `https://${raw}`;
    const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(targetUrl)}`;
    cardBackImgs.forEach(img => {
      img.src = qrSrc;
    });
  }

  const initialVal = qrInput ? (qrInput.value || 'https://www.tapdid.com') : 'https://www.tapdid.com';
  renderQr(initialVal);
  updateCardBackQr(initialVal);

  if (qrInput) {
    qrInput.addEventListener('input', (e) => {
      const val = e.target.value || 'https://www.tapdid.com';
      renderQr(val);
      updateCardBackQr(val);
    });
  }

  if (qrDownloadBtn) {
    qrDownloadBtn.addEventListener('click', () => {
      const link = document.createElement('a');
      link.download = 'TapDID-Official-QR.png';
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

/* ==========================================================================
   Scenario Interactive Filtering & Live Simulator
   ========================================================================== */
function initScenarioScreen() {
  const filterBtns = document.querySelectorAll('.scenario-filter-bar .filter-btn');
  const scenarioCards = document.querySelectorAll('.scenario-card-detailed');

  if (filterBtns.length > 0 && scenarioCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');

        scenarioCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Interactive Live Scenario Simulator
  const simNavBtns = document.querySelectorAll('.sim-nav-btn');
  const simDisplay = document.getElementById('simDisplayScreen');

  const simScenarios = {
    networking: {
      phoneHeader: '⚡ TapDID NFC Tap Received',
      contentHTML: `
        <div style="background: rgba(0, 82, 255, 0.15); border: 1px solid var(--accent-cyan); padding: 1.1rem; border-radius: 16px; text-align: center; width: 100%;">
          <div style="width: 52px; height: 52px; border-radius: 50%; background: var(--accent-gradient); color: #fff; font-weight: 800; display: flex; align-items: center; justify-content: center; margin: 0 auto 0.5rem; font-size: 1.25rem;">RS</div>
          <h4 style="color: #fff; margin-bottom: 0.2rem; font-size: 1.15rem;">Rohan Sharma</h4>
          <p style="color: var(--accent-cyan); font-size: 0.88rem; font-weight: 600;">Founder & CEO — Apex Pvt Ltd</p>
          <div style="margin-top: 0.85rem; display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap;">
            <button class="btn btn-primary" style="padding: 0.45rem 0.85rem; font-size: 0.8rem;">📥 Save Contact (.VCF)</button>
            <button class="btn btn-secondary" style="padding: 0.45rem 0.85rem; font-size: 0.8rem;">💬 WhatsApp Direct</button>
            <button class="btn btn-secondary" style="padding: 0.45rem 0.85rem; font-size: 0.8rem;">💳 Pay via UPI</button>
          </div>
          <p style="font-size: 0.78rem; color: var(--text-muted); margin-top: 0.75rem;">Verified AES-256 NFC Signature ✅ • Zero app download needed</p>
        </div>
      `
    },
    enterprise: {
      phoneHeader: '🏢 TapDID Access Kiosk',
      contentHTML: `
        <div style="background: rgba(16, 185, 129, 0.15); border: 1px solid #10b981; padding: 1.1rem; border-radius: 16px; text-align: center; width: 100%;">
          <div style="font-size: 2.2rem; margin-bottom: 0.3rem;">🔓</div>
          <h4 style="color: #10b981; margin-bottom: 0.2rem; font-size: 1.15rem;">Access Granted — Turnstile 04</h4>
          <p style="color: var(--text-main); font-size: 0.9rem; font-weight: 600;">Ananya Roy (Senior Tech Lead)</p>
          <p style="color: var(--text-muted); font-size: 0.82rem; margin-top: 0.4rem;">Role Clearance: Level 4 • Tech Tower B • Entry Time: 09:42:18 AM</p>
          <p style="font-size: 0.78rem; color: #10b981; margin-top: 0.65rem; font-weight: 600;">Automated HRMS Attendance Clocked ✅</p>
        </div>
      `
    },
    asset: {
      phoneHeader: '🔍 TapDID Cryptographic Asset Shield',
      contentHTML: `
        <div style="background: rgba(245, 158, 11, 0.15); border: 1px solid #f59e0b; padding: 1.1rem; border-radius: 16px; text-align: center; width: 100%;">
          <div style="font-size: 2.2rem; margin-bottom: 0.3rem;">🛡️</div>
          <h4 style="color: #f59e0b; margin-bottom: 0.2rem; font-size: 1.15rem;">100% Genuine Certified Asset</h4>
          <p style="color: var(--text-main); font-size: 0.9rem; font-weight: 600;">Chronograph Platinum Limited Edition #482/500</p>
          <div style="text-align: left; font-size: 0.82rem; color: var(--text-muted); margin-top: 0.6rem; line-height: 1.4;">
            • Tag ID: <code>NFC-9948-2849-SEC</code><br>
            • Origin: Geneva, Switzerland<br>
            • Cryptographic Hash: <code>0x8F9...3A12</code>
          </div>
          <p style="font-size: 0.78rem; color: #f59e0b; margin-top: 0.65rem; font-weight: 600;">Blockchain Provenance Verified ✅</p>
        </div>
      `
    },
    healthcare: {
      phoneHeader: '🚨 TapDID First-Responder Alert',
      contentHTML: `
        <div style="background: rgba(239, 68, 68, 0.15); border: 1px solid #ef4444; padding: 1.1rem; border-radius: 16px; text-align: center; width: 100%;">
          <div style="font-size: 2.2rem; margin-bottom: 0.3rem;">🚨</div>
          <h4 style="color: #ef4444; margin-bottom: 0.2rem; font-size: 1.15rem;">Emergency Health Profile</h4>
          <p style="color: var(--text-main); font-size: 0.9rem; font-weight: 700;">Vikram Malhotra (Blood Group: O+ Positive)</p>
          <div style="text-align: left; font-size: 0.82rem; color: var(--text-muted); margin-top: 0.5rem; line-height: 1.4;">
            • Known Allergies: Penicillin<br>
            • Emergency Contact: +91 98200 11223 (Spouse)<br>
            • Hospital: Apollo Health City
          </div>
          <p style="font-size: 0.78rem; color: #ef4444; margin-top: 0.65rem; font-weight: 600;">Instant Emergency Alert Sent to Kin ✅</p>
        </div>
      `
    }
  };

  if (simNavBtns.length > 0 && simDisplay) {
    simNavBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        simNavBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const key = btn.getAttribute('data-sim');
        const data = simScenarios[key] || simScenarios.networking;
        simDisplay.innerHTML = `
          <div style="font-size: 0.78rem; color: var(--accent-cyan); text-transform: uppercase; font-weight: 700; margin-bottom: 0.6rem;">${data.phoneHeader}</div>
          ${data.contentHTML}
        `;
      });
    });
  }
}

/* ==========================================================================
   Google Form Enterprise Demo Request Handler
   ========================================================================== */
function initDemoForm() {
  const form = document.getElementById('demoForm');
  if (!form) return;

  const fullNameInput = document.getElementById('demoFullName');
  const emailInput = document.getElementById('demoEmail');
  const phoneInput = document.getElementById('demoPhone');
  const errorMsg = document.getElementById('demoFormError');
  const submitBtn = document.getElementById('demoSubmitBtn');
  const successCard = document.getElementById('demoFormSuccess');
  const successText = document.getElementById('demoSuccessText');
  const resetBtn = document.getElementById('demoResetBtn');

  const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLSfxD8IlgramN5Y7iUjk82zscV3kXm6g8fKUQ1mMGCqBJa39wA/formResponse';
  const ENTRY_FULL_NAME = 'entry.657327585';
  const ENTRY_EMAIL = 'entry.139795662';
  const ENTRY_PHONE = 'entry.1525082777';

  function showError(msg) {
    if (errorMsg) {
      errorMsg.textContent = msg;
      errorMsg.style.display = 'block';
    }
  }

  function hideError() {
    if (errorMsg) {
      errorMsg.style.display = 'none';
      errorMsg.textContent = '';
    }
  }

  // Clear error on input typing
  [fullNameInput, emailInput, phoneInput].forEach(input => {
    if (input) {
      input.addEventListener('input', hideError);
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideError();

    const fullName = fullNameInput ? fullNameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';

    // Validation: Full Name is optional, but either Email OR Phone is mandatory
    if (!email && !phone) {
      showError('Please provide either your Work Email or Phone Number to request a demo.');
      return;
    }

    // Basic email format check if email is provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError('Please enter a valid email address.');
      return;
    }

    // Basic phone format check if phone is provided
    if (phone && !/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]{6,15}$/.test(phone)) {
      showError('Please enter a valid phone number (e.g. +91 90000 35869).');
      return;
    }

    // Prepare Google Form submission payload
    const formData = new FormData();
    formData.append(ENTRY_FULL_NAME, fullName);
    formData.append(ENTRY_EMAIL, email);
    formData.append(ENTRY_PHONE, phone);

    // Disable button & show spinner state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Submitting Demo Request...</span>';
    }

    try {
      // POST to Google Form Response endpoint using no-cors mode
      await fetch(GOOGLE_FORM_ACTION, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      });
    } catch (err) {
      console.warn('Google Form fetch submit notice:', err);
    } finally {
      // Show success state
      if (form) form.style.display = 'none';
      if (successCard) {
        successCard.style.display = 'block';
        if (successText) {
          const displayName = fullName ? `, ${fullName}` : '';
          successText.textContent = `Thank you${displayName}! Your enterprise demo request has been received. Our team will contact you shortly.`;
        }
      }
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Request Demo</span>';
      }
    }
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      hideError();
      if (successCard) successCard.style.display = 'none';
      if (form) form.style.display = 'flex';
    });
  }
}

