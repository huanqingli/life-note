let fbl = []
function fb(n){
    if(n===1||n===2){
        return 1
    }
    if(!fbl[n]){
        fbl[n] = fb(n-1) + fb(n-2)
    }
    return fbl[n]
}
console.time("js")
console.log(fb(5000))
console.timeEnd("js")