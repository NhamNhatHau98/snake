const canvas=document.querySelector(".canvas")
const ctx=canvas.getContext("2d")
console.log(canvas)
const scale=20
const rows=canvas.height/scale
const columns=canvas.width/scale

var snake


startGame()

function startGame(){
  snake = new snake()
  meal = new meal()
  snake.draw()
  meal.newLocation()
  document.querySelector('.score').innerText = 0;
  window.setInterval(()=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    meal.draw()
    snake.update()
    snake.draw()
    if (snake.eat(meal)) {
      meal.newLocation();
    }
    snake.check();
    document.querySelector('.score').innerText = snake.total;

  },1000)
}

window.addEventListener('keydown', (e)=>{
  const direction = e.key.replace('Arrow', '')
  snake.updateDirection(direction)
})


function snake(){
  this.x=9*scale
  this.y=9*scale
  this.xmove=scale
  this.ymove=0
  this.total=0
  this.tail=[]


  this.draw = function(){
    ctx.fillStyle="white";
    for(var i=0;i<this.tail.length;i++){
      ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale)
    }
    ctx.fillRect(this.x, this.y, scale, scale);

  }
  this.update = function(){
    //tang do dai, o cuoi cung bang 
    for(var i=0;i<this.tail.length-1;i++){
      this.tail[i]=this.tail[i+1]
    }
    this.tail[this.total-1]={x:this.x, y:this.y}


    this.x += this.xmove
    this.y += this.ymove
    //neu dung tuong thi xuat hien o vi tri doi dien
    if(this.x>canvas.width){
      this.x=0
    }
    if(this.y>canvas.height){
      this.y=0
    }
    if(this.x<0){
      this.x=canvas.width
    }
    if(this.y<0){
      this.y=canvas.height 
    }
  }
  this.updateDirection = function(direction){
    switch(direction){
      case 'Up':
        this.xmove=0;
        this.ymove=-scale
        
        break
      case 'Down':
        this.xmove=0;
        this.ymove=scale
        break
      case 'Left':
        this.xmove=-scale
        this.ymove=0
        break
      case 'Right':
        this.xmove=scale
        this.ymove=0
        break
    }
    this.eat = function(meal) {
      if (this.x === meal.x &&this.y === meal.y) {
        this.total++;
        return true;
      }
  
      return false;
    }

    //kiem tra cham duoi
    this.check = function() {
      for (var i=0; i<this.tail.length; i++) {
        if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
          this.total = 0;
          this.tail = [];
        }
      }
    }
  }
}

function meal(){
  this.newLocation = function() {
    this.x = (Math.floor(Math.random() *
      columns - 1) + 1) * scale;
    this.y = (Math.floor(Math.random() *
      rows - 1) + 1) * scale;
  }
  this.draw = function(){
    ctx.fillStyle="red"
    ctx.fillRect(this.x, this.y, scale, scale)
  }
}

