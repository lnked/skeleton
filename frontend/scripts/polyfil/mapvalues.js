function mapValues(obj, map) {
  return Object.keys(obj).reduce((all, key) => {
    all[key] = map(obj[key], key, obj);
    return all;
  }, {});
}

console.log(mapValues({ a: '', b: '', c: '' }, (val, key) => key));

const users = {
  fred: { user: 'fred', age: 40 },
  pebbles: { user: 'pebbles', age: 1 }
};
console.log(mapValues(users, o => o.age));
