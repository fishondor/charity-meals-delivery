const globalAllEnvironments = require('../globals')

module.exports = {
    HOST: "http://localhost:4200",
    EXAMPLE_DELIVERY: "-MgCwY-ASTUQgR7XD5Li",
    EXAMPLE_DELIVERY_WITH_GROUPS: {
        ID: "-MgCStaky2z4f9V4sJNw",
        CARRIER_INDEX: 3,
        OWNER_INDEX: 0 
    },
    CARRIER_EDIT_TEST: {
        ID: "-MgCStaky2z4f9V4sJNw",
        CARRIER_INDEX: 4,
        OWNER_INDEX: 0 
    },
    SECONDARY_ADMIN_TEST: {
        ID: "-MgCStaky2z4f9V4sJNw",
        SECONDARY_ADMIN_INDEX: 2,
        SECONDARY_ADMIN_EMAIL: "grass.orange.624@example.com",
        OWNER_INDEX: 0 
    },
    ...globalAllEnvironments
}