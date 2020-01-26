function setFormJsonData(data) {
    console.log(data);
    for (key in data) {
        if(key.startsWith('is')){
            if(data[key] =='Y'){
                $('#' + key).attr('checked','checked');
            }else{
                $('#' + key).removeAttr('checked');
            }
        }else{
            $('#' + key).val(data[key]).change();
        }
        
    }
}