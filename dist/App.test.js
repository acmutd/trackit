"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const enzyme_1 = require("enzyme");
const App_1 = require("./App");
describe("Examining the syntax of Jest tests", () => {
    it("sums numbers", () => {
        expect(1 + 2).toEqual(3);
        expect(2 + 2).toEqual(4);
    });
});
describe('First React component test with Enzyme', () => {
    it('renders without crashing', () => {
        enzyme_1.shallow(react_1.default.createElement(App_1.default, null));
    });
});
//# sourceMappingURL=App.test.js.map