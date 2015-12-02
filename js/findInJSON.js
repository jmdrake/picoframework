function findInJSON(list, tag, value){
    i = 0;
    while(list[i][tag]!=value)
        i++;
    return list[i][tag] == value;
}