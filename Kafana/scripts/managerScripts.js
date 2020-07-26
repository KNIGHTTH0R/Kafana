 
 managerJs = {
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
    init(logoutManagerBtn,showNameOfManager,createNewUserBtn,changeMainPart,listOfUsersBtn,createTheMenuBtn,manageTheTablesBtn) {
        
        this.initFireBase();
        var t = this;
        firebase.database().ref("Users").on("value", function (data) {
            //ovdeka sve izvrsvi
            var theData = data.val();
            t.checkIfLogedUserIsManager();
            t.showNameOfUserInNavB(showNameOfManager);
            t.logoutManagerBtn(logoutManagerBtn);
            t.createNewUserBtn(createNewUserBtn,changeMainPart);
            t.listOfUsersBtn(listOfUsersBtn,changeMainPart);
            t.createTheMenuBtn(createTheMenuBtn,changeMainPart)
            t.manageTheTablesBtnOnClick(manageTheTablesBtn)
        }, function (err) {
            console.log(err)
        })
    },
    manageTheTablesBtnOnClick(manageTheTablesBtn){
        manageTheTablesBtn.onclick = function(){
            axios.get(`http://127.0.0.1:5500/pages/manageTheTables.html`)
            .then(function (resp) {
                changeMainPart.innerHTML = resp.data
                var scripts = changeMainPart.getElementsByTagName('script');
                        for (var i = 0; i < scripts.length; i++) {
                            eval(scripts[i].innerText);
                        }
            })
            .catch(function (err) {
                console.log(err);
                
            });
        }
    },
    listOfUsersBtn(listOfUsersBtn,changeMainPart){
        var t = this
        listOfUsersBtn.onclick = function(){
            axios.get(`http://127.0.0.1:5500/pages/showListOfUsers.html`)
            .then(function (resp) {
                changeMainPart.innerHTML = resp.data
                var scripts = changeMainPart.getElementsByTagName('script');
                        for (var i = 0; i < scripts.length; i++) {
                            eval(scripts[i].innerText);
                        }
            })
            .catch(function (err) {
                console.log(err);
                
            });
        }
    },
    showNameOfUserInNavB(showNameOfManager){
        var user = this.getUserFromLocalStorage();
        showNameOfManager.innerHTML = user.Name;
    },
    logoutManagerBtn(logoutManagerBtn){
        var t = this
        logoutManagerBtn.onclick = function(){
             t.removeUserfromLocalst();
         }
     },
     createNewUserBtn(createNewUserBtn,changeMainPart){
        var t = this
        createNewUserBtn.onclick = function(){
            axios.get(`http://127.0.0.1:5500/pages/formaZaWaiter.html`)
            .then(function (resp) {
                changeMainPart.innerHTML = resp.data
                var scripts = changeMainPart.getElementsByTagName('script');
                        for (var i = 0; i < scripts.length; i++) {
                            eval(scripts[i].innerText);
                        }
            })
            .catch(function (err) {
                console.log(err);
                
            });
        }
    },
    createFormToCreateNewUser(){
        
        return output;
    },
    changeMainPart(changeMainPart, input){
        changeMainPart.innerHTML = input
    },
    removeUserfromLocalst(){
        localStorage.removeItem("User"); 
    },
    getUserFromLocalStorage(){
        return JSON.parse(localStorage.getItem("User")); 
    },
    createTheMenuBtn(createTheMenuBtn,changeMainPart){
        var t = this
        createTheMenuBtn.onclick = function(){
            axios.get(`http://127.0.0.1:5500/pages/createTheMenu.html`)
            .then(function (resp) {
                changeMainPart.innerHTML = resp.data
                var scripts = changeMainPart.getElementsByTagName('script');
                        for (var i = 0; i < scripts.length; i++) {
                            eval(scripts[i].innerText);
                        }
            })
            .catch(function (err) {
                console.log(err);
                
            });
        }
    },
    checkIfLogedUserIsManager(){
        var user = this.getUserFromLocalStorage();
        
        if(user == null ||user.Position != "manager"){
            this.removeUserfromLocalst();
            this.redirectToPage("intex")

        }
    },
    redirectToPage(page){
        window.location.replace(`http://127.0.0.1:5500/${page}.html`);
    },
 }
