const app = app || {};

((body) => {
  app.layzr = {
    init() {
      const bLazy = new Blazy({
        breakpoints: [
          {
            width: 420,
            src: 'data-src-small'
          }
        ],
        success(element) {
          setTimeout(() => {
            const parent = element.parentNode;
            parent.className = parent.className.replace(
              /\bloading\b/,
              ''
            );
          }, 200);
        }
      });
    }
  };
})(document.body);
