// (function($){
//     $.app = {
//         module: {},
//         util: {
//             random: function(max) {
//                 return Math.floor(Math.random()*max);
//             },
//             isIpad: (navigator.userAgent.match(/iPad/i) != null || navigator.userAgent.match(/iPhone/i) != null)
//         },
//         page: {}
//     };

//     $.app.module.sharing = {

//         vk_upload_url: null,

//         openPopup: function(link, popupTitle) {
//             var popup,
//                 width  = 700,
//                 height = 400,
//                 left   = ($(window).width()  - width)  / 2,
//                 top    = ($(window).height() - height) / 2,
//                 url    = this.href,
//                 opts   = 'status=1' +
//                     ',width='  + width  +
//                     ',height=' + height +
//                     ',top='    + top    +
//                     ',left='   + left;

//             popup = window.open(link, popupTitle, opts);
//             popup.focus();

//             return popup;
//         },
//         notifyBackend: function(url) {
//             $.ajax({
//                 url: url,
//                 type: 'get',
//                 dataType: 'json',
//                 success: function(response) {
//                     if(response.status) {
//                         $.app.command(response.command, response.data);
//                     }
//                 }
//             });
//         },
//         vkShare: function(notifyUrl) {
//             VK.Auth.login(function(response) {
//                 if (response.session) {
//                     VK.Api.call('photos.getWallUploadServer', {}, function(response) {
//                         $.ajax({
//                             url: $.app.module.sharing.vk_upload_url,
//                             type: 'post',
//                             dataType: 'json',
//                             data: response.response,
//                             success: function(response) {
//                                 VK.Api.call('photos.saveWallPhoto', response, function(response) {
//                                     var photo = response.response[0];
//                                     $.popup.message({
//                                         message: 'Подтвердите публикацию на стену ВКонтакте',
//                                         button: {
//                                             title: 'Опубликовать',
//                                             onclick: function() {
//                                                 VK.Api.call('wall.post', {
//                                                     message:
//                                                     'Присоединяйся к моей команде и помоги мне выиграть поездку на Финал Лиги Чемпионов УЕФА от ЮниКредит Банка!' +
//                                                     '\n\n' +
//                                                     'Участвуй в розыгрыше главного приза и футбольных мячей с символикой Финального матча турнира. ' +
//                                                     $('.slide-account__content__invite-link__widget a').attr('href'),
//                                                     attachments: photo.id
//                                                 }, function(response) {
//                                                     $.popup.closeAll(true);
//                                                     if (response.response && response.response.post_id)
//                                                     {
//                                                         if (notifyUrl)
//                                                         {
//                                                             $.app.module.sharing.notifyBackend(notifyUrl);
//                                                         }
//                                                     }
//                                                 });
//                                             }
//                                         }
//                                     });
//                                 });
//                             }
//                         });
//                     });
//                 }
//             });
//         },
//         init: function() {
//             var _self = $.app.module.sharing;

//             $('body').on('click', '.social-share', function(e) {
//                 var $link = $(this), href = $link.attr('href'), notifyUrl = $link.data('notifyurl');

//                 e.preventDefault();

//                 if(!$link.hasClass('state-inactive') && !$link.hasClass('state-disabled')) {

//                     if ($link.hasClass('ico-social_vk'))
//                     {
//                         _self.vkShare(notifyUrl);
//                     }
//                     else
//                     {
//                         var share_popup = _self.openPopup(href, null);
//                         if(notifyUrl) {
//                             var interval = setInterval(function() {
//                                 if (!share_popup || share_popup.closed)
//                                 {
//                                     _self.notifyBackend(notifyUrl);
//                                     clearInterval(interval);
//                                 }
//                             }, 1000);
//                         }
//                     }
//                 }
//             });
//         }
//     };
// })(jQuery);