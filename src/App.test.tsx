import * as React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';

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