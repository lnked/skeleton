const Modal = (function(w, d, b) {
    const settings = {
        close: '.j-close-modal',
        trigger: '.j-open-modal',
        timeout: 400
    };

    function _clean(s) {
        if (s.substr(0, 1) == '#') {
            s = s.substr(1);
        }

        return s;
    }

    function _render(t) {
        const modalDiv = document.createElement('div');

        modalDiv.id = 'modal-action';
        modalDiv.className = 'modal-action is-hidden';

        modalDiv.innerHTML = [
            '<div class="modal-action__dialog">',
                '<button type="button" class="modal-action__close j-close-modal" aria-label="Закрыть"></button>',
                '<img src="/images/banner-action.jpg" width="100%" class="modal-action__image" alt="" />',
            '</div>'
        ].join('');

        document.body.appendChild(modalDiv);

        return modalDiv;
    }

    function _callback(c) {
        if (typeof c === 'function') {
            c.call(null);
        }
    }

    function _valid(s) {
        if (d.getElementById(s)) {
            return s;
        }

        if (d.getElementById(`tpl-${s}`)) {
            return `tpl-${s}`;
        }

        if (d.getElementById(`tmpl-${s}`)) {
            return `tmpl-${s}`;
        }

        return false;
    }

    function _close(modal, callback, remove) {
        modal.classList.remove('is-animated');
        modal.classList.remove('is-open');

        setTimeout(() => {
            modal.classList.add('is-hidden');

            if (remove) {
                modal.parentNode.removeChild(modal);
            }

            _callback(callback);
        }, settings.timeout);
    }

    function _show(modal) {
        modal.classList.remove('is-hidden');

        setTimeout(() => {
            modal.classList.add('is-animated');
            modal.classList.add('is-open');
        }, 16);

        _focus(modal);
    }

    function _focus(modal) {
        modal.focus();

        const button = d.createElement('button');

        button.style =
            'position:absolute;width:1px;height:1px;opacity:0;right:0px;bottom:0px;background-color:#f00;outline:0;';

        modal.appendChild(button);

        button.onfocus = function() {
            modal.focus();
        };
    }

    return {
        hooks() {
            w.onkeydown = (e) => {
                if ((e.which || e.keyCode) == 27) {
                    this.close(d.querySelectorAll('.modal.is-open'));
                }
            };
        },

        open(target) {
            let selector = '';

            if (target.getAttribute('href')) {
                selector = _clean(target.getAttribute('href'));
            }

            if (target.dataset.modal) {
                selector = _clean(target.dataset.modal);
            }

            if ((selector = _valid(selector))) {
                this.show(selector);
            }
        },

        bind(modal) {
            const close = modal.querySelectorAll(settings.close);

            if (close.length) {
                for (let i = close.length - 1; i >= 0; i--) {
                    close[i].addEventListener('click', (e) => {
                        e.preventDefault();
                        _close(modal);
                    });
                }
            }
        },

        show(selector) {
            const modal = _render();

            this.bind(modal);

            this.closeAll(d.querySelectorAll('.modal.is-open'), () => {
                modal.classList.add('is-temp');

                modal.setAttribute('aria-hidden', false);

                b.appendChild(modal);

                _show(modal);
            });
        },

        close(element, callback) {
            if (element.length) {
                _close(element, callback, true);
            } else if (
                typeof element.dataset !== 'undefined' &&
                element.dataset.target
            ) {
                _close(d.querySelector(element.dataset.target), callback, true);
            } else {
                _callback(callback);
            }
        },

        closeAll(elements, callback) {
            if (elements.length) {
                for (let i = elements.length - 1; i >= 0; i--) {
                    this.close(elements[i]);

                    if (i == (elements.length - 1)) {
                        _callback(callback);
                    }
                }
            }
            else {
                _callback(callback);
            }
        },

        events() {
            const selectors = d.querySelectorAll(settings.trigger);

            if (selectors.length) {
                for (let i = selectors.length - 1; i >= 0; i--) {
                    selectors[i].onclick = (e) => {
                        e.preventDefault();
                        this.open(e.target);
                        return false;
                    };
                }
            }
        },

        init(options) {
            if (typeof options !== 'undefined') {
                for (const x in options) {
                    if (typeof settings[x] !== 'undefined') {
                        settings[x] = options[x];
                    }
                }
            }

            this.events();
            this.hooks();
        }
    };
}(window, document, document.body));

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options) {
    options = options || {};

    var expires = options.expires;

    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires * 1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value;

    for (var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}

((d) => {
    d.addEventListener('DOMContentLoaded', () => {
        Modal.init();

        if (!getCookie('action-modal'))
        {
            setTimeout(function(){
                Modal.show();
            }, 1000);
        }

        var date = new Date();
        date.setTime(date.getTime() + (6 * 60 * 1000));

        setCookie('action-modal', true, {
            expires: date
        })
    });
})(document);
