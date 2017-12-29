const app = app || {};

((body) => {
  function CountdownTimer(elm, tl) {
    this.initialize.apply(this, arguments);
  }

  CountdownTimer.prototype = {
    initialize(elm, tl) {
      const elem = document.getElementById(elm);

      if (elem) {
        this.elem = elem;
        this.tl = tl;
        this.countDown();
      }
    },

    countDown() {
      let today = new Date(),
        day = Math.floor((this.tl - today) / (24 * 60 * 60 * 1000)),
        hour = Math.floor(((this.tl - today) % (24 * 60 * 60 * 1000)) /
                        (60 * 60 * 1000)),
        min =
                    Math.floor(((this.tl - today) % (24 * 60 * 60 * 1000)) /
                            (60 * 1000)) % 60,
        sec =
                    (Math.floor(((this.tl - today) % (24 * 60 * 60 * 1000)) / 1000) %
                        60) %
                    60,
        me = this;

      if (this.tl - today > 0) {
        const timer = [
          '<div class="timer__parts__column"><div class="timer__parts__digit">',
          this.addZero(day),
          '</div><div class="timer__parts__caption">',
          declOfNum(day, ['День', 'Дня', 'Дней']),
          '</div></div>',
          '<div class="timer__parts__column"><div class="timer__parts__digit">',
          this.addZero(hour),
          '</div><div class="timer__parts__caption">',
          declOfNum(hour, ['Час', 'Часа', 'Часов']),
          '</div></div>',
          '<div class="timer__parts__column"><div class="timer__parts__digit">',
          this.addZero(min),
          '</div><div class="timer__parts__caption">',
          declOfNum(min, ['Минута', 'Минуты', 'Минут']),
          '</div></div>',
          '<div class="timer__parts__column"><div class="timer__parts__digit">',
          this.addZero(sec),
          '</div><div class="timer__parts__caption">',
          declOfNum(sec, ['Секунда', 'Секунды', 'Секунд']),
          '</div></div>'
        ];

        if (this.elem) {
          this.elem.innerHTML = timer.join('');
          setTimeout(() => {
            me.countDown();
          }, 1000);
        } else {
        }
      } else {
        return false;
      }
    },

    addZero(num) {
      return `0${num}`.slice(-2);
    }
  };

  app.countdown = {
    init() {
      // Акция длится не более 7 - 9 дней
      // if (day < 7)
      // {
      //     t = new Date(year, month, 7, 23, 59, 59);
      // }
      // else if(7<=day && day<14)
      // {
      //     t = new Date(year, month, 14, 23, 59, 59);
      // }
      // else if(14<=day && day<21)
      // {
      //     t = new Date(year, month, 21, 23, 59, 59);
      // }
      // else if(21<=day && day<31)
      // { // если в месяце меньше 31 дня, то Date просто перейдет на следующий месяц
      //     t = new Date(year, month, 31, 23, 59, 59);
      // }

      // new Date(year, month, date, hours, minutes, seconds, ms)
      new CountdownTimer('countdown', new Date(2017, 7, 1, 0, 0, 0));
    }
  };
})(document.body);
