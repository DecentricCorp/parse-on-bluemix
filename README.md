# Parse-on-Bluemix RApp Overview

Parse, the application framework, is shortly to retire. You can still run Parse applications 
yourself thanks to the open-sourced [Parse Server](https://github.com/ParsePlatform/parse-server). 
This project gives you some simple starter code that lets you run the Parse Server on Bluemix. 
You can add a MongoDB service from Compose as the app's storage layer. Optionally you can create a bluemix hosted service.
 [mongodb on bnluemix](https://console.ng.bluemix.net/docs/#services/MongoDB/index.html#MongoDB)

## Application Requirements

* Bluemix Node.js Runtime 
* MongoDB service running somewhere

## Running the app on Bluemix
* Login to bluemix using the CLI 
* Login to containers plugin
```
cf login
cf ic login
```  

* Clone this repo
```
git clone https://github.com/DecentricCorp/parse-on-bluemix.git
cd parse-on-bluemix
```

* Create and push app to Bluemix [Notes](https://new-console.ng.bluemix.net/docs/starters/install_cli.html)
```
cf push app_name
```
*  * Rename app_name to name of your choice

* Create and bind mongoDB service [Notes](https://new-console.ng.bluemix.net/docs/services/MongoDB/index.html#MongoDB)
```
cf create-service mongodb 100 mongodb01
cf bind-service app_name mongodb01
```
* * mongodb01 can be changed to whatever name you prefer

#### Note, your deployment will fail to start because the required env var's are not defined


### Add required environment variables to deployed app

* Log into bluemix and navigate to your newly deployed app
* Click Runtime tab
* Click Environment Variables button
* Add the following entries as User Defined Variables

|Name   |Value  |
| ----- | ----- |
| `APP_ID` | Any string that would be hard to guess |
| `MASTER_KEY` | Any string that would be hard to guess |
| `PARSE_MOUNT` | `/parse` |
| `DATABASE_URI` | mongo url entry from VCAP_Services section |


### Optional
|Name   |Value  |
| ----- | ----- |
|`DATABASE_URI`||
|`FILE_KEY`||
|`CLIENT_KEY`||
|`JS_KEY`||
|`REST_KEY`||
|`DOTNET_KEY`||
|`ALLOW_CLIENT_CLASS_CREATION`||
|`ENABLE_ANONYMOUS_USERS`||
|`OAUTH`||
|`FACEBOOK_APP_IDS`||

* Restart your application via the dashboard
* After a few minutes your dashboard should reflect a green `Your app is running` status

# Test your installation

The easiest way to test the installation is by creating an object and requesting it back

* In Postman (or other API tool) Craft a POST to your endpoint

|`VERB`|`URL`|
| ---- | --- | --- | --- | 
| POST | `http://app_name.mybluemix.net/parse/classes/GameScore` | 

|`HEADER KEY`|`HEADER VALUE`|
| --- | --- | 
X-Parse-Application-Id | `your app_id`
Content-Type | `application/json`

|`BODY METHOD`|`BODY`|
| --- | --- | 
raw | `{"game": "pacman", "score": "123"}`

* You should see a return value similar to this

```
{
  "objectId": "c5Ir2HZVHm",
  "createdAt": "2016-08-26T05:28:16.160Z"
}
```

* To query for this object, again we use Postman

|`VERB`|`URL`|
| ---- | --- | --- | --- | 
| GET | `http://app_name.mybluemix.net/parse/classes/GameScore` | 

|`HEADER KEY`|`HEADER VALUE`|
| --- | --- | 
X-Parse-Application-Id | `your app_id`

* You should see a value similar to this returned

```
{
  "results": [
    {
      "game": "pacman",
      "score": "123",
      "objectId": "c5Ir2HZVHm",
      "createdAt": "2016-08-26T05:28:16.160Z",
      "updatedAt": "2016-08-26T05:28:16.160Z"
    }
  ]
}
```
# Part 2: [Adding a front end dashboard using bluemix containers](https://github.com/DecentricCorp/parse-dashboard#run-on-bluemix)
## Learn more about parse-server here [Parse Server](https://www.raywenderlich.com/128313/parse-server-tutorial)


### Privacy Notice

The Simple Search Service web application includes code to track deployments to Bluemix and other Cloud Foundry platforms. The following information is sent to a [Deployment Tracker](https://github.com/IBM-Bluemix/cf-deployment-tracker-service) service on each deployment:

* Application Name (`application_name`)
* Space ID (`space_id`)
* Application Version (`application_version`)
* Application URIs (`application_uris`)

This data is collected from the `VCAP_APPLICATION` environment variable in IBM Bluemix and other Cloud Foundry platforms. This data is used by IBM to track metrics around deployments of sample applications to IBM Bluemix. Only deployments of sample applications that include code to ping the Deployment Tracker service will be tracked.

### Disabling Deployment Tracking

For manual deploys, deployment tracking can be disabled by removing `require("cf-deployment-tracker-client").track();` from the end of the `app.js` main server file.

#### License

Copyright 2016 IBM Cloud Data Services

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
