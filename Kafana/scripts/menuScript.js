var menuObj = {
    config: {
        apiKey: "AIzaSyDcXlg6LJYbhPdXZ_akXVY5O5nfAtIfhkQ",
        authDomain: "kafana-92861.firebaseapp.com",
        databaseURL: "https://kafana-92861.firebaseio.com",
        projectId: "kafana-92861",
        storageBucket: "",
        messagingSenderId: "36684254752",
    },
    initFireBase() {
        firebase.initializeApp(this.config);
    },
    init(mainPartMenuChange,appetizersBtn,mainCourseBtn,dessertsBtn,drinksBtn,theTypeOfFoodShow) {
        this.initFireBase();
        var t = this;
        firebase.database().ref("menu").on("value", function (data) {
            //ovdeka sve izvrsvi
            var theMenu = data.val();
            t.addClickOnSpecificBtnonClick(appetizersBtn, theMenu, mainPartMenuChange,"appetizers",theTypeOfFoodShow,"Appetizers")
            t.addClickOnSpecificBtnonClick(mainCourseBtn, theMenu, mainPartMenuChange,"main course",theTypeOfFoodShow, "Main Course")
            t.addClickOnSpecificBtnonClick(dessertsBtn, theMenu, mainPartMenuChange,"desserts",theTypeOfFoodShow, "Desserts")
            t.addClickOnSpecificBtnonClick(drinksBtn, theMenu, mainPartMenuChange,"drinks",theTypeOfFoodShow, "Drinks")
        }, function (err) {
            console.log(err)
        })
    },
    addClickOnSpecificBtnonClick(Btn, theMenu, mainPartMenuChange, typeOfFood,theTypeOfFoodShow,whatTypeOfFood){
        
        var t = this
        Btn.onclick = function(){
            mainPartMenuChange.innerHTML = ""
            theTypeOfFoodShow.innerHTML = whatTypeOfFood
            for (var key in theMenu) {
                if(theMenu[key].type == typeOfFood){
                    mainPartMenuChange.appendChild(t.createDivForTheMenu(theMenu[key].item,theMenu[key].price))
                }
            }
        }
    },
    createDivForTheMenu(theItem, thePrice){
        var pItem = document.createElement("p")
        pItem.innerHTML = theItem
        var pPrice = document.createElement("p")
        pPrice.innerHTML = `Price: ${thePrice}`
        var theDiv = document.createElement("div")
        var br = document.createElement("br")
        theDiv.appendChild(pItem)
        theDiv.appendChild(pPrice)
        theDiv.appendChild(br)
        theDiv.appendChild(br)
        return theDiv
    }
}