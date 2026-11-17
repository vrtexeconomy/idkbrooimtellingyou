const express = require('express');
const path = require('path');
const app = express();

// 1. Hide that we are using Express (Fixes "Server Version Exposed" warnings)
app.disable('x-powered-by');

// 2. Add all the security headers the scanners were complaining about
app.use((req, res, next) => {
  // Force secure HTTPS connections
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  
  // Stop browsers from guessing file types (MIME Sniffing)
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // Stop hackers from putting your site inside a fake frame (Clickjacking)
  res.setHeader('X-Frame-Options', 'DENY');
  
  // Don't leak URLs to other sites
  res.setHeader('Referrer-Policy', 'no-referrer');
  
  // Block access to camera, microphone, and location
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  // Isolate your site from other tabs
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  
  // Content Security Policy: Tells the browser exactly what is allowed to load
  res.setHeader('Content-Security-Policy', "default-src 'self' https:; script-src 'self' 'unsafe-inline' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https:; connect-src 'self' https:;");

  next();
});

// 3. Serve your website files
app.use(express.static(path.join(__dirname, 'public')));

// NOTE: I deleted the old /api/login route. 
// Since you moved to Firebase Authentication on the frontend, 
// that old route was completely unused and had fake hardcoded passwords 
// in it (a major security risk). It's gone now!

// 4. Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running securely on port ${PORT}`);
});
