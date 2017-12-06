
//simple degree to radian conversion
function degToRad(degrees)
{
        return degrees * Math.PI / 180;
}

//variables for mouse control
var mouseDown = false;
var lastMouseX = null;
var lastMouseY = null;
var zoomed = false;
var objRotationMatrix = mat4.create();
mat4.identity(objRotationMatrix);
var objTranslationMatrix = mat4.create();
mat4.identity(objTranslationMatrix);
var toggle = false;

//on mouse click
function handleMouseDown(event)
{
    toggle = !toggle;
    if (toggle){
        thing = 1;
    } else {
        thing = 0;
    }

}

//on mouse double click
function handleDblMouseDown(event)
{
    if(!zoomed){
        var newTranslationMatrix = mat4.create();
        mat4.identity(newTranslationMatrix);
        mat4.translate(newTranslationMatrix, [0.0, 0.0, 2.0]);
        mat4.multiply(newTranslationMatrix, objTranslationMatrix, objTranslationMatrix);
        zoomed = true;
    } else {
        var newTranslationMatrix = mat4.create();
        mat4.identity(newTranslationMatrix);
        mat4.translate(newTranslationMatrix, [0.0, 0.0, -2.0]);
        mat4.multiply(newTranslationMatrix, objTranslationMatrix, objTranslationMatrix);
        zoomed = false;
    }
}



//on mouse movement
function handleMouseMove(event)
{
    //if mouse is not clicked do nothing
    if (!mouseDown){
        return;
    }

    var newX = event.clientX;
    var newY = event.clientY;
    var changeX = newX - lastMouseX;
    var newRotationMatrix = mat4.create();
    mat4.identity(newRotationMatrix);
    mat4.rotate(newRotationMatrix, degToRad(changeX / 10), [0, 1, 0]);
    var changeY = newY - lastMouseY;
    mat4.rotate(newRotationMatrix, degToRad(changeY / 10), [1, 0, 0]);
    mat4.multiply(newRotationMatrix, objRotationMatrix, objRotationMatrix);
    lastMouseX = newX
    lastMouseY = newY;

}