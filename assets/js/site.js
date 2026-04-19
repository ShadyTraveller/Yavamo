(function () {
  var forms = document.querySelectorAll("[data-lead-form]");
  var params = new URLSearchParams(window.location.search);
  var defaults = {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_term: params.get("utm_term") || "",
    utm_content: params.get("utm_content") || "",
    landing_page: window.location.pathname
  };

  function setHiddenFields(form) {
    Object.keys(defaults).forEach(function (key) {
      var input = form.querySelector('input[name="' + key + '"]');
      if (input) {
        input.value = defaults[key];
      }
    });
  }

  function getEndpointCandidates() {
    return ["/api/lead", "/.netlify/functions/lead"];
  }

  async function submitLead(payload) {
    var lastError = new Error("No lead endpoint is available.");
    var endpoints = getEndpointCandidates();

    for (var i = 0; i < endpoints.length; i += 1) {
      try {
        var response = await fetch(endpoints[i], {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          return await response.json();
        }

        lastError = new Error("Lead endpoint returned " + response.status + ".");
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError;
  }

  function buildMailto(payload) {
    var subject = encodeURIComponent("New Northline GTA lead: " + payload.service_type);
    var body = encodeURIComponent(
      [
        "Name: " + payload.name,
        "Email: " + payload.email,
        "Phone: " + payload.phone,
        "Service: " + payload.service_type,
        "Postal code: " + payload.postal_code,
        "Preferred timing: " + payload.timeline,
        "Message: " + payload.message,
        "UTMs: " + JSON.stringify({
          source: payload.utm_source,
          medium: payload.utm_medium,
          campaign: payload.utm_campaign,
          term: payload.utm_term,
          content: payload.utm_content
        })
      ].join("\n")
    );

    window.location.href = "mailto:hello@northlinegta.ca?subject=" + subject + "&body=" + body;
  }

  forms.forEach(function (form) {
    setHiddenFields(form);

    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      var status = form.querySelector(".form-status");
      var submitButton = form.querySelector('button[type="submit"]');
      var data = new FormData(form);
      var payload = Object.fromEntries(data.entries());

      if (status) {
        status.className = "form-status";
        status.textContent = "Sending your request...";
      }

      if (submitButton) {
        submitButton.disabled = true;
      }

      try {
        await submitLead(payload);
        form.reset();
        setHiddenFields(form);

        if (status) {
          status.className = "form-status success";
          status.textContent = "Thanks. Your request is in. We will reach out shortly.";
        }
      } catch (error) {
        if (status) {
          status.className = "form-status error";
          status.textContent = "Automatic delivery is not configured yet, so opening your email app instead.";
        }

        buildMailto(payload);
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
        }
      }
    });
  });
})();
