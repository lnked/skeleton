function loadImages(paths, whenLoaded) {
  const imgs = [];
  paths.forEach((path) => {
    const img = new Image();
    img.onload = function() {
      imgs.push(img);
      if (imgs.length == paths.length) whenLoaded(imgs);
    };
    img.src = path;
  });
}
