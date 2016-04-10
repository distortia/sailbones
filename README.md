# Sailbones

an [Alphaity](https://alphaity.io) application

Install [Postgres](http://www.postgresql.org/)

Install [Ruby](http://rubyinstaller.org/)

Run `gem install sass`

Run `npm install`

Add a local.js in the `config` folder to create local Postgres connections

Update your database config in `config\connections`, when deploying to a local/remote server

To run the project type `node app.js`

To run prod build type `node app.js --prod`

### Updating NPM Packages
Visit this [Stack Overflow link](http://stackoverflow.com/a/30607722)

or TL;DR

- `npm install -g npm-check-updates`
- `ncu -u` - Updates all node packages in package.json
- `rm -rf node_modules` - Gets rid of old packages
- `npm install` - Installs all updates
