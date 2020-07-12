## Directory Structure

#### Guide
 - `App.tsx` contains routing and access to firebase configuration
 - `setupTests.ts` contains test configuration for Enzyme
 - `jest.config.js` contains custom jest configuration
 - `tsconfig.json` contains configuration for using typescript
 - `webpack.config.json` not used by project currently
 - `index.tsx` connects `.tsx react` code to DOM
 - `App.test.tsx` contains all test cases for rendering application
 - `index.css` contains all custom styles
 - `functions` is a separate npm project that contains firebase cloud functions
 - `auth_views` contains authentication logic for Admin and User sides
 - `views` contains all the different pages that can be rendered
 - `actions, reducers and store` all deal with redux

#### Repo structure

```
TrackIT
├── README.md
├── SECURITY.md
├── firebase.json
├── functions
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│   │   ├── admin
│   │   │   └── admin.ts
│   │   ├── auth
│   │   │   └── auth.ts
│   │   └── index.ts
│   ├── tsconfig.json
│   └── tslint.json
├── handbook.md
├── index.html
├── jest.config.js
├── package-lock.json
├── package.json
├── src
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── actions
│   │   ├── authentication.ts
│   │   └── user.ts
│   ├── assets
│   │   ├── 404.png
│   │   ├── acm-fav.png
│   │   ├── canvasjs.min.js
│   │   └── canvasjs.react.js
│   ├── auth_views
│   │   ├── Admin.tsx
│   │   └── User.tsx
│   ├── components
│   │   ├── Admin
│   │   │   └── Admin.test.tsx
│   │   ├── Layout
│   │   │   ├── ConfirmationDialog.tsx
│   │   │   ├── Loading.tsx
│   │   │   ├── NavBar.tsx
│   │   │   └── WorkshopEditor.tsx
│   │   ├── User
│   │   │   ├── UserProgressBar.tsx
│   │   │   ├── UserWelcome.tsx
│   │   │   └── WorkshopLogin.tsx
│   │   └── Workshop
│   │       ├── CardTile.tsx
│   │       ├── StudentBar.tsx
│   │       ├── Workshop.tsx
│   │       ├── WorkshopBar.tsx
│   │       ├── WorkshopEdit.tsx
│   │       └── WorkshopLevelBar.tsx
│   ├── config
│   │   ├── firebase.ts
│   │   └── interface.ts
│   ├── index.css
│   ├── index.tsx
│   ├── reducers
│   │   ├── authentication.ts
│   │   ├── rootReducer.ts
│   │   └── user.ts
│   ├── setupTests.ts
│   ├── store
│   │   └── store.ts
│   └── views
│       ├── AdminDashboard.tsx
│       ├── Error404.tsx
│       ├── LandingPage.tsx
│       ├── Pricing.tsx
│       └── UserDash.tsx
├── tsconfig.json
└── webpack.config.js
```

![ACM Development](https://www.acmutd.co/brand/Development/Banners/light_dark_background.png)