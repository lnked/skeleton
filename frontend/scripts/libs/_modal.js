const Modal = (function (w,d,b) {

    const settings = {
        close: '.j-close-modal',
        trigger: '.j-open-modal'
    };

    function _clean (s)
    {
        if (s.substr(0, 1) == '#')
        {
            s = s.substr(1);
        }

        return s;
    }

    function _render (t)
    {
        let div = document.createElement('div');
        div.innerHTML = t.trim();
        return div.firstChild;
    }

    function _valid (s)
    {
        if (d.getElementById(`${s}`)) {
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

    function _close (modal, remove)
    {
        modal.classList.remove('is-animated');
        modal.classList.remove('is-visible');
        modal.classList.remove('is-open');
        modal.classList.add('is-hidden');

        if (remove)
        {
            modal.parentNode.removeChild(modal);
        }
    }

    function _show (modal)
    {
        modal.classList.remove('is-hidden');

        modal.classList.add('is-visible');
        modal.classList.add('is-animated');
        modal.classList.add('is-open');
    }

    return {
        hooks () {
            w.onkeydown = (e) => {
                if ((e.which || e.keyCode) == 27)
                {
                    this.close(d.querySelectorAll('.modal.is-open'));
                }
            }
        },

        open (target)
        {
            let selector = '';

            if (target.getAttribute('href'))
            {
                selector = _clean(target.getAttribute('href'));
            }

            if (target.dataset.modal)
            {
                selector = _clean(target.dataset.modal);
            }

            if ((selector = _valid(selector)))
            {
                this.show(selector);
            }
        },

        bind (modal)
        {
            const close = modal.querySelectorAll(settings.close);

            if (close.length)
            {
                for (var i = close.length - 1; i >= 0; i--)
                {
                    close[i].onclick = (e) => {
                        e.preventDefault();
                        this.close(e.target);
                    }
                }
            }
        },

        show (selector)
        {
            const modal = _render(template(selector, {}));

            modal.classList.add('is-temp');

            modal.setAttribute('aria-hidden', false);

            b.appendChild(modal);

            this.bind(modal);

            _show(modal);

            // this.close(d.querySelectorAll('.modal.is-open'), function() {
            //     _show(modal);
            // });
        },

        close (element, callback) {
            if (element.length) {
                for (var i = element.length - 1; i >= 0; i--) {
                    _close(element[i], true);
                }
            }
            else if (element.dataset.target) {
                const modal = d.querySelector(element.dataset.target);

                _close(modal, true);
            }
        },

        nested () {},

        events ()
        {
            const selectors = d.querySelectorAll(settings.trigger);

            if (selectors.length)
            {
                for (var i = selectors.length - 1; i >= 0; i--)
                {
                    selectors[i].onclick = (e) => {
                        e.preventDefault();
                        this.open(e.target);
                    }
                }
            }
        },

        init (options)
        {
            if (typeof options !== 'undefined')
            {
                for (let x in options)
                {
                    if (typeof settings[x] !== 'undefined')
                    {
                        settings[x] = options[x];
                    }
                }
            }

            this.events();
            this.hooks();
        }
    }
}(window, document, document.body));
