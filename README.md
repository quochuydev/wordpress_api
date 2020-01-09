# wordpress_api
https://wordpress.org/plugins/jwt-authentication-for-wp-rest-api/

POST
http://localhost:8080/QH1901/wp-json/jwt-auth/v1/token
{
	"username": "admin",
	"password": "admin"
}

GET
http://localhost:8080/QH1901/wp-json/wp/v2/posts

wp-config.php
define('JWT_AUTH_SECRET_KEY',       'secret');
define('JWT_AUTH_CORS_ENABLE',       true);

