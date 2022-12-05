var chooseElement,e,clickedElement;
// 334 378
var gridx = 1710;
var gridy = 750;

function move (){
    const elements = document.querySelectorAll(".element");

    elements.forEach(element => {
        element.addEventListener("mousedown", () => {
            element.style.position = "absolute";
            chooseElement = element;

            document.onmousemove = (e) =>{
                var x = e.clientX;
                var y = e.clientY;
                if(x>350 && y>15 && x<gridx && y<gridy){  
                    if(chooseElement!=null){           
                        chooseElement.style.left = x + "px";
                        chooseElement.style.top = y + "px";
                    }
                }
            }
        })

    })

    document.onmouseup = function(e) {
        chooseElement = null;
    }
}

var randomId = 'id';
function addItem(item, imagepath = 'null'){
    let newElement = document.createElement('div');
    
    newElement.style.background = "	rgb(172, 214, 251)";
    if(item == 'decision'){
        newElement.style.width = 90 + "px";
        newElement.style.height = 90 + "px";
        newElement.style.transform = "rotate(45deg)";
    }else{
        newElement.style.width = 145 + "px";
        newElement.style.height = 70 + "px";
    }
    if(item=='input'){
        newElement.style.transform = "skewX(-15deg)";
    }
    if(item == 'start'){
        newElement.style.borderRadius = 35 + "px";
    }
    if(item == 'text'){
        newElement.style.backgroundColor = "transparent";
        newElement.contentEditable = true;
        newElement.innerText = "Enter your text";
        newElement.style.fontFamily = "Verdana, Geneva, Tahoma, sans-serif";
        newElement.style.fontSize = 17 + "px";
        newElement.style.outline = "none";
        newElement.style.caretColor = "black";
    }
    if(item == 'arrow'){
        let image = document.createElement('img');
        image.src = imagepath;
        if(imagepath == "arrowLeft.png" || imagepath == "arrowRight.png"){
            image.style.height = 10 + "px";
            image.style.width = 20 + "px";
        }else{
            image.style.height = 20 + "px";
            image.style.width = 10 + "px";
        }
        newElement.style.background = "transparent";
        image.style.position = "relative";
        newElement.appendChild(image);
        image.style.left = 70 + "px";
        image.style.top = 35 + "px";
    }
    newElement.classList.add("element");
    var Id = randomId + '1';
    newElement.id = Id;
    randomId = randomId + '1';
    newElement.style.position = "absolute";
    newElement.style.left = 800 + "px";
    newElement.style.top = 300 + "px"; 
    document.querySelector('.container').appendChild(newElement);
    document.getElementById(Id).addEventListener('contextmenu', (ev)=>{
        
        ev.preventDefault();
        e = null;
        var menuClass = "menu";
        var buttonClass = "delete";
        if(item == "arrow"){
            menuClass = "line_menu";
            buttonClass = "delete_line";
        }
        var menubox = document.querySelector('.' + menuClass);
        menubox.style.position = "absolute";
        menubox.style.left = ev.clientX +25 + "px";
        menubox.style.top = ev.clientY +25 + "px";
        menubox.style.display = "block";
        document.getElementById(Id).style.position = "absolute";
        clickedElement = document.getElementById(Id);
        if(item!="arrow"){
            increaseSize(item);
            decreaseSize(item);
        }
        deleteItem(Id,buttonClass,menuClass);

    });
}

function arrowType(){
    var arrow_menu = document.getElementById("arrow_menu");
    arrow_menu.style.display = "block";
    document.getElementById("up").addEventListener("click", ()=>{
        if(arrow_menu!=null){
            addItem("arrow", "arrowUp.png");
        }
        arrow_menu.style.display = "none";
        arrow_menu = null;
    })
    document.getElementById("down").addEventListener("click", ()=>{
        if(arrow_menu!=null){
            addItem("arrow", "arrowDown.png");
        }
        arrow_menu.style.display = "none";
        arrow_menu = null;
    })
    document.getElementById("left").addEventListener("click", ()=>{
        if(arrow_menu!=null){
            addItem("arrow", "arrowLeft.png");
        }
        arrow_menu.style.display = "none";
        arrow_menu = null;
    })
    document.getElementById("right").addEventListener("click", ()=>{
        if(arrow_menu!=null){
            addItem("arrow", "arrowRight.png");
        }
        arrow_menu.style.display = "none";
        arrow_menu = null;
    })   
}

function addLine(){
    var count = 0;
    var ix, iy, fx,fy,x,y;
    document.addEventListener('click', (ev)=>{
        count++;
        if(count==2){
            ix = ev.clientX;
            iy = ev.clientY;
        }else if(count==3){
            fx = ev.clientX;
            fy = ev.clientY;
            var dx, dy;
            if(fx>ix){
                dx = fx-ix;
                x = ix;
            }else{
                dx = ix-fx;
                x = fx;
            }

            if(fy>iy){
                dy = fy-iy;
                y = iy;
            }else{
                dy = iy-fy;
                y = fy;
            }

            let newElement = document.createElement('div');
            newElement.classList.add("line");
            newElement.style.background = "black";
            newElement.classList.add("element");
            var Id = randomId + '1';
            newElement.id = Id;
            randomId = randomId + '1';
            newElement.style.position = "absolute";
            if(dx>dy){
                newElement.style.width = dx + "px";
                newElement.style.height = 2 + "px";
            }else{
                newElement.style.width = 2 + "px";
                newElement.style.height = dy + "px";
            }
            newElement.style.left = x + "px";
            newElement.style.top = y + "px"; 
            document.querySelector('.container').appendChild(newElement);
            document.getElementById(Id).addEventListener('contextmenu', (ev)=>{
        
                ev.preventDefault();
                e = null;
                var menubox = document.querySelector('.line_menu');
                menubox.style.position = "absolute";
                menubox.style.left = ev.clientX +25 + "px";
                menubox.style.top = ev.clientY +25 + "px";
                menubox.style.display = "block";
                document.getElementById(Id).style.position = "absolute";
                clickedElement = document.getElementById(Id);
                deleteItem(Id,"delete_line","line_menu");
        
            });


        }
    })
}


function removeMenu(ev){
    document.querySelector(".menu").style.display = "none";
    document.querySelector(".line_menu").style.display = "none";
    e = null;
    ev = null;
}

function increaseSize(item){
    var button = document.getElementById('inc');
    button.addEventListener('click', () => {
        clickedElement.style.width = parseInt(clickedElement.style.width) + 10 + "px";
        clickedElement.style.height = parseInt(clickedElement.style.height) + 10 + "px";
        clickedElement.style.borderRadius = parseInt(clickedElement.style.borderRadius) + 5 + "px";
        if(item == 'text'){
            clickedElement.style.fontSize = parseInt(clickedElement.style.fontSize) + 1 + "px";
        }
        clickedElement.style.position = "fixed";
        clickedElement = null;
        document.querySelector('.menu').style.display = "none";
    });
}

function decreaseSize(item){
    var button = document.getElementById('dec');
    button.addEventListener('click', () => {
        if(parseInt(clickedElement.style.height)>50){
            clickedElement.style.width = parseInt(clickedElement.style.width) - 10 + "px";
            clickedElement.style.height = parseInt(clickedElement.style.height) - 10 + "px";
            clickedElement.style.borderRadius = parseInt(clickedElement.style.borderRadius) - 5 + "px";
            if(item == 'text'){
                clickedElement.style.fontSize = parseInt(clickedElement.style.fontSize) - 1 + "px";
            }
            clickedElement.style.position = "fixed";
            clickedElement = null;
        }
        document.querySelector('.menu').style.display = "none";
        
    });
}

function deleteItem(Id, button_id, menu_class){
    var button = document.getElementById(button_id);
    button.addEventListener('click', () => {
        var item = document.getElementById(Id);
        if(item!=null){
            item.remove();
        }
        document.querySelector('.' + menu_class).style.display = "none";
    });
}