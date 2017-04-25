import {UserIndex} from '../src/components';
import reqAuth, {reqLogin} from '../src/requests/Auth'
import {session } from '../src/stores'
import fakeResp from '../__mocks__/fakeResponses'

jest.mock('axios')

test('App renders', () => {
  const app = mount(
    <UserIndex />
  );
  app.setState({users: fakeResp.userIndex})
  expect(app.html()).toMatch('Users Index')
  expect(app.html()).toMatch(fakeResp.userIndex[0].name)
  expect(app.find('a.nav-item').length).toEqual(3)

});
