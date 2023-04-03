const canvas = document.getElementById("canvas");
//getContext() method returns a drawing context on the canvas.
const ctx = canvas.getContext("2d"); //"2d", leading to the creation of a CanvasRenderingContext2D object representing a two-dimensional rendering context.
//ctx means context.

//innerWidth property returns the width of a window's content area.
let cw = window.innerWidth;
//innerHeight property returns the height of a window's content area.
let ch = window.innerHeight;

window.addEventListener('resize', function(event){
    cw = window.innerWidth;
    ch = window.innerHeight;
    canvas.width = cw
    canvas.height = ch;
    maxColumns = cw / fontSize;
    console.log(cw, ch);
}, true);

let charArr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "a", 
"b", "c", "d", "e", "f", "g", "h", "I", "j", "k", "l", "m", "n", "o", 
"p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "K", "M", "カ", 
"メ", "ラ", "て", "ら", "日", "新", "幹", "線", "A", "B", "T", "X", "V"];



let maxCharCount = 300;
let fallingCharArr = [];
let fontSize = 13;
let maxColumns = cw / fontSize;


let frames = 0;

class fallingChar 
{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
    }

    draw(ctx)
    {
        //this keyword refers to an object. Which object depends on how this is being invoked 
        this.value = CharArr[Math.floor(Math.random() * (CharArr.length - 1))].toUpperCase();
        this.speed = (Math.random() * fontSize * 3) /4 + (fontSize * 3) /4;
    

    ctx.fillStyle = "rgba(0,255,0)";
    ctx.font = fontSize + "px san-serif";
    ctx.fillText(this.value, this.x, this.y); 
    this.y += this.speed;

    if(this.y > ch)
    {
        this.y = (Math.random() * ch) /2 - 50;
        this.x = Math.floor(Math.random() * maxColumns) * fontSize;
        this.speed = (- Math.random() * fontSize * 3) /4 + (fontSize * 3) /4;
    }
    }

}


let update = () => {
    if(fallingCharArr.length < maxCharCount)
    {
        let fallingChar = new fallingChar(Math.floor(Math.random() * maxColumns) * fontSize, (Math.random() * ch) /2 - 50);
        fallingCharArr.push(fallingChar);
    }
    ctx.fillStyle = "rgba(0,0,0,0.05)"; //The fillStyle property sets or returns the color, gradient, or pattern used to fill the drawing.
    ctx.fillRect(0,0,cw,ch); //The fillRect() method draws a "filled" rectangle. The default color of the fill is black.
    for(let i = 0; i < fallingCharArr.length && frames % 2 == 0; i++)
    {
        fallingCharArr[i].draw(ctx);
    }

    requestAnimationFrame(update); //window.requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint. 
    frames++;

};

update();