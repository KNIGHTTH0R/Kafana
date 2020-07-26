var configTheData = {
    CurrentLogedIn: null,
    //ova e za modalot
    initModal(modal, btn, span) {
        this.closeSpan(span)
        var t = this
        btn.onclick = function () {
            if (!configTheData.getFromLocalStorage("User")) {
                modal.style.display = "block";
                return;
            }
            t.YouAreLogedIn();
        }
    },
    YouAreLogedIn() {
        alert("uspesno logiranje")
        var userFromLocalStorage = JSON.parse(localStorage.getItem('User'));

        if (userFromLocalStorage.Position == "manager") {
            this.redirectToPage("pages/manager")
            return
        }
        if (userFromLocalStorage.Position == "waiter") {
            this.redirectToPage("pages/waiter")
            return
        }
    },
    //za gasenje na modalot
    closeSpan(span) {
        span.onclick = function () {
            modal.style.display = "none";
        }
    },
    clickSingIn(singInBtn, emailInput, passInput, dataFire) {
        var t = this
        singInBtn.onclick = function () {
            t.loginAvtentification(emailInput, passInput, dataFire);
        }
    },
    loginAvtentification(emailInput, passInput, dataFire) {
        var emailVal = emailInput.value;
        var passVal = passInput.value;

        // for (let i = 0; i < dataFire.length; i++) {

        //     if(dataFire[i].Email == emailVal && dataFire[i].Password == passVal){
        //         this.CurrentLogedIn = dataFire[i]
        //         console.log(this.CurrentLogedIn)
        //         this.AddToLocalStorage(this.CurrentLogedIn);
        //         this.YouAreLogedIn();
        //         return
        //     }
        // }
        for (var key in dataFire) {
            if (dataFire[key].Email == emailVal && dataFire[key].Password == passVal) {
                this.CurrentLogedIn = dataFire[key]
                this.AddToLocalStorage(this.CurrentLogedIn);
                this.YouAreLogedIn();
                return
            }
        }

        this.MistakeInEmailPassword(emailInput, passInput);
        return
    },
    MistakeInEmailPassword(emailInput, passInput) {
        alert("Wrong email or password");
        emailInput.value = "";
        passInput.value = "";
        emailInput.focus();
    },
    AddToLocalStorage(save) {
        localStorage.setItem("User", JSON.stringify(save))
    },
    redirectToPage(page) {
        window.location.replace(`http://127.0.0.1:5500/${page}.html`);
    },
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
    init(modal, btn, span, emailInput, passInput, singInBtn, seeMenuBtn) {

        this.initFireBase();
        var t = this;
        firebase.database().ref("Users").on("value", function (data) {
            //ovdeka sve izvrsvi
            var theData = data.val();
            t.initModal(modal, btn, span);
            t.clickSingIn(singInBtn, emailInput, passInput, theData);
            t.showMenuOnSeeMenuBtn(seeMenuBtn);
        }, function (err) {
            console.log(err)
        })
    },
    getFromLocalStorage() {
        return localStorage.getItem("User")
    },
    showMenuOnSeeMenuBtn(seeMenuBtn) {
        var t = this;
        seeMenuBtn.onclick = function () {
            t.redirectToPage("pages/menu")
        }
    }

}






