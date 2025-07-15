
document.addEventListener("DOMContentLoaded", function () {
  // ---------------------- ✅ القائمة (Menu Toggle) ----------------------
  const toggle = document.getElementById("menuToggle");
  const links = document.getElementById("navLinks");

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      links.classList.toggle("active");
    });
  }

  // ---------------------- ✅ سلايدر الصور ----------------------
  let currentSlide = 0;
  const slider = document.getElementById("slider");
  const dots = document.querySelectorAll(".dot");
  const totalSlides = slider?.children.length || 0;

  function showSlide(index) {
    if (!slider) return;
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    slider.style.transform = `translateX(-${index * 100}%)`;
    currentSlide = index;
    updateDots();
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  function goToSlide(index) {
    showSlide(index);
  }

  function updateDots() {
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentSlide);
    });
  }

  showSlide(0);
  setInterval(() => {
    nextSlide();
  }, 5000); // ← Slide تلقائي كل 5 ثواني

  // خلي الدوال global علشان تنفع مع onclick في HTML
  window.nextSlide = nextSlide;
  window.prevSlide = prevSlide;
  window.goToSlide = goToSlide;

  // ---------------------- ✅ نموذج التسجيل ----------------------
  const form = document.getElementById("registerForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const childName = document.querySelector('input[name="child_name"]');
      const childAge = document.querySelector('input[name="child_age"]');
      const notes = document.querySelector('textarea[name="notes"]');
      const messageBox = document.getElementById("message");

      // Reset message
      messageBox.classList.remove("hidden");
      messageBox.style.color = "red";

      // التحقق
      if (childName.value.trim().length < 2) {
        messageBox.textContent = "❌ اسم الطفل يجب أن يكون على الأقل حرفين";
        childName.focus(); return;
      }

      if (childAge.value <= 0 || childAge.value > 10) {
        messageBox.textContent = "❌ العمر يجب أن يكون بين 1 إلى 10 سنوات";
        childAge.focus(); return;
      }

      messageBox.textContent = "⏳ جاري إرسال البيانات...";
      messageBox.style.color = "blue";

      const formData = new FormData(form);
      fetch("register.php", {
        method: "POST",
        body: formData
      })
        .then(res => res.text())
        .then(data => {
          messageBox.style.color = "green";
          messageBox.textContent = data;
          form.reset();
          setTimeout(() => messageBox.classList.add("hidden"), 5000);
        })
        .catch(() => {
          messageBox.style.color = "red";
          messageBox.textContent = "❌ حدث خطأ أثناء الإرسال.";
        });
    });
  }

  // ---------------------- ✅ زر الرجوع لأعلى الصفحة ----------------------
  const scrollBtn = document.getElementById("scrollToTop");

  if (scrollBtn) {
    window.addEventListener("scroll", function () {
      scrollBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });

    scrollBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ---------------------- ✅ عرض الصور داخل مودال ----------------------
  window.openImage = function (src) {
    const modal = document.getElementById("imageModal");
    const img = document.getElementById("modalImage");
    if (modal && img) {
      img.src = src;
      modal.style.display = "flex";
    }
  }

  window.closeImage = function () {
    const modal = document.getElementById("imageModal");
    if (modal) modal.style.display = "none";
  }

  window.onclick = function (e) {
    const modal = document.getElementById("imageModal");
    if (e.target === modal) {
      closeImage();
    }
  }
});
