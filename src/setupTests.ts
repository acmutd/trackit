import * as Enzyme from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import * as dotenv from 'dotenv';

dotenv.config({path: './.env'});
Enzyme.configure({
  adapter: new Adapter(),
})