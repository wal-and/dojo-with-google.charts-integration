require(["myapp/dojo_AMD_googleChartDRAW",
    "dojo/ready"
], function(charts,ready) {

function signalCallback(type){
    console.log('My first chart '+type+' is done');
}

function drawChart(){
    var config= {
        width: 500,
        height: 300,
        domID: 'domID_Lin',
        title: 'My first chart',
        series: false,
        dataUrl: 'https://mysite.com/getData',
        buf: {},            // type: JSON data type
        data: {},           // type: google Data Table
        dataSort: {
            column: 'name',
            desc: false
        }
    }

    charts.drawLin(config, signalCallback);

}

ready(function(){
    // first chart drowing must load google.charts
     charts.init(drawChart);

    /* now is possible draw subsequent charts without init() function */
    
    config.domID= 'domID_Col';      // set the remaining config parameters as in drawChart()
    charts.drawCol(config, signalCallback);
    
    config.domID= 'domID_Pie';      // set the remaining config parameters as in drawChart()
    charts.drawPie(config, signalCallback);
});
})