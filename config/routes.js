/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  'get /': 'IndexController.index',
  'get /sandcastle/user/login' : 'IndexController.login',
  'get /sandcastle/user/signup' : 'IndexController.signup',
  'get /sandcastle/user/reset' : 'IndexController.reset',
  'get /sandcastle/div/design' : 'DivController.create',
  'post /sandcastle/div/design' : 'DivController.create_post',
  'get /sandcastle/div/div' : 'DivController.div',
  'get /sandcastle/div/edit/:id' : 'DivController.edit',
  'post /sandcastle/div/edit/:id' : 'DivController.edit_post',
  'post /sandcastle/div/delete/:id' : 'DivController.delete_post',
  'get /sandcastle/user/users' : 'UserController.user',
  'get /sandcastle/user/edit/:id' : 'UserController.edit',
  'post /sandcastle/user/edit/:id' : 'UserController.edit_post',
  'post /sandcastle/user/create' : 'UserController.create_post',
  'post /sandcastle/user/delete/:id' : 'UserController.delete_post',
  'post /sandcastle/user/login' : 'SessionController.create',
  'get /sandcastle/user/logout' : 'SessionController.destroy'

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
