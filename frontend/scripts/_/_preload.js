function loadImages(paths,whenLoaded){
  var imgs=[];
  paths.forEach(function(path){
    var img = new Image;
    img.onload = function(){
      imgs.push(img);
      if (imgs.length==paths.length) whenLoaded(imgs);
    }
    img.src = path;
  });
}
