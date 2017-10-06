;((d => {
    window.template = (id, data, precompile) => {
        if (typeof precompile === 'undefined') {
            precompile = false;
        }

        if (d.getElementById(id) !== null) {
            const pattern = d.getElementById(id).innerHTML;

            if (precompile) {
                if (!window.precompiledT7) {
                    window.precompiledT7 = Template7.compile(pattern);
                }

                return window.precompiledT7(data || {});
            }

            return Template7.compile(pattern)(data || {});
        }
        return '';
    }
}))(document);