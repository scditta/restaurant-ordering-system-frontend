# Restaurant Food Ordering System - Front End

[![Netlify Status](https://api.netlify.com/api/v1/badges/1e22a3a1-21ce-43ac-94eb-9521f410a643/deploy-status)](https://app.netlify.com/sites/restaurantorderingsystem/deploys)

## Description

This is the restaurant food ordering system front-end service. This service will use routing capabilities to build a single page application using the [React](https://reactjs.org/) framework. The [Axios](https://github.com/axios/axios) library will be used to send asynchronous HTTP request to REST endpoints. This will allow us to use request methods like get, post, delete, and many more. Additionally, the [React-Bootstrap](https://react-bootstrap.github.io/) framework will be used to implement components containing templates, typography, and extra functionality for JSX and CSS to create a responsive website with a professional look.

## Getting Started

### Installation Process

Clone this repository onto your system.
Be sure to create an environment variable file named .env in the root directory of the react app. The contents of this file should follow this structure:

```
REACT_APP_API_KEY = {askdevforpassword}
REACT_APP_BACKEND_URL = {askdevforurl}
```

### Usage

- To install the package providing all the node.js modules and dependencies.

```
npm install
```

- Always remember to change directory to ros-app

```
cd ros-app
```

- To run this project in your browser; open the terminal in your editor, change to ros-app, and run the command

```
npm start
```

` This will locally open in the browser as http://localhost:3000.`

- Verify the app is running. You should see the following message:

```
Compiled successfully!

You can now view ros-app in the browser.
```

- You should be redirected to the app in the browser. However, in the case that you are not enter this URL:

```
http://localhost:3000
```

## Contributor Guidelines

We love your input! We want to make contributing to our code base as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features

However, to ensure consistency throughout the source code, keep these rules in mind as you are working:

- Ensure to push your code in a seperate branch and wait for the pull request to be reviewed by the team members.
- Create issues for any changes and enhancements that you wish to make. Discuss things transparently and get feedback.
- Follow the rules contained in [Google's JavaScript Style Guide](https://google.github.io/styleguide/javascriptguide.xml) with your code
- Commit your changes using a descriptive commit message
