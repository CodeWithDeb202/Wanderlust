
let taxSwitch = document.querySelector("#switchCheckDefault");
taxSwitch.addEventListener("click", () => {
    console.log("clicked")
    let taxInfo = document.getElementsByClassName("tax_info");
    for(info of taxInfo){
        if(info.style.display != "inline"){
            info.style.display = "inline";
        } else{
            info.style.display = "none";
        }
    };
});
