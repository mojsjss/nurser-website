  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(() => console.log("✅ تم تفعيل الـ PWA"))
      .catch(err => console.log("❌ خطأ في SW:", err));
  }
  if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js').then(reg => {
    reg.onupdatefound = () => {
      const newWorker = reg.installing;
      newWorker.onstatechange = () => {
        if (newWorker.state === 'installed') {
          if (navigator.serviceWorker.controller) {
            let reload = confirm("⚡ تم إصدار نسخة جديدة، هل تريد التحديث الآن؟");
            if (reload) {
              window.location.reload();
            }
          }
        }
      };
    };
  });
}
  function preventTouchScroll(e) {
    e.preventDefault();
  }

  function openFormPopup() {
    document.getElementById("formPopup").style.display = "block";
    document.getElementById("overlay").style.display = "block";

    // ❌ منع سحب الشاشة باللمس
    document.body.style.overflow = "hidden";
    document.body.addEventListener('touchmove', preventTouchScroll, { passive: false });
  }

  function closeFormPopup() {
    document.getElementById("formPopup").style.display = "none";
    document.getElementById("overlay").style.display = "none";

    // ✅ إرجاع التمرير باللمس
    document.body.style.overflow = "";
    document.body.removeEventListener('touchmove', preventTouchScroll);
  }

  let deferredPrompt;
  const installBtn = document.getElementById('installBtn');

  window.addEventListener('beforeinstallprompt', (e) => {
    // منع ظهور البوب أب التلقائي
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'inline-block'; // أظهر الزر
  });

  installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // إظهار نافذة التثبيت
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('✅ المستخدم وافق على التثبيت');
        installBtn.style.display = 'none';
      } else {
        console.log('❌ المستخدم رفض التثبيت');
      }
      deferredPrompt = null;
    }
  });

document.addEventListener("DOMContentLoaded", function () {
  // استهداف كل الفيديوهات داخل .video-grid
  const videos = document.querySelectorAll('.video-grid video');

  videos.forEach(video => {
    // 📌 عند الضغط على الفيديو: تشغيل/إيقاف
    video.addEventListener('click', function (e) {
      e.preventDefault(); // مهم علشان يمنع التفاعل التلقائي
      if (this.paused) {
        this.play();
      } else {
        this.pause();
      }
    });

    // 📌 عند تشغيل فيديو: إيقاف الباقي
    video.addEventListener('play', () => {
      videos.forEach(other => {
        if (other !== video && !other.paused) {
          other.pause();
        }
      });
    });
  });

  // 📌 إيقاف الفيديوهات اللي خرجت من الشاشة
  function handleScrollPause() {
    videos.forEach(video => {
      const rect = video.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

      if (!isVisible && !video.paused) {
        video.pause();
      }
    });
  }

  window.addEventListener('scroll', handleScrollPause);
  window.addEventListener('load', handleScrollPause);
});

  // ---------------------- ✅ القائمة الجانبية (menu) ----------------------
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  // فتح/غلق المنيو
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // غلق المنيو عند الضغط على أي رابط
  document.querySelectorAll("#navLinks a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });
  // ---------------------- ✅ ايه الوم----------------------
    const verses = [
    { text: "﴿ وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا ﴾", surah: "المزمل: 4" },
    { text: "﴿ إِنَّ مَعَ الْعُسْرِ يُسْرًا ﴾", surah: "الشرح: 6" },
    { text: "﴿ فَاذْكُرُونِي أَذْكُرْكُمْ ﴾", surah: "البقرة: 152" },
    { text: "﴿ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ ﴾", surah: "البقرة: 153" },
    { text: "﴿ إِنَّ اللَّهَ غَفُورٌ رَحِيمٌ ﴾", surah: "المائدة: 74" },
    { text: "﴿ وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ ﴾", surah: "هود: 88" },
    { text: "﴿ إِنَّ رَبِّي لَسَمِيعُ الدُّعَاءِ ﴾", surah: "إبراهيم: 39" },
    // ممكن تضيف آيات أكتر هنا
  ];
  // اختار آية بناءً على اليوم
  const today = new Date().getDate();
  const verseIndex = today % verses.length;

  const dailyVerse = verses[verseIndex];

  // عرض الآية في الصفحة
  document.getElementById("verse").innerHTML = `
    ${dailyVerse.text} <br><span>${dailyVerse.surah}</span>
  `;
  // ---------------------- ✅ سوال اليوم---------------------
const questions = [
  {
    question: "ما أول آية نزلت من القرآن؟",
    choices: ["اقْرَأْ بِاسْمِ رَبِّكَ", "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ", "قُلْ هُوَ اللَّهُ أَحَدٌ", "الٓمّٓ"]
  },
  {
    question: "كم عدد أركان الإسلام؟",
    choices: ["3", "4", "5", "6"]
  },
  {
    question: "ما اسم السورة التي لا تبدأ بالبسملة؟",
    choices: ["الأنفال", "الكوثر", "التوبة", "الضحى"]
  },
  {
    question: "من هو النبي الذي ابتلعه الحوت؟",
    choices: ["موسى", "إبراهيم", "يونس", "عيسى"]
  },
  {
    question: "ما هو أعظم آية في القرآن؟",
    choices: ["آية الكرسي", "سورة الإخلاص", "بداية البقرة", "آية الدين"]
  },
  {
    question: "ما عدد سور القرآن الكريم؟",
    choices: ["113", "114", "115", "112"]
  },
  {
    question: "ما اسم أم النبي محمد ﷺ؟",
    choices: ["خديجة", "فاطمة", "آمنة", "عائشة"]
  },
  {
    question: "ما السورة التي تُسمى قلب القرآن؟",
    choices: ["يس", "الرحمن", "الفاتحة", "النور"]
  },
  {
    question: "من هو أول من آمن من الصبيان؟",
    choices: ["علي بن أبي طالب", "عمر بن الخطاب", "عثمان بن عفان", "عبد الرحمن بن عوف"]
  },
  {
    question: "ما هي القبلة الأولى للمسلمين؟",
    choices: ["المسجد الحرام", "المسجد الأقصى", "المسجد النبوي", "المسجد العمري"]
  }
];

const day = new Date().getDate();
const q = questions[day % questions.length];

const questionElement = document.getElementById("question");
questionElement.innerHTML = `
  <strong>${q.question}</strong>
  <ul>
    ${q.choices.map(choice => `<li>🔹 ${choice}</li>`).join("")}
  </ul>
`;
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

