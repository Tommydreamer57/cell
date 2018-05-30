## Views

Routing of all view setup first

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^     STYLED    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

 - Organisation, Channel, Messages = all nested inside higher order component that renders switch of them, and the sidenav
 - Home (/)
    - Clone 'slack.com' landing page
    - 'Get Started' link
 - Create User & Login are same component, different routes
 - Create User (/signup)
    - Input user info
    - Link to next view
 - Login (/login)
    - Input username & password
 - Create or Join Organisation (/dashboard)
    - Clone 'slack.com/get-started' page
    - Search input for organisation name - just like creating a Direct Message in Slack
    - Click an organisation to add it
    - Joined organisation list below - click 'Launch' - _target = blank

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^   FUNCTIONAL   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

    - Create organisation form
        - input info
        - on create organisation, create 'lobby' channel
        - on join organisation, join 'lobby' channel

==================================   END OF WEEK GOAL   ==========================================

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
