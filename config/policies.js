/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#!/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {
  //Allow all, in other words, if its not covered by the other controllers,
  //then pass it through the 'flash' (allow all) policy
  '*': 'flash',

  //Handles all Index controllers, other than the index, this checks if the user
  //is logged off so it can access the signup, login and reset password pages
  index: {
    index: 'flash',
    login: 'isLoggedOut',
    signup: 'isLoggedOut',
    reset: 'isLoggedOut'
  },

  //Handles all of the Div controllers.  Users cannot edit any of the divs unless
  //they have the 'canEdit' attribute set
  div: {
    div: 'canEdit',
    edit: 'canEdit',
    edit_post: 'canEdit',
    create: 'canEdit',
    create_post: 'canEdit',
    delete_post: 'canEdit'
  },

  //Handles all of the User controllers.  Unless a user is signing up, they cannot
  //do anything in terms of editing users unless they are an admin
  user: {
    user: 'isAdmin',
    create_post: 'flash',
    edit: 'isAdmin',
    edit_post: 'isAdmin',
    delete_post: 'isAdmin'
  },

};
