// $('.js-print-btn').on('click', function (e) {
//     e.preventDefault();
//     printContent($(this).attr('href'));
// });
// function printContent(el) { // {{{
//     printcontent = $(el).html();
//     printcontent = printcontent.replace('table table-condensed table-bordered ', '');
//     printcontent = printcontent.replace(new RegExp('<a href=', 'g'), '<nolink _href').replace(new RegExp('<a ', 'g'), '<nolink ').replace(new RegExp('</a>', 'g'), '</nolink>');
// //                      console.log(printcontent);
//     var printDivCSS = new String('<body><style>.td-submit, .btn, .js-errors, input  {display: none;} table {border-collapse: collapse;border-spacing: 0;} table td, table th {border:1px #ccc solid; padding: 5px;}</style>');
//     var printDivAfter = new String('</body>');
//     var newWindow = window.open();
//     newWindow.document.write(printDivCSS + printcontent + printDivAfter);
//     newWindow.document.close();
//     newWindow.focus();
//     newWindow.print();
//     newWindow.close();
// }
