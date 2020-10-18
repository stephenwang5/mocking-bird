chrome.storage.sync.get(["handles"], result => {
    result_list = result["handles"].split('\n');
    result_for_command = "";
    for (itm of result_list) {
        result_for_command += itm + '&';
    }
    result_for_command = result_for_command.substr(0, result_for_command.length-1);

    let fetch_command = "http://52.154.72.216:6942?" + result_for_command;
    console.log(fetch_command);

    fetch(fetch_command)
    // fetch("http://52.154.72.216:6942?realDonalTrump&JoeBiden")
    .then(res=>res.text())
    .then(obj=>{
        document.getElementById("tweet").innerHTML = obj;
        // console.log("here's what: " + obj);
    })
    .catch(err=>{console.error(err);});
})
