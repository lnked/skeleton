;((d => {
    function template(id, data) {
        if (d.getElementById(id) !== null) {
            const pattern = d.getElementById(id).innerHTML;

            // if (!window.precompiledT7) {
            //     window.precompiledT7 = Template7.compile(pattern);
            // }
            // return window.precompiledT7(data || {});

            return Template7.compile(pattern)(data || {});
        }

        return '';
    }

    window.template = template;
}))(document);