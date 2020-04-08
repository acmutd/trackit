# TrackIT

### Some UI and Backend guidelines

##### Backend

 - Put all backend calls in one Component
 - <Admin /> Component contains all the backend firebase calls for the admin dashboard
 - Have one major component that handles the main page UI but focuses only on the logic of what appears and what should not --> <AdminDashboard />

##### UI

 - Use react-bootstrap & material-ui
 - If something renders directly to the entire page --> <AdminDashboard /> or <AdminAuth /> then wrap everything but the Navbar in <Container fluid></Container>
 - Keep UI Components in their own distinct components and render them with one major component that puts everything together
 - Use these classNames from react-bootstrap to handle layout and separation between components ---> "m-1", "m-2", "m-3", "m-4", "m-5" (stick to using m-3 and above, m represents margin)
 - Use className="m-5" for vertical spacing between different elements
 - User className="floating-icon" to keep up with the design pattern being used of everything looking like floating action buttons and tiles

 ### Contributors

  - Harsha Srikara
  - Add names below
  
 ### Getting Started
 
 Checkout the dev branch for the most uptodate code
 
  - npm install
  - npm start

 ### PR Guide
 
 Create branches with the following naming scheme
  - `/feature` for enhancements and additional capabilities
  - `/fix` for when bugs are addressed or broken things get fixed into working things
  - `/update` for incremental changes that do not add a new feature but rather improve the existing ones
  - `/internal` for documentation changes or changes that do not update the functionality of the program
  
Write a short summary of what updates have been performed followed by bullet points that describe the exact changes that have been make. Also include whether there are any bugs or edge cases that have not been addressed. Look at past PRs for further examples. 

For labelling PRs 
 - `Dependency` needs to be added if versions are incremented or new dependencies are added
 - `Enhancement` needs to be added for feature branches and if an update allows for something new being done
 - `Bug` needs to be added for any branches that contain a fix
 - `Documentation` needs to be added for a pr that primary involves readme updates or documenting changes
 - `Backend` needs to be added for any branches that primarily involve the backend
 - `Frontend` needs to be added for any branches that primary target the UI
