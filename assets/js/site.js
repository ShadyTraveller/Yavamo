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

  function setDateMinimum(form) {
    var dateInput = form.querySelector('input[name="preferred_date"]');
    if (!dateInput) {
      return;
    }

    var today = new Date();
    var isoDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    dateInput.min = isoDate;
  }

  function getEndpointCandidates() {
    return ["/api/lead", "/.netlify/functions/lead"];
  }

  async function submitLead(payload) {
    var lastError = new Error("No booking endpoint is available.");
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

        lastError = new Error("Booking endpoint returned " + response.status + ".");
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError;
  }

  function buildMailto(payload) {
    var subject = encodeURIComponent("New Yavamo booking: " + (payload.service_type || "Service request"));
    var body = encodeURIComponent(
      [
        "Name: " + (payload.name || ""),
        "Email: " + (payload.email || ""),
        "Phone: " + (payload.phone || ""),
        "Service: " + (payload.service_type || ""),
        "Property type: " + (payload.property_type || ""),
        "Frequency: " + (payload.service_frequency || ""),
        "Preferred date: " + (payload.preferred_date || ""),
        "Preferred time: " + (payload.preferred_time || ""),
        "Unit size: " + (payload.unit_size || ""),
        "Postal code: " + (payload.postal_code || ""),
        "Address / neighbourhood: " + (payload.service_address || ""),
        "Cancellation policy acknowledged: " + (payload.cancellation_policy_ack || ""),
        "Message: " + (payload.message || ""),
        "UTMs: " + JSON.stringify({
          source: payload.utm_source,
          medium: payload.utm_medium,
          campaign: payload.utm_campaign,
          term: payload.utm_term,
          content: payload.utm_content
        })
      ].join("\n")
    );

    window.location.href = "mailto:book@yavamo.ca?subject=" + subject + "&body=" + body;
  }

  forms.forEach(function (form) {
    setHiddenFields(form);
    setDateMinimum(form);

    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      var status = form.querySelector(".form-status");
      var submitButton = form.querySelector('button[type="submit"]');
      var data = new FormData(form);
      var payload = Object.fromEntries(data.entries());

      if (status) {
        status.className = "form-status";
        status.textContent = "Sending your booking request...";
      }

      if (submitButton) {
        submitButton.disabled = true;
      }

      try {
        await submitLead(payload);
        form.reset();
        setHiddenFields(form);
        setDateMinimum(form);

        if (status) {
          status.className = "form-status success";
          status.textContent = "Thanks. Your booking request is in. We will confirm by email or phone shortly.";
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
