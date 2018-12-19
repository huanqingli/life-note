class LinkNode{
  constructor(value, next=null){
    this.value = value
    this.next = next
  }
  toString(callback){
    return callback ? callback(this.value) : this.value
  }
}

// index 从零开始
class LinkedList{
  constructor(){
    this.head = null
    this.tail = null
    this.size = 0
  }

  prepend(value){
    this.head = new LinkNode(value, this.head)
    if(!this.tail){
      this.tail = this.head
    }
    this.size++
    return this
  }

  append(value){
    let newNode = new LinkNode(value)
    this.size++

    if(this.size === 0){
      this.head = newNode
      this.tail = newNode

      return this
    }

    this.tail.next = newNode
    this.tail = newNode
    

    return this
  }

  findValue(value){
    if(this.size === 0){
      return null
    }

    let currentNode = this.head
    while(currentNode){
      if(currentNode.value === value){
        return currentNode
      }
      currentNode = currentNode.next
    }

    return null
  }

  find(index){
    if(this.size === 0){
      return null
    }

    let currentNode = this.head
    for(let i=0;i<index;i++){
      currentNode = currentNode.next
    }

    return currentNode
  }

  fromArray(arr){
    arr.forEach(ele => {
      this.append(ele)
    })

    return this
  }

  toArray(){
    let arr = []
    let currentNode = this.head
    while(currentNode){
      arr.push(currentNode)
      currentNode = currentNode.next
    }
    return arr
  }

  toString(callback){
    return `size:${this.size} head (${this.toArray().map(node => node.toString(callback) + '=>').toString()}) tail`
  }
}

let b = new LinkedList()
b.prepend(2)
b.prepend(1)
b.append(4)
console.log(b.toString())
console.log(b.find(1))