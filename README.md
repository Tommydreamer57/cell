## Views

Routing of all view setup first

 - Organization, Channel, Messages = all nested inside higher order component that renders switch of them, and the sidenav
 - Home (/)
    - Clone 'slack.com' landing page
    - 'Get Started' link
 - Create User & Login are same component, different routes
 - Create User (/signup)
    - Input user info
    - Link to next view
 - Login (/login)
    - Input username & password
 - Create or Join Organization (/dashboard)
    - Clone 'slack.com/get-started' page
    - Search input for organization name - just like creating a Direct Message in Slack
    - Click an organization to add it
    - Joined organization list below - click 'Launch' - _target = blank
    - Create organization form
        - input info
        - on create organization, create 'lobby' channel
        - on join organization, join 'lobby' channel
 - Organization (/organization/:id)
    - list of members
 - Channel (/channel/:id)
    - list of members

^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^    STYLED    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^   FUNCTIONAL   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
==================================   END OF WEEK GOAL   ==========================================

 - Messages (/messages/:type/:id)
    - messages
    - input - Slate editor
        - text formatting - bold, italic
        - click on own message to edit
 - Sockets

For now, just take on anything in the list below. Let the channel know which feature you are taking and which files you will be in to avoid merge conflicts

 - Little things to touch up:
    - animations on http requests
        - login/signup, join/create organization/channel, send message, logout, etc...
    - Modals:
        - dashboard, sidenav - partially complete on each page
            - gray div behind modals to cover screen - look at how this is done in the sidenav (with the transition)
            - click on gray div to close modal
            - hit Escape to close modal
            - add buttons on the bottom of all modals (Join/Create, Cancel, etc...), including login/signup
    - organization/channel page
        - display members
            - as buttons/links to create a direct message with them (after DMs are built out)
    - clean up border on message input
    - on create channel
        - channel names must be lower case with only letters numbers and dashes, and must be unique per organization (unique constraint in DB)
            - convert channel name if possible - front end
            - validate channel name = [a-z0-9\-] - back end
    - add logout feature
        - styles
        - add logout to the top left sidenav menu
    - Messages:
        - date dividers
            - add line
            - today & yesterday should say today & yesterday
            - on scroll fix latest divider to bottom of header (just like on slack - may take some planning)
        - hover buttons
            - add hover effect to each individual button (change color/background maybe?) (maybe create higher-order component to add labels on hover of certain things)
    -Sidenav:
        - remove transition on hover of buttons
        - organize channels
            - first public then private
            - then alphabetical
            - lock icon by private channels
        - change background on selected channel
            - instead of bold (bold & white will be for new messages)
        - top left header
            - add logout button
            - style dashboard and logout buttons differently from organization links
            - on click off or Escape, close the header
        - drag feature
            - limit drag to 33vw instead of 50vw
            - stop propagation on drag (will this stop hover effects? probably not?)
    - search feature in header (top right)
        - add styles - just like the inputs inside modals
        - search through people and channels
        - dropdown displays people while typing (just like join channel/organization)



 - After MVP
    - Direct Messages
    - Reactions
    - Request to join private organizations
    - Admins accept requests, or submit emails to allow to the organization
