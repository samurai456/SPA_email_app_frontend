function dateFormat(str, withTime){
    const date = new Date(str);
    if(withTime){
        return `${aZ(date.getDate())}.${aZ(date.getMonth()+1)}.${date.getFullYear()}  ${aZ(date.getHours())}:${aZ(date.getMinutes())}:${aZ(date.getSeconds())}`;
    }
    return `${aZ(date.getDate())}.${aZ(date.getMonth()+1)}.${date.getFullYear()}`
}

function aZ(num){
    if(num<10){
        return `0${num}`
    }
    return `${num}`
}

function shorten(str, gth){
    if(str.length>gth) return str.slice(0,gth)+'...';
    return str
}

export { dateFormat }
export { shorten }