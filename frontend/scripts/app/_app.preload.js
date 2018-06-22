function preload(cb) {
    var files = [
        '/js/app.js',
        '/fonts/Graphik-Black-Reduced.otf',
        '/fonts/Graphik-Medium-Reduced.otf',
        '/images/face-left.png',
        '/images/face-right.png',
        '/images/rainbow.png',
        '/usl.json'
    ]

    var loadedAssets = 0

    function onAssetLoaded() {
        loadedAssets++

        pieces.forEach(function(p, i) {
            console.log(loadedAssets / files.length)
            if (loadedAssets / files.length > i / pieces.length) {
                //console.log('ya loaded')
                p.path.style.strokeDashoffset = 0
            }
        })

        if (loadedAssets == files.length) {
            cb()
        }
    }

    files.forEach(function(f) {
        loadAsset(f, onAssetLoaded)
    })
}

preload(function() {
    setTimeout(function() {
        var scriptTag = document.createElement('script')
        scriptTag.src = '/js/app.js'

        document.body.appendChild(scriptTag)
    }, 700)
})
