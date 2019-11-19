
var removeChecks = (classname) => {
    var objects = document.getElementsByClassName(classname); // 
    var i = 0;
    for(i = 0; i < objects.length; i++){ //i ended up with a bug where the radio buttons would remain checked
      objects[i].checked = false;
    }
}

export default removeChecks;