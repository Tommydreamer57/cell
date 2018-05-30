export default {
    // USER OBJECT
    user: {
        organisations: [],
        channels: []
    },
    // ARRAY OF ORGANISATIONS USER IS A MEMBER OF
    allOrganisations: [],
    // SELECTED ORGANISATION
    organisation: {
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
