var line;
var bar;
var lineGraphElement;
var barGraphElement;

function onload()
{
    var line = {xaxis: [], yaxis: [], pts: []};
    var bar = {xaxis: [], yaxis: [], pts: []};

    var sample_data_line_pts = [0, 25, 90, 75, 100, 50, 60, 30, 40, 50, 75, 60];
    var sample_data_line_x = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
    var sample_data_line_y = [0, 25, 50, 75, 100, 125];
    line.xaxis = sample_data_line_x;
    line.yaxis = sample_data_line_y;
    line.pts = sample_data_line_pts;

    var sample_data_bar = [246, 223, 199, 152, 112, 103, 97, 96, 95, 95, 94, 92, 92, 89, 88, 85];
    var sample_data_bar_x = ["What", "The", "Frick", "Did", "You", "Just", "Say", "To", "Me", "You", "Little", "Shoot", "Ill", "Have", "You", "Know"];
    var sample_data_bar_y = [0, 250];
    bar.xaxis = sample_data_bar_x;
    bar.yaxis = sample_data_bar_y;
    bar.pts = sample_data_bar;

    var lineGraphElement = document.getElementById('line_graph');
    var barGraphElement = document.getElementById('bar_graph');

    renderLineGraph(lineGraphElement, line);
    renderBarGraph(barGraphElement, bar);

    setInterval(resizeLineGraph, 100);
    setInterval(resizeBarGraph, 100);
}

function renderLineGraph(element, line)
{
    var xaxis = element.getElementsByClassName("xaxis")[0];
    var yaxis = element.getElementsByClassName("yaxis")[0];
    var clipPath = element.getElementsByTagName("clipPath")[0];
    var svg = element.getElementsByTagName("svg")[0];
    var rect = "";
    var circles = "";
    var cr = 5; // circle radius
    var rh = 0.25; // rectangle height
    var x = 0;
    var y = 0;

    // Create x-axis and y-axis list
    xaxisInnerHTML = ""
    yaxisInnerHTML = ""
    for (var i in line.xaxis)
    {
        xaxisInnerHTML += "<li>" + line.xaxis[i] + "</li>";
    }
    for (var i=line.yaxis.length-1; i>=0; i--)
    {
        yaxisInnerHTML += "<li>" + line.yaxis[i] + "</li>";
    }
    xaxis.innerHTML = xaxisInnerHTML;
    yaxis.innerHTML = yaxisInnerHTML;

    // Create points and lines
    for (var i = 0; i < line.pts.length; i++)
    {
        // x and y of current point
        x = Math.round(((i*(svg.clientWidth-3*cr)/(line.pts.length-1))), 2)+cr;
        y = (svg.clientHeight-cr) - (svg.clientHeight-cr)*(line.pts[i]/line.yaxis[line.yaxis.length-1]);
        // x and y of next point; used for lines
        x_next = Math.round((((i+1)*(svg.clientWidth-3*cr)/(line.pts.length-1))), 2)+cr;
        y_next = (svg.clientHeight-cr) - (svg.clientHeight-cr)*(line.pts[i+1]/line.yaxis[line.yaxis.length-1]);
        // calculate length and angle of line
        var length = Math.sqrt(Math.pow(x-x_next, 2) + Math.pow(y-y_next, 2));
        var angle = Math.atan((y-y_next)/(x-x_next)) * (180/Math.PI);
        if (i < line.pts.length-1)
        {
            // Can't have a line go towards a point which doesn't exist
            rect += '<rect x="' + x + '" y="' + (y-(cr/2)) + '" width="' + length + '" height="' + rh + 'vw" transform="rotate(' + angle + ' ' + x + ' ' + (y-(cr/2)) + ')" />';
        }
        circles += '<circle cx="' + x + '" cy="' + y + '" r="' + cr + '" />';
    }
    clipPath.innerHTML = rect + circles;
}

function renderBarGraph(element, bar)
{
    var xaxis = element.getElementsByClassName("xaxis")[0];
    var yaxis = element.getElementsByClassName("yaxis")[0];
    var clipPath = element.getElementsByTagName("clipPath")[0];
    var svg = element.getElementsByTagName("svg")[0];
    var rect = "";
    var rw = 2.5 // Rectangle Width
    var x = 0;
    var y = 0;

    xaxisInnerHTML = "";
    yaxisInnerHTML = ""
    for (var i in bar.xaxis)
    {
        x = 100*(i*(svg.clientWidth-(rw*i)))/(bar.pts.length-1)/svg.clientWidth;
        xaxisInnerHTML += '<li style="left:' + x + '%"><p style="transform: rotate(-90deg);">' + bar.xaxis[i] + '</p></li>';
        yaxisInnerHTML += '<li style="left:' + x + '%"><p style="transform: rotate(-90deg);">' + bar.pts[i] + '</p></li>';
    }
    xaxis.innerHTML = xaxisInnerHTML;
    yaxis.innerHTML = yaxisInnerHTML;

    for (var i in bar.pts)
    {
        x = (i*(svg.clientWidth-(rw*i)))/(bar.pts.length-1);
        y = svg.clientHeight - svg.clientHeight*((bar.yaxis[bar.yaxis.length-1] - bar.pts[i])/bar.yaxis[bar.yaxis.length-1]);
        rect += '<rect x="' + x + '" y="' + (svg.clientHeight-y) + '" width="' + rw + 'vw" height="' + y + '" />';
    }
    clipPath.innerHTML = rect;
}

function resizeLineGraph()
{
    var line = {xaxis: [], yaxis: [], pts: []};

    var sample_data_line_pts = [0, 25, 90, 75, 100, 50, 60, 30, 40, 50, 75, 60];
    var sample_data_line_x = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
    var sample_data_line_y = [0, 25, 50, 75, 100, 125];
    line.xaxis = sample_data_line_x;
    line.yaxis = sample_data_line_y;
    line.pts = sample_data_line_pts;

    var lineGraphElement = document.getElementById('line_graph');

    renderLineGraph(lineGraphElement, line);
}
function resizeBarGraph()
{
    var bar = {xaxis: [], yaxis: [], pts: []};

    var sample_data_bar = [246, 223, 199, 152, 112, 103, 97, 96, 95, 95, 94, 92, 92, 89, 88, 85];
    var sample_data_bar_x = ["What", "The", "Frick", "Did", "You", "Just", "Say", "To", "Me", "You", "Little", "Shoot", "Ill", "Have", "You", "Know"];
    var sample_data_bar_y = [0, 250];
    bar.xaxis = sample_data_bar_x;
    bar.yaxis = sample_data_bar_y;
    bar.pts = sample_data_bar;

    var barGraphElement = document.getElementById('bar_graph');

    renderBarGraph(barGraphElement, bar);
}
