// SRE page scripts — bundled together to produce a single external module
// (avoids Vite inlining small scripts, which would violate script-src 'self' CSP)

import './scroll-reveal';
import './inventory-toggle';
