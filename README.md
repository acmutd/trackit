# TrackIT

### Some UI and Backend guidelines

##### Backend

 - Put all backend calls in one Component
 - <Admin /> Component contains all the backend firebase calls for the admin dashboard
 - Have one major component that handles the main page UI but focuses only on the logic of what appears and what should not --> <AdminDashboard />

##### UI

 - Use react-bootstrap package
 - If something renders directly to the entire page --> <AdminDashboard /> or <AdminAuth /> then wrap everything but the Navbar in <Container fluid></Container>
 - Keep UI Components in their own distinct components and render them with one major component that puts everything together
 - Use these classNames from react-bootstrap to handle layout and separation between components ---> "m-1", "m-2", "m-3", "m-4", "m-5" (stick to using m-3 and above, m represents margin)
 - Use className="m-5" for vertical spacing between different elements

 ### Contributors

  - Harsha Srikara
  - Add names below