var addandremovebtns = (current,size) => {
    var endoflist = (current == size);
    if(endoflist){
      document.getElementById('finishBtn').classList.remove('hidden');
      document.getElementById('nextBtn').classList.add('hidden');    
    }
    
    if(!endoflist){
      document.getElementById('finishBtn').classList.add('hidden');
      document.getElementById('nextBtn').classList.remove('hidden');
    }
    
}

export default addandremovebtns;