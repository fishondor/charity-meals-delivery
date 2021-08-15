const globalAllEnvironments = require('../globals')

module.exports = {
    HOST: "http://localhost:4200",
    EXAMPLE_DELIVERY: "-MgCwY-ASTUQgR7XD5Li",
    EXAMPLE_DELIVERY_WITH_GROUPS: {
        ID: "-MgCStaky2z4f9V4sJNw",
        CARRIER_INDEX: 3,
        OWNER_INDEX: 0 
    },
    ...globalAllEnvironments
}