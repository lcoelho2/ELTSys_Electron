// injection technique borrowed from http://stackoverflow.com/questions/840240/injecting-jquery-into-a-page-fails-when-using-google-ajax-libraries-api
window.onload = function() {
    var script = document.createElement("script");
    script.src = "/Users/luisantonio/Documents/Certificacao/epSys3/node_modules/jquery/dist/jquery.min.js";
    document.body.appendChild(script);
};