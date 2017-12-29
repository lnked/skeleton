const leftPad = require('left-pad');
// import leftPad from 'left-pad';

leftPad('foo', 5);
// => "  foo"

leftPad('foobar', 6);
// => "foobar"

leftPad(1, 2, '0');
// => "01"

leftPad(17, 5, 0);
// => "00017"
