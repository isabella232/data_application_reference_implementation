/* config.js acts as single passthrough from root, so that backend package is self-contained */

var config = require('../config.js')

require('dotenv').config()


// auth user for testing embeds
config.authenticatedUser = {
    "external_user_id": "user1",
    "first_name": "Pat",
    "last_name": "Embed",
    "session_length": 3600,
    "force_logout_login": true,
    "external_group_id": "group1",
    "group_ids": [],
    "permissions": [
      "access_data",
      "see_looks",
      "see_user_dashboards",
      "explore",
      "save_content",
      "embed_browse_spaces"
    ],
    "models": ["baseball"],
    "user_attributes": { "locale": "en_US" }
  }

module.exports = config