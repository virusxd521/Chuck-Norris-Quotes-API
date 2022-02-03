const wrapper = document.querySelector('.wrapper');
const button =  document.querySelector(".button");

// Created a variable to capture the URL
const urlToAskFrom = "https://api.chucknorris.io/jokes/random";

class Creating {
    constructor(url, firstElement, secondElement){
        this.url = url;
        this.firstElement = firstElement;
        this.secondElement = secondElement;
    }

    // Fetching the Data from the Source 
    async getJoke(){
    const gettingData = await fetch(this.url)
    const DataToJson = await gettingData.json();
    return DataToJson;
    }

    async attachingDataandCreatingElmenets(...elements){
        const readyData = await this.getJoke();
        if(elements.length === 2){
            elements.forEach( (item, index) => index === 0 ? item.src = readyData.icon_url : item.innerHTML = readyData.value);
        } else{
            console.log("You should pass 2 elements to the class");
        }
     
    }

    creatingElements(){
        const first = document.createElement(this.firstElement);
        const second = document.createElement(this.secondElement);
        this.attachingDataandCreatingElmenets(first, second);
        return [first, second];

    }

    events(element, event){
        element.addEventListener(event, () => {
            const elements = this.creatingElements();
            console.log(wrapper.children.length);
            if(wrapper.children.length <= 2){
                wrapper.append(...elements);
            } else {
                elements.forEach(item => item.remove());
                this.events(element, event);
            }
        })
    }

}

const dataAll = new Creating(urlToAskFrom, "img", "p");
dataAll.events(button, "click");


