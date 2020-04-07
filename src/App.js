import React from "react";
import Admin from "./Components/Admin/Admin";
import User from "./Components/User/TODO";

function App() {
  return (
    <div>
      {/* replace this with <User /> when wanting to test out the user side, we can decide at a later point when the admin side should appear and when the user side should apper */}
      {/*<Admin />*/}
      <User />
      </div>
  );
}

export default App;
