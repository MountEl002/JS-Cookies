// Function to check if the user has consented to cookies
function hasConsented() {
  return getCookie("cookieConsent") === "accepted";
}

// Function to disable the site before getting cookie-consent
function disableSite() {
  document.getElementById("site-overlay").style.display = "block";
  document.getElementById("app").classList.add("blurred");
  document.body.style.overflow = "hidden";
}

//Function to show cookie consent
function showCookieConsent() {
  disableSite();
  document.getElementById("cookie-consent").style.display = "block";
}

//Function to enable the site after obtaining user consent
function enableSite() {
  document.getElementById("site-overlay").style.display = "none";
  document.getElementById("app").classList.remove("blurred");
  document.body.style.overflow = "auto";
}

//Check for cookie consent on page load
if (!hasConsented()) {
  showCookieConsent();
} else {
  enableSite();
  updatePersonalization();
}

//Function to hide cookie Consent
function hideCookieConsent() {
  document.getElementById("cookie-consent").style.display = "none";
  enableSite();
}

// Function to handle cookie consent
function handleCookieConsent(consent) {
  if (consent) {
    setCookie("cookieConsent", "accepted", 365);
  } else {
    // If declined, clear all existing cookies
    deleteCookie("name");
    deleteCookie("theme");
    document.getElementById("preferences-form").reset();
  }
  hideCookieConsent();
  updatePersonalization();
}

// Event Listeners for the consent buttons
document.getElementById("accept-cookies").addEventListener("click", () => {
  handleCookieConsent(true);
  enableSite();
});
document.getElementById("decline-cookies").addEventListener("click", () => {
  handleCookieConsent(false);
  enableSite();
});

// Function to set cookie
function setCookie(name, value, days) {
  const expires = new Date(
    Date.now() + days * 24 * 60 * 60 * 1000
  ).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires}; path=/`;
}

// Function to get a cookie value
function getCookie(name) {
  const cookies = document.cookie.split(";");
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=").map((c) => c.trim());
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}

//Function to get the first name if the user keys in more than one name
function getFirstName(name) {
  return name.trim().split(" ")[0];
}

//function to delete a cookie
function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

//Function to update the greeting and theme
function updatePersonalization() {
  const name = getCookie("name");
  const theme = getCookie("theme");
  const greetingElement = document.getElementById("greeting");

  if (name) {
    greetingElement.textContent = `Hello, ${getFirstName(name)}!`;
  } else {
    greetingElement.textContent = "Hello, guest!";
  }

  if (theme === "dark") {
    document.body.classList.add("dark-mode");
    document.getElementById("cookie-consent").classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
    document.getElementById("cookie-consent").classList.remove("dark-mode");
  }
}

//Event Listener for form submission
document.getElementById("preferences-form").addEventListener("submit", (e) => {
  e.preventDefault();
  if (hasConsented()) {
    const name = document.getElementById("name").value;
    const theme = document.getElementById("theme").value;

    setCookie("name", name, 30);
    setCookie("theme", theme, 30);

    updatePersonalization();
  } else {
    alert("Please accept cookies to save your preferences.");
    showCookieConsent();
  }
});

//Event Listener for clearing cookies
document.getElementById("clear-cookies").addEventListener("click", () => {
  deleteCookie("name");
  deleteCookie("theme");
  deleteCookie("cookieConsent");
  document.getElementById("preferences-form").reset();
  updatePersonalization();
});
