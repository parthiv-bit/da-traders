# DA TRADERS — Official Business Website & Portal

> Complete business website for **DA Traders** (Mannamkonum, Kerala): Quality paints, experienced painters, compressor equipment rentals, decorative wall murals, 3D wall art, and doorstep delivery service.

- **Live Production URL:** [https://da-traders.web.app](https://da-traders.web.app)
- **GitHub Repository:** [https://github.com/parthiv-bit/da-traders](https://github.com/parthiv-bit/da-traders)
- **Staff Admin Portal:** [https://da-traders.web.app/admin](https://da-traders.web.app/admin)

---

## 🎨 Overview & Purpose

A production-ready business website built with **React 19**, **Vite**, **Tailwind CSS**, **Framer Motion**, and a modular **Firebase** backend architecture (Firestore, Auth, Storage, Hosting).

- **100% Honest & Verified:** All fabricated claims, fake 14k statistics, and artificial badges have been removed.
- **Genuine Contact Workflow:** Validated contact inquiries saved to Firestore `inquiries` collection, plus direct WhatsApp integration.
- **Moderated Customer Reviews:** Community reviews saved to Firestore `reviews` with initial `pending` status. Only admin-approved reviews appear publicly.
- **Newsletter Subscription:** Explicit consent checkbox and duplicate-checking subscription saved to Firestore `subscribers`.
- **Integrated Admin Dashboard (`/admin`):** Staff control panel for inquiries triage, review moderation, subscriber management, service management, and business contact settings.
- **SEO & Accessibility:** Verified LocalBusiness JSON-LD schema, OpenGraph tags, Twitter cards, `sitemap.xml`, `robots.txt`, semantic HTML, and reduced-motion support.

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js**: v18 or higher (tested on Node v24)
- **npm**: v9 or higher

### 2. Installation
```bash
# Clone or navigate into the repository
cd paint-shop

# Install dependencies
npm install
```

### 3. Local Development
```bash
# Start Vite development server
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔐 Admin Portal Access (`/admin`)

- Access URL: [http://localhost:5173/admin](http://localhost:5173/admin) or click the **Staff Login** link in the website footer.
- **Developer / Demo Mode (when Firebase credentials are not yet configured):**
  - **Email:** `admin@datraders.com`
  - **Password:** `admin1234`
- **In Production with Firebase:**
  - Create staff users via Firebase Console > Authentication > Users > Add user.

---

## ☁️ Firebase Configuration & Setup

### 1. Create a Firebase Project
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add project** and name it (e.g., `da-traders-portal`).
3. Enable **Authentication** > Sign-in method > **Email/Password**.
4. Enable **Cloud Firestore** in production mode.
5. Enable **Firebase Storage** (optional, for image assets).
6. Enable **Firebase Hosting**.

### 2. Bind Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Populate with your project keys from Firebase Console (*Project settings > General > Your apps > Web app*):
```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=da-traders-portal.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=da-traders-portal
VITE_FIREBASE_STORAGE_BUCKET=da-traders-portal.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:...
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 3. Deploy Security Rules & Hosting
Install the Firebase CLI if not already installed:
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
```
Select your existing Firebase project, specify `dist` as public directory, and configure single-page app rewrite (already defined in `firebase.json`).

Deploy rules and site:
```bash
npm run build
firebase deploy --only firestore:rules,storage,hosting
```

---

## 🗄️ Database Architecture (Cloud Firestore)

| Collection | Document Fields | Read Rule | Write Rule |
| :--- | :--- | :--- | :--- |
| `inquiries` | `name`, `email`, `phone`, `inquiryType`, `message`, `status` ("new"), `source`, `createdAt` | Admin Only | Public valid submit |
| `reviews` | `name`, `role`, `rating`, `title`, `comment`, `serviceType`, `status` ("pending" / "approved"), `createdAt` | Public (Approved Only) / Admin (All) | Public ("pending" only) / Admin (Approve/Delete) |
| `subscribers` | `email`, `consentGiven`, `status` ("subscribed" / "unsubscribed"), `subscribedAt`, `source` | Admin Only | Public valid submit |
| `products` | `name`, `category`, `description`, `active`, `createdAt` | Public | Admin Only |
| `settings` | `shopName`, `address`, `primaryPhone`, `secondaryPhone`, `email`, `workingHoursWeekday`, `googleMapsShareUrl` | Public | Admin Only |

---

## 🌐 Multi-Environment Architecture (Production vs Development)

This project has two strictly isolated environments:

| Environment | Git Branch | Firebase Project | Live URL | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **Production** | `main` | `da-traders` | [https://da-traders.web.app](https://da-traders.web.app) | Real customers, verified orders & live database |
| **Development** | `development` | `da-traders-dev` | [https://da-traders-dev.web.app](https://da-traders-dev.web.app) | Testing features, staging changes & sandbox database |

### Environment Configuration Files
- `.env.development`: Connected to `da-traders-dev` (loaded during `npm run dev` and `npm run build:dev`).
- `.env.production`: Connected to `da-traders` (loaded during `npm run build:prod`).
- `.firebaserc`: Maps project aliases (`production` -> `da-traders`, `development` -> `da-traders-dev`).

---

## 💻 Daily Development & Deployment Workflow

### 1. Daily Development (Working on features)
Always do day-to-day development work on the `development` branch:
```bash
# Switch to development branch
git checkout development

# Run local development server (automatically connects to da-traders-dev)
npm run dev
```

### 2. Testing & Building Development Bundle
```bash
# Build the development bundle
npm run build:dev

# Test the built files locally
npm run preview
```

### 3. Deploying to Development (Staging)
```bash
# Deploys hosting and security rules to da-traders-dev
npm run deploy:dev
```
Review your deployed changes at: [https://da-traders-dev.web.app](https://da-traders-dev.web.app)

### 4. Merging Approved Changes into Production (`main`)
Once changes are thoroughly tested and verified on `da-traders-dev`:
```bash
# 1. Commit and push any development work
git add .
git commit -m "feat: your completed feature"
git push origin development

# 2. Switch to main branch
git checkout main
git pull origin main

# 3. Merge development into main
git merge development

# 4. Push main to remote repository
git push origin main
```

### 5. Deploying to Production
```bash
# Builds production bundle and deploys to da-traders
npm run deploy:prod
```
Verify the live production website at: [https://da-traders.web.app](https://da-traders.web.app)

---

## 🛠️ Verification & Build Commands

```bash
# Build production bundle with optimized chunking
npm run build

# Preview production build locally
npm run preview
```

---

## 📍 Verified Business Contact Information

- **Business Name:** DA Traders (Dynamic insignia)
- **Address:** Emmanual Cottage, Myloor, Mannamkonum P.O., Kerala, India
- **Primary Line / WhatsApp:** +91 94976 22571
- **Secondary Line:** +91 91884 52571
- **Email:** donaemmanual347@gmail.com
- **Operating Hours:** Monday – Saturday: 7:30 AM – 9:00 PM (Sunday by appointment)
- **Google Maps:** [https://share.google/JdaeUc0MMDbNtK5hT](https://share.google/JdaeUc0MMDbNtK5hT)
