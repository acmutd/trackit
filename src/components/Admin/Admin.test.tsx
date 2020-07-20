import * as React from "react";
import { shallow, mount } from "enzyme";
import { Button } from "react-bootstrap";
import Admin from "../../auth_views/Admin";
import firebase from "../../config/firebase";
import { Provider } from "react-redux";
import store from "../../store/store";

describe("Render testing", () => {
  it("shallow render without crashing (doesn't actually do anything)", () => {
    // const component = shallow(<Admin database={firebase} />);

    // expect(component).toMatchSnapshot();

    // component.unmount();
  });

  // it("full render to DOM without crashing", () => {
  //   const component = mount(<Admin database={firebase} />);

  //   expect(component).toMatchSnapshot();

  //   component.unmount();
  // });
});

// describe("Authentication testing", () => {
//   it("Admin correct credentials logs admin in", () => {
//     const component = mount(<Admin database={firebase} />);
//     expect(component.state("loggedIn")).toEqual(false);
//     const auth_component = component.find(AdminAuth);

//     auth_component
//       .update()
//       .find('FormControl[type="email"]')
//       .simulate("change", {
//         target: { name: "Username", value: "demoadmin@gmail.com" },
//       });
//     expect(auth_component.state("username")).toEqual("demoadmin@gmail.com");

//     auth_component
//       .update()
//       .find('FormControl[type="password"]')
//       .simulate("change", {
//         target: { name: "Password", value: "Demo123" },
//       });
//     expect(auth_component.state("password")).toEqual("Demo123");

//     auth_component.update().find(Button).simulate("click");

//     expect(component.update().state("loggedIn")).toEqual(false);
//     component.unmount();
//   });

//   it("Admin valid user credentials for user without privelages fails to log user in", () => {
//     const component = mount(<Admin database={firebase} />);
//     expect(component.state("loggedIn")).toEqual(false);
//     const auth_component = component.find(AdminAuth);

//     auth_component
//       .update()
//       .find('FormControl[type="email"]')
//       .simulate("change", {
//         target: { name: "Username", value: "demouser1@gmail.com" },
//       });
//     expect(auth_component.state("username")).toEqual("demouser1@gmail.com");

//     auth_component
//       .update()
//       .find('FormControl[type="password"]')
//       .simulate("change", {
//         target: { name: "Password", value: "Demo123" },
//       });
//     expect(auth_component.state("password")).toEqual("Demo123");

//     auth_component.update().find(Button).simulate("click");

//     expect(component.update().state("loggedIn")).toEqual(false);
//     component.unmount();
//   });

//   it("Admin invalid credentials fails to log in", () => {
//     const component = mount(<Admin database={firebase} />);
//     expect(component.state("loggedIn")).toEqual(false);
//     const auth_component = component.find(AdminAuth);

//     auth_component
//       .update()
//       .find('FormControl[type="email"]')
//       .simulate("change", {
//         target: { name: "Username", value: "randomuser@gmail.com" },
//       });
//     expect(auth_component.state("username")).toEqual("randomuser@gmail.com");

//     auth_component
//       .update()
//       .find('FormControl[type="password"]')
//       .simulate("change", {
//         target: { name: "Password", value: "Random123" },
//       });
//     expect(auth_component.state("password")).toEqual("Random123");

//     auth_component.update().find(Button).simulate("click");

//     expect(component.update().state("loggedIn")).toEqual(false);
//     component.unmount();
//   });
// });
