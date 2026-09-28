// HousePoint Master UI Controller & Interaction Handlers

import { CITIES, PROPERTIES, INDIAN_BANKS, BANK_DOCUMENT_CHECKLISTS, MISSING_DOC_GUIDE } from './data.js';
import { appState } from './state.js';
import { formatINR, formatCompactINR, calculateEMI, calculateMaxLoanEligibility, calculatePrepaymentSavings, calculatePropertyEquity } from './calculators.js';
import { LANGUAGES, TRANSLATIONS, GLOSSARY_TERMS } from './i18n.js';

// DOM Ready initialization
document.addEventListener('DOMContentLoaded', () => {
  initChassisControls();
  initNavigation();
  initHomeScreen();
  initPropertiesScreen();
  initTrackerScreen();
  initDocumentsScreen();
  initNotificationsScreen();
  initProfileScreen();
  initLanguageSwitcher();
  initModals();

  // Subscribe to state changes for reactive rendering
  appState.subscribe((event, payload) => {
    handleStateUpdates(event, payload);
  });

  // Initial render with default language and data
  renderAllViews();
});

/* -------------------------------------------------------------
 * 1. Chassis & Device Frame Controls
 * ------------------------------------------------------------- */
function initChassisControls() {
  const btnChassisToggle = document.getElementById('btnChassisToggle');
  if (btnChassisToggle) {
    btnChassisToggle.addEventListener('click', () => {
      appState.toggleChassisMode();
    });
  }

  // Update clock in status bar
  function updateClock() {
    const clockEl = document.getElementById('statusBarTime');
    if (clockEl) {
      const now = new Date();
      clockEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    }
  }
  updateClock();
  setInterval(updateClock, 30000);
}

/* -------------------------------------------------------------
 * 2. Bottom Navigation Router
 * ------------------------------------------------------------- */
function initNavigation() {
  const navButtons = document.querySelectorAll('.nav-item');
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      if (targetTab) {
        appState.setTab(targetTab);
      }
    });
  });
}

function switchTabView(tabName) {
  // Update nav buttons active state
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabName);
  });

  // Show corresponding tab view
  document.querySelectorAll('.tab-content-view').forEach(view => {
    view.classList.remove('active');
  });

  const activeView = document.getElementById(`view-${tabName}`);
  if (activeView) {
    activeView.classList.add('active');
    // Scroll viewport to top
    const viewport = document.querySelector('.app-viewport');
    if (viewport) viewport.scrollTop = 0;
  }
}

/* -------------------------------------------------------------
 * 3. Home Screen
 * ------------------------------------------------------------- */
function initHomeScreen() {
  // Search input
  const searchInput = document.getElementById('homeSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      appState.setSearchQuery(e.target.value.toLowerCase());
      renderPropertyCards();
    });
  }

  // BHK Filter Chips
  const bhkChips = document.querySelectorAll('#homeBhkFilters .filter-chip');
  bhkChips.forEach(chip => {
    chip.addEventListener('click', () => {
      bhkChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const bhkVal = chip.getAttribute('data-bhk');
      appState.setBhkFilter(bhkVal === 'all' ? 'all' : parseInt(bhkVal));
      renderPropertyCards();
    });
  });

  // Hero Loan Banner CTA
  const btnTrackInspection = document.getElementById('btnHeroTrackLoan');
  if (btnTrackInspection) {
    btnTrackInspection.addEventListener('click', () => {
      appState.setTab('tracker');
    });
  }

  // City Selector Dropdown in Header
  const citySelect = document.getElementById('headerCitySelect');
  if (citySelect) {
    citySelect.addEventListener('change', (e) => {
      appState.setSelectedCity(e.target.value);
      renderPropertyCards();
    });
  }
}

/* -------------------------------------------------------------
 * 4. Properties Screen & Details Bottom Sheet
 * ------------------------------------------------------------- */
function initPropertiesScreen() {
  renderPropertyCards();
}

function renderPropertyCards() {
  const container = document.getElementById('propertiesGrid');
  const homeContainer = document.getElementById('homePropertiesList');
  if (!container && !homeContainer) return;

  const currentCity = appState.selectedCity;
  const currentBhk = appState.bhkFilter;
  const query = appState.searchQuery;

  const filtered = PROPERTIES.filter(p => {
    const matchCity = currentCity === 'all' || p.city === currentCity;
    const matchBhk = currentBhk === 'all' || p.bhk === currentBhk;
    const matchQuery = !query || p.title.toLowerCase().includes(query) || p.location.toLowerCase().includes(query);
    return matchCity && matchBhk && matchQuery;
  });

  const cardsHtml = filtered.map(prop => {
    const estEmi = calculateEMI(prop.price * 0.8, 8.40, 240);
    return `
      <div class="property-card" data-prop-id="${prop.id}">
        <div class="card-media">
          <img src="${prop.images[0]}" alt="${prop.title}" loading="lazy" />
          <div class="card-video-pill">
            <svg width="12" height="12" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            ${prop.videoBadge}
          </div>
          <div class="card-rera-pill">RERA Verified</div>
          <div class="card-price-overlay">
            <div>
              <div class="price-main">${prop.priceFormatted}</div>
              <div class="price-emi">EMI approx. ${formatINR(estEmi)}/mo</div>
            </div>
            <span class="pill-badge pill-success">${prop.facing}</span>
          </div>
        </div>
        <div class="card-content">
          <h3 class="card-title">${prop.title}</h3>
          <p class="card-location">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            ${prop.location}
          </p>
          <div class="card-specs-row">
            <div class="spec-item">
              <strong>${prop.bhk} BHK</strong>
            </div>
            <div class="spec-item">
              <span>Carpet:</span> <strong>${prop.carpetArea}</strong>
            </div>
            <div class="spec-item">
              <span>Floor:</span> <strong>${prop.floor.split(' ')[0]}</strong>
            </div>
          </div>
          <div class="card-banks-row">
            <div class="bank-tags">
              <span style="font-size:10px; color:#64748b; margin-right:4px;">Pre-approved:</span>
              ${prop.approvedBanks.slice(0, 3).map(b => `<span class="bank-chip">${b}</span>`).join('')}
            </div>
            <span class="card-action-text">
              Inspect & Loan →
            </span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (container) container.innerHTML = cardsHtml;
  if (homeContainer) homeContainer.innerHTML = cardsHtml;

  // Bind click on cards
  document.querySelectorAll('.property-card').forEach(card => {
    card.addEventListener('click', () => {
      const propId = card.getAttribute('data-prop-id');
      if (propId) {
        appState.setSelectedProperty(propId);
        openPropertyDetailsSheet(propId);
      }
    });
  });
}

function openPropertyDetailsSheet(propId) {
  const prop = PROPERTIES.find(p => p.id === propId) || PROPERTIES[0];
  const sheet = document.getElementById('propertyDetailSheet');
  if (!sheet) return;

  // Populate sheet content
  document.getElementById('sheetPropTitle').textContent = prop.title;
  document.getElementById('sheetPropLocation').textContent = prop.address;
  document.getElementById('sheetPropPrice').textContent = prop.priceFormatted;
  document.getElementById('sheetPropCarpet').textContent = prop.carpetArea;
  document.getElementById('sheetPropSuper').textContent = prop.superArea;
  document.getElementById('sheetPropFacing').textContent = prop.facing;
  document.getElementById('sheetPropFloor').textContent = prop.floor;
  document.getElementById('sheetPropRera').textContent = prop.reraId;
  document.getElementById('sheetPropBuilder').textContent = prop.builder;

  // Gallery image
  const imgEl = document.getElementById('sheetPropMainImg');
  if (imgEl) imgEl.src = prop.images[0];

  // Video Tour trigger button
  const videoBtn = document.getElementById('btnPlayVideoTour');
  if (videoBtn) {
    videoBtn.onclick = () => openVideoModal(prop);
  }

  // Cost Breakdown
  const cb = prop.costBreakdown;
  document.getElementById('costBasePrice').textContent = formatINR(cb.basePrice);
  document.getElementById('costStampDuty').textContent = formatINR(cb.stampDuty);
  document.getElementById('costRegistration').textContent = formatINR(cb.registration);
  document.getElementById('costGst').textContent = formatINR(cb.gst);
  document.getElementById('costMaintenance').textContent = formatINR(cb.maintenanceAdvance);
  document.getElementById('costTotal').textContent = formatINR(cb.totalOnRoad);

  // Legal Verification Box
  document.getElementById('lawyerFirmText').textContent = prop.verificationStatus.lawyerFirm;
  document.getElementById('valuerReportText').textContent = prop.verificationStatus.valuerReport;
  document.getElementById('vettingStatusText').textContent = prop.verificationStatus.statusText;

  // Documents Accordion
  const docContainer = document.getElementById('propDocumentsList');
  if (docContainer) {
    docContainer.innerHTML = prop.documents.map((doc, idx) => `
      <div class="doc-accordion-item ${idx === 0 ? 'open' : ''}" id="doc-acc-${doc.id}">
        <button class="doc-header-btn" onclick="toggleDocAccordion('${doc.id}')">
          <div class="doc-name-col">
            <span class="doc-badge-pill">${doc.code}</span>
            <span class="doc-title-text">${doc.name}</span>
          </div>
          <span style="font-size:12px; color:#059669; font-weight:700;">✓ Verified</span>
        </button>
        <div class="doc-explanation-body">
          <p style="color:#334155; margin-bottom:6px;"><strong>What this is:</strong> ${doc.explanation}</p>
          <div class="doc-why-box">
            <strong>Why Banks Need This:</strong> ${doc.whyNeeded}
          </div>
        </div>
      </div>
    `).join('');
  }

  // CTA button: "Check Bank Loans for this Flat"
  const btnLoanCheck = document.getElementById('btnSheetLoanCheck');
  if (btnLoanCheck) {
    btnLoanCheck.onclick = () => {
      closeModal('propertyDetailModal');
      appState.setTab('documents');
    };
  }

  openModal('propertyDetailModal');
}

window.toggleDocAccordion = function(docId) {
  const item = document.getElementById(`doc-acc-${docId}`);
  if (item) {
    item.classList.toggle('open');
  }
};

function openVideoModal(prop) {
  const modal = document.getElementById('videoTourModal');
  const videoPlayer = document.getElementById('propertyVideoPlayer');
  if (modal && videoPlayer) {
    videoPlayer.src = prop.videoUrl;
    openModal('videoTourModal');
    videoPlayer.play().catch(() => {});
  }
}

/* -------------------------------------------------------------
 * 5. 10-Stage Loan Tracker Screen (Feature 6, 7, 8)
 * ------------------------------------------------------------- */
function initTrackerScreen() {
  renderTracker();

  // Property Visit Verification Button listeners (Stage 6)
  const btnVisitYes = document.getElementById('btnVisitYes');
  const btnVisitResched = document.getElementById('btnVisitReschedule');
  const btnVisitNo = document.getElementById('btnVisitNo');

  if (btnVisitYes) {
    btnVisitYes.addEventListener('click', () => {
      appState.handleVisitOutcome('yes');
      showToast('Inspection marked completed! Advanced to Stage 7 (Loan Decision Committee).');
      renderTracker();
    });
  }

  if (btnVisitResched) {
    btnVisitResched.addEventListener('click', () => {
      openModal('rescheduleVisitModal');
    });
  }

  if (btnVisitNo) {
    btnVisitNo.addEventListener('click', () => {
      appState.handleVisitOutcome('no');
      openModal('escalationDrawerModal');
    });
  }

  // Stage 7: Credit Decision Committee Approval
  const btnApproveStage7 = document.getElementById('btnApproveStage7');
  if (btnApproveStage7) {
    btnApproveStage7.addEventListener('click', () => {
      appState.approveCreditCommittee();
      showToast('Credit Sanction Approved! Proceeding to Stage 8 (Sanction Letter e-Sign).');
      renderTracker();
    });
  }

  // Stage 8: Formal Sanction Letter e-Sign Trigger
  const btnEsignStage8 = document.getElementById('btnEsignStage8');
  if (btnEsignStage8) {
    btnEsignStage8.addEventListener('click', () => {
      openModal('aadhaarOtpModal');
    });
  }

  // Confirm Aadhaar OTP for e-Sign
  const btnConfirmAadhaarOtp = document.getElementById('btnConfirmAadhaarOtp');
  if (btnConfirmAadhaarOtp) {
    btnConfirmAadhaarOtp.addEventListener('click', () => {
      const otpVal = document.getElementById('aadhaarOtpInput')?.value || '889100';
      closeModal('aadhaarOtpModal');
      appState.eSignSanctionLetter(otpVal);
      showToast('Sanction Letter Aadhaar e-Signed! Proceeding to Stage 9 (MODT Execution).');
      renderTracker();
    });
  }

  // Stage 9: MODT Equitable Mortgage Execution
  const btnExecuteModtStage9 = document.getElementById('btnExecuteModtStage9');
  if (btnExecuteModtStage9) {
    btnExecuteModtStage9.addEventListener('click', () => {
      appState.executeModtAgreement();
      showToast('MODT Equitable Mortgage Registered! Ready for Final Stage 10 Disbursement.');
      renderTracker();
    });
  }

  // Stage 10: Final RTGS Loan Disbursement Release
  const btnDisburseStage10 = document.getElementById('btnDisburseStage10');
  if (btnDisburseStage10) {
    btnDisburseStage10.addEventListener('click', () => {
      appState.disburseLoan();
      openModal('disbursementCelebrationModal');
      renderTracker();
      updateHomeScreenBanner();
    });
  }

  // Stepper Header: Complete All (Instant Demo Fast-Track)
  const btnFastTrackAll = document.getElementById('btnFastTrackAll');
  if (btnFastTrackAll) {
    btnFastTrackAll.addEventListener('click', () => {
      appState.completeAllStages();
      openModal('disbursementCelebrationModal');
      renderTracker();
      updateHomeScreenBanner();
    });
  }

  // Celebration Modal CTA: Open Homeowner Dashboard
  const btnCelebrationGoToHomeowner = document.getElementById('btnCelebrationGoToHomeowner');
  if (btnCelebrationGoToHomeowner) {
    btnCelebrationGoToHomeowner.addEventListener('click', () => {
      closeModal('disbursementCelebrationModal');
      appState.setTab('profile');
    });
  }

  const btnOpenHomeownerDashboard = document.getElementById('btnOpenHomeownerDashboard');
  if (btnOpenHomeownerDashboard) {
    btnOpenHomeownerDashboard.addEventListener('click', () => {
      appState.setTab('profile');
    });
  }

  const btnViewVaultDocs = document.getElementById('btnViewVaultDocs');
  if (btnViewVaultDocs) {
    btnViewVaultDocs.addEventListener('click', () => {
      appState.setTab('documents');
    });
  }

  // Escalation Form Submission
  const btnSubmitEscalation = document.getElementById('btnSubmitEscalation');
  if (btnSubmitEscalation) {
    btnSubmitEscalation.addEventListener('click', () => {
      const reasonSelect = document.getElementById('escalateReasonSelect');
      const notesInput = document.getElementById('escalateNotes');
      const ticket = appState.createEscalationTicket({
        reason: reasonSelect ? reasonSelect.value : 'Inspection delayed beyond scheduled slot',
        additionalNotes: notesInput ? notesInput.value : ''
      });
      closeModal('escalationDrawerModal');
      showToast(`Escalation Ticket #${ticket.id} created and dispatched to AGM Credit.`);
      renderTracker();
    });
  }

  // Confirm Reschedule
  const btnConfirmResched = document.getElementById('btnConfirmReschedule');
  if (btnConfirmResched) {
    btnConfirmResched.addEventListener('click', () => {
      const slotInput = document.getElementById('rescheduleSlotInput');
      const slotVal = slotInput ? slotInput.value : 'Tomorrow at 11:30 AM';
      appState.handleVisitOutcome('rescheduled', { slot: slotVal });
      closeModal('rescheduleVisitModal');
      showToast(`Visit successfully rescheduled for ${slotVal}. Notification sent to valuer.`);
      renderTracker();
    });
  }
}

function renderTracker() {
  const stage = appState.getCurrentStage();
  const stages = appState.stages;
  const currentIndex = appState.currentStageIndex;
  const isFullyCompleted = stages[9].status === 'completed';

  // 1. Horizontal Stepper Bar
  const stepperContainer = document.getElementById('trackerStepperRow');
  if (stepperContainer) {
    stepperContainer.innerHTML = stages.map((s, idx) => {
      let stateClass = 'pending';
      let icon = idx + 1;
      if (s.status === 'completed') {
        stateClass = 'completed';
        icon = '✓';
      } else if (idx === currentIndex) {
        stateClass = 'active';
        icon = idx + 1;
      }

      return `
        <button class="step-node-btn ${stateClass}" onclick="selectStage(${idx})">
          <div class="node-circle">${icon}</div>
          <span class="node-label">${s.title}</span>
        </button>
      `;
    }).join('');
  }

  // Stepper Header Progress text
  const stepperProgressLabel = document.getElementById('stepperProgressLabel');
  if (stepperProgressLabel) {
    stepperProgressLabel.textContent = isFullyCompleted 
      ? '10 of 10 Completed (100%)' 
      : `Stage ${stage.stageNumber} of 10`;
  }

  // Delay / Status Alert Banner
  const delayAlertBanner = document.getElementById('delayAlertBanner');
  if (delayAlertBanner) {
    if (isFullyCompleted) {
      delayAlertBanner.innerHTML = `
        <div class="delay-alert-header" style="color:#059669;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>Home Loan 100% Financed & Disbursed!</span>
        </div>
        <p class="delay-alert-text" style="color:#047857;">
          Prestige Serenity Greens Flat 702 is successfully funded via SBI RACPC. View your amortization schedule and home equity below.
        </p>
      `;
      delayAlertBanner.style.borderColor = '#34d399';
      delayAlertBanner.style.background = '#ecfdf5';
    } else {
      delayAlertBanner.innerHTML = `
        <div class="delay-alert-header">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          <span>SBI SLA Monitoring: ${stage.title}</span>
        </div>
        <p class="delay-alert-text">
          Currently processing: <strong>${stage.title}</strong>. Turnaround SLA: ${stage.durationText}.
        </p>
      `;
      delayAlertBanner.style.borderColor = '#fbbf24';
      delayAlertBanner.style.background = '#fffbeb';
    }
  }

  // 2. Stage Detail Card Pillars
  document.getElementById('trackerStagePill').textContent = `Stage ${stage.stageNumber} of 10`;
  document.getElementById('trackerStageTitle').textContent = stage.title;
  
  const statusPill = document.getElementById('trackerStatusPill');
  if (statusPill) {
    statusPill.textContent = stage.status.toUpperCase();
    statusPill.className = `stage-status-pill ${stage.status}`;
  }

  // Pillar 1: What is happening?
  document.getElementById('pillarHappeningText').textContent = stage.whatIsHappening;

  // Pillar 2: Who is responsible?
  const resp = stage.responsiblePerson;
  document.getElementById('officerName').textContent = resp.name;
  document.getElementById('officerRole').textContent = resp.role;
  document.getElementById('officerCompany').textContent = resp.company;
  
  // Direct call/email handlers
  document.getElementById('btnCallOfficer').onclick = () => {
    alert(`Calling ${resp.name} (${resp.phone}) via SBI RACPC Desk...`);
  };
  document.getElementById('btnEmailOfficer').onclick = () => {
    alert(`Composing priority email to ${resp.email}...`);
  };

  // Pillar 3: How long pending?
  document.getElementById('pillarSlaText').textContent = stage.durationText;

  // Pillar 4: What should I do next?
  document.getElementById('pillarNextActionText').textContent = stage.userNextAction;

  // 3. Stage Action Cards Visibility
  const visitCard = document.getElementById('propertyVisitSection');
  const stage7Card = document.getElementById('stage7ActionSection');
  const stage8Card = document.getElementById('stage8ActionSection');
  const stage9Card = document.getElementById('stage9ActionSection');
  const stage10Card = document.getElementById('stage10ActionSection');
  const completedCard = document.getElementById('stageCompletedSection');

  // Property Visit Card (Stage 6)
  if (visitCard) {
    visitCard.style.display = (stage.id === 'stage_property_visit' && stage.status === 'active') ? 'block' : 'none';
    const visitStatusText = document.getElementById('visitCurrentStatusBadge');
    if (visitStatusText) {
      if (appState.visitStatus === 'visited') {
        visitStatusText.textContent = 'Status: Visited & Cleared';
        visitStatusText.style.background = '#059669';
      } else if (appState.visitStatus === 'rescheduled') {
        visitStatusText.textContent = `Rescheduled to: ${appState.rescheduledSlot}`;
        visitStatusText.style.background = '#d97706';
      } else if (appState.visitStatus === 'escalated') {
        visitStatusText.textContent = 'Escalation Ticket Open with AGM Desk';
        visitStatusText.style.background = '#dc2626';
      } else {
        visitStatusText.textContent = 'Scheduled Today: 03:30 PM - 04:30 PM';
      }
    }
  }

  // Stage 7: Credit Decision Card
  if (stage7Card) {
    stage7Card.style.display = (stage.id === 'stage_loan_decision' && stage.status === 'active') ? 'block' : 'none';
  }

  // Stage 8: Formal Sanction Letter e-Sign Card
  if (stage8Card) {
    stage8Card.style.display = (stage.id === 'stage_sanction' && stage.status === 'active') ? 'block' : 'none';
  }

  // Stage 9: MODT Registration Card
  if (stage9Card) {
    stage9Card.style.display = (stage.id === 'stage_agreement' && stage.status === 'active') ? 'block' : 'none';
  }

  // Stage 10: Final RTGS Disbursement Card
  if (stage10Card) {
    stage10Card.style.display = (stage.id === 'stage_disbursement' && stage.status === 'active') ? 'block' : 'none';
  }

  // Stage 100% Completed Banner
  if (completedCard) {
    completedCard.style.display = isFullyCompleted ? 'block' : 'none';
  }

  // 4. Escalation Tickets List
  const escalationContainer = document.getElementById('escalationTicketsContainer');
  if (escalationContainer) {
    if (appState.escalationTickets.length > 0) {
      escalationContainer.style.display = 'block';
      escalationContainer.innerHTML = `
        <div style="font-size:12px; font-weight:800; color:#0f172a; margin-bottom:8px;">ACTIVE ESCALATION TICKETS</div>
        ${appState.escalationTickets.map(t => `
          <div class="escalation-ticket-card">
            <div class="ticket-header">
              <span class="ticket-id-tag">#${t.id}</span>
              <span class="ticket-sla-tag">SLA: ${t.slaHours}h (${t.status})</span>
            </div>
            <div style="font-size:12px; font-weight:700; color:#065f46; margin-bottom:4px;">${t.reason}</div>
            <div style="font-size:11px; color:#047857;">Assigned to: ${t.assignedTo}</div>
          </div>
        `).join('')}
      `;
    } else {
      escalationContainer.style.display = 'none';
    }
  }
}

function updateHomeScreenBanner() {
  const isFullyCompleted = appState.stages[9].status === 'completed' || appState.activeLoanApprovedMode;
  const heroLoanTitle = document.getElementById('heroLoanTitle');
  const btnHeroTrackLoan = document.getElementById('btnHeroTrackLoan');
  const heroLoanBanner = document.querySelector('.hero-loan-banner');

  if (!heroLoanBanner) return;

  if (isFullyCompleted) {
    heroLoanBanner.style.background = 'linear-gradient(135deg, #064e3b 0%, #065f46 100%)';
    if (heroLoanTitle) heroLoanTitle.textContent = '🏡 Home Loan Active: Welcome Home!';
    const subtext = heroLoanBanner.querySelector('.banner-subtext');
    if (subtext) subtext.textContent = 'Flat 702, Prestige Serenity Greens • SBI Account #00918273645';
    const fill = heroLoanBanner.querySelector('.banner-progress-fill');
    if (fill) fill.style.width = '100%';
    const sla = heroLoanBanner.querySelector('.banner-sla');
    if (sla) sla.textContent = '🎉 Loan 100% Disbursed (Next EMI: 05 Oct)';
    if (btnHeroTrackLoan) {
      btnHeroTrackLoan.textContent = 'View Equity & Loan →';
      btnHeroTrackLoan.onclick = () => appState.setTab('profile');
    }
  } else {
    const stage = appState.getCurrentStage();
    if (heroLoanTitle) heroLoanTitle.textContent = `Stage ${stage.stageNumber}: ${stage.title}`;
    const fill = heroLoanBanner.querySelector('.banner-progress-fill');
    if (fill) fill.style.width = `${(stage.stageNumber / 10) * 100}%`;
    if (btnHeroTrackLoan) {
      btnHeroTrackLoan.textContent = `Track Stage ${stage.stageNumber} →`;
      btnHeroTrackLoan.onclick = () => appState.setTab('tracker');
    }
  }
}

window.selectStage = function(index) {
  appState.setStageIndex(index);
  renderTracker();
};

/* -------------------------------------------------------------
 * 6. Documents Screen & Vault (Feature 4, 5)
 * ------------------------------------------------------------- */
function initDocumentsScreen() {
  // Vault Folder tabs
  const folderButtons = document.querySelectorAll('.vault-folder-card');
  folderButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      folderButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const folder = btn.getAttribute('data-folder');
      appState.setVaultFolder(folder);
      renderVaultFiles();
    });
  });

  // Simulated Upload
  const uploadArea = document.getElementById('vaultUploadArea');
  const fileInput = document.getElementById('vaultFileInput');
  if (uploadArea && fileInput) {
    uploadArea.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        appState.addVaultDocument({
          name: file.name,
          size: (file.size / (1024 * 1024)).toFixed(1) + ' MB'
        });
        showToast(`Uploaded "${file.name}" to ${appState.vaultFolder.toUpperCase()} folder.`);
        renderVaultFiles();
      }
    });
  }

  // Bank Selector in Document Checklists
  const bankChecklistSelect = document.getElementById('bankChecklistSelect');
  if (bankChecklistSelect) {
    bankChecklistSelect.addEventListener('change', (e) => {
      appState.setSelectedBank(e.target.value);
      renderBankChecklists();
    });
  }

  // Loan Eligibility Calculator Inputs
  const incomeSlider = document.getElementById('calcIncomeSlider');
  const emiSlider = document.getElementById('calcEmiSlider');
  const incomeVal = document.getElementById('calcIncomeVal');
  const emiVal = document.getElementById('calcEmiVal');

  if (incomeSlider) {
    incomeSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      if (incomeVal) incomeVal.textContent = formatINR(val);
      appState.updateUserProfile({ monthlyIncome: val });
      renderBankComparisonCards();
    });
  }

  if (emiSlider) {
    emiSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      if (emiVal) emiVal.textContent = formatINR(val);
      appState.updateUserProfile({ existingEmis: val });
      renderBankComparisonCards();
    });
  }

  renderVaultFiles();
  renderBankChecklists();
  renderBankComparisonCards();
}

function renderVaultFiles() {
  const container = document.getElementById('vaultFilesList');
  if (!container) return;

  const currentFolder = appState.vaultFolder;
  const filtered = appState.vaultDocuments.filter(d => d.folder === currentFolder);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:20px; color:#94a3b8; font-size:12px;">
        No documents uploaded in ${currentFolder.toUpperCase()} folder yet.
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(doc => `
    <div class="vault-file-item">
      <div class="vault-file-meta">
        <div class="file-type-icon">PDF</div>
        <div>
          <div class="file-name">${doc.name}</div>
          <div class="file-sub">${doc.size} • ${doc.date}</div>
        </div>
      </div>
      <div style="display:flex; align-items:center; gap:8px;">
        <span class="pill-badge pill-success">✓ Verified</span>
        <button onclick="deleteVaultFile('${doc.id}')" style="background:none; border:none; color:#dc2626; cursor:pointer; font-size:11px;">✕</button>
      </div>
    </div>
  `).join('');
}

window.deleteVaultFile = function(id) {
  appState.deleteVaultDocument(id);
  renderVaultFiles();
};

function renderBankChecklists() {
  const container = document.getElementById('bankChecklistsContainer');
  if (!container) return;

  const bankId = appState.selectedBankId;
  const checklist = BANK_DOCUMENT_CHECKLISTS[bankId] || BANK_DOCUMENT_CHECKLISTS.sbi;

  const categories = [
    { key: 'buyerDocs', title: '1. Buyer Identity Documents' },
    { key: 'incomeDocs', title: '2. Income Proof Documents' },
    { key: 'propertyDocs', title: '3. Property Title Documents' },
    { key: 'sellerDocs', title: '4. Seller / Builder Documents' },
    { key: 'additionalDocs', title: '5. Additional Banking Documents' }
  ];

  container.innerHTML = categories.map(cat => {
    const docs = checklist[cat.key] || [];
    return `
      <div style="margin-bottom:14px;">
        <div style="font-size:12px; font-weight:800; color:#0f172a; margin-bottom:6px;">${cat.title}</div>
        ${docs.map(d => {
          const isMissing = d.status === 'missing';
          return `
            <div style="background:#ffffff; border:1px solid ${isMissing ? '#fde68a' : '#e2e8f0'}; border-radius:8px; padding:10px; margin-bottom:6px; display:flex; align-items:center; justify-content:space-between;">
              <div>
                <div style="font-size:12px; font-weight:700; color:#0f172a;">${d.name}</div>
                <div style="font-size:10px; color:#64748b;">Issued by: ${d.authority}</div>
              </div>
              <div>
                ${isMissing ? `
                  <button class="btn btn-sm btn-accent" style="font-size:10.5px; padding:4px 8px;" onclick="openMissingGuide('${d.id}')">
                    Missing: How to Obtain →
                  </button>
                ` : `
                  <span class="pill-badge pill-success" style="font-size:10px;">✓ Verified</span>
                `}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }).join('');
}

window.openMissingGuide = function(docCode) {
  const guide = MISSING_DOC_GUIDE[docCode] || MISSING_DOC_GUIDE.form_16;
  document.getElementById('missingDocTitle').textContent = guide.title;
  document.getElementById('missingDocBadge').textContent = guide.badge;
  document.getElementById('missingDocWhat').textContent = guide.whatIsIt;
  document.getElementById('missingDocWhy').textContent = guide.whyBankNeedsIt;
  document.getElementById('missingDocWho').textContent = guide.whoProvidesIt;
  document.getElementById('missingDocWhere').textContent = guide.whereToGetIt;

  const stepsContainer = document.getElementById('missingDocSteps');
  if (stepsContainer) {
    stepsContainer.innerHTML = guide.howToObtainSteps.map((step, idx) => `
      <div class="guide-step-box">
        <div class="step-num">STEP ${idx + 1}</div>
        <div class="step-text">${step}</div>
      </div>
    `).join('');
  }

  openModal('missingDocDrawerModal');
};

function renderBankComparisonCards() {
  const container = document.getElementById('bankComparisonList');
  if (!container) return;

  const income = appState.userProfile.monthlyIncome;
  const existingEmis = appState.userProfile.existingEmis;
  const property = appState.getSelectedProperty();

  container.innerHTML = INDIAN_BANKS.map((bank, idx) => {
    const isSelected = bank.id === appState.selectedBankId;
    const maxEligibility = calculateMaxLoanEligibility(income, existingEmis, bank.baseRate, 20);
    const loanAmount = Math.min(maxEligibility, property.price * bank.maxLtvRatio);
    const monthlyEmi = calculateEMI(loanAmount, bank.baseRate, 240);

    return `
      <div class="bank-compare-card ${isSelected ? 'selected' : ''} ${idx === 0 ? 'recommended' : ''}" onclick="selectBank('${bank.id}')">
        ${idx === 0 ? '<div class="recommend-badge">Top Recommendation</div>' : ''}
        <div class="bank-card-top">
          <div class="bank-brand">
            <div class="bank-logo-badge" style="background:${bank.badgeColor === 'blue' ? '#0a2e5c' : '#005e46'}">${bank.logoText}</div>
            <div>
              <div class="bank-name">${bank.name}</div>
              <div class="bank-scheme">${bank.schemeName}</div>
            </div>
          </div>
          <span class="pill-badge pill-info">${bank.badge}</span>
        </div>
        <div class="bank-metrics-grid">
          <div class="metric-box">
            <div class="label">Interest Rate</div>
            <div class="val" style="color:#059669;">${bank.baseRate}%</div>
          </div>
          <div class="metric-box">
            <div class="label">Estimated EMI</div>
            <div class="val">${formatINR(monthlyEmi)}/mo</div>
          </div>
          <div class="metric-box">
            <div class="label">Max Eligibility</div>
            <div class="val" style="color:#0a2e5c;">${formatCompactINR(maxEligibility)}</div>
          </div>
        </div>
        <div class="bank-features-list">
          ${bank.specialFeatures.slice(0, 2).map(f => `
            <div class="bank-feature-item">
              <span style="color:#059669; font-weight:800;">✓</span>
              <span>${f}</span>
            </div>
          `).join('')}
        </div>
        <div style="display:flex; align-items:center; justify-content:space-between; font-size:11px; color:#64748b; border-top:1px solid #f1f5f9; padding-top:6px;">
          <span>SLA: <strong>${bank.sanctionSla}</strong></span>
          <span>Fee: <strong>${bank.processingFee}</strong></span>
        </div>
      </div>
    `;
  }).join('');
}

window.selectBank = function(bankId) {
  appState.setSelectedBank(bankId);
  renderBankComparisonCards();
  renderBankChecklists();
};

/* -------------------------------------------------------------
 * 7. Notifications Screen (Feature 11)
 * ------------------------------------------------------------- */
function initNotificationsScreen() {
  const notifContainer = document.getElementById('notificationsList');
  if (!notifContainer) return;

  const notifs = appState.notifications;
  notifContainer.innerHTML = notifs.map(n => {
    let iconClass = 'notif-icon-status';
    if (n.category === 'visit') iconClass = 'notif-icon-visit';
    if (n.category === 'documents') iconClass = 'notif-icon-doc';
    if (n.category === 'delays') iconClass = 'notif-icon-delay';
    if (n.category === 'emidue') iconClass = 'notif-icon-emi';

    return `
      <div class="notification-card ${n.unread ? 'unread' : ''}" onclick="handleNotificationClick('${n.id}')">
        <div class="notif-icon-circle ${iconClass}">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        </div>
        <div class="notif-content-col">
          <div class="notif-title-row">
            <span class="notif-title">${n.title}</span>
            <span class="notif-time">${n.timestamp}</span>
          </div>
          <p class="notif-msg">${n.message}</p>
          ${n.actionLabel ? `
            <button class="notif-action-btn">${n.actionLabel} →</button>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');
}

window.handleNotificationClick = function(id) {
  const notif = appState.notifications.find(n => n.id === id);
  if (!notif) return;
  appState.markNotificationRead(id);

  if (notif.actionType === 'check_visit') {
    appState.setTab('tracker');
    appState.setStageIndex(5);
  } else if (notif.actionType === 'open_missing_doc') {
    appState.setTab('documents');
    openMissingGuide(notif.actionParam || 'form_16');
  } else if (notif.actionType === 'view_stage') {
    appState.setTab('tracker');
    appState.setStageIndex(notif.actionParam || 0);
  } else if (notif.actionType === 'open_tracker') {
    appState.setTab('tracker');
  }
};

/* -------------------------------------------------------------
 * 8. Profile & Post-Approval Loan Dashboard (Feature 9, 10)
 * ------------------------------------------------------------- */
function initProfileScreen() {
  const btnToggleLoanMode = document.getElementById('btnToggleApprovedMode');
  if (btnToggleLoanMode) {
    btnToggleLoanMode.addEventListener('click', () => {
      appState.toggleActiveLoanApprovedMode();
      renderProfileScreen();
    });
  }

  // Prepayment Sliders
  const prepayLumpSlider = document.getElementById('prepayLumpSlider');
  const prepayExtraEmiSlider = document.getElementById('prepayExtraEmiSlider');

  if (prepayLumpSlider) {
    prepayLumpSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      document.getElementById('prepayLumpVal').textContent = formatINR(val);
      recalcPrepayment();
    });
  }

  if (prepayExtraEmiSlider) {
    prepayExtraEmiSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      document.getElementById('prepayExtraEmiVal').textContent = formatINR(val);
      recalcPrepayment();
    });
  }

  renderProfileScreen();
}

function renderProfileScreen() {
  const isApprovedMode = appState.activeLoanApprovedMode;
  const loanData = appState.userProfile.activeLoanData;

  const approvedSection = document.getElementById('activeLoanApprovedSection');
  const inProgressSection = document.getElementById('inProgressProfileSection');
  const modeBtn = document.getElementById('btnToggleApprovedMode');

  if (approvedSection && inProgressSection) {
    if (isApprovedMode) {
      approvedSection.style.display = 'block';
      inProgressSection.style.display = 'none';
      if (modeBtn) modeBtn.textContent = 'View In-Progress Application Profile';
      
      // Amortization values
      document.getElementById('activeLoanAccNo').textContent = loanData.loanAccountNo;
      document.getElementById('activeSanctionedAmount').textContent = formatINR(loanData.sanctionedAmount);
      document.getElementById('activeOutstandingBal').textContent = formatINR(loanData.outstandingBalance);
      document.getElementById('activeEmiAmount').textContent = formatINR(loanData.monthlyEmi);
      document.getElementById('activeNextEmiDue').textContent = loanData.nextEmiDueDate;

      // Amortization bar widths
      const totalPaid = loanData.principalPaidSoFar + loanData.interestPaidSoFar;
      const prinWidth = Math.round((loanData.principalPaidSoFar / totalPaid) * 100);
      document.getElementById('barPrincipal').style.width = `${prinWidth}%`;
      document.getElementById('barInterest').style.width = `${100 - prinWidth}%`;
      document.getElementById('legendPrincipalPaid').textContent = `Principal: ${formatINR(loanData.principalPaidSoFar)}`;
      document.getElementById('legendInterestPaid').textContent = `Interest: ${formatINR(loanData.interestPaidSoFar)}`;

      // Property Financial Equity Analysis
      const eq = calculatePropertyEquity({
        purchasePrice: loanData.propertyPurchasePrice,
        downPaymentPaid: loanData.downPaymentPaid,
        outstandingLoan: loanData.outstandingBalance
      });

      document.getElementById('equityPurchasePrice').textContent = formatINR(eq.purchasePrice);
      document.getElementById('equityMarketVal').textContent = formatINR(eq.estimatedCurrentValue);
      document.getElementById('equityHomeEquity').textContent = formatINR(eq.homeEquity);
      document.getElementById('equityUserPercent').textContent = `${eq.equityPercent}% Owned`;
      document.getElementById('equityBankPercent').textContent = `${eq.bankSharePercent}% Bank`;
      document.getElementById('equityOwnedBar').style.width = `${eq.equityPercent}%`;
      document.getElementById('equityLoanBar').style.width = `${eq.bankSharePercent}%`;

      recalcPrepayment();
    } else {
      approvedSection.style.display = 'none';
      inProgressSection.style.display = 'block';
      if (modeBtn) modeBtn.textContent = 'Simulate Approved Loan Dashboard';
    }
  }
}

function recalcPrepayment() {
  const loanData = appState.userProfile.activeLoanData;
  const lump = parseInt(document.getElementById('prepayLumpSlider')?.value || '0');
  const extra = parseInt(document.getElementById('prepayExtraEmiSlider')?.value || '0');

  const savings = calculatePrepaymentSavings({
    outstandingBalance: loanData.outstandingBalance,
    interestRate: loanData.interestRate,
    currentEmi: loanData.monthlyEmi,
    lumpSumPrepayment: lump,
    extraMonthlyPayment: extra
  });

  const savingsEl = document.getElementById('prepaySavingsResult');
  const tenureEl = document.getElementById('prepayTenureResult');

  if (savingsEl) savingsEl.textContent = savings.interestSavedFormatted;
  if (tenureEl) {
    tenureEl.textContent = `Retire home loan ${savings.yearsReduced} years (${savings.monthsReduced} months) sooner!`;
  }
}

/* -------------------------------------------------------------
 * 9. Multi-Language Engine & Glossary (Feature 12)
 * ------------------------------------------------------------- */
const STRUCTURED_LANG_METADATA = [
  {
    code: 'ta',
    name: 'Tamil',
    native: 'தமிழ்',
    region: 'தமிழ்நாடு • புதுச்சேரி • புலம் பெயர் மக்கள்',
    badge: 'தமிழ்நாடு',
    initial: 'த',
    gradient: 'linear-gradient(135deg, #006045 0%, #059669 100%)',
    tagline: 'அனைத்து கடன் நிலைகள் & ஆவணங்கள் தமிழில்'
  },
  {
    code: 'en',
    name: 'English',
    native: 'English',
    region: 'Pan-India Official & Banking Standard',
    badge: 'Default',
    initial: 'EN',
    gradient: 'linear-gradient(135deg, #0a2e5c 0%, #2563eb 100%)',
    tagline: 'Standard Indian banking & legal terminology'
  },
  {
    code: 'hi',
    name: 'Hindi',
    native: 'हिन्दी',
    region: 'उत्तर एवं मध्य भारत (दिल्ली, एनसीआर, यूपी, एमपी)',
    badge: 'भारत',
    initial: 'हि',
    gradient: 'linear-gradient(135deg, #d97706 0%, #ea580c 100%)',
    tagline: 'संपूर्ण होम लोन प्रक्रिया हिंदी में'
  },
  {
    code: 'te',
    name: 'Telugu',
    native: 'తెలుగు',
    region: 'ఆంధ్రప్రదేశ్ & తెలంగాణ (హైదరాబాద్)',
    badge: 'ఆంధ్ర & TS',
    initial: 'తె',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)',
    tagline: 'హోమ్ లోన్ పూర్తి వివరాలు తెలుగులో'
  },
  {
    code: 'kn',
    name: 'Kannada',
    native: 'ಕನ್ನಡ',
    region: 'ಕರ್ನಾಟಕ (ಬೆಂಗಳೂರು, ಮೈಸೂರು)',
    badge: 'ಕರ್ನಾಟಕ',
    initial: 'ಕ',
    gradient: 'linear-gradient(135deg, #e11d48 0%, #be123c 100%)',
    tagline: 'ಸಂಪೂರ್ಣ ಗೃಹ ಸಾಲ ಪ್ರಕ್ರಿಯೆ ಕನ್ನಡದಲ್ಲಿ'
  },
  {
    code: 'ml',
    name: 'Malayalam',
    native: 'മലയാളം',
    region: 'കേരളം (കൊച്ചി, തിരുവനന്തപുരം)',
    badge: 'കേരളം',
    initial: 'മ',
    gradient: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
    tagline: 'ഭവന വായ്പ വിവരങ്ങൾ പൂർണ്ണമായി മലയാളത്തിൽ'
  }
];

function renderLanguageOptions(searchQuery = '') {
  const langGrid = document.getElementById('languageOptionsGrid');
  if (!langGrid) return;

  const q = (searchQuery || '').toLowerCase().trim();
  const filtered = STRUCTURED_LANG_METADATA.filter(l => {
    if (!q) return true;
    return l.name.toLowerCase().includes(q) ||
      l.native.toLowerCase().includes(q) ||
      l.region.toLowerCase().includes(q) ||
      l.code.toLowerCase().includes(q);
  });

  if (filtered.length === 0) {
    langGrid.innerHTML = `
      <div style="text-align:center; padding:20px; color:#64748b; font-size:12.5px;">
        No matching language found for "${searchQuery}".
      </div>
    `;
    return;
  }

  langGrid.innerHTML = filtered.map(l => {
    const isSelected = l.code === appState.selectedLanguage;
    return `
      <div class="neat-lang-card ${isSelected ? 'selected' : ''}" onclick="selectLanguage('${l.code}')">
        <div class="neat-lang-avatar" style="background:${l.gradient};">
          ${l.initial}
        </div>
        <div class="neat-lang-info">
          <div class="neat-lang-primary-row">
            <span class="neat-lang-native">${l.native}</span>
            <span class="neat-lang-english">(${l.name})</span>
            <span class="neat-lang-badge">${l.badge}</span>
          </div>
          <div class="neat-lang-region">${l.region}</div>
          <div class="neat-lang-tagline">${l.tagline}</div>
        </div>
        <div class="neat-lang-radio ${isSelected ? 'checked' : ''}">
          ${isSelected ? '✓' : ''}
        </div>
      </div>
    `;
  }).join('');
}

function initLanguageSwitcher() {
  const btnLangHeader = document.getElementById('btnLangToggle');
  if (btnLangHeader) {
    btnLangHeader.addEventListener('click', () => {
      openModal('languageModal');
      renderLanguageOptions('');
    });
  }

  // Live search input
  const langSearchInput = document.getElementById('langSearchInput');
  if (langSearchInput) {
    langSearchInput.addEventListener('input', (e) => {
      renderLanguageOptions(e.target.value);
    });
  }

  renderLanguageOptions('');

  // Glossary list
  const glossaryContainer = document.getElementById('glossaryTermsList');
  if (glossaryContainer) {
    glossaryContainer.innerHTML = GLOSSARY_TERMS.map(t => `
      <div class="glossary-card">
        <span class="glossary-term-badge">${t.category}</span>
        <div style="font-size:13.5px; font-weight:800; color:#0f172a; margin-bottom:2px;">${t.term}</div>
        <div style="font-size:11px; color:#059669; font-weight:700; margin-bottom:6px;">${t.alias}</div>
        <p class="glossary-definition">${t.description}</p>
      </div>
    `).join('');
  }
}

window.selectLanguage = function(langCode) {
  appState.setLanguage(langCode);
  closeModal('languageModal');
  applyTranslations();
  const selectedObj = STRUCTURED_LANG_METADATA.find(l => l.code === langCode);
  showToast(`Language switched to ${selectedObj ? selectedObj.native : langCode.toUpperCase()}`);
};

function applyTranslations() {
  const lang = appState.selectedLanguage;
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // Header language badge
  const langBadge = document.getElementById('currentLangCode');
  if (langBadge) langBadge.textContent = lang.toUpperCase();

  // Bottom Nav labels
  document.getElementById('navLabelHome').textContent = t.navHome;
  document.getElementById('navLabelProperties').textContent = t.navProperties;
  document.getElementById('navLabelMyLoan').textContent = t.navMyLoan;
  document.getElementById('navLabelDocuments').textContent = t.navDocuments;
  document.getElementById('navLabelNotifications').textContent = t.navNotifications;
  document.getElementById('navLabelProfile').textContent = t.navProfile;

  // Section titles
  const heroTitle = document.getElementById('heroLoanTitle');
  if (heroTitle) heroTitle.textContent = t.activeLoanTitle;
}

/* -------------------------------------------------------------
 * 10. Modals & Notifications Helper
 * ------------------------------------------------------------- */
function initModals() {
  // Close buttons
  document.querySelectorAll('.btn-close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal');
      if (modalId) closeModal(modalId);
    });
  });

  // Click outside to close
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
      }
    });
  });
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    // If video modal, stop video
    const video = modal.querySelector('video');
    if (video) video.pause();
  }
}

function showToast(message) {
  let toast = document.getElementById('appToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'appToast';
    toast.style.cssText = `
      position: fixed;
      bottom: 80px;
      left: 50%;
      transform: translateX(-50%);
      background: #0f172a;
      color: #ffffff;
      padding: 10px 18px;
      border-radius: 9999px;
      font-size: 12.5px;
      font-weight: 700;
      z-index: 999;
      box-shadow: 0 10px 25px rgba(0,0,0,0.4);
      transition: all 0.3s ease;
      text-align: center;
      max-width: 90%;
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.style.opacity = '1';
  toast.style.display = 'block';
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => { toast.style.display = 'none'; }, 300);
  }, 3500);
}

/* -------------------------------------------------------------
 * 11. State Observer Router
 * ------------------------------------------------------------- */
function handleStateUpdates(event, payload) {
  if (event === 'TAB_CHANGED') {
    switchTabView(payload);
  } else if (event === 'CHASSIS_MODE_CHANGED') {
    document.body.classList.toggle('full-viewport-mode', payload === 'full');
    const btn = document.getElementById('btnChassisToggle');
    if (btn) btn.textContent = payload === 'full' ? '📱 Mobile Frame' : '🖥️ Full Viewport';
  } else if (event === 'LANGUAGE_CHANGED') {
    applyTranslations();
  } else if (
    event === 'STAGE_CHANGED' ||
    event === 'VISIT_COMPLETED' ||
    event === 'CREDIT_APPROVED' ||
    event === 'SANCTION_ESIGNED' ||
    event === 'MODT_EXECUTED' ||
    event === 'LOAN_DISBURSED' ||
    event === 'ALL_STAGES_COMPLETED'
  ) {
    renderTracker();
    updateHomeScreenBanner();
    renderVaultFiles();
  } else if (event === 'LOAN_MODE_TOGGLED') {
    renderProfileScreen();
    updateHomeScreenBanner();
    renderTracker();
  } else if (event === 'PROPERTY_SELECTED') {
    renderBankComparisonCards();
  }
}

function renderAllViews() {
  applyTranslations();
  renderPropertyCards();
  renderTracker();
  updateHomeScreenBanner();
  renderVaultFiles();
  renderBankChecklists();
  renderBankComparisonCards();
  initNotificationsScreen();
  renderProfileScreen();
}
