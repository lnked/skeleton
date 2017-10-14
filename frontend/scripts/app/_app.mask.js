let app = app || {};

((body => {
    "use strict";

    app.mask = {
        phone(selector = '.mask-phone') {
            const phone = document.querySelectorAll(selector);

            if (phone.length) {
                for (var i = phone.length - 1; i >= 0; i--) {
                    new Cleave(phone[i], {
                        phone: true,
                        phoneRegionCode: 'ru'
                    });
                }
            }
        },

        date(selector = '.mask-date') {
            const date = document.querySelectorAll(selector);

            if (date.length) {
                for (var i = date.length - 1; i >= 0; i--) {
                    new Cleave(date[i], {
                        date: true,
                        datePattern: ['d', 'm', 'Y']
                    });
                }
            }
        },

        card(selector = '.mask-card') {
            const card = document.querySelectorAll(selector);

            if (card.length) {
                for (var i = card.length - 1; i >= 0; i--) {
                    new Cleave(card[i], {
                        numericOnly: true,
                        prefix: '00',
                        delimiter: '',
                        blocks: [2, 4]    
                    });
                }
            }
        },

        init() {
            const _this_ = this;

            _this_.card('.mask-card');
            _this_.date('.mask-date');
            _this_.phone('.mask-phone');

            $('body').on('popup.after_open', function(e, popup) {
                setTimeout(() => {
                    _this_.card($(popup).find('.mask-card'));
                    _this_.date($(popup).find('.mask-date'));
                    _this_.phone($(popup).find('.mask-phone'));
                }, 50);
            });
        }
    };

}))(document.body);

/*
new Cleave('.input-0', {
    creditCard: true,
    onCreditCardTypeChanged: function (type) {
        document.querySelector('.type').innerHTML = type;
    }
});

new Cleave('.input-3', {
    date: true,
    datePattern: ['Y', 'm', 'd'],
    delimiter: '.'
});

new Cleave('.input-4', {
    numeral: true,
    numeralDecimalMark: ',',
    delimiter: '.'
});

new Cleave('.input-1', {
    numeral: true,
    prefix: '$'
});

new Cleave('.input-5', {
    uppercase: true,
    delimiters: ['.', '.', '-'],
    blocks: [3, 3, 3, 2]
});

new Cleave('.input-6', {
    uppercase: true,
    delimiter: '',
    prefix: 'UFO',
    blocks: [3, 6] // or [9]
});

new Cleave('.input-2', {
    numericOnly: true,
    delimiter: '.',
    prefix: 'BE',
    blocks: [5, 3, 3]
});

new Cleave('.input-7', {
    uppercase: true,
    delimiter: '-',
    blocks: [6, 2, 3, 3]
});

new Cleave('.input-8', {
    uppercase: true,
    delimiters: [' ', '|', ' ', ' ', '|', ' ', ' ', '|', ' '],
    blocks: [3, 0, 0, 3, 0, 0, 3, 0, 0, 3, 0]
});
*/