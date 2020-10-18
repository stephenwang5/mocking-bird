
fetch("http://52.154.72.216:6942?trump&Biden")
.then(res=>res.text())
// .then(obj=>{document.getElementById("tweet").innerHTML = "<p>"+obj+"<p>";})
.then(obj=>{document.getElementById("tweet").innerHTML = obj; console.log("here's what: " + obj);})
.catch(err=>{console.error(err);});

// document.getElementById("tweet").innerHTML += "<p>random</p>";
