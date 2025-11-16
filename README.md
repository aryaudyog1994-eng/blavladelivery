# BlaVlaDelivery - ZIP with extra features (Maps placeholder, Chat, Secure Admin placeholder)

This package includes:
- All front-end pages (index, add-parcel, driver-kyc, user-kyc, parcel-tracking, drivers-list, chat, admin, agreement)
- Firebase integration (client) wired in main.js using the firebaseConfig included.
- Chat (per parcel) using Firestore `chats` collection.
- Admin UI protected by an ADMIN_EMAIL constant (change in main.js).
- Cloud Functions placeholder (`functions/index.js`) for server-side tasks.

Important setup steps after uploading to GitHub Pages:
1. Upload all files from this ZIP to the root of your GitHub repo and enable GitHub Pages.
2. In Firebase Console:
   - Enable Authentication: Email/Password and Phone.
   - Add your GitHub Pages domain (https://<username>.github.io) to Authorized domains for Auth.
   - Create Firestore database (start in test mode for development).
   - Configure Storage rules (allow authenticated users to upload during testing).
3. In `main.js` change ADMIN_EMAIL to your admin email (e.g., admin@yourdomain.com).
4. For Phone OTP to work on web, you must add the domain to Firebase Auth allowed domains and ensure reCAPTCHA works.
5. To enable Maps (route preview), add a Google Maps API key and replace placeholder (no maps code shipped).

Security notes:
- This starter is client-side. For production, move admin operations to secure Cloud Functions and tighten Firestore/Storage rules.

If you want, I can now:
- Add Google Maps route preview (I'll need your Google API key).
- Convert admin approve to a secure Cloud Function and trigger email notifications.
- Polish UI texts + full Hindi translations.

Reply which of the above I should implement next and provide any necessary keys (Google Maps API key) or admin email.
