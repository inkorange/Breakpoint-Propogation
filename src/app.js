
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

document.addEventListener('breakpoint-change', function(e) {
    alert('There has been a breakpoint-change: ' + e.detail);
});