// HousePoint Reactive Central State Management

import { PROPERTIES, INDIAN_BANKS, LOAN_STAGES, INITIAL_USER_PROFILE, NOTIFICATIONS_DATA } from './data.js';

class AppState {
  constructor() {
    this.listeners = [];
    
    // Core Navigation & View States
    this.currentTab = 'home';
    this.chassisMode = 'phone'; // 'phone' or 'full'
    this.selectedLanguage = 'en';

    // Property Selection & Filters
    this.selectedPropertyId = 'prop-1';
    this.selectedCity = 'bengaluru';
    this.bhkFilter = 'all';
    this.searchQuery = '';

    // Banking & Loan Selection
    this.selectedBankId = 'sbi';
    this.userProfile = { ...INITIAL_USER_PROFILE };

    // 10-Stage Tracker States
    this.stages = JSON.parse(JSON.stringify(LOAN_STAGES));
    this.currentStageIndex = 5; // Stage 6: Property Visit is active
    
    // Property Visit & Escalation
    this.visitStatus = 'scheduled'; // 'scheduled', 'visited', 'rescheduled', 'escalated'
    this.rescheduledSlot = null;
    this.escalationTickets = [];

    // Document Vault (7 folders: Property, Personal, Income, Legal, Loan, Tax, Insurance)
    this.vaultFolder = 'property';
    this.vaultDocuments = [
      { id: 'v-1', folder: 'property', name: 'Agreement for Sale (Registered).pdf', size: '3.4 MB', date: '01 Sep 2026', verified: true },
      { id: 'v-2', folder: 'legal', name: '30-Year Parent Mother Deed.pdf', size: '4.8 MB', date: '02 Sep 2026', verified: true },
      { id: 'v-3', folder: 'legal', name: 'Encumbrance Certificate (EC Form 15).pdf', size: '2.1 MB', date: '02 Sep 2026', verified: true },
      { id: 'v-4', folder: 'property', name: 'BBMP Approved Building Plan NOC.pdf', size: '8.4 MB', date: '03 Sep 2026', verified: true },
      { id: 'v-5', folder: 'personal', name: 'Aadhaar Card (DigiLocker Verified).pdf', size: '920 KB', date: '28 Aug 2026', verified: true },
      { id: 'v-6', folder: 'personal', name: 'PAN Card (ITD Verified).pdf', size: '450 KB', date: '28 Aug 2026', verified: true },
      { id: 'v-7', folder: 'income', name: 'Salary Slips (Last 3 Months).pdf', size: '1.2 MB', date: '29 Aug 2026', verified: true },
      { id: 'v-8', folder: 'income', name: 'Bank Account Statements 6 Months.pdf', size: '5.6 MB', date: '30 Aug 2026', verified: true },
      { id: 'v-9', folder: 'tax', name: 'ITR-V Acknowledgement FY25.pdf', size: '820 KB', date: '30 Aug 2026', verified: true }
    ];

    // Missing Document Drawer state
    this.activeMissingDocCode = null;

    // Notifications
    this.notifications = JSON.parse(JSON.stringify(NOTIFICATIONS_DATA));

    // Post-Approval Simulation Mode
    this.activeLoanApprovedMode = false;
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify(event, payload) {
    this.listeners.forEach(fn => fn(event, payload, this));
  }

  // Getters
  getSelectedProperty() {
    return PROPERTIES.find(p => p.id === this.selectedPropertyId) || PROPERTIES[0];
  }

  getSelectedBank() {
    return INDIAN_BANKS.find(b => b.id === this.selectedBankId) || INDIAN_BANKS[0];
  }

  getCurrentStage() {
    return this.stages[this.currentStageIndex];
  }

  // Navigation
  setTab(tab) {
    this.currentTab = tab;
    this.notify('TAB_CHANGED', tab);
  }

  toggleChassisMode() {
    this.chassisMode = this.chassisMode === 'phone' ? 'full' : 'phone';
    this.notify('CHASSIS_MODE_CHANGED', this.chassisMode);
  }

  setLanguage(langCode) {
    this.selectedLanguage = langCode;
    this.notify('LANGUAGE_CHANGED', langCode);
  }

  // Property Filters
  setSelectedProperty(propId) {
    this.selectedPropertyId = propId;
    this.notify('PROPERTY_SELECTED', propId);
  }

  setSelectedCity(cityId) {
    this.selectedCity = cityId;
    this.notify('CITY_CHANGED', cityId);
  }

  setBhkFilter(bhk) {
    this.bhkFilter = bhk;
    this.notify('BHK_FILTER_CHANGED', bhk);
  }

  setSearchQuery(query) {
    this.searchQuery = query;
    this.notify('SEARCH_CHANGED', query);
  }

  // Bank Selection
  setSelectedBank(bankId) {
    this.selectedBankId = bankId;
    this.notify('BANK_SELECTED', bankId);
  }

  updateUserProfile(updates) {
    this.userProfile = { ...this.userProfile, ...updates };
    this.notify('USER_PROFILE_UPDATED', this.userProfile);
  }

  // Stage Manipulation
  setStageIndex(index) {
    if (index >= 0 && index < this.stages.length) {
      this.currentStageIndex = index;
      this.notify('STAGE_CHANGED', index);
    }
  }

  // Property Visit Workflow
  handleVisitOutcome(outcome, payload = {}) {
    if (outcome === 'yes') {
      this.visitStatus = 'visited';
      // Complete Stage 6 and advance to Stage 7
      this.stages[5].status = 'completed';
      this.stages[5].completedDate = 'Just Now (Inspection Cleared)';
      this.stages[6].status = 'active';
      this.currentStageIndex = 6;
      this.notify('VISIT_COMPLETED', { nextStageIndex: 6 });
    } else if (outcome === 'rescheduled') {
      this.visitStatus = 'rescheduled';
      this.rescheduledSlot = payload.slot || 'Tomorrow, 11:00 AM';
      this.notify('VISIT_RESCHEDULED', this.rescheduledSlot);
    } else if (outcome === 'no') {
      this.visitStatus = 'missed';
      this.notify('VISIT_MISSED', payload);
    }
  }

  createEscalationTicket({ reason, additionalNotes }) {
    const ticketId = 'ESC-' + Math.floor(100000 + Math.random() * 900000);
    const newTicket = {
      id: ticketId,
      stageId: this.getCurrentStage().id,
      stageTitle: this.getCurrentStage().title,
      reason,
      notes: additionalNotes,
      status: 'Open (High Priority)',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      slaHours: 4,
      assignedTo: 'Suresh Chandra Sharma (AGM Credit, SBI RACPC)'
    };
    this.escalationTickets.unshift(newTicket);
    this.visitStatus = 'escalated';
    this.notify('ESCALATION_CREATED', newTicket);
    return newTicket;
  }

  // Stage 7: Loan Decision Committee Approval
  approveCreditCommittee() {
    this.stages[6].status = 'completed';
    this.stages[6].completedDate = 'Just Now (Sanction Cleared)';
    this.stages[7].status = 'active';
    this.currentStageIndex = 7;
    
    // Add Sanction Notification
    this.notifications.unshift({
      id: 'notif-' + Date.now(),
      category: 'loan',
      type: 'sanction_approved',
      title: 'Credit Committee Sanction Approved! ₹65.0 Lakhs',
      message: 'AGM Suresh Chandra Sharma signed off your credit approval. Sanction letter is ready for Aadhaar e-Sign.',
      timestamp: 'Just now',
      unread: true
    });

    this.notify('CREDIT_APPROVED', { currentStageIndex: 7 });
  }

  // Stage 8: Aadhaar e-Sign Sanction Letter
  eSignSanctionLetter(aadhaarNumber = '8891') {
    this.stages[7].status = 'completed';
    this.stages[7].completedDate = 'Just Now (Aadhaar e-Signed)';
    this.stages[8].status = 'active';
    this.currentStageIndex = 8;

    // Add executed Sanction Letter to vault
    this.addVaultDocument({
      folder: 'loan',
      name: 'SBI Formal Sanction Letter (Aadhaar e-Signed).pdf',
      size: '2.8 MB'
    });

    this.notifications.unshift({
      id: 'notif-' + Date.now(),
      category: 'loan',
      type: 'sanction_signed',
      title: 'Sanction Letter Accepted & e-Signed',
      message: 'Aadhaar e-Sign verified via UIDAI DigiLocker. Proceeding to MODT Equitable Mortgage registration.',
      timestamp: 'Just now',
      unread: true
    });

    this.notify('SANCTION_ESIGNED', { currentStageIndex: 8 });
  }

  // Stage 9: MODT Execution & Title Deposit
  executeModtAgreement() {
    this.stages[8].status = 'completed';
    this.stages[8].completedDate = 'Just Now (MODT Registered)';
    this.stages[9].status = 'active';
    this.currentStageIndex = 9;

    // Add MODT Deed to vault
    this.addVaultDocument({
      folder: 'legal',
      name: 'Registered MODT Deed (Sub-Registrar Shivajinagar).pdf',
      size: '4.2 MB'
    });

    this.notifications.unshift({
      id: 'notif-' + Date.now(),
      category: 'loan',
      type: 'modt_executed',
      title: 'MODT Mortgage Registered with Sub-Registrar',
      message: 'Original title deeds safely pledged. Final disbursement file cleared for escrow transfer.',
      timestamp: 'Just now',
      unread: true
    });

    this.notify('MODT_EXECUTED', { currentStageIndex: 9 });
  }

  // Stage 10: Final RTGS Disbursement to Builder / Seller
  disburseLoan() {
    this.stages[9].status = 'completed';
    this.stages[9].completedDate = 'Just Now (RTGS Settled)';
    this.currentStageIndex = 9; // stays on final completed stage
    
    // Switch on active loan mode across the entire app
    this.activeLoanApprovedMode = true;
    this.userProfile.hasActiveLoanApproved = true;

    // Add Disbursement receipt to vault
    this.addVaultDocument({
      folder: 'loan',
      name: 'SBI RTGS Disbursement Advice & Escrow Receipt.pdf',
      size: '1.9 MB'
    });

    this.notifications.unshift({
      id: 'notif-' + Date.now(),
      category: 'loan',
      type: 'loan_disbursed',
      title: '🎉 Loan Disbursed: ₹65,00,000 Settled to Builder!',
      message: 'Congratulations! Your home loan is now active. Your first EMI is scheduled for 05 Oct 2026.',
      timestamp: 'Just now',
      unread: true
    });

    this.notify('LOAN_DISBURSED', { currentStageIndex: 9 });
    this.notify('LOAN_MODE_TOGGLED', true);
  }

  // Instant full demo: Complete all stages directly
  completeAllStages() {
    for (let i = 0; i < this.stages.length; i++) {
      this.stages[i].status = 'completed';
      if (!this.stages[i].completedDate) {
        this.stages[i].completedDate = 'Completed (Fast Track)';
      }
    }
    this.visitStatus = 'visited';
    this.currentStageIndex = 9;
    this.activeLoanApprovedMode = true;
    this.userProfile.hasActiveLoanApproved = true;

    this.notify('ALL_STAGES_COMPLETED', { currentStageIndex: 9 });
    this.notify('LOAN_MODE_TOGGLED', true);
  }

  // Document Vault
  setVaultFolder(folderName) {
    this.vaultFolder = folderName;
    this.notify('VAULT_FOLDER_CHANGED', folderName);
  }

  addVaultDocument(doc) {
    const newDoc = {
      id: 'v-' + Date.now(),
      folder: this.vaultFolder,
      name: doc.name || 'Uploaded Document.pdf',
      size: doc.size || '1.5 MB',
      date: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      verified: true
    };
    this.vaultDocuments.unshift(newDoc);
    this.notify('VAULT_DOC_ADDED', newDoc);
    return newDoc;
  }

  deleteVaultDocument(id) {
    this.vaultDocuments = this.vaultDocuments.filter(d => d.id !== id);
    this.notify('VAULT_DOC_DELETED', id);
  }

  // Missing Document Drawer
  openMissingDocGuide(docCode) {
    this.activeMissingDocCode = docCode;
    this.notify('OPEN_MISSING_DOC_GUIDE', docCode);
  }

  closeMissingDocGuide() {
    this.activeMissingDocCode = null;
    this.notify('CLOSE_MISSING_DOC_GUIDE');
  }

  // Post-approval Mode Toggle
  toggleActiveLoanApprovedMode() {
    this.activeLoanApprovedMode = !this.activeLoanApprovedMode;
    this.notify('LOAN_MODE_TOGGLED', this.activeLoanApprovedMode);
  }

  // Notifications
  markNotificationRead(id) {
    const notif = this.notifications.find(n => n.id === id);
    if (notif) notif.unread = false;
    this.notify('NOTIFICATIONS_UPDATED', this.notifications);
  }
}

export const appState = new AppState();
