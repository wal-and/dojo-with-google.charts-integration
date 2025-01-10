/**
 * Dojo AMD Google chart Loader
 * tested with dojo (1.14) and with google.charts (51)
 */
define(["dojo/_base/kernel",
    "dojo/topic"
], function(kernel, topic) {

var w = kernel.global;

return {
    load: function(loadCallback) {
        topic.subscribe("google_chart_loader", loadCallback);
        
        if(w.GJS_API_AVAILABLE) {
            topic.publish("google_chart_loader", w.google);
        } else {
            require(["https://www.gstatic.com/charts/loader.js"],function(){
                w.GJS_API_AVAILABLE = true;
                topic.publish("google_chart_loader", w.google);
            });
        }
    }
};
});