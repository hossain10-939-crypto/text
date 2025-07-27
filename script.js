// ========== SECTION NAVIGATION ==========
function showSection(id) {
  document.querySelectorAll("main section").forEach((sec) => {
    sec.classList.remove("active");
  });
  const target = document.getElementById(id);
  if (target) target.classList.add("active");
}

// ========== ON DOM LOAD ==========
document.addEventListener("DOMContentLoaded", () => {
  // ========== GALLERY MODAL FUNCTIONALITY ==========
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-image");
  const modalCaption = document.getElementById("modal-caption");
  const galleryImages = Array.from(document.querySelectorAll(".gallery-item img"));

  let currentIndex = 0;
  let zoomed = false;

  function openModal(index) {
    if (!modal || !modalImg || !modalCaption) return;

    currentIndex = index;
    const img = galleryImages[index];
    modal.style.display = "flex";
    modalImg.src = img.src;
    modalCaption.innerHTML = img.nextElementSibling?.innerHTML || "";
    modalImg.classList.remove("zoomed");
    modalImg.style.cursor = "zoom-in";
    zoomed = false;
  }

  function showNextImage() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    openModal(currentIndex);
  }

  function showPrevImage() {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    openModal(currentIndex);
  }

  galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => openModal(index));
  });

  modalImg?.addEventListener("click", () => {
    zoomed = !zoomed;
    modalImg.classList.toggle("zoomed", zoomed);
    modalImg.style.cursor = zoomed ? "zoom-out" : "zoom-in";
  });

  modal?.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (modal?.style.display !== "flex") return;

    if (e.key === "Escape") closeModal();
    else if (e.key === "ArrowRight") showNextImage();
    else if (e.key === "ArrowLeft") showPrevImage();
  });

  // ========== FORM SUBMISSION SUCCESS MODAL ==========
  const form = document.getElementById("appointmentForm");
  const successModal = document.getElementById("successModal");

  if (form && successModal) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Simulated async submission
      setTimeout(() => {
        form.reset();
        successModal.style.display = "flex";

        // Auto-close modal after 5 seconds
        setTimeout(() => {
          closeModal();
        }, 5000);
      }, 500);
    });
  }

  // ========== DARK MODE TOGGLE ==========
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      themeToggle.textContent = document.body.classList.contains("dark-mode")
        ? "☀️ Light Mode"
        : "🌙 Dark Mode";
    });
  }
});

// ========== GLOBAL FUNCTIONS ==========
function closeModal() {
  const imageModal = document.getElementById("image-modal");
  const successModal = document.getElementById("successModal");

  if (imageModal) imageModal.style.display = "none";
  if (successModal) successModal.style.display = "none";
}

function showNext() {
  const evt = new KeyboardEvent("keydown", { key: "ArrowRight" });
  document.dispatchEvent(evt);
}

function showPrev() {
  const evt = new KeyboardEvent("keydown", { key: "ArrowLeft" });
  document.dispatchEvent(evt);
}