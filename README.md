## Views

Routing of all view setup first

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
    - Create organisation form
        - input info
        - on create organisation, create 'lobby' channel
        - on join organisation, join 'lobby' channel

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^    STYLED    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^   FUNCTIONAL   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
==================================   END OF WEEK GOAL   ==========================================

 - Organisation (/organisation/:id)
    - list of members
 - Channel (/channel/:id)
    - list of members
 - Messages (/messages/:type/:id)
    - messages
    - input - Slate editor
        - text formatting - bold, italic
        - click on own message to edit
 - Sockets


 - Little things to touch up:
    - animation on join organisation - before request gets back
        - same thing on create organisation, join/create channel
    - gray div behind modals to cover screen
    - organisation/channel page - display members
        - stretch messages-view div to bottom of screen (where message input was)
    - clean up border on message input
    - on create channel
        - validate channel name = [a-z0-9\-] - front end & back end
    - add logout feature
        - front & back end
    - organize channels on sidenav
        - first public then private
        - lock by private channels
    - search feature in header (top left)
        - search through people and channels



 - After MVP
    - Direct Messages
    - Reactions
    - Request to join private organisations
    - Admins accept requests, or submit emails to allow to the organisation
