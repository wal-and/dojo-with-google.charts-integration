define(["myapp/dojo_AMD_googleChartLOADER",
    "dojo/dom",
    "dojo/request/xhr",
], function(googLoader,dom,xhr) {
var gcAPI;

/* load google.chart and callback for drawing first chart */
function init(drawChart){
    //if (typeof drawChart=="function") {
        googLoader.load(function(google) {
            gcAPI=google;
            
            gcAPI.charts.load('current', {packages: ['corechart'],'language': "pl"})
                .then(drawChart);
        });
    //};
};

/* Set config LineChart, set data or series */
function drawLin(config){
    config.chartType = 'LineChart';

    // Set LineChart params as you nead
    var chartParams = {
        title: config.title,
        width: config.width,
        height: config.height,
        legend: none,
        pointSize: 0,
        lineWidth: '3',
        backgroundColor: config.backgroundColor,
        curveType:'none',
        vAxis: none,
    };

    // set series or get data from url
    if (config.series) chartParams.series=config.series;
    else if (config.dataUrl) getDataFromUrl(config);
}

/* Set config ColumnChart, set data or series */
function drawCol(config){
    config.chartType = 'ColumnChart';

    // Set ColumnChart params as you nead
    var chartParams = {
        title: config.title,
        width: config.width,
        height: config.height,
        legend: {
            position: config.legend ? config.legend :'none',
            textStyle: {
                fontSize:12,
                color:'#888'
            }
        },
        gridlineColor: '#ccc',
        chartArea:{
            width: (config.width-20),
            height: (config.height-45),
            left:50,
            top:10
        },
        backgroundColor: config.backgroundColor,
        vAxis: {
            textStyle:{
                color:	'#888',
                fontWeight:	400,
                fontSize: config.vAxisFonSisze ? config.vAxisFonSisze : 15,
            }
        },
    };

    // set series or get data from url
    if (config.series) chartParams.series=config.series;
    else if (config.dataUrl) getDataFromUrl(config);

}

/* Set config PieChart, set data or series */
function drawPie(config){
    config.chartType = 'PieChart';

    // set PieChart params as you need
    var chartParams = {
        title: config.title,
        width: config.width,
        height: config.height,
        is3D: false, 
        pieHole: config.pieHole ? config.piHole : 0,
        chartArea:{
            height: (config.height-10),
            top:5
        }, 
        backgroundColor: config.backgroundColor,
        sliceVisibilityThreshold: 1/50, 
        pieResidueSliceLabel: 'Others',
        legend: {
            textStyle: {
                color: config.legendTextColor ? config.legendTextColor : "000", 
                fontSize: config.fontsize ? config.fontsize : 15
            }
        },
    };

    // set series or get data from url
    if (config.series) chartParams.series=config.series;
    else if (config.dataUrl) getDataFromUrl(config);

    chartDraw(config);
}

/* data loader from url */
function getDataFromUrl(config){
    
    xhr.get(config.url,{
        handleAs:'json',
    }).then(function(res){
        if (res.data) config.buf=JSON.parse(res.data);
            else c.buf=false;
        if (res.title) config.title=config.title+res.title;

    }),function(err){
        config.buf=false;
        console.log('XHR',err.message);
    };

    if (config.buf) {
        config.data = new gcAPI.visualization.arrayToDataTable(config.buf);
        
        // if was set data sort
        if (config.sort!==false) config.data.sort({
            column: config.data.sort,
            desc: config.data.desc
        });
        
    }

}

/* draws a chart and embeds it in an html page */
function chartDraw(config){

    var chart= new gcAPI.visualization.ChartWrapper({
        'chartType':	config.chartType,
        'containerId':	config.domId,
        'dataTable':	config.data ? config.data : config.series,
        'options':		config.params
    });
    
    chart.draw();
}

return {
    init: init,
    drawLin: drawLin,
    drawCol: drawCol,
    drawPie: drawPie
}
});
