let app = app || {};

((body => {
    "use strict";

    const $body = $('body');

    app.goals = {
        init() {
            $('.j-reach-goal').on('click', function(e) {
                const target = $(this).data('target');

                if (target)
                {
                    yaCounter48065972.reachGoal(target);
                }
            });
        }
    };

}))(document.body);

// <button class="button j-reach-goal" data-target="oformitzakaz">Подтвердить заказ</button>
