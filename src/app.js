
import BreakpointPropogation from './breakpoint-propogation.js';

BreakpointPropogation({
    breakpoints: [
        {1000:  'large'},
        {800:   'small'},
        {400:   'xsmall'}
    ],
    interval: 500,
    appendDOM: true
});

$(window).on('breakpoint-change', function(e,payload) {
    alert('There has been a breakpoint-change: ' +  payload);
});