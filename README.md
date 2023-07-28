1. Server-side (with web page)
Php, Python, Html, JS, CSS, Docker-compose

2. Client-mobile 
React Native Mobile application 

3. Mysql-data

The below software needs to be installed:
Docker 
React-native-cli

In the server-side directory, there is a `docker-compose.yml`. In this directory 
use command: `docker-compose -d up`
to turn 3 docker containers on. (php-my-admin, mysql, php-apache)

In Php-my-admin web interface, 
import the `gpttrans.sql` in directory Mysql-data

In the Client-mobile directory, 
use command `yarn install ` to install node modules.
use command `react-native start` to start node server, then you may connect your phone to the server ip address, to open the app.
