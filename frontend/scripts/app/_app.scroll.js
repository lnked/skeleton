((body) => {
    let cacheSt
    let timer;

    function throttle(action) {
        let isRunning = false;
        return function() {
            if (isRunning) return;
            isRunning = true;
            window.requestAnimationFrame(() => {
                action();
                isRunning = false;
            });
        }
    }


    app.scroll = {
        disableHover() {
            clearTimeout(timer);

            if (!body.classList.contains('disable-hover')) {
                body.classList.add('disable-hover');
            }

            timer = setTimeout(() => {
                body.classList.remove('disable-hover');
            }, 500);
        },

        update(st) {
            this.disableHover();

            console.log('scroll top: ', st);
        },

        bind() {
            window.addEventListener('scroll', throttle(() => {
                this.update(window.scrollY);
            }));

            // body.addEventListener('touchstart', e => {
            // /* doSomething */
            // }, { passive: true });
        },

        init() {
            this.bind();
        }
    };
})(document.body);
