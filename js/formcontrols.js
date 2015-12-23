function clearForm(form) {
    var fields = form.find(".w3-input");
    var numfields = fields.length;    
    for(var i=0; i<numfields; i++) {
        fields[i].value = "";}}

function populateDiv(div, record) {
    for(var key in record)
        if(key.startsWith("lbl"))
            div.find(key).html(record[key]);
        if(key.startsWith("img"))
            div.find(key).attr("src", record[key]);
        if(key.startsWith("lnk"))
            div.find(key).attr("href", record[key]);}

function cloneDiv(template, record){
    var newDiv = template.clone();
    populateDiv(newDiv, record);}

function increment(e){
    e.html(e.html++);}

function populateList(list, data, template, callback){
    var posts = JSON.parse(data);
    var newRecord;
    var newDiv;
    for(var i = 0; i < posts.length; i++){
        newRecord = posts[i];
        newDiv = cloneDiv(template, newRecord);
        list.append(newDiv);
        if(callback != undefined){
            callback(newDiv)}}}
