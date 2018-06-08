export default {
    // USER OBJECT
    user: {
        organizations: [],
        channels: []
    },
    // ARRAY OF ORGANIZATIONS USER IS A MEMBER OF
    allOrganizations: [],
    // SELECTED ORGANIZATION
    organization: {
        channels: [],
        members: []
    },
    // DIRECT MESSAGES USER IS INVOLVED IN
    directMessages: [],
    // ROUTER - CONTROLLED BY MEIOSIS-ROUTER
    router: {
        history: {
            location: {}
        },
        match: {
            params: {},
        },
        routes: []
    },
    // NAME OF CURRENT MODAL BEING DISPLAYED
    currentModal: false,
    // CURRENT WIDTH OF THE RESIZABLE SIDEBAR
    sideWidth: '20vw'
}
