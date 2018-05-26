## Views

Routing of all view setup first

then this |
          V

 - Home (/)
    - Clone 'slack.com' landing page
    - 'Get Started' link
 - Create User (/signup)
    - Input user info
    - Link to next view
 - Create or Join Organisation (/join)
    - Clone 'slack.com/get-started' page
    - Search input for organisation name - just like creating a Direct Message in Slack
    - Click an organisation to add it
    - Joined organisation list below - click 'Launch' - _target = blank
    - Create organisation form
        - input info
        - on create organisation, create 'lobby' channel
        - on join organisation, join 'lobby' channel
=========================================================================================
 - Organisation (/organisation/:id)
    - buttons to create or join a channel
    - list of members
 - Channel (/channel/:id)
    - list of members
 - Messages (/messages/:type/:id)
    - messages
    - input - Slate editor
        - text formatting - bold, italic
        - click on own message to edit
        - ** click on other message to add reaction **



 - Request to join private organisations
 - Admins accept requests, or submit emails to allow to the organisation
 - Direct Messages
