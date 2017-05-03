var PagePost = function(addedImg, currPage){
    this.annotations = new Array();
    for(var i = 0; i< addedImg.length; i++){
        this.annotations.push({"pagenum":c, "symbolID":addedImg[i]});
    }
}