import * as React from "react";
import { shallow, mount } from "enzyme";
import App from "./App";

describe("Render testing", () => {
  it("shallow render without crashing", () => {
    const component = shallow(<App />);

    expect(component).toMatchSnapshot();

    component.unmount();
  });

  it("full render to DOM without crashing", () => {
    const component = mount(<App />);

    expect(component).toMatchSnapshot();

    component.unmount();
  });
});

// unit tests for env file
describe("env", () => {
  it("should have an api key", () => {
    expect(process.env.REACT_APP_DEV_API_KEY).toBeDefined();
  });
  it("should have an auth domain", () => {
    expect(process.env.REACT_APP_DEV_AUTH_DOMAIN).toBeDefined();
  });
  it("should have a database url", () => {
    expect(process.env.REACT_APP_DEV_DATABASE_URL).toBeDefined();
  });
  it("should have a project id", () => {
    expect(process.env.REACT_APP_DEV_PROJECT_ID).toBeDefined();
  });
  it("should have a storage bucket", () => {
    expect(process.env.REACT_APP_DEV_STORAGE_BUCKET).toBeDefined();
  });
  it("should have a messenger sender id", () => {
    expect(process.env.REACT_APP_DEV_MESSENGER_SENDER_ID).toBeDefined();
  });
  it("should have a app id", () => {
    expect(process.env.REACT_APP_DEV_APP_ID).toBeDefined();
  });
  it("should have a measurement id", () => {
    expect(process.env.REACT_APP_DEV_MEASUREMENT_ID).toBeDefined();
  });
});
