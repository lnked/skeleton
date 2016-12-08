var Filter = (function() {
    // private
    var cache = {};
    
    // public
    return {
        items: null,

        setCache: function(values)
        {
            if (this.items.length)
            {
                var checked = this.items.filter(':checked');

                checked.each(function(i){
                    cache[checked.eq(i).attr('name')] = checked.eq(i).val();
                });
            }
        },
        
        triggers: function()
        {
            this.items.on('change', function(e){
                Filter.setCache();
            });
        },

        init: function($items)
        {
            this.items = $items;

            this.triggers();
        }
    }
}());

Filter.init($('#form').find('input'));

// // Filter - это объект со свойствами, которые могут также быть и методами:
// Filter.addItem({item:'bread', price:0.5});
// Filter.addItem({item:'butter', price:0.3});

// console.log(Filter.getItemCount());
// console.log(Filter.getTotal());

// // А следующий ниже код работать не будет:
// console.log(Filter.basket); // undefined потому что не входит в возвращаемый объект
// console.log(basket); // массив доступен только из замыкания