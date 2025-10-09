# Firebase Authentication Setup Guide

## Overview
Your application now has Firebase authentication integrated with both email/password and Google sign-in methods.

## Firebase Console Setup

### 1. Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter a project name (e.g., "CompAI")
4. Follow the setup wizard

### 2. Register Your Web App
1. In your Firebase project, click the web icon (</>) to add a web app
2. Register your app with a nickname
3. Copy the Firebase configuration object

### 3. Enable Authentication Methods
1. In the Firebase Console, go to **Authentication** > **Sign-in method**
2. Enable **Email/Password**:
   - Click on "Email/Password"
   - Toggle "Enable" to ON
   - Save
3. Enable **Google**:
   - Click on "Google"
   - Toggle "Enable" to ON
   - Select a support email
   - Save

### 4. Configure Authorized Domains
1. Go to **Authentication** > **Settings** > **Authorized domains**
2. Add your domains:
   - `localhost` (already added by default)
   - Your production domain (e.g., `yourapp.com`)

## Environment Variables Setup

### 1. Create `.env.local` file
Create a file named `.env.local` in the root of your project:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 2. Get Your Configuration Values
From the Firebase Console:
1. Go to **Project Settings** (gear icon)
2. Scroll down to "Your apps"
3. Find your web app and copy each configuration value
4. Replace the placeholder values in `.env.local`

### 3. Important Notes
- Never commit `.env.local` to version control
- The `.env.local` file is already in `.gitignore`
- All Firebase config variables must be prefixed with `NEXT_PUBLIC_` for Next.js

## Testing Your Setup

### 1. Email/Password Authentication
1. Go to `/signup`
2. Create an account with email and password
3. Check Firebase Console > Authentication > Users to verify

### 2. Google Authentication
1. Go to `/login`
2. Click "Continue with Google"
3. Select a Google account
4. Check Firebase Console > Authentication > Users to verify

## Features Implemented

✅ Email/Password Sign Up
✅ Email/Password Sign In  
✅ Google Sign In/Sign Up
✅ Protected Dashboard (requires authentication)
✅ Logout functionality
✅ Loading states
✅ Error handling
✅ User profile display

## File Structure

```
src/
├── lib/
│   └── firebase.ts              # Firebase configuration
├── contexts/
│   └── AuthContext.tsx          # Authentication context & hooks
├── components/
│   └── ProtectedRoute.tsx       # Route protection wrapper
└── app/
    ├── layout.tsx               # App layout with AuthProvider
    ├── login/
    │   └── page.tsx            # Login page
    ├── signup/
    │   └── page.tsx            # Signup page
    └── dashboard/
        └── page.tsx            # Protected dashboard
```

## Troubleshooting

### Error: "Firebase App not initialized"
- Make sure `.env.local` exists with all required variables
- Restart your development server after creating `.env.local`

### Error: "auth/invalid-api-key"
- Double-check your `NEXT_PUBLIC_FIREBASE_API_KEY` value
- Ensure there are no extra spaces in the `.env.local` file

### Google Sign-In Not Working
- Verify Google is enabled in Firebase Console
- Check that your domain is in the authorized domains list
- For localhost, ensure `http://localhost:3000` is authorized

### Users Can't Access Dashboard
- This is expected if not logged in
- Protected routes redirect to `/login`
- Check browser console for any errors

## Next Steps

1. Set up password reset functionality (already available via `resetPassword` in AuthContext)
2. Add email verification for new signups
3. Implement user profile editing
4. Add role-based access control if needed
5. Set up Firebase security rules for your database

## Support

For Firebase-specific issues, check:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)

