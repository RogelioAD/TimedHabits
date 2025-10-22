// Login button
<a href="http://localhost:3001/auth/google">Login with Google</a>

// Check auth status
fetch('http://localhost:3001/auth/status', { credentials: 'include' })
  .then(res => res.json())
  .then(data => console.log(data));

// Logout
fetch('http://localhost:3001/auth/logout', { 
  method: 'POST', 
  credentials: 'include' 
});

import { requireAuth } from './middleware/auth';

app.get('/protected-route', requireAuth, (req, res) => {
  // This route requires authentication
});