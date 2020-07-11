# TrackIT

![TrackIT Automated Testing and Continuous Integration](https://github.com/acmutd/TrackIT/workflows/TrackIT%20Automated%20Testing%20and%20Continuous%20Integration/badge.svg)

Real-time workshop and event management software to track attendee progress and deliver content remotely. Learn more on how to use our product in the [User Handbook](./handbook.md).

## Getting Started

Stable release: checkout [master](https://github.com/acmutd/TrackIT/tree/master)

Developer version: checkout [dev](https://github.com/acmutd/TrackIT/tree/dev)

#### Development

##### Quick Start

- `npm install`
- create `.env` file and add firebase Development API Keys (request from team)
- `npm run dev`
- [optional to run test cases] `npm run test`

##### Alias Notes

###### JS Development on Master

 - `npm run dev` is an alias for `react-scripts start`

###### TS Development on Dev

 - `npm run dev` is an alias for `npm run parcel`
 - `npm run parcel` is an alias for `parcel index.html -p 3000`
 - `npm run test` is an alias for `jest --config=jest.config.js`

#### Production

This is only required testing optimized build or when managing heroku pipeline. Production environments need to use the Production API Keys. These can be set as config vars on heroku.

- `npm install`
- `npm run build --if-present`
- `serve -s build`

Note: The process to deploy to heroku and firebase is not the same. Heroku deployments will happen automatically when a pull request is merged to `dev`. Use `firebase deploy` when needing to manually deploy to firebase after building the project.

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

#### Repo structure

```
TrackIT
├── README.md
├── SECURITY.md
├── admin.html
├── firebase.json
├── handbook.md
├── index.html
├── jest.config.js
├── package-lock.json
├── package.json
├── pricing.html
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── Components
│   │   ├── Admin
│   │   │   ├── Admin.test.tsx
│   │   │   ├── Admin.tsx
│   │   │   ├── AdminAuth.tsx
│   │   │   ├── AdminDashboard.tsx
│   │   │   └── __snapshots__
│   │   │       └── Admin.test.tsx.snap
│   │   ├── Config
│   │   │   ├── firebase.ts
│   │   │   └── interface.ts
│   │   ├── Layout
│   │   │   ├── ConfirmationDialog.tsx
│   │   │   ├── Loading.tsx
│   │   │   ├── NavBar.tsx
│   │   │   └── WorkshopEditor.tsx
│   │   ├── Pages
│   │   │   ├── Error404.tsx
│   │   │   ├── LandingPage.tsx
│   │   │   └── Pricing.tsx
│   │   ├── User
│   │   │   ├── User.tsx
│   │   │   ├── UserAuth.tsx
│   │   │   ├── UserDash.tsx
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
│   ├── __snapshots__
│   │   └── App.test.tsx.snap
│   ├── assets
│   │   ├── 404.png
│   │   ├── acm-fav.png
│   │   ├── canvasjs.min.js
│   │   └── canvasjs.react.js
│   ├── index.css
│   ├── index.tsx
│   └── setupTests.ts
├── tsconfig.json
└── webpack.config.js
```

## Pull Request Guide

#### Naming Scheme

- `feature/***-***` for enhancements and additional capabilities
- `fix/***-***` for when bugs are addressed or broken things get fixed into working things
- `update/***-***` for incremental changes that do not add a new feature but rather improve the existing ones
- `internal/***-***` for documentation changes or changes that do not update the functionality of the program

#### Required Information

- Short summary for updates
- Bullet point list that encapsulates in full detail the changes that have been made. No detail is too small
- If there are any known bugs in your branch which will get merged to dev mention them
- Assign developers that worked on the PR
- Assign all other developers on the project as reviewers
- Link any issues that will be resolved by this PR
- Label the PR based on the type of changes made

#### Labelling Pull Requests and Issues

- `Dependencies` needs to be added if versions are incremented or new dependencies are added
- `Enhancement` needs to be added for feature branches and if changes add new functionality to the product
- `Bug` needs to be added for any branches that contain a fix
- `Documentation` needs to be added for a pull request that primary involves readme updates or inline documentation
- `Backend` needs to be added for any branches that primarily involve the backend
- `Frontend` needs to be added for any branches that primarily target the UI
- `Good First Issue` needs to be added for a pull request where the code changes are good for new developers to easily review
- `Internal` neeeds to be added for any changes to the continuous integration, continuous deployment pipelines or the configuration of the product
- `Test` needs to be added when adding new jest/enzyme test cases

Note: The same labels also apply to issues. When creating issues use the available templates to appropriately document required information.

#### Merging Pull Request

- Pull Request must pass testing locally for both assigned and reviewing developer
- Must pass continuous-integration [workflow](https://github.com/acmutd/TrackIT/blob/dev/.github/workflows/nodejs.yml)
- Pull Request must be merged by a reviewer who did _not_ work on the branch
- Packaging a release and merging from `dev` to `master` must happen when all developers are present and the application has undergone a full regression test

[Example Pull Request](https://github.com/acmutd/TrackIT/pull/37)

## Some UI and Backend guidelines

Typescript, typescript and more typescript all the way!

#### Backend

- Put all backend calls in one Component
- `<Admin />` and `<User />` components contain all calls to firestore db [to be refactored]
- Have one major component that handles the main page UI but focuses only on the logic of what appears and what should not --> `<AdminDashboard />`
- Setup firebase configuration in `firebase.ts` and database calls in `firestore.ts` [to be refactored]
- Avoid reading all the data when writing database calls, only query relevant information
- When needing to display aggregate information only use cloud functions to optimize
- Make sure to remove progress listeners when the component unmounts
- An interface used in 2 or more components needs to be defined in `interface.ts`
- Use optional readonly fields for interfaces that correspond to firebase api output
- Use strict required fields for interfaces that define objects used by the frontend

#### UI

- Use react-bootstrap (mostly) & material-ui (if componenet is not available in bootstrap)
- If something renders directly to the entire page --> `<AdminDashboard />` or `<AdminAuth />` then wrap everything but the Navbar in `<Container fluid></Container>`
- Keep UI Components in their own distinct components and render them with one major component that puts everything together
- Use these classNames from react-bootstrap to handle layout and separation between components ---> "m-1", "m-2", "m-3", "m-4", "m-5" (stick to using m-3 and above, m represents margin)
- Use className="m-5" for vertical spacing between different elements
- Use `className="floating-icon"` to keep up with the design pattern being used of everything looking like floating action buttons and tiles

## Contributors

- [Harsha Srikara](https://harshasrikara.com)
- [Sivam Patel]()
- [Anirudh Emmadi]()

#### Questions

Sometimes you may have questions regarding the development of this product. If the answer was not found in this readme please feel free to reach out to the above contributors or the [Director of Development](mailto:comet.acm@gmail.com) for ACM

We request that you be as detailed as possible in your questions, doubts or concerns to ensure that we can be of maximum assistance. Thank you!

![ACM Development](https://www.acmutd.co/brand/Development/Banners/light_dark_background.png)
