// (function($) {
  
//   var serviceUrl="https://dadata.ru/api/v2",
//       token = "5ef98f5781a106962077fb18109095f9f11ebac1 ",
//       type  = "ADDRESS",
//       $region = $("#region"),
//       $city   = $("#city"),
//       $street = $("#street"),
//       $house  = $("#house");

//   // регион и район
//   $region.suggestions({
//     serviceUrl: serviceUrl,
//     token: token,
//     type: type,
//     hint: false,
//     bounds: "region-area"
//   });

//   // город и населенный пункт
//   $city.suggestions({
//     serviceUrl: serviceUrl,
//     token: token,
//     type: type,
//     hint: false,
//     bounds: "city-settlement",
//     constraints: $region
//   });
  
//   // улица
//   $street.suggestions({
//     serviceUrl: serviceUrl,
//     token: token,
//     type: type,
//     hint: false,
//     bounds: "street",
//     constraints: $city
//   });

//   // дом
//   $house.suggestions({
//     serviceUrl: serviceUrl,
//     token: token,
//     type: type,
//     hint: false,
//     bounds: "house",
//     constraints: $street
//   });
  
// })(jQuery);

// <section class="info">
//   <p>Работает в версии 15.2+</p>
// </section>
// <section class="container">
//   <h1>Гранулярные подсказки по адресу (регион, город, улица, дом)</h1>
//   <label for="region">Регион / район:</label><input id="region" name="region" type="text" />
//   <br/><br/>
//   <label for="city">Город / населенный пункт:</label><input id="city" name="city" type="text" />
//   <br/><br/>
//   <label for="street">Улица:</label><input id="street" name="street" type="text" />
//   <br/><br/>
//   <label for="house">Дом:</label><input id="house" name="house" type="text" />
//   <br/><br/>
// </section>
