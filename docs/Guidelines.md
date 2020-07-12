# UI & Backend Guidelines

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

![ACM Development](https://www.acmutd.co/brand/Development/Banners/light_dark_background.png)