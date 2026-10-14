(function () {
  var year = String(new Date().getFullYear());
  document.querySelectorAll("[data-year]").forEach(function (node) {
    node.textContent = year;
  });

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  var backdrop = document.createElement("button");
  backdrop.className = "nav-backdrop";
  backdrop.type = "button";
  backdrop.setAttribute("aria-label", "Close menu");
  backdrop.setAttribute("aria-hidden", "true");
  backdrop.tabIndex = -1;
  document.body.appendChild(backdrop);

  function setMenu(open) {
    if (!toggle || !nav) return;
    nav.classList.toggle("is-open", open);
    backdrop.classList.toggle("is-open", open);
    backdrop.setAttribute("aria-hidden", open ? "false" : "true");
    document.body.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Menu");
  }

  function closeMenu() {
    setMenu(false);
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setMenu(!nav.classList.contains("is-open"));
    });

    backdrop.addEventListener("click", closeMenu);

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu();
    });

    window.addEventListener("resize", function () {
      if (window.matchMedia("(min-width: 981px)").matches) closeMenu();
    });
  }

  document.querySelectorAll("[data-contact-form]").forEach(function (form) {
    var params = new URLSearchParams(window.location.search);
    var topic = params.get("topic");
    if (topic && form.elements.subject && !form.elements.subject.value) {
      form.elements.subject.value = topic;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var fields = [
        ["name", "Enter your full name."],
        ["email", "Enter a valid email address."],
        ["subject", "Enter a subject."],
        ["message", "Enter a message of at least 10 characters."]
      ];
      var valid = true;
      var firstInvalid = null;

      fields.forEach(function (pair) {
        var input = form.elements[pair[0]];
        var error = form.querySelector('[data-error="' + pair[0] + '"]');
        var value = input.value.trim();
        var message = "";
        if (!value) message = pair[1];
        if (pair[0] === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) message = pair[1];
        if (pair[0] === "name" && value && value.length < 2) message = pair[1];
        if (pair[0] === "message" && value && value.length < 10) message = pair[1];
        input.setAttribute("aria-invalid", message ? "true" : "false");
        if (error) error.textContent = message;
        if (message) {
          valid = false;
          if (!firstInvalid) firstInvalid = input;
        }
      });

      var status = form.querySelector("[data-form-status]");
      if (!valid) {
        if (status) status.hidden = true;
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var name = form.elements.name.value.trim();
      var email = form.elements.email.value.trim();
      var subject = form.elements.subject.value.trim();
      var message = form.elements.message.value.trim();
      var body = "Name: " + name + "\nEmail: " + email + "\n\n" + message;
      var href = "mailto:info@ztechnologiesltd.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

      if (status) status.hidden = true;
      window.location.href = href;
    });
  });

  var motionOk = !window.matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window;
  if (motionOk) {
    var nodes = document.querySelectorAll(".hero-grid > *, .section-head, .principle, .product, .reason, .form-card, .page-intro, .legal");
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    var seen = 0;
    nodes.forEach(function (node) {
      node.classList.add("reveal");
      var rect = node.getBoundingClientRect();
      var inView = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
      if (inView) {
        node.style.setProperty("--reveal-delay", Math.min(seen, 5) * 80 + "ms");
        seen += 1;
        node.classList.add("is-in");
      } else {
        observer.observe(node);
      }
    });
    document.documentElement.classList.add("motion");
  }
})();
