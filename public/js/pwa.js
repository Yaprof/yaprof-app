let deferredPrompt;

/* if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw-notif.js').then((registration) => {
          registration.update();
      }).catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
        });
  })
} */

navigator.storage.persist().then(function (persistent) {
    if (persistent) {
        console.log('Storage will not be cleared except by explicit user action');
    } else {
        console.log('Storage may be cleared by the UA under storage pressure.');
    }
});

try {
    if (window.safari) {
        history.pushState(null, null, location.href);
        window.onpopstate = function (event) {
            history.go(1);
        };
    }
} catch (e) { console.log(e) }

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  /* e.preventDefault(); */
  deferredPrompt = e;
  console.log(`'beforeinstallprompt' event was fired.`);
});

window.addEventListener('load', (e) => {
    
    if (deferredPrompt) {
        deferredPrompt.prompt();
    }
    let buttonInstall = document.getElementById('buttonInstall');
    if (!buttonInstall) return
    buttonInstall.addEventListener('click', async () => {
    // Hide the app provided install promotion
    // Show the install prompt
        if (deferredPrompt) {
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        // Optionally, send analytics event with outcome of user choice
        console.log(`User response to the install prompt: ${outcome}`);
        // We've used the prompt, and can't use it again, throw it away
            deferredPrompt = null;
        }
    });
})

