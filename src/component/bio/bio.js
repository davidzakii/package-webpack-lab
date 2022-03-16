import './style.scss';
function component() {
    const element = document.createElement("div");
    element.innerHTML = "Mohamed Hamdy Ahmed";
    element.classList.add('myDiv')
    return element;
};

document.body.appendChild(component());