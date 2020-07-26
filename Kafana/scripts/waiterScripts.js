var waiterJs = {
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
    init(logoutWaiterBtn,createNewOrderBtn,changeMainPartWaiter,printReceiptBtn,showNameOfWaiter) {
        this.initFireBase();
        var t = this;
        
        firebase.database().ref("Users").on("value", function (data) {
            //ovdeka sve izvrsvi
            theDataUsers = data.val();
            t.showNameOfWaiterChange(showNameOfWaiter)
            t.checkIfLogedUserIsWaiter();
            t.logoutWaiterBtnonClick(logoutWaiterBtn)
            t.createNewOrderBtnOnClick(createNewOrderBtn,changeMainPartWaiter)
            t.createPrintReceiptBtnOnClick(printReceiptBtn,changeMainPartWaiter) 
        }, function (err) {
            console.log(err)
        })
        
    },
    showNameOfWaiterChange(showNameOfWaiter){
        var currentUser = JSON.parse(localStorage.getItem("User"))
        showNameOfWaiter.innerHTML = ""
        showNameOfWaiter.innerHTML = currentUser.Name
    },
    logoutWaiterBtnonClick(logoutWaiterBtn){
        logoutWaiterBtn.onclick = function(){
            localStorage.removeItem("User");
        }
    },
    createPrintReceiptBtnOnClick(printReceiptBtn,changeMainPartWaiter){
        printReceiptBtn.onclick = function(){
            axios.get(`http://127.0.0.1:5500/pages/printReceiptWaiter.html`)
            .then(function (resp) {
                changeMainPartWaiter.innerHTML = resp.data
                var scripts = changeMainPartWaiter.getElementsByTagName('script');
                        for (var i = 0; i < scripts.length; i++) {
                            eval(scripts[i].innerText);
                        }
            })
            .catch(function (err) {
                console.log(err);
                
            });
        }
    },
    createNewOrderBtnOnClick(createNewOrderBtn,changeMainPartWaiter){
        createNewOrderBtn.onclick = function(){
            axios.get(`http://127.0.0.1:5500/pages/createNewOrder.html`)
            .then(function (resp) {
                changeMainPartWaiter.innerHTML = resp.data
                var scripts = changeMainPartWaiter.getElementsByTagName('script');
                        for (var i = 0; i < scripts.length; i++) {
                            eval(scripts[i].innerText);
                        }
            })
            .catch(function (err) {
                console.log(err);
                
            });
        }
    },
    checkIfLogedUserIsWaiter(){
        var currentUser = JSON.parse(localStorage.getItem("User"))
        
        if(currentUser == null ||currentUser.Position != "waiter"){
            localStorage.removeItem("User");
            window.location.replace(`http://127.0.0.1:5500/intex.html`);

        }
    },
}