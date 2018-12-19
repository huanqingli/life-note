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

  insert(value, index){
    if(index > this.size || index < 0){
      return false
    }

    if(this.size === 0 || this.size === index || index === undefined){
      return this.append(value)
    }

    if(index === 0){
      this.head = new LinkNode(value, this.head)
      this.size++
      return this
    }

    let currentNode = this.head
    
    for(let i=1;i<index;i++){
      currentNode = currentNode.next
    }

    currentNode.next = new LinkNode(value, currentNode.next)
    this.size++

    return this
  }

  prepend(value){
    return this.insert(value, 0)
  }

  append(value){
    let newNode = new LinkNode(value)

    if(this.size === 0){
      this.head = newNode
      this.tail = newNode
      this.size++

      return this
    }

    this.tail.next = newNode
    this.tail = newNode
    this.size++
    

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

  delete(index){
    if(index >= this.size || index < 0 || index === undefined){
      return false
    }

    if(index === 0){
      this.head = this.head.next
      if(!this.head){
        this.tail = null
      }
      this.size--
      return this
    }
    let preDeleteNode = this.head

    for(let i=1;i<index;i++){
      preDeleteNode = preDeleteNode.next
    }

    let deleteNode = preDeleteNode.next

    preDeleteNode.next = deleteNode.next

    if(!deleteNode.next){
      this.tail = preDeleteNode
    }
    deleteNode.next = null
    this.size--

    return deleteNode
  }

  deletehead(){
    this.delete(0)
  }

  deleteTail(){
    this.delete(this.size-1)
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


// 测试用例
let b = new LinkedList()
b.prepend(2)
b.prepend(1)
b.append(4)
b.insert(3, 2)
b.insert(5)
console.log(b.toString())
console.log(b.find(1))
console.log(b.findValue(3))
console.log(b.find(3))
b.delete(2)
console.log(b.toString())
b.delete(0)
console.log(b.toString())
b.deleteTail()
console.log(b.toString())
console.log(b.head)
console.log(b.tail)

/* 理想输出
size:5 head (1=>,2=>,3=>,4=>,5=>) tail
LinkNode {
  value: 2,
  next: LinkNode { value: 3, next: LinkNode { value: 4, next: [Object] } } }
LinkNode {
  value: 3,
  next: LinkNode { value: 4, next: LinkNode { value: 5, next: null } } }
LinkNode { value: 4, next: LinkNode { value: 5, next: null } }
size:4 head (1=>,2=>,4=>,5=>) tail
size:3 head (2=>,4=>,5=>) tail
size:2 head (2=>,4=>) tail
LinkNode { value: 2, next: LinkNode { value: 4, next: null } }
LinkNode { value: 4, next: null }
*/
