import $ from "jquery";

function showPreloader() {
    let worker = null;
    let loaded = 0;

    function startLoading() {
        $("#lemon").hide();
        $("#straw").hide();
        $("#cubes div").hide();
        
        worker = setInterval(increment, 15);
    }
    
    function increment() {
        $("#counter").html(`${loaded}%`);
        $("#drink").css("top", `${100 - loaded * 0.9}%`);
        
        if (loaded === 25) {
            $("#cubes div:nth-child(1)").fadeIn(100);
        } 
        if (loaded === 50) {
            $("#cubes div:nth-child(2)").fadeIn(100);
        } 
        if (loaded === 75) {
            $("#cubes div:nth-child(3)").fadeIn(100);
        } 
        if (loaded === 100) {
            $("#lemon").fadeIn(100);
            $("#straw").fadeIn(300);

            loaded = 0;

            stopLoading();

            setTimeout(ready, 200);
        } else {
            loaded++;
        }
    }

    function stopLoading() {
        clearInterval(worker);
    }

    function ready() {
        $("#loader").remove();
        $("main > .row").css("visibility", "visible");
    }

    startLoading();
}

export default showPreloader;