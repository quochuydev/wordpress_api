const request = require('request');

const wordpress_api = {
  config: ({ url, username, password }) => {
    return { url, username, password }
  },
  /** 
   * @param {string} input
   * @returns {number} function
   */
  getToken: async ({ url, username, password }) => {
    let it = {};
    it.finalConfig = {};
    it.finalConfig.url = `${url}/wp-json/jwt-auth/v1/token`;
    it.finalConfig.method = 'POST';
    if (typeof it.finalConfig.headers !== 'object') {
      it.finalConfig.headers = {};
    }
    it.finalConfig.headers['Content-Type'] = 'application/json';
    it.finalConfig.body = JSON.stringify({ username, password })
    let res = await wordpress_api.requestPromise(it.finalConfig);
    return res;
  },
  callAPI: (config) => {
    let baseConfig = {

    }
    let finalConfig = Object.assign(baseConfig, config);
    return wordpress_api.requestPromise(finalConfig)
  },
  get: () => {

  },
  post: () => {

  },
  put: () => {

  },
  delete: () => {

  },
  requestPromise: (config) => {
    return new Promise((resolve, reject) => {
      request(config, (err, res, body) => {
        if (err) {
          return reject(err);
        }
        if (res.statusCode >= 400) {
          return reject({ response: res });
        }
        return resolve(res);
      })
    })
  }
}

const test = async () => {
  let url = 'http://localhost:8080/QH1901';
  let res = await wordpress_api.getToken({ url, username: 'admin', password: 'admin' });
  let data = JSON.parse(res.body);
  let { token } = data;
  let post_url = `${url}/wp-json/wp/v2/posts`;
  let opsPosts = {};
  opsPosts.url = post_url;
  opsPosts.method = 'get';
  opsPosts.headers = {
    'Authorization': `Bearer ${token}`
  }
  // let posts = await wordpress_api.requestPromise(opsPosts);
  let API = {};
  API.POST = {
    GET: {
      method: 'GET',
      url: 'admin/countries.json',
    }
  }
  let posts = await wordpress_api.callAPI(API.POST.GET);
  console.log(JSON.parse(posts.body))
}
test()

module.exports = wordpress_api;