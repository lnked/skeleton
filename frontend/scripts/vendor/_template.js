;(function(d){
    function template(id, data) {
        if (d.getElementById(id) !== null) {
            return Template7.compile(d.getElementById(id).innerHTML)(data || {});
        }
        return '';
    }
    window.template = template;
})(document);


<template id="template-users">
{{#each users}}
<li class="item-content">
  <div class="item-inner">
    <div class="item-title">{{title}}</div>
  </div>
</li>
{{/each}}
</template>

template('template-users', {
    "users": [
    {
        "name": "anton",
        "age": "30"
    },
    {
        "name": "edik",
        "age": "30"
    }
]});