import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatDate', function(value) {
    if (value) {
        return moment(String(value)).format('MM/DD/YYYY')
    }
})

Vue.filter('arrayJoin', function(valueArray) {
    if (!valueArray) return ''
    return valueArray.join(', ')
})

Vue.filter('whatsappLink', function(value) {
    if (!value) return ''
    return 'https://wa.me/' + value.replace(/\D/g, "");
})

Vue.filter('wazeUrl', function(value) {
    if (!value) return ''
    return 'https://waze.com/ul?q=' + encodeURIComponent(value)
})