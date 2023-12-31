//let values = [20,26,25,5],labels = ["帥哥","酷哥","男同","甲怪"];
//var data=[{values:20,labelsL:"Ruby"},{values:26,labelsL:"JavaScript"},{values:5,labelsL:"Shell"}];
    
Raphael.fn.pieChart = function (cx, cy, r, values, labels,img, stroke) {
    var paper = this,
        rad = Math.PI / 180,
        chart = this.set();
    function sector(cx, cy, r, startAngle, endAngle, params) {
        var x1 = cx + r * Math.cos(-startAngle * rad),
            x2 = cx + r * Math.cos(-endAngle * rad),
            y1 = cy + r * Math.sin(-startAngle * rad),
            y2 = cy + r * Math.sin(-endAngle * rad);
        return paper.path(["M", cx, cy, "L", x1, y1, "A", r, r, 0, +(endAngle - startAngle > 180), 0, x2, y2, "z"]).attr(params);
    }
    var angle = 0,
        total = 0,
        start = 0,
        process = function (j) {
            var value = values[j],
                angleplus = 360 * value / total,
                popangle = angle + (angleplus / 2),
                color = img[j],//Raphael.hsb(start, .75, 1)
                ms = 500,
                delta = 30,
                bcolor = Raphael.hsb(start, 1, 1),
                p = sector(cx, cy, r, angle, angle + angleplus, {fillcenter:`url(${color})` , stroke: stroke, "stroke-width": 3}),//oringinal color "90-" + bcolor + "-" + color images/img/chart/${Math.floor(Math.random()*3)}.jpg
                txt = paper.text(cx + (r + delta + 55) * Math.cos(-popangle * rad), cy + (r + delta + 25) * Math.sin(-popangle * rad), labels[j]).attr({fill: bcolor, stroke: "none", opacity: 0, "font-size": 20});
            p.mouseover(function () {
                p.stop().animate({transform: "s1.1 1.1 " + cx + " " + cy}, ms, "elastic");//{transform: "s1.1 1.1 " + cx + " " + cy,}
                txt.stop().animate({opacity: 1}, ms, "elastic");
            }).mouseout(function () {
                p.stop().animate({transform: ""}, ms, "elastic");
                txt.stop().animate({opacity: 0}, ms);
            });
            angle += angleplus;
            chart.push(p);
            chart.push(txt);
            start += .1;
        };
    for (var i = 0, ii = values.length; i < ii; i++) {
        total += values[i];
    }
    for (i = 0; i < ii; i++) {
        process(i);
    }
    return chart;
};
function start() {
    var width = document.getElementById("holder").clientWidth;
    Raphael("holder", width, width).pieChart(width/2, 250, 200, values, labels, "#FFFFFF");
}

//window.addEventListener("load",start);