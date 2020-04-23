function checkAuthentication() {
    const credentials = localStorage.getItem("credentials");
    const isInLoginPage = window.location.pathname === "login.html";
  
    if (credentials) {
      if (isInLoginPage) {
        window.location.assign("index.html");
      }
      return;
    }
      !isInLoginPage && window.location.assign("login.html");
  }
checkAuthentication();
