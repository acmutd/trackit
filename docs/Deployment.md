# Deployment & Package.json

### Alias Notes

 - `npm run dev` is an alias for `react-scripts start`

### Deployments

TrackIT has multiple development and production deployments. The purpose of this is to ensure that students/organizations using the service do not suffer from downtime while the application needs to go through testing or updates. Deploying TrackIT involves two separate parts. The web client for the front-end and the serverless backend. 

TrackIT also simultaneously uses two full deployments. The `master` branch is served to be used by _ACM_ Education & other student organizations. The `dev` branch is deployed separately to be used by the _ACM_ Development team behind the project. The `master` version is deployed at https://trackit.acmutd.co and the `dev` version is deployed at `https://dev-trackit.herokuapp.com`. Ideally a merge to `master` for a new release should happen about once per semester.

#### Web Client

The web client is for TrackIT is hosted on heroku. 

This is only required when testing the optimized build or when managing heroku pipeline. Production environments need to use the Production API Keys. These can be set as config vars on heroku. The following is the sequence of commands executed on heroku to start and deploy the application. Note: The TrackIT deployment on heroku does _not_ use a procfile for configuration since the deployment solely consists of a front-end.

- `npm install`
- `npm run build --if-present`
- `npm run heroku-postbuild`
- `serve -s build`

Note: The process to deploy to heroku and firebase hosting is not the same. Heroku deployments will happen automatically when a pull request is merged to `dev`. Use `firebase deploy` when needing to manually deploy to firebase after building the project. While this project does have firebase hosting enabled the DNS setup is configured to use heroku. 

![ACM Development](https://www.acmutd.co/brand/Development/Banners/light_dark_background.png)