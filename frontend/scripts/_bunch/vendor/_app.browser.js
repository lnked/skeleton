;(function (win) {
 "use strict";

    window.browser = {
        
        is_msie: !1, is_edge: !1, is_chrome: !1, is_trident: !1, is_firefox: !1, is_safari: !1, is_opera: !1,

        name: null,

        version: null,

        browsers: [
            { subString: "Edge",    identity: "MS Edge" },
            { subString: "Chrome",  identity: "Chrome" },
            { subString: "MSIE",    identity: "Explorer" },
            { subString: "Trident", identity: "Explorer" },
            { subString: "Firefox", identity: "Firefox" },
            { subString: "Safari",  identity: "Safari" },
            { subString: "Opera",   identity: "Opera" }
        ],

        searchString: function()
        {
            var _this = this;

            for (var i = 0; i < _this.browsers.length; i++)
            {
                this.versionSearchString = _this.browsers[i].subString;

                if (navigator.userAgent.indexOf(_this.browsers[i].subString) !== -1)
                {
                    return _this.browsers[i].identity.toLowerCase();
                }
            }
        },

        searchVersion: function (ds)
        {
            var index = ds.indexOf(this.versionSearchString);
            
            if (index === -1) {
                return;
            }

            var rv = ds.indexOf("rv:");
            
            if (this.versionSearchString === "Trident" && rv !== -1)
            {
                return parseFloat(ds.substring(rv + 3));
            }
            else
            {
                return parseFloat(ds.substring(index + this.versionSearchString.length + 1));
            }
        },

        changeFlags: function()
        {
            var _this = this;

            for (var i = 0; i < _this.browsers.length; i++)
            {
                if (_this.browsers[i].subString.toLowerCase() === _this.name)
                {
                    _this['is_' + _this.browsers[i].subString.toLowerCase()] = !0;
                }
            }
        },

        init: function()
        {
            this.name = this.searchString() || "Other";
            this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
            
            this.changeFlags();
        }
    };

})(window);