const app = app || {};

((body) => {
  app.timeline = {
    data: {},
    filter: null,
    years: null,
    months: null,

    _initCarousel() {
      let width = $(window).width(),
        slides = $('#timeline-carousel').find('.slick-slide').length;

      if (
        (width > 768 && slides >= 4) ||
                (width > 568 && slides >= 3) ||
                (width > 375 && slides >= 2) ||
                (width < 375 && slides >= 1)
      ) {
        $('#timeline-carousel').slick({
          lazyLoad: 'ondemand',
          dots: false,
          infinite: true,
          draggable: true,
          speed: 259,
          slidesToShow: 4,
          slidesToScroll: 1,
          prevArrow:
                        '<button class="carousel__nav carousel__nav--left slick-prev"><svg class="carousel__nav__ico" role="img"><use xlink:href="#left-arrow"/></svg></button>',
          nextArrow:
                        '<button class="carousel__nav carousel__nav--right slick-next"><svg class="carousel__nav__ico" role="img"><use xlink:href="#right-arrow"/></svg></button>',
          responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3
              }
            },
            {
              breakpoint: 568,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 375,
              settings: {
                fade: true,
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
        });
      }
    },

    _currentYear() {
      return parseInt(this.years.find('.is-current').data('value'));
    },

    _currentMonth() {
      return parseInt(this.months.find('.is-current').data('value'));
    },

    _handle() {
      this.data.current = this._currentYear();
      this.data.months = [];

      this.months.find('.j-timeline-months-item').each((key, item) => {
        let years = [],
          strings = `${$(item).data('if')}`;

        if (typeof strings !== 'undefined' && strings !== '') {
          years = strings.split(',');

          for (const x in years) {
            years[x] = parseInt(years[x]);
          }
        }

        this.data.months.push({
          item,
          year: years
        });
      });
    },

    _reinitCarousel() {
      let _self_ = this,
        year = this._currentYear(),
        month = this._currentMonth();

      if ($('#timeline-carousel').hasClass('slick-initialized')) {
        $('#timeline-carousel').slick('unslick');
      }

      // $('#timeline-carousel').html('');

      // var count = $('#timeline-cache').find('.carousel__item.is-year-'+ year +'.is-month-'+month).length;

      // $('#timeline-cache').find('.carousel__item.is-year-'+ year +'.is-month-'+month).each(function(k, item) {
      //     $('#timeline-carousel').append($(this).clone());

      //     if ((k+1) == count) {
      //         setTimeout(function() {
      //             _self_._initCarousel();
      //         }, 50);
      //     }
      // });

      // setTimeout(function() {
      //     $('.zoom').fancybox();
      // }, 300);

      _self_._initCarousel();
    },

    _changeFirstMonth() {
      this.months
        .find('.j-timeline-months-item.is-active:first')
        .trigger('click');
    },

    _match() {
      const _self_ = this;

      this._handle();

      this.months
        .find('.j-timeline-months-item')
        .removeClass('is-active');

      $.each(this.data.months, (k, item) => {
        if (item.year.indexOf(this.data.current) >= 0) {
          $(item.item).addClass('is-active');
        }
      });

      this.filter.addClass('is-active');
    },

    _events() {
      const _self_ = this;

      this.years.find('.j-timeline-years-item').on('click', function(e) {
        e.preventDefault();

        if (!$(this).hasClass('is-current')) {
          $('#timeline-filter')
            .find('.j-timeline-years')
            .find('.is-current')
            .removeClass('is-current');

          $(this).addClass('is-current');

          _self_._match();
          _self_._changeFirstMonth();
          _self_._reinitCarousel();
        }
      });

      this.months
        .find('.j-timeline-months-item')
        .on('click', function(e) {
          e.preventDefault();

          if (!$(this).hasClass('is-current')) {
            $('#timeline-filter')
              .find('.j-timeline-months')
              .find('.is-current')
              .removeClass('is-current');

            $(this).addClass('is-current');

            _self_._match();
            _self_._reinitCarousel();
          }
        });
    },

    init() {
      this.filter = $('#timeline-filter');
      this.years = this.filter.find('.j-timeline-years');
      this.months = this.filter.find('.j-timeline-months');

      this._match();
      this._events();

      this._reinitCarousel();
    }
  };
})(document.body);
