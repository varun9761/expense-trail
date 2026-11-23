const APP_KEY = "expenseTrail.v2";
const STORAGE_KEYS = {
  theme: `${APP_KEY}.theme`,
  accounts: `${APP_KEY}.accounts`,
  session: `${APP_KEY}.session`,
};

const DEFAULT_CATEGORIES = [
  "Food",
  "Transport",
  "Utilities",
  "Shopping",
  "Entertainment",
  "Healthcare",
  "Education",
  "Travel",
  "Housing",
  "Bills",
  "Personal",
  "Savings",
  "Salary",
  "Freelance",
  "Investment",
  "Other",
];

const CATEGORY_COLORS = [
  "#76e4b3",
  "#6aa9ff",
  "#ffb648",
  "#ff8d8d",
  "#8676ff",
  "#48c9b0",
  "#f66fb3",
  "#ff9f43",
  "#50b5ff",
  "#6ed36e",
  "#ff7f7f",
  "#5ec9a7",
];

const ONBOARDING_STEPS = [
  {
    title: "Build a finance system you will actually use.",
    description: "Start with the two numbers that matter most: your monthly income and your budget."
  },
  {
    title: "Shape the workspace around your real life.",
    description: "Choose the categories and goals that should guide your decisions."
  },
  {
    title: "Add recurring items before they surprise you.",
    description: "Rent, subscriptions, salary, or SIPs can all live in one calm planning layer."
  },
];

const state = {
  authMode: "login",
  onboardingStep: 0,
  currentUser: null,
  data: createEmptyUserData(),
  toastTimer: null,
  chart: null,
  entryEditId: null,
  entryType: "expense",
  recurringType: "expense",
};

const elements = {
  body: document.body,
  authScreen: document.getElementById("authScreen"),
  onboardingScreen: document.getElementById("onboardingScreen"),
  dashboardScreen: document.getElementById("dashboardScreen"),
  loginTab: document.getElementById("loginTab"),
  signupTab: document.getElementById("signupTab"),
  authForm: document.getElementById("authForm"),
  authSubmit: document.getElementById("authSubmit"),
  authHint: document.getElementById("authHint"),
  nameField: document.getElementById("nameField"),
  authName: document.getElementById("authName"),
  authEmail: document.getElementById("authEmail"),
  authPassword: document.getElementById("authPassword"),
  onboardingStepLabel: document.getElementById("onboardingStepLabel"),
  onboardingTitle: document.getElementById("onboardingTitle"),
  onboardingDescription: document.getElementById("onboardingDescription"),
  onboardingProgressFill: document.getElementById("onboardingProgressFill"),
  onboardingBack: document.getElementById("onboardingBack"),
  onboardingNext: document.getElementById("onboardingNext"),
  onboardingBudget: document.getElementById("onboardingBudget"),
  onboardingIncome: document.getElementById("onboardingIncome"),
  onboardingCategories: document.getElementById("onboardingCategories"),
  onboardingGoal: document.getElementById("onboardingGoal"),
  onboardingRecurring: document.getElementById("onboardingRecurring"),
  welcomeText: document.getElementById("welcomeText"),
  importFile: document.getElementById("importFile"),
  importButton: document.getElementById("importButton"),
  exportJsonButton: document.getElementById("exportJsonButton"),
  exportCsvButton: document.getElementById("exportCsvButton"),
  themeToggle: document.getElementById("themeToggle"),
  themeToggleLabel: document.getElementById("themeToggleLabel"),
  logoutButton: document.getElementById("logoutButton"),
  openEntryModal: document.getElementById("openEntryModal"),
  openBudgetModal: document.getElementById("openBudgetModal"),
  openRecurringModal: document.getElementById("openRecurringModal"),
  netBalance: document.getElementById("netBalance"),
  heroStatus: document.getElementById("heroStatus"),
  totalIncome: document.getElementById("totalIncome"),
  incomeHint: document.getElementById("incomeHint"),
  totalSpend: document.getElementById("totalSpend"),
  spendHint: document.getElementById("spendHint"),
  budgetValue: document.getElementById("budgetValue"),
  budgetLimit: document.getElementById("budgetLimit"),
  budgetFill: document.getElementById("budgetFill"),
  budgetMetaLeft: document.getElementById("budgetMetaLeft"),
  budgetMetaRight: document.getElementById("budgetMetaRight"),
  remainingBudget: document.getElementById("remainingBudget"),
  remainingHint: document.getElementById("remainingHint"),
  entryCount: document.getElementById("entryCount"),
  entryCountHint: document.getElementById("entryCountHint"),
  topCategory: document.getElementById("topCategory"),
  topCategoryHint: document.getElementById("topCategoryHint"),
  recurringCount: document.getElementById("recurringCount"),
  recurringHint: document.getElementById("recurringHint"),
  filterType: document.getElementById("filterType"),
  filterCategory: document.getElementById("filterCategory"),
  filterRange: document.getElementById("filterRange"),
  searchEntry: document.getElementById("searchEntry"),
  customRangeFields: document.getElementById("customRangeFields"),
  rangeStart: document.getElementById("rangeStart"),
  rangeEnd: document.getElementById("rangeEnd"),
  entryList: document.getElementById("entryList"),
  categoryBudgetList: document.getElementById("categoryBudgetList"),
  recurringList: document.getElementById("recurringList"),
  chartCanvas: document.getElementById("expenseChart"),
  chartEmptyState: document.getElementById("chartEmptyState"),
  entryModal: document.getElementById("entryModal"),
  entryModalTitle: document.getElementById("entryModalTitle"),
  entryForm: document.getElementById("entryForm"),
  entryName: document.getElementById("entryName"),
  entryAmount: document.getElementById("entryAmount"),
  entryCategory: document.getElementById("entryCategory"),
  entryDate: document.getElementById("entryDate"),
  entryPaymentMethod: document.getElementById("entryPaymentMethod"),
  entryNotes: document.getElementById("entryNotes"),
  submitEntry: document.getElementById("submitEntry"),
  showCategoryCreator: document.getElementById("showCategoryCreator"),
  categoryCreator: document.getElementById("categoryCreator"),
  newCategoryName: document.getElementById("newCategoryName"),
  saveCategory: document.getElementById("saveCategory"),
  budgetModal: document.getElementById("budgetModal"),
  budgetForm: document.getElementById("budgetForm"),
  budgetFormRows: document.getElementById("budgetFormRows"),
  recurringModal: document.getElementById("recurringModal"),
  recurringForm: document.getElementById("recurringForm"),
  recurringName: document.getElementById("recurringName"),
  recurringAmount: document.getElementById("recurringAmount"),
  recurringCategory: document.getElementById("recurringCategory"),
  recurringFrequency: document.getElementById("recurringFrequency"),
  recurringStartDate: document.getElementById("recurringStartDate"),
  toast: document.getElementById("toast"),
};

initialize();

function initialize() {
  applySavedTheme();
  syncThemeLabel();
  bindEvents();
  restoreSession();
}

function bindEvents() {
  elements.loginTab.addEventListener("click", () => setAuthMode("login"));
  elements.signupTab.addEventListener("click", () => setAuthMode("signup"));
  elements.authForm.addEventListener("submit", handleAuthSubmit);
  elements.onboardingBack.addEventListener("click", handleOnboardingBack);
  elements.onboardingNext.addEventListener("click", handleOnboardingNext);
  elements.themeToggle.addEventListener("click", toggleTheme);
  elements.logoutButton.addEventListener("click", logout);
  elements.importButton.addEventListener("click", () => elements.importFile.click());
  elements.importFile.addEventListener("change", importData);
  elements.exportJsonButton.addEventListener("click", exportJson);
  elements.exportCsvButton.addEventListener("click", exportCsv);
  elements.openEntryModal.addEventListener("click", () => openEntryModal());
  elements.openBudgetModal.addEventListener("click", openBudgetModal);
  elements.openRecurringModal.addEventListener("click", openRecurringModal);
  elements.budgetLimit.addEventListener("input", handleBudgetInput);
  elements.filterType.addEventListener("change", renderDashboard);
  elements.filterCategory.addEventListener("change", renderDashboard);
  elements.filterRange.addEventListener("change", handleRangeChange);
  elements.searchEntry.addEventListener("input", renderDashboard);
  elements.rangeStart.addEventListener("input", renderDashboard);
  elements.rangeEnd.addEventListener("input", renderDashboard);
  elements.entryForm.addEventListener("submit", handleEntrySubmit);
  elements.showCategoryCreator.addEventListener("click", toggleCategoryCreator);
  elements.saveCategory.addEventListener("click", handleCreateCategory);
  elements.budgetForm.addEventListener("submit", handleBudgetFormSubmit);
  elements.recurringForm.addEventListener("submit", handleRecurringSubmit);
  document.querySelectorAll("[data-entry-type]").forEach((button) => {
    button.addEventListener("click", () => setEntryType(button.dataset.entryType));
  });
  document.querySelectorAll("[data-recurring-type]").forEach((button) => {
    button.addEventListener("click", () => setRecurringType(button.dataset.recurringType));
  });
  document.querySelectorAll("[data-close-modal]").forEach((button) => {
    button.addEventListener("click", () => closeModal(button.dataset.closeModal));
  });
  document.addEventListener("keydown", handleEscape);
}

function createEmptyUserData() {
  return {
    name: "",
    email: "",
    budget: 0,
    categories: [...DEFAULT_CATEGORIES],
    categoryBudgets: {},
    entries: [],
    recurring: [],
    goal: "",
    onboardingCompleted: false,
  };
}

function getAccounts() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.accounts)) || [];
  } catch {
    return [];
  }
}

function saveAccounts(accounts) {
  localStorage.setItem(STORAGE_KEYS.accounts, JSON.stringify(accounts));
}

function createAccountRecord(name, email, password) {
  return {
    id: crypto.randomUUID(),
    name,
    email,
    password,
    data: {
      ...createEmptyUserData(),
      name,
      email,
    },
  };
}

function restoreSession() {
  const sessionEmail = localStorage.getItem(STORAGE_KEYS.session);
  if (!sessionEmail) {
    setAuthMode("login");
    showScreen("auth");
    return;
  }

  const account = getAccounts().find((entry) => entry.email === sessionEmail);
  if (!account) {
    localStorage.removeItem(STORAGE_KEYS.session);
    showScreen("auth");
    return;
  }

  hydrateUser(account);
}

function hydrateUser(account) {
  state.currentUser = account.email;
  state.data = normalizeUserData(account.data, account);
  showFlowForCurrentUser();
}

function normalizeUserData(data, account) {
  const nextData = {
    ...createEmptyUserData(),
    ...data,
    name: data?.name || account?.name || "",
    email: data?.email || account?.email || "",
  };

  nextData.categories = Array.from(new Set([
    ...DEFAULT_CATEGORIES,
    ...(Array.isArray(nextData.categories) ? nextData.categories : []),
    ...(Array.isArray(nextData.entries) ? nextData.entries : []).map((entry) => toTitleCase(String(entry.category || "").trim())).filter(Boolean),
    ...(Array.isArray(nextData.recurring) ? nextData.recurring : []).map((entry) => toTitleCase(String(entry.category || "").trim())).filter(Boolean),
  ]));

  nextData.entries = Array.isArray(nextData.entries)
    ? nextData.entries
      .filter(isValidEntry)
      .map((entry) => ({
        ...entry,
        category: toTitleCase(entry.category),
        notes: entry.notes || "",
        paymentMethod: entry.paymentMethod || "Card",
      }))
      .sort((a, b) => new Date(b.date) - new Date(a.date))
    : [];

  nextData.recurring = Array.isArray(nextData.recurring)
    ? nextData.recurring.filter(isValidRecurring).map((entry) => ({
      ...entry,
      category: toTitleCase(entry.category),
    }))
    : [];

  nextData.categoryBudgets = typeof nextData.categoryBudgets === "object" && nextData.categoryBudgets
    ? nextData.categoryBudgets
    : {};

  nextData.budget = roundCurrency(Number(nextData.budget));
  nextData.onboardingCompleted = Boolean(nextData.onboardingCompleted);
  return nextData;
}

function isValidEntry(entry) {
  return entry
    && typeof entry.id === "string"
    && typeof entry.name === "string"
    && typeof entry.date === "string"
    && typeof entry.category === "string"
    && (entry.type === "expense" || entry.type === "income")
    && Number.isFinite(Number(entry.amount));
}

function isValidRecurring(entry) {
  return entry
    && typeof entry.id === "string"
    && typeof entry.name === "string"
    && typeof entry.category === "string"
    && typeof entry.startDate === "string"
    && (entry.type === "expense" || entry.type === "income")
    && (entry.frequency === "monthly" || entry.frequency === "weekly")
    && Number.isFinite(Number(entry.amount));
}

function persistCurrentUser() {
  if (!state.currentUser) {
    return;
  }

  const accounts = getAccounts().map((account) => {
    if (account.email !== state.currentUser) {
      return account;
    }

    return {
      ...account,
      name: state.data.name,
      data: state.data,
    };
  });

  saveAccounts(accounts);
}

function setAuthMode(mode) {
  state.authMode = mode;
  elements.loginTab.classList.toggle("active", mode === "login");
  elements.signupTab.classList.toggle("active", mode === "signup");
  elements.nameField.hidden = mode !== "signup";
  elements.authSubmit.textContent = mode === "login" ? "Sign in" : "Create account";
  elements.authHint.textContent = mode === "login"
    ? "Use your local account to keep your finance workspace separate on this device."
    : "This is local-only authentication for the device, so you can explore the product flow without a backend.";
}

function handleAuthSubmit(event) {
  event.preventDefault();
  const email = elements.authEmail.value.trim().toLowerCase();
  const password = elements.authPassword.value.trim();
  const name = elements.authName.value.trim();
  const accounts = getAccounts();

  if (!email || !password) {
    showToast("Enter an email and password.");
    return;
  }

  if (state.authMode === "signup") {
    if (!name) {
      showToast("Enter your name to create an account.");
      return;
    }
    if (accounts.some((account) => account.email === email)) {
      showToast("That account already exists. Sign in instead.");
      setAuthMode("login");
      return;
    }

    const account = createAccountRecord(name, email, password);
    accounts.push(account);
    saveAccounts(accounts);
    localStorage.setItem(STORAGE_KEYS.session, email);
    hydrateUser(account);
    elements.authForm.reset();
    showToast("Account created.");
    return;
  }

  const account = accounts.find((entry) => entry.email === email && entry.password === password);
  if (!account) {
    showToast("Invalid email or password.");
    return;
  }

  localStorage.setItem(STORAGE_KEYS.session, email);
  hydrateUser(account);
  elements.authForm.reset();
  showToast("Signed in.");
}

function showFlowForCurrentUser() {
  if (!state.data.onboardingCompleted) {
    state.onboardingStep = 0;
    fillOnboardingForm();
    renderOnboarding();
    showScreen("onboarding");
    return;
  }

  prepareDashboard();
  showScreen("dashboard");
}

function showScreen(name) {
  elements.authScreen.hidden = name !== "auth";
  elements.onboardingScreen.hidden = name !== "onboarding";
  elements.dashboardScreen.hidden = name !== "dashboard";
}

function fillOnboardingForm() {
  elements.onboardingBudget.value = state.data.budget || "";
  const income = getCurrentMonthEntriesByType("income").reduce((sum, entry) => sum + entry.amount, 0);
  elements.onboardingIncome.value = income || "";
  elements.onboardingCategories.value = state.data.categories
    .filter((category) => !DEFAULT_CATEGORIES.includes(category) || ["Food", "Housing", "Travel"].includes(category))
    .slice(0, 6)
    .join(", ");
  elements.onboardingGoal.value = state.data.goal || "";
  elements.onboardingRecurring.value = state.data.recurring
    .map((item) => `${item.name} - ${item.amount} ${item.frequency}`)
    .join("\n");
}

function renderOnboarding() {
  const current = ONBOARDING_STEPS[state.onboardingStep];
  elements.onboardingTitle.textContent = current.title;
  elements.onboardingDescription.textContent = current.description;
  elements.onboardingStepLabel.textContent = `Step ${state.onboardingStep + 1} of ${ONBOARDING_STEPS.length}`;
  elements.onboardingProgressFill.style.width = `${((state.onboardingStep + 1) / ONBOARDING_STEPS.length) * 100}%`;
  elements.onboardingBack.hidden = state.onboardingStep === 0;
  elements.onboardingNext.textContent = state.onboardingStep === ONBOARDING_STEPS.length - 1 ? "Finish" : "Next";

  document.querySelectorAll(".onboarding-step").forEach((step) => {
    const active = Number(step.dataset.step) === state.onboardingStep;
    step.hidden = !active;
  });
}

function handleOnboardingBack() {
  state.onboardingStep = Math.max(0, state.onboardingStep - 1);
  renderOnboarding();
}

function handleOnboardingNext() {
  if (state.onboardingStep < ONBOARDING_STEPS.length - 1) {
    state.onboardingStep += 1;
    renderOnboarding();
    return;
  }

  applyOnboarding();
}

function applyOnboarding() {
  state.data.budget = roundCurrency(Number(elements.onboardingBudget.value));
  state.data.goal = elements.onboardingGoal.value.trim();

  const customCategories = elements.onboardingCategories.value
    .split(",")
    .map((category) => toTitleCase(category.trim()))
    .filter(Boolean);

  state.data.categories = Array.from(new Set([
    ...state.data.categories,
    ...customCategories,
  ]));

  const incomeValue = roundCurrency(Number(elements.onboardingIncome.value));
  if (incomeValue > 0 && !state.data.entries.some((entry) => entry.systemEntry === "onboarding-income")) {
    state.data.entries.unshift({
      id: crypto.randomUUID(),
      name: "Monthly income baseline",
      amount: incomeValue,
      type: "income",
      category: "Salary",
      date: getToday(),
      paymentMethod: "Bank",
      notes: "Created from onboarding",
      systemEntry: "onboarding-income",
    });
  }

  const recurringItems = parseRecurringLines(elements.onboardingRecurring.value);
  if (recurringItems.length) {
    state.data.recurring = recurringItems;
  }

  state.data.onboardingCompleted = true;
  persistCurrentUser();
  prepareDashboard();
  showScreen("dashboard");
  showToast("Workspace ready.");
}

function parseRecurringLines(text) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [left, right] = line.split("-").map((part) => part.trim());
      if (!left || !right) {
        return null;
      }

      const amount = Number(right.split(" ")[0]);
      const frequency = right.toLowerCase().includes("week") ? "weekly" : "monthly";
      return Number.isFinite(amount) && amount > 0
        ? {
          id: crypto.randomUUID(),
          name: left,
          amount: roundCurrency(amount),
          category: "Bills",
          type: "expense",
          frequency,
          startDate: getToday(),
        }
        : null;
    })
    .filter(Boolean);
}

function prepareDashboard() {
  renderCategoryOptions();
  elements.budgetLimit.value = state.data.budget || "";
  elements.entryDate.value = getToday();
  elements.recurringStartDate.value = getToday();
  elements.rangeStart.value = getStartOfMonth();
  elements.rangeEnd.value = getToday();
  elements.welcomeText.textContent = state.data.goal
    ? `${state.data.name || "Welcome back"}, keep moving toward ${state.data.goal}.`
    : `${state.data.name || "Welcome back"}, track spending with a cleaner, calmer workflow.`;
  renderDashboard();
}

function handleBudgetInput() {
  state.data.budget = roundCurrency(Number(elements.budgetLimit.value));
  persistCurrentUser();
  renderDashboard();
}

function renderDashboard() {
  renderCategoryOptions();
  const visibleEntries = getVisibleEntries();
  const currentMonthEntries = getEntriesInRange("month");
  const monthExpenses = currentMonthEntries.filter((entry) => entry.type === "expense");
  const monthIncome = currentMonthEntries.filter((entry) => entry.type === "income");
  const totalSpend = monthExpenses.reduce((sum, entry) => sum + entry.amount, 0);
  const totalIncome = monthIncome.reduce((sum, entry) => sum + entry.amount, 0);
  const netBalance = totalIncome - totalSpend;
  const remainingBudget = state.data.budget > 0 ? state.data.budget - totalSpend : 0;
  const topCategory = getTopExpenseCategory(monthExpenses);

  elements.netBalance.textContent = formatCurrency(netBalance);
  elements.totalIncome.textContent = formatCurrency(totalIncome);
  elements.totalSpend.textContent = formatCurrency(totalSpend);
  elements.budgetValue.textContent = formatCurrency(state.data.budget);
  elements.remainingBudget.textContent = formatCurrency(Math.abs(remainingBudget));
  elements.entryCount.textContent = String(state.data.entries.length);
  elements.recurringCount.textContent = String(state.data.recurring.length);

  elements.incomeHint.textContent = totalIncome > 0
    ? `${formatCurrency(totalIncome)} recorded this month.`
    : "No income logged this month.";
  elements.spendHint.textContent = totalSpend > 0
    ? `${formatCurrency(totalSpend)} spent this month.`
    : "No expenses logged this month.";
  elements.entryCountHint.textContent = state.data.entries.length
    ? `${visibleEntries.length} entry${visibleEntries.length === 1 ? "" : "ies"} visible with current filters.`
    : "No activity yet.";
  elements.recurringHint.textContent = state.data.recurring.length
    ? `${countRecurringDueThisMonth()} recurring item${countRecurringDueThisMonth() === 1 ? "" : "s"} due this month.`
    : "Create recurring items for predictable planning.";
  elements.topCategory.textContent = topCategory ? topCategory.category : "None";
  elements.topCategoryHint.textContent = topCategory
    ? `${formatCurrency(topCategory.amount)} spent in ${topCategory.category}.`
    : "Your biggest category will appear here.";
  elements.heroStatus.textContent = netBalance >= 0
    ? "Your current month is staying in positive territory."
    : "This month is in the red. Tightening expenses will help.";

  renderBudget(totalSpend, remainingBudget);
  renderEntryList(visibleEntries);
  renderCategoryBudgetList(monthExpenses);
  renderRecurringList();
  renderChart(monthExpenses);
}

function renderBudget(totalSpend, remainingBudget) {
  if (!state.data.budget) {
    elements.budgetFill.style.width = "0%";
    elements.budgetMetaLeft.textContent = "No budget set";
    elements.budgetMetaRight.textContent = "0%";
    elements.remainingHint.textContent = "Add a budget to see what is left.";
    return;
  }

  const utilization = Math.min((totalSpend / state.data.budget) * 100, 100);
  elements.budgetFill.style.width = `${utilization}%`;
  elements.budgetMetaLeft.textContent = remainingBudget >= 0
    ? `${formatCurrency(remainingBudget)} left this month`
    : `${formatCurrency(Math.abs(remainingBudget))} over budget`;
  elements.budgetMetaRight.textContent = `${utilization.toFixed(0)}%`;
  elements.remainingHint.textContent = remainingBudget >= 0
    ? "You are still within budget."
    : "Spending has gone past the planned limit.";

  if (utilization < 70) {
    elements.budgetFill.style.background = "linear-gradient(90deg, #6fe0b2, #22b285)";
  } else if (utilization < 100) {
    elements.budgetFill.style.background = "linear-gradient(90deg, #ffd46d, #ffbd59)";
  } else {
    elements.budgetFill.style.background = "linear-gradient(90deg, #ff8d8d, #ff7575)";
  }
}

function getVisibleEntries() {
  const range = elements.filterRange.value;
  const type = elements.filterType.value;
  const category = elements.filterCategory.value;
  const query = elements.searchEntry.value.trim().toLowerCase();

  return state.data.entries.filter((entry) => {
    if (type !== "All" && entry.type !== type) {
      return false;
    }
    if (category !== "All" && entry.category !== category) {
      return false;
    }
    if (query && !entry.name.toLowerCase().includes(query)) {
      return false;
    }
    return entryMatchesRange(entry, range);
  });
}

function entryMatchesRange(entry, range) {
  const date = new Date(entry.date);
  const today = new Date(getToday());

  if (range === "all") {
    return true;
  }
  if (range === "month") {
    return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  }
  if (range === "week") {
    const start = new Date(today);
    start.setDate(today.getDate() - today.getDay());
    start.setHours(0, 0, 0, 0);
    return date >= start && date <= today;
  }
  if (range === "custom") {
    const from = elements.rangeStart.value ? new Date(elements.rangeStart.value) : null;
    const to = elements.rangeEnd.value ? new Date(elements.rangeEnd.value) : null;
    if (from && date < from) {
      return false;
    }
    if (to && date > to) {
      return false;
    }
  }
  return true;
}

function getEntriesInRange(range) {
  return state.data.entries.filter((entry) => entryMatchesRange(entry, range));
}

function renderEntryList(entries) {
  elements.entryList.innerHTML = "";

  if (!entries.length) {
    elements.entryList.appendChild(createEmptyState("No entries match the current filters."));
    return;
  }

  const grouped = groupEntriesByMonth(entries);
  grouped.forEach(([label, groupEntries]) => {
    const group = document.createElement("section");
    group.className = "expense-group";

    const heading = document.createElement("h4");
    heading.className = "expense-group-title";
    heading.textContent = label;
    group.appendChild(heading);

    groupEntries.forEach((entry) => {
      const item = document.createElement("article");
      item.className = "expense-item";
      const meta = getCategoryMeta(entry.category);

      item.innerHTML = `
        <div class="expense-main">
          <div class="category-badge" style="color:${meta.color}; background:${hexToRgba(meta.color, 0.15)}">${meta.icon}</div>
          <div class="expense-copy">
            <strong>${escapeHtml(entry.name)}</strong>
            <span>${entry.category} - ${formatDate(entry.date)} - ${entry.paymentMethod}</span>
          </div>
        </div>
        <div class="expense-side">
          <div class="entry-type-badge ${entry.type}">${capitalize(entry.type)}</div>
          <div class="expense-amount">${formatCurrency(entry.amount)}</div>
          <div class="expense-actions">
            <button class="chip-button" type="button" data-action="edit-entry" data-id="${entry.id}">Edit</button>
            <button class="chip-button" type="button" data-action="delete-entry" data-id="${entry.id}" data-variant="danger">Delete</button>
          </div>
        </div>
      `;

      group.appendChild(item);
    });

    elements.entryList.appendChild(group);
  });

  elements.entryList.querySelectorAll("[data-action='edit-entry']").forEach((button) => {
    button.addEventListener("click", () => openEntryModal(button.dataset.id));
  });
  elements.entryList.querySelectorAll("[data-action='delete-entry']").forEach((button) => {
    button.addEventListener("click", () => deleteEntry(button.dataset.id));
  });
}

function renderCategoryBudgetList(monthExpenses) {
  elements.categoryBudgetList.innerHTML = "";
  const categoriesWithBudgets = Object.entries(state.data.categoryBudgets)
    .filter(([, value]) => Number(value) > 0);

  if (!categoriesWithBudgets.length) {
    elements.categoryBudgetList.appendChild(createEmptyState("No category budgets yet. Add them to control spending more precisely."));
    return;
  }

  categoriesWithBudgets.forEach(([category, budgetValue]) => {
    const spent = monthExpenses
      .filter((entry) => entry.category === category)
      .reduce((sum, entry) => sum + entry.amount, 0);
    const utilization = Math.min((spent / budgetValue) * 100, 100);
    const meta = getCategoryMeta(category);

    const item = document.createElement("article");
    item.className = "budget-item";
    item.innerHTML = `
      <div class="budget-main">
        <div class="category-badge" style="color:${meta.color}; background:${hexToRgba(meta.color, 0.15)}">${meta.icon}</div>
        <div class="budget-copy">
          <strong>${escapeHtml(category)}</strong>
          <span>${formatCurrency(spent)} spent of ${formatCurrency(budgetValue)}</span>
          <div class="budget-progress"><span style="width:${utilization}%"></span></div>
        </div>
      </div>
      <strong>${utilization.toFixed(0)}%</strong>
    `;
    elements.categoryBudgetList.appendChild(item);
  });
}

function renderRecurringList() {
  elements.recurringList.innerHTML = "";

  if (!state.data.recurring.length) {
    elements.recurringList.appendChild(createEmptyState("No recurring items yet. Add salary, rent, subscriptions, or regular savings."));
    return;
  }

  state.data.recurring.forEach((item) => {
    const meta = getCategoryMeta(item.category);
    const row = document.createElement("article");
    row.className = "expense-item";
    row.innerHTML = `
      <div class="expense-main">
        <div class="category-badge" style="color:${meta.color}; background:${hexToRgba(meta.color, 0.15)}">${meta.icon}</div>
        <div class="expense-copy">
          <strong>${escapeHtml(item.name)}</strong>
          <span>${capitalize(item.type)} - ${item.category} - ${capitalize(item.frequency)}</span>
        </div>
      </div>
      <div class="expense-side">
        <div class="expense-amount">${formatCurrency(item.amount)}</div>
        <div class="expense-actions">
          <button class="chip-button" type="button" data-action="delete-recurring" data-id="${item.id}" data-variant="danger">Delete</button>
        </div>
      </div>
    `;
    elements.recurringList.appendChild(row);
  });

  elements.recurringList.querySelectorAll("[data-action='delete-recurring']").forEach((button) => {
    button.addEventListener("click", () => deleteRecurring(button.dataset.id));
  });
}

function renderChart(expenses) {
  const totals = expenses.reduce((accumulator, entry) => {
    accumulator[entry.category] = (accumulator[entry.category] || 0) + entry.amount;
    return accumulator;
  }, {});
  const labels = Object.keys(totals);
  const values = Object.values(totals);

  if (!labels.length) {
    elements.chartEmptyState.hidden = false;
    if (state.chart) {
      state.chart.destroy();
      state.chart = null;
    }
    return;
  }

  elements.chartEmptyState.hidden = true;
  if (state.chart) {
    state.chart.destroy();
  }

  state.chart = new Chart(elements.chartCanvas, {
    type: "doughnut",
    data: {
      labels,
      datasets: [{
        data: values,
        backgroundColor: labels.map((label) => getCategoryMeta(label).color),
        borderWidth: 0,
        hoverOffset: 8,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "72%",
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: getComputedStyle(document.body).getPropertyValue("--muted").trim(),
            padding: 18,
            usePointStyle: true,
            pointStyle: "circle",
            font: {
              family: "Manrope",
              size: 12,
              weight: "700",
            },
          },
        },
        tooltip: {
          callbacks: {
            label(context) {
              return `${context.label}: ${formatCurrency(context.parsed)}`;
            },
          },
        },
      },
    },
  });
}

function openEntryModal(entryId = null) {
  resetEntryForm();
  if (entryId) {
    const entry = state.data.entries.find((item) => item.id === entryId);
    if (!entry) {
      return;
    }
    state.entryEditId = entry.id;
    elements.entryModalTitle.textContent = "Edit entry";
    elements.submitEntry.textContent = "Update entry";
    setEntryType(entry.type);
    elements.entryName.value = entry.name;
    elements.entryAmount.value = entry.amount;
    elements.entryCategory.value = entry.category;
    elements.entryDate.value = entry.date;
    elements.entryPaymentMethod.value = entry.paymentMethod;
    elements.entryNotes.value = entry.notes || "";
  }
  openModal("entry");
}

function resetEntryForm() {
  state.entryEditId = null;
  elements.entryForm.reset();
  elements.entryModalTitle.textContent = "Add entry";
  elements.submitEntry.textContent = "Save entry";
  elements.entryDate.value = getToday();
  elements.entryPaymentMethod.value = "Card";
  elements.entryCategory.value = state.data.categories[0] || "Other";
  elements.categoryCreator.hidden = true;
  elements.newCategoryName.value = "";
  setEntryType("expense");
}

function setEntryType(type) {
  state.entryType = type;
  document.querySelectorAll("[data-entry-type]").forEach((button) => {
    button.classList.toggle("active", button.dataset.entryType === type);
  });
}

function setRecurringType(type) {
  state.recurringType = type;
  document.querySelectorAll("[data-recurring-type]").forEach((button) => {
    button.classList.toggle("active", button.dataset.recurringType === type);
  });
}

function handleEntrySubmit(event) {
  event.preventDefault();
  const entry = {
    id: state.entryEditId || crypto.randomUUID(),
    name: elements.entryName.value.trim(),
    amount: roundCurrency(Number(elements.entryAmount.value)),
    type: state.entryType,
    category: elements.entryCategory.value,
    date: elements.entryDate.value,
    paymentMethod: elements.entryPaymentMethod.value,
    notes: elements.entryNotes.value.trim(),
  };

  if (!entry.name || entry.amount <= 0 || !entry.date) {
    showToast("Enter a valid name, amount, and date.");
    return;
  }

  if (state.entryEditId) {
    state.data.entries = state.data.entries.map((item) => item.id === state.entryEditId ? entry : item);
    showToast("Entry updated.");
  } else {
    state.data.entries.unshift(entry);
    showToast("Entry added.");
  }

  persistCurrentUser();
  closeModal("entry");
  renderDashboard();
}

function deleteEntry(id) {
  state.data.entries = state.data.entries.filter((entry) => entry.id !== id);
  persistCurrentUser();
  renderDashboard();
  showToast("Entry deleted.");
}

function openBudgetModal() {
  elements.budgetFormRows.innerHTML = "";
  state.data.categories.forEach((category) => {
    const row = document.createElement("label");
    row.innerHTML = `
      <span>${escapeHtml(category)}</span>
      <input type="number" min="0" step="0.01" data-budget-category="${category}" value="${state.data.categoryBudgets[category] || ""}" placeholder="0" />
    `;
    elements.budgetFormRows.appendChild(row);
  });
  openModal("budget");
}

function handleBudgetFormSubmit(event) {
  event.preventDefault();
  const nextBudgets = {};
  elements.budgetFormRows.querySelectorAll("[data-budget-category]").forEach((input) => {
    const value = roundCurrency(Number(input.value));
    if (value > 0) {
      nextBudgets[input.dataset.budgetCategory] = value;
    }
  });
  state.data.categoryBudgets = nextBudgets;
  persistCurrentUser();
  closeModal("budget");
  renderDashboard();
  showToast("Category budgets saved.");
}

function openRecurringModal() {
  elements.recurringForm.reset();
  elements.recurringStartDate.value = getToday();
  elements.recurringCategory.value = state.data.categories[0] || "Other";
  setRecurringType("expense");
  openModal("recurring");
}

function handleRecurringSubmit(event) {
  event.preventDefault();
  const item = {
    id: crypto.randomUUID(),
    name: elements.recurringName.value.trim(),
    amount: roundCurrency(Number(elements.recurringAmount.value)),
    category: elements.recurringCategory.value,
    type: state.recurringType,
    frequency: elements.recurringFrequency.value,
    startDate: elements.recurringStartDate.value,
  };

  if (!item.name || item.amount <= 0 || !item.startDate) {
    showToast("Enter a valid recurring item.");
    return;
  }

  state.data.recurring.unshift(item);
  persistCurrentUser();
  closeModal("recurring");
  renderDashboard();
  showToast("Recurring item added.");
}

function deleteRecurring(id) {
  state.data.recurring = state.data.recurring.filter((item) => item.id !== id);
  persistCurrentUser();
  renderDashboard();
  showToast("Recurring item deleted.");
}

function renderCategoryOptions() {
  const filterValue = elements.filterCategory.value || "All";
  const entryValue = elements.entryCategory.value;
  const recurringValue = elements.recurringCategory.value;

  setSelectOptions(elements.filterCategory, ["All", ...state.data.categories], filterValue);
  setSelectOptions(elements.entryCategory, state.data.categories, entryValue);
  setSelectOptions(elements.recurringCategory, state.data.categories, recurringValue);
}

function setSelectOptions(select, options, desiredValue) {
  select.innerHTML = "";
  options.forEach((option) => {
    const node = document.createElement("option");
    node.value = option;
    node.textContent = option;
    select.appendChild(node);
  });
  select.value = options.includes(desiredValue) ? desiredValue : options[0];
}

function toggleCategoryCreator() {
  elements.categoryCreator.hidden = !elements.categoryCreator.hidden;
  if (!elements.categoryCreator.hidden) {
    elements.newCategoryName.focus();
  }
}

function handleCreateCategory() {
  const category = toTitleCase(elements.newCategoryName.value.trim());
  if (!category) {
    showToast("Enter a category name first.");
    return;
  }
  if (state.data.categories.some((item) => item.toLowerCase() === category.toLowerCase())) {
    showToast("That category already exists.");
    return;
  }
  state.data.categories.push(category);
  persistCurrentUser();
  renderCategoryOptions();
  elements.entryCategory.value = category;
  elements.recurringCategory.value = category;
  elements.newCategoryName.value = "";
  elements.categoryCreator.hidden = true;
  showToast("Category created.");
}

function importData(event) {
  const [file] = event.target.files || [];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const payload = JSON.parse(String(reader.result));
      const imported = normalizeUserData(payload, { name: state.data.name, email: state.data.email });
      state.data = {
        ...state.data,
        ...imported,
        name: state.data.name,
        email: state.data.email,
        onboardingCompleted: true,
      };
      persistCurrentUser();
      prepareDashboard();
      showToast("Data imported.");
    } catch {
      showToast("Import failed. Use a valid ExpenseTrail JSON file.");
    } finally {
      elements.importFile.value = "";
    }
  };
  reader.readAsText(file);
}

function exportJson() {
  const payload = JSON.stringify(state.data, null, 2);
  downloadFile(payload, `expense-trail-${getToday()}.json`, "application/json");
  showToast("JSON exported.");
}

function exportCsv() {
  const rows = [
    ["id", "type", "name", "amount", "category", "date", "paymentMethod", "notes"],
    ...state.data.entries.map((entry) => [
      entry.id,
      entry.type,
      entry.name,
      entry.amount,
      entry.category,
      entry.date,
      entry.paymentMethod,
      entry.notes || "",
    ]),
  ];

  const csv = rows.map((row) => row.map(escapeCsv).join(",")).join("\n");
  downloadFile(csv, `expense-trail-${getToday()}.csv`, "text/csv");
  showToast("CSV exported.");
}

function downloadFile(content, fileName, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

function escapeCsv(value) {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, '""')}"`;
}

function handleRangeChange() {
  elements.customRangeFields.hidden = elements.filterRange.value !== "custom";
  renderDashboard();
}

function toggleTheme() {
  elements.body.classList.toggle("light");
  localStorage.setItem(
    STORAGE_KEYS.theme,
    elements.body.classList.contains("light") ? "light" : "dark"
  );
  syncThemeLabel();
  renderChart(getEntriesInRange("month").filter((entry) => entry.type === "expense"));
}

function applySavedTheme() {
  if (localStorage.getItem(STORAGE_KEYS.theme) === "light") {
    elements.body.classList.add("light");
  }
}

function syncThemeLabel() {
  elements.themeToggleLabel.textContent = elements.body.classList.contains("light") ? "Dark" : "Light";
}

function logout() {
  localStorage.removeItem(STORAGE_KEYS.session);
  state.currentUser = null;
  state.data = createEmptyUserData();
  state.entryEditId = null;
  showScreen("auth");
  setAuthMode("login");
  showToast("Logged out.");
}

function openModal(name) {
  const modal = elements[`${name}Modal`];
  if (!modal) {
    return;
  }
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal(name) {
  const modal = elements[`${name}Modal`];
  if (!modal) {
    return;
  }
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
}

function handleEscape(event) {
  if (event.key !== "Escape") {
    return;
  }
  ["entry", "budget", "recurring"].forEach((name) => closeModal(name));
}

function showToast(message) {
  clearTimeout(state.toastTimer);
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  state.toastTimer = window.setTimeout(() => {
    elements.toast.classList.remove("show");
  }, 1800);
}

function countRecurringDueThisMonth() {
  const today = new Date(getToday());
  return state.data.recurring.filter((item) => {
    const start = new Date(item.startDate);
    if (item.frequency === "monthly") {
      return start.getDate() <= today.getDate();
    }
    return true;
  }).length;
}

function getCurrentMonthEntriesByType(type) {
  return getEntriesInRange("month").filter((entry) => entry.type === type);
}

function getTopExpenseCategory(expenses) {
  const totals = expenses.reduce((accumulator, entry) => {
    accumulator[entry.category] = (accumulator[entry.category] || 0) + entry.amount;
    return accumulator;
  }, {});

  return Object.entries(totals)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount)[0] || null;
}

function groupEntriesByMonth(entries) {
  const groups = entries.reduce((accumulator, entry) => {
    const key = entry.date.slice(0, 7);
    if (!accumulator[key]) {
      accumulator[key] = [];
    }
    accumulator[key].push(entry);
    return accumulator;
  }, {});

  return Object.entries(groups).map(([key, groupEntries]) => {
    const [year, month] = key.split("-").map(Number);
    return [new Intl.DateTimeFormat("en-IN", { month: "long", year: "numeric" }).format(new Date(year, month - 1, 1)), groupEntries];
  });
}

function getCategoryMeta(category) {
  const index = Math.max(state.data.categories.indexOf(category), 0);
  return {
    color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
    icon: getInitials(category),
  };
}

function createEmptyState(text) {
  const empty = document.createElement("div");
  empty.className = "empty-state";
  empty.textContent = text;
  return empty;
}

function getInitials(text) {
  return text
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "OT";
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function formatDate(value) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function roundCurrency(value) {
  return Math.round((value || 0) * 100) / 100;
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function toTitleCase(value) {
  return String(value)
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

function getToday() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().split("T")[0];
}

function getStartOfMonth() {
  const now = new Date();
  const local = new Date(now.getFullYear(), now.getMonth(), 1);
  const adjusted = new Date(local.getTime() - local.getTimezoneOffset() * 60000);
  return adjusted.toISOString().split("T")[0];
}

function hexToRgba(hex, alpha) {
  const sanitized = hex.replace("#", "");
  const bigint = Number.parseInt(sanitized, 16);
  const red = (bigint >> 16) & 255;
  const green = (bigint >> 8) & 255;
  const blue = bigint & 255;
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[character]));
}
