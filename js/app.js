async function loadLanding() {
  try {
    const res = await fetch("https://backend-test-dun.vercel.app/api/landing");

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const response = await res.json();

    if (!response.success) {
      throw new Error("No se pudo obtener la landing.");
    }

    const data = response.data;

    // =========================
    // Elementos del DOM
    // =========================
    const heroTitle = document.getElementById("heroTitle");
    const heroSubtitle = document.getElementById("heroSubtitle");
    const heroImage = document.getElementById("heroImage");
    const heroCall = document.getElementById("heroCall");
    const heroWhatsapp = document.getElementById("heroWhatsapp");

    const headerCall = document.getElementById("headerCall");
    const headerWhatsapp = document.getElementById("headerWhatsapp");
    const logo = document.getElementById("logo");

    const servicesGrid = document.getElementById("servicesGrid");
    const benefitsGrid = document.getElementById("benefitsGrid");

    const coverageTitle = document.getElementById("coverageTitle");
    const coverageSubtitle = document.getElementById("coverageSubtitle");
    const coverageImage = document.getElementById("coverageImage");

    const reviewsGrid = document.getElementById("reviewsGrid");

    const footerPhone = document.getElementById("footerPhone");
    const footerWhatsappNumber = document.getElementById(
      "footerWhatsappNumber",
    );
    const footerSchedule = document.getElementById("footerSchedule");
    const footerCoverage = document.getElementById("footerCoverage");
    const footerLogo = document.getElementById("footerLogo");

    // =========================
    // SEO
    // =========================
    document.title = data.seo.title;

    const descriptionMeta = document.querySelector('meta[name="description"]');

    if (descriptionMeta) {
      descriptionMeta.content = data.seo.description;
    }

    // =========================
    // Helpers
    // =========================
    const https = (url) => url.replace(/^http:\/\//, "https://");

    const cleanPhone = (phone) => phone.replace(/\D/g, "");

    // =========================
    // Hero
    // =========================
    heroTitle.textContent = data.hero.title;
    heroSubtitle.textContent = data.hero.subtitle;
    heroImage.src = https(data.hero.image);

    heroCall.textContent = data.hero.buttons.call.text;
    heroCall.href = `tel:${cleanPhone(data.hero.buttons.call.data)}`;

    heroWhatsapp.textContent = data.hero.buttons.whatsapp.text;
    heroWhatsapp.href = `https://wa.me/54${cleanPhone(
      data.hero.buttons.whatsapp.data,
    )}`;

    // =========================
    // Header
    // =========================
    logo.src = https(data.header.logo);

    headerCall.textContent = "Llamar";
    headerCall.href = `tel:${cleanPhone(data.phone)}`;

    headerWhatsapp.textContent = "WhatsApp";
    headerWhatsapp.href = `https://wa.me/54${cleanPhone(data.whatsapp)}`;

    // =========================
    // Servicios
    // =========================
    servicesGrid.innerHTML = data.services
      .map(
        (service) => `
        <div class="card">
            <img src="${https(service.icon)}" alt="${service.title}">
            <h3>${service.title}</h3>
        </div>
      `,
      )
      .join("");

    // =========================
    // Beneficios
    // =========================
    benefitsGrid.innerHTML = data.benefits
      .map(
        (benefit) => `
        <div class="benefit">
            <span>✅</span>
            <span>${benefit}</span>
        </div>
      `,
      )
      .join("");

    // =========================
    // Cobertura
    // =========================
    coverageTitle.textContent = data.coverage.title;
    coverageSubtitle.textContent = data.coverage.subtitle;
    coverageImage.src = https(data.coverage.image);

    // =========================
    // Reviews
    // =========================
    reviewsGrid.innerHTML = data.reviews
      .map(
        (review) => `
        <div class="review">
            <h4>${review.name}</h4>
            <p>${"⭐".repeat(review.score)}</p>
            <p>${review.comment}</p>
        </div>
      `,
      )
      .join("");

    // =========================
    // Footer
    // =========================
    footerPhone.textContent = data.phone;
    footerWhatsappNumber.textContent = data.whatsapp;
    footerSchedule.textContent = data.footer.schedule;
    footerCoverage.textContent = data.coverage.subtitle;
    footerLogo.src = https(data.header.logo);
  } catch (error) {
    console.error("Error cargando la landing:", error);
  }
}

loadLanding();
