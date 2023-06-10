<h1 align="center">headscale-panel-ui</h1>

<div align="center"> This project is developed based on the go-web-mini project, using a management system scaffold built with Go + Vue. It follows a front-end and back-end separation approach, only including the necessary parts for project development. It incorporates role-based access control (RBAC), is well-structured with reasonable packages, and is concise and easy to expand. The backend in Go includes the use of gin, gorm, jwt, and casbin, while the frontend in Vue is based on vue-element-admin</div>

About Me
-------------------------
This is my first official open source project, and I have little experience with it,
so if you have good advice or techniques, I look forward to talking to you, and you can start by submitting an issue.
If there is an architecture that doesn't fit or changes are significant, I will refactor in due course.

## Installation method
1. Download this project
2. Edit the `.env.production` with your backend host and port
3. Build `npm run build:prod`

## Deployment
Copy files in `dist` to your web server

Front-end supports separate front- and back-end deployments
If you need to deploy the front-end and back-end on the same machine you can use nginx as the web server, see [here](./docs/nginx.md) for configuration

Project Screenshots
-------------------

![Login](./docs/images/login.png)
![User](./docs/images/user.png)
![Role](./docs/images/role.png)
![RolePermission](./docs/images/rolePermission.png)
![Machine](./docs/images/machine.png)
![HeadscaleConfig](./docs/images/headscaleconfig.png)
![Dashboard](./docs/images/dashboard.png)

Backend Project
--------------------
[https://github.com/QianheYu/headscale-panel.git](https://github.com/QianheYu/headscale-panel.git)

## MIT License

    Copyright (c) 2023 QianheYu

