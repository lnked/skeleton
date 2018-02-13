function bind(method, context) {
    // В arguments хранятся все аргументы которые передаются в функцию, даже если они явно не указаны при объявлении функции
    // Эта конструкция вырезает первые 2 аргумента передаваемые в функцию
    // В переменной args будет пустой массив так как будут вырезаны method и context
    var args = Array.prototype.slice.call(arguments, 2);

    return function() {
        console.log(Array.prototype.slice.call(arguments, 0).apply(context, a));
        var a = args.concat(Array.prototype.slice.call(arguments, 0));

        console.log(a);

        return method.apply(context, a);
    }
}

var value = bind('run', 'function');

console.log('value: ', value);
