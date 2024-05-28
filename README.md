# NEXPLORE DUTIES ASSIGNMENT REACT FRONTEND MODULE

## ARCHITECTURE SPECIFICATIONS AND SYSTEM REQUIREMENTS

* Language: Typescript-based Node.JS
* Typescript Version: 5.4.5+
* Node.JS runtime environment: >= 18.20.0 (LTS Recommended)
* React: v18.3.1
* Browser Compatibility: Chrome, Firefox, Safari, Edge, Opera
* Refer to React official documentation for full compatibility list. (https://react.dev)
* Web servers: All, no limit.
* PrimeReact: v10.6.6

## VERSION HISTORY

* 2024-05-28: v1.0.0pre

## RUNTIME CONFIGURATION

### Configuration File

Production Runtime Configuration File: .env.production (npm run build)  

Development Runtime Configuration File: .env.development (npm start)  

Test Runtime Configuration File: .env.test (npm test)

### Configuration Parameters

#### Backend API Webservice Server Configuration

##### HTTP API SERVER HOST

Parameter Key: REACT_APP_HTTP_API_SERVER_HOST  
Description: RESTful JSON Webservice API Server hostname URL 
Default: http://localhost  
Example Values: http://localhost:8080 | http://dev.apiserver.localnet | https://api.contosso.com

## DEPLOYMENT, INSTALLATION AND PRODUCTION ENVIRONMENT

Steps to follow:

1. Download a release package
2. Extract to a web server publicly accessible directory (/ - your webserver public root path)
3. Configure the API Server Host (HTTP_API_SERVER_HOST) in the environment flie (.env.production)

The React web app package runs on the root context path / , i.e. http://<host>/ .

A reverse proxy web server is recommended for URL rewriting, especially when the frontend web application is not exposed to the root context URI.

### Production Considerations

This micro-service full client-side frontend is suitable for all CDN architecture deployments with technically no horizonal scalability limitation.

## THIRD-PARTY REACT COMPONENTS, STYLING, SKINS AND THEMES

This project uses **PrimeReact**, a React version of PrimeFaces based on JSF and J2EE. It is a mature product with over 10 React versions and 12 Java production versions spanning more than a decade since 2008. Official commercial support is available. Refer to https://primereact.org/ for more information.

## AUTHOR AND COPYRIGHT

* Author: Mathew Chan
* Web: [mathewsystems.com](https://www.mathewsystems.com) / [matcphotos.com](https://www.matcphotos.com)
* Contact: mathew (dot) chan (at) mathewsystems.com

## LICENSE, USAGE AND DISTRIBUTION

This software is covered under the Apache License 2.0.  

Refer to license file, LICENSE.md  

## DISCLAIMER

The software is provided as-is, with neither support nor warranty. The author is not responsible for any consequences due to the usage of the software. Use at your own risk.

## DEVELOPMENT

Refer to BUILDING.md file.

## SCREENSHOTS

![Home](https://www.mathewsystems.com/cdn_static/nexplore/duties_screenshots/home_page_screenshot_01.jpg)
![Home](https://www.mathewsystems.com/cdn_static/nexplore/duties_screenshots/duties_page_screenshot_01.jpg)
![Home](https://www.mathewsystems.com/cdn_static/nexplore/duties_screenshots/duties_page_screenshot_02.jpg)
![Home](https://www.mathewsystems.com/cdn_static/nexplore/duties_screenshots/duties_page_screenshot_03.jpg)
![Home](https://www.mathewsystems.com/cdn_static/nexplore/duties_screenshots/duties_page_screenshot_04.jpg)