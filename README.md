# Denzope – PhonePe Investment Starter

This zip contains a minimal Express + MongoDB backend with PhonePe payment gateway integration
and a React (Vite) client.  
**Fee** = 1 % of amount, **GST** = 18 % of that fee.

## Quick start
```bash
npm install          # installs root, server and client deps via workspaces
cd client && npm run build
cd ../server && node app.js
```
Environment variables are in `.env.example`.
