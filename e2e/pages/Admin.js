var elements = {
    tabs: '#delivery-tabs',
    carriersTab: '#tab-carriers',
    groupsTab: '#tab-groups',
    groupsList: '#delivery-groups-list',
    tableCarriers: '#table-carriers',
    modalCarrierDelete: '.carrier-delete-modal',
    modalCarrierEdit: '.carrier-edit-modal',
    modalCarrierDeleteCancel: '.carrier-delete-modal .carrier-modal-cancel',
    modalCarrierEditCancel: '.carrier-edit-modal .carrier-modal-cancel'
}

var tabsCommands = {
    openCarriersTab: function() {
        this.waitForElementVisible('@tabs')
        this.waitForElementVisible('@carriersTab')
        this.click('@carriersTab')
        this.waitForElementVisible('@tableCarriers')
    },
    openGroupsTab: function() {
        this.waitForElementVisible('@tabs')
        this.waitForElementVisible('@groupsTab')
        this.click('@groupsTab')
        this.waitForElementVisible('@groupsList')
    },
    closeCarrierEditModal: function() {
        this.waitForElementVisible('@modalCarrierEdit')
        this.waitForElementVisible('@modalCarrierEditCancel')
        this.click('@modalCarrierEditCancel')
        this.waitForElementNotVisible('@modalCarrierEdit')
    },
    closeCarrierDeleteModal: function() {
        this.waitForElementVisible('@modalCarrierDelete')
        this.waitForElementVisible('@modalCarrierDeleteCancel')
        this.click('@modalCarrierDeleteCancel')
        this.waitForElementNotVisible('@modalCarrierDelete')
    }
};

module.exports = {
    commands: [tabsCommands],
    elements: elements
};