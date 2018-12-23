  // w 萝卜总数，d两地距离，n驴车载重
  function carrotLeft(w, d, n){
    let distance = 0
    let x = Math.floor(w/n)
    let more = w%n
    distance += more/(2*x+1)
    if(distance >= d){
      return '还剩余: ' + (x*n + (distance-d)*(2*x+1))
    }
    for(let i=0;i<x;i++){
      sum += n/(2*x-1-2*i)
      if(sum >= d){
        return '还剩余: ' + ((x-i-1)*n + (distance-d)*(2*x-1-2*i))
      }
    }
    return '只能走: ' + distance
  }