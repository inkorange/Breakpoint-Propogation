# Breakpoint-Propogation

Adaptive layouts need to programatically listen for breakpoint changes to present the modules specific to the viewport being rendered.

Using basic CSS-based breakpoints do not easily carry over to the design systems setup in our JS-based page layouts.

The following solution allows for breakpoint configuration and broadcasting of the breakpoint value when the screen resizes.

```javascript
BreakpointPropogation({
    breakpoints: [
        {1000:  'large'},
        {800:   'small'},
        {400:   'xsmall'}
    ],
    interval: 500,
    appendDOM: true
});
```

BreakpointPropogation accepts the following params:

*breakpoints*: Array - collection of object literals that define the max-width of the breakpoint as the key and the value is the breakpoint name.

*interval*: Integer - Using a debouncer, this is the throttled value in ms when when to fire the window resize callback.

*appendDOM*: Boolean - If set to true, this will append a `data-breakpoint` attribute to the `<html>` object that represents the current breakpoint. Note that this could slow down performance.

## Broadcasting

When the breakpoint value does change based on a resize event, it is broadcasted to the window object. With jQuery, it can be listened to through the `breakpoint-change` event.

```javascript
$(window).on('breakpoint-change', function(e,payload) {
    alert('There has been a breakpoint-change: ' +  payload);
});
```

The payload param returns the breakpoint value. This will only fire when the value changes, not on every (throttled) resize event.

## Targeting

On every resize, the window width and breakpoint name is bound to the window object. 
 
```javascript
window.breakpoint = {
    width: width,
    name: name
};
```

Within the JS, you can target module rendering based on inspecting this object. If appendDOM is set to be true, you can target the breakpoint name in your cSS with the attribute selector:

```css
html[data-breakpoint="small"] .module {
    display: none;
}
```

TODO: Remove jQuery dependencies, Look to integrate container query logic, optimize codebase.
