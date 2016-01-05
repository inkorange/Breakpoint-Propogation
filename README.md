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



