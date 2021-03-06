const app = app || {};

((body) => {
    app.gallery = {
        bind(selector = '.zoom') {
            if (document.querySelectorAll(selector).length) {
                $(selector).fancybox({
                    loop: true,
                    protect: true,
                    toolbar: true,
                    smallBtn: true,
                    buttons: ['download', 'slideShow', 'close'],
                    margin: [50, 50],
                    image: {
                        preload: 'auto'
                    },
                    animationEffect: 'fade',
                    transitionEffect: 'fade',
                    clickContent(current, event) {
                        return current.type === 'image' ? 'next' : 'close';
                    },
                    mobile: {
                        dblclickContent(current, event) {
                            return current.type === 'image' ? 'zoom' : false;
                        }
                    }
                });
            }
        },

        init() {
            this.bind('.zoom');
        }
    };
})(document.body);
