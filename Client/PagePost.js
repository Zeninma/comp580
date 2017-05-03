var PagePost = function(addedImg, currPage){
    this.annotations = new Array();
    for(var i = 0; i< addedImg.length; i++){
        this.annotations.push({"pagenum":currPage, "symbolID":addedImg[i]});
    }
}