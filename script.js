const body = document.body;
const toast = document.getElementById("toast");
const modal = document.getElementById("modal");
const progressBar = document.getElementById("progressBar");

const themeBtn = document.getElementById("themeBtn");
const themeIcon = document.getElementById("themeIcon");

const burger = document.getElementById("burger");
const drawer = document.getElementById("drawer");
const closeDrawer = document.getElementById("closeDrawer");

const closeModal = document.getElementById("closeModal");
const closeModalBtn = document.getElementById("closeModalBtn");

const bookingForm = document.getElementById("bookingForm");
const formMsg = document.getElementById("formMsg");

const copyEmail = document.getElementById("copyEmail");

// ---------- helpers ----------
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast._t);
  showToast._t = window.setTimeout(() => toast.classList.remove("show"), 1600);
}

function openModal() {
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.documentElement.style.overflow = "hidden";
}

function closeModalFn() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.documentElement.style.overflow = "";
}

function openDrawer() {
  drawer.classList.add("is-open");
  drawer.setAttribute("aria-hidden", "false");
  document.documentElement.style.overflow = "hidden";
}
function closeDrawerFn() {
  drawer.classList.remove("is-open");
  drawer.setAttribute("aria-hidden", "true");
  document.documentElement.style.overflow = "";
}

// ---------- theme ----------
const THEME_KEY = "apex_theme";
const saved = localStorage.getItem(THEME_KEY);
if (saved === "light") {
  body.classList.add("light");
  themeIcon.textContent = "☀️";
}

themeBtn.addEventListener("click", () => {
  body.classList.toggle("light");
  const isLight = body.classList.contains("light");
  themeIcon.textContent = isLight ? "☀️" : "🌙";
  localStorage.setItem(THEME_KEY, isLight ? "light" : "dark");
});

// ---------- mobile menu ----------
burger.addEventListener("click", openDrawer);
closeDrawer.addEventListener("click", closeDrawerFn);
drawer.addEventListener("click", (e) => {
  if (e.target === drawer) closeDrawerFn();
});
drawer.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => closeDrawerFn())
);

// ---------- modal ----------
// SADA HVATA SVA DUGMAD KOJA IMAJU data-open-booking
document.querySelectorAll("[data-open-booking]").forEach((btn) => {
  btn.addEventListener("click", () => {
    closeDrawerFn();
    openModal();
  });
});
closeModal.addEventListener("click", closeModalFn);
closeModalBtn.addEventListener("click", closeModalFn);

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeDrawerFn();
    closeModalFn();
  }
});

// Plan buttons prefill
document.querySelectorAll("[data-plan]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const plan = btn.getAttribute("data-plan");
    openModal();
    const msg = bookingForm.querySelector('textarea[name="message"]');
    if (msg && plan) msg.value = `Hi! I'm interested in the ${plan} plan.`;
  });
});

// ---------- fake submit (demo) ----------
bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  formMsg.textContent =
    "✅ Request sent (demo). Replace with real backend later.";
  showToast("Sent! (demo)");
  bookingForm.reset();
  window.setTimeout(() => {
    formMsg.textContent = "";
    closeModalFn();
  }, 1200);
});



// ---------- progress bar ----------
window.addEventListener("scroll", () => {
  const h = document.documentElement;
  const scrollTop = h.scrollTop || document.body.scrollTop;
  const height = h.scrollHeight - h.clientHeight;
  const pct = height > 0 ? (scrollTop / height) * 100 : 0;
  progressBar.style.width = `${pct}%`;
});

// ---------- reveal on scroll ----------
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((ent) => {
      if (ent.isIntersecting) {
        ent.target.classList.add("is-visible");
        io.unobserve(ent.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((el) => io.observe(el));