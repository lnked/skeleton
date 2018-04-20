let app = app || {};
// Cookies.set('csrftoken', '1QvMN4o9tdxNE4U9NipwrBwyv5WdYIkIc4F2O36oNQjr1kAxxYlR1Br3WhXjoSII');

$.ajaxSetup({
    crossDomain: !0,
    xhrFields: {
        withCredentials: !0
    },
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=utf-8'
    },
    beforeSend: function(xhr) {
        const token = Cookies.get("csrftoken");
        xhr.setRequestHeader('X-CSRFToken', token);
        xhr.setRequestHeader('Cookie', `csrftoken=${token}`);
    }
});

((body) => {
    app = {
        _extend(source, config) {
            if (typeof config !== 'undefined') {
                for (const x in config) {
                    source[x] = config[x];
                }
            }

            return source;
        },

        bind() {
            for (const _ in this) {
                if (typeof this[_] == 'object' && typeof this[_].init !== 'undefined' && typeof this[_].init == 'function') {
                    this[_].init();
                }
            }
        },

        init() {
            this.bind();
        }
    };
})(document.body);
