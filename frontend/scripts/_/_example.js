!(function() {
      var element = document.querySelector('.usl-preloader')

      var svgParts = [].slice.call(element.querySelectorAll('#rainbow path'))
      var rainbowColor = element.querySelector('#rainbow')
      var bg = element.querySelector('.usl-preloader__bg')
      var svgContainer = element.querySelector('.usl-preloader__svg-container')

      var pieces = svgParts.map(function (path) {
        return {
          path: path,
          length: path.getTotalLength()
        }
      })

      pieces.forEach(function (p) {
        p.path.style.strokeDasharray = p.length
        p.path.style.strokeDashoffset = p.length
        p.path.style.transition = 'all 1s ease';
      })

      rainbowColor.style.display = 'block'

      function loadAsset (url, callback) {
        var xhr = new XMLHttpRequest()
        xhr.open('get', url)
        xhr.send()
        xhr.onload = callback
      }


      window.addEventListener('uslappstart', function() {
        TweenMax.fromTo(bg, 1, {
          opacity: 0,
          display: 'block'
        }, {
          opacity: 1,
          onComplete: function() {
            setTimeout(function () {
              element.style.display = 'none'
            }, 1000)
          }
        })

        TweenMax.to(svgContainer, .5, {
          //y: -30,
          opacity: 0,
          scale: .5,
          ease: Quint.easeIn
        })
      })
})()
