var Module = (function() {
    // private
    var basket = [];
    
    // public
    return {
        addItem: function(values) {
            basket.push(values);
        },
        getItemCount: function() {
            return basket.length;
        },
        getTotal: function() {
            var q = this.getItemCount(),p=0;
            while(q--){
                p+= basket[q].price; 
            }
            return p;
        }
    }
}());

// Module - это объект со свойствами, которые могут также быть и методами:
Module.addItem({item:'bread', price:0.5});
Module.addItem({item:'butter', price:0.3});

console.log(Module.getItemCount());
console.log(Module.getTotal());

// А следующий ниже код работать не будет:
console.log(Module.basket); // undefined потому что не входит в возвращаемый объект
console.log(basket); // массив доступен только из замыкания