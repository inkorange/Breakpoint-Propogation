
export default function (config) {
    var _params = {
        breakpoints: [],
        interval: 500,
        appendDOM: false,
        onChange: null
    };

    var htmlDOM = document.getElementsByTagName("html")[0];

    var currentName = "";

    var _resolveName = function(width, height) {
        var name = "";
        _params.breakpoints.map(function(val,key) {
            var k = Object.keys(val)[0];
            if(width <= k*1) {
                name = val[k];
            }
        });
        return name;
    };

    var _handleCommunication = function(e, h) {
        var width = typeof e === "object" ? e.currentTarget.innerWidth : e;
        var height = typeof e === "object" ? e.currentTarget.innerHeight : h;
        var name = _resolveName(width);
        window.breakpoint = {
            width: width,
            height: height,
            name: name
        };
        var sizeChangeEvent = new CustomEvent('size-change', { 'detail' : width });
        document.dispatchEvent(sizeChangeEvent);
        if(currentName !== name) {
            var breakpointChngeEvent = new CustomEvent('breakpoint-change', { 'detail': name });
            document.dispatchEvent(breakpointChngeEvent);
            if(_params.onChange) {
                _params.onChange(name);
            }
            if(_params.appendDOM) {
                htmlDOM.setAttribute('data-breakpoint', name);
            }
            currentName = name;
        }
    };

    var throttle = function(type, name, obj) {
        obj = obj || window;
        var running = false;
        var func = function() {
            if (running) { return; }
            running = true;
            requestAnimationFrame(function() {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };

    var _init = function () {
        _params = Object.assign(_params, config);
        document.addEventListener("DOMContentLoaded",
            () => {
                _handleCommunication(window.innerWidth, window.innerHeight);
            }
        );
        throttle("resize", "optimizedResize");
        _bind();
    };

    var _bind = function () {
        window.addEventListener('optimizedResize', _handleCommunication);
    };

    _init();

};
