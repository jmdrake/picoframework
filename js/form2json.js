/**
* Created with fanhubphp.
* User: jmdrake
* Date: 2015-11-22
* Time: 09:13 PM
* To change this template use Tools | Templates.
*/

function form2json(form){
   // console.log($(formname));
    fields = form.find(".w3-input");    
    var numfields = fields.length;
    var value;
    json = "{";
    for(var i=0; i<numfields; i++) {
        value = fields[i].value;
        json += '"' + fields[i].name + '"' + ":" + '"' + fields[i].value + '"';
        if(i+1<numfields)
            json += ", ";
    }
    json += "}";
    return JSON.parse(json);
}