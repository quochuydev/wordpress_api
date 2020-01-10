const request = require('request');

const wordpress_api = {
  config: ({ url, username, password }) => {

  },
  /** 
   * @param {string} input
   * @returns {number} function
   */
  getToken: (input) => {
    return;
  },
  get: () => {

  },
  post: () => {

  },
  put: () => {

  },
  delete: () => {

  }
}

const test = async () => {
  let url_web = 'http://localhost:8080/QH1901';
  let optionsToken = {
    url: `${url_web}/wp-json/jwt-auth/v1/token`,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "username": "admin",
      "password": "admin"
    })
  }
  request(optionsToken, (err, result, body) => {
    let data = JSON.parse(body);
    let { token } = data;
    let post_url = `${url_web}/wp-json/wp/v2/posts`;
    let opsProducts = {
      url: post_url,
      method: 'get',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    request(opsProducts, (err, result, body) => {
      console.log(body)
    })
  })
}
test()

module.exports = wordpress_api;