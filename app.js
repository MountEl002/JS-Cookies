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

//function to delete a cookie
function deleteCookie(name) {
  ducument.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

//Function to update the greeting and theme
function updatePersonalization() {
  const name = getCookie("name");
  const theme = getCookie("theme");
  const greetingElement = document.getElementById("greeting");

  if (name) {
    greetingElement.textContext = `Hello, ${name}!`;
  } else {
    greetingElement.textContent = "Hello, guest!";
  }

  if (theme === "dark") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
}
