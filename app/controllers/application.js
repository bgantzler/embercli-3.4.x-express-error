import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Controller.extend({
  apiService: service("api"),

  actions: {
    async submit() {
      let response = await get(this, "apiService").sendRequest({
        resource: 'common/authenticate',
        data: { username: "testUserName", password: "testPassword", facility: "testFacilityCode" },
        options: {type: 'POST', formEncode: true}
      });
    }
  }
});
