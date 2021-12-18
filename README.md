# SimpleSocketServer

Quick setup guide to test a simple (but performant) socket server on AWS via a Docker container running on Elastic Beanstalk.
Without dealing with any local env setup or CLIs.

The socket server uses Node.js with the fast C-library uWebSockets.
It doesn't use the node.js platform type on Elastic Beanstalk because it requires glibc for the uWebSockets library.
Instead it uses Docker (alpine-node version 16).

## Quick Setup/Deploy

Log in to AWS.

Go to Elastic Beanstalk.

Create a new environment. It will also ask you to create an Application. Choose a name for both.

Follow the environment setup, choose Web Server environment.

Choose managed platform, pick Docker running on 64bit Amazon Linux 2 (currently version 3.4.9).

Choose to upload local file for source code.

Upload `simple-socket-server.zip`


## Testing

Simply modify the websocket URL in `simple_client.html` to point to the EB environment URL.
If you now run the HTML file, you should see the server send you an Obi-Wan greeting.


## Customize

Make any changes you want to the source files.
To re-deploy, zip up the source code and upload it to the EB environment with the "Upload and deploy" button.

It's important that hidden files and folders are uploaded too! There is a `.ebextensions` folder to increase limits for the socket server.

To re-zip properly on MacOS, use the following terminal command:

`zip simple-socket-server.zip -x "simple-socket-server.zip" -r * .[^.]*`
