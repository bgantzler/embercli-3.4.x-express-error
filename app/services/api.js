import Service from '@ember/service';
import fetch from 'fetch';
import { get, set, computed } from "@ember/object";
import { assign } from '@ember/polyfills';
import { inject as service } from '@ember/service';
import { reject } from 'rsvp';


export default Service.extend({

  configService: service("config"),

  userToken: null,

  /**
   * Contains the fetch api
   * This is for testing to make it easy to mock
   */
  _fetch: fetch,

  /**
   * get the assigned token or the default one
   */
  token: computed.or("userToken", "configService.APP.settings.api.token"),

  /***
   *
   * @param resource
   * @param data - the data to send, this will be JSON.stringified unless options says to form-encode
   * @param options - {
   *                    type: 'GET',    // 'POST', 'PUT', 'DELETE'
   *                    formEncode: false, // For encode the data instead of JSON.stringify
   *                    sort: {   // optional, if specified, will be added to the request
   *                    },
   *                    filter: {  // optional, if string, will be added as is, else will be & separated
   *                    },
   *                    page: {  // optional, if specified, will be added to the request
   *                    }
   *
   *                  }
   * @returns {Promise<*>}
   */
  async sendRequest({resource, data, options}) {

    let fetch = get(this, "_fetch");

    // provide for default options
    let _options = assign({
      timeout: 10000,
      type: 'GET'
    }, options);

    let token = get(this, "token");

    // setup the headers
    let _headers = Object.assign({
      'Authorization': 'Bearer ' + token,
      'Content-type': 'application/json'
    }, _options.headers || {});

    if (data && get(_options, "formEncode")) {
      set(_headers, "Content-type", 'application/x-www-form-urlencoded');
      data = this.transformJsonToUrlEncode(data);
    } else {
      if (data === Object(data)) {
        data = JSON.stringify(data);
      }
    }

    let request = {
      method: get(_options, "type"),
      headers: _headers
    };

    if (data) {
      set(request, "body", data);
    }

    let url = this.buildUrl(resource, _options);

    let response = await fetch(url, request);

    if (response.ok) {
      let json = {};
      try {
        json = response.json()
      } finally {
        // empty
      }
      return json;
    } else {
      this.handleErrors(response.status);
      return reject(response, "Response not valid in apiService");
    }
  },

  handleErrors(status) {
    // if (status === 401) {
    //
    //   let authorization = get(this, 'authorizationService');
    //   authorization.transitionToAuthenticationRoute()
    // }
  },

  buildUrl(resource, options) {
    let configService = get(this, "configService");

    let url = `${get(configService, "APP.settings.api.host")}${get(configService, "APP.settings.api.basePath")}${resource}`;
    let page = this.buildPage(options.page);
    let filter = this.buildFilter(options.filter);
    let sort = this.buildSort(options.sort);

    let paramA = [];
    if (page !== "") { paramA.push(page); }
    if (filter !== "") { paramA.push(filter); }
    if (sort !== "") { paramA.push(sort); }

    let params = paramA.join("&");

    if (params !== "") { url = `${url}?${params}`; }

    return url;
  },

  urlConstants: computed({
    get() {
      return {
        page: {
          number: "page[number]",
          size: "page[size]"
        },
        sort: "sort",
        filter: "filter"
      }
    },
    set(k, v) {
      return v;
    }
  }),

  buildPage(page) {
    if (!page) {
      return "";
    }
  },

  buildSort(sort) {
    if (!sort) {
      return "";
    }
  },

  buildFilter(filter) {
    if (!filter) {
      return "";
    }
  },

  transformJsonToUrlEncode: function (json) {
    let parts = [];
    Object.keys(json).forEach( item => {
      parts.push(`${item}=${json[item]}`);

    });

    return parts.join("&");
  }

});
