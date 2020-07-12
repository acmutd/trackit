# Deployment & Package.json

### Alias Notes

##### JS Development on Master

 - `npm run dev` is an alias for `react-scripts start`

##### TS Development on Dev

 - `npm run dev` is an alias for `npm run parcel`
 - `npm run parcel` is an alias for `parcel index.html -p 3000`
 - `npm run test` is an alias for `jest --config=jest.config.js`

### Production

This is only required testing optimized build or when managing heroku pipeline. Production environments need to use the Production API Keys. These can be set as config vars on heroku.

- `npm install`
- `npm run build --if-present`
- `serve -s build`

Note: The process to deploy to heroku and firebase is not the same. Heroku deployments will happen automatically when a pull request is merged to `dev`. Use `firebase deploy` when needing to manually deploy to firebase after building the project.

![ACM Development](https://www.acmutd.co/brand/Development/Banners/light_dark_background.png)