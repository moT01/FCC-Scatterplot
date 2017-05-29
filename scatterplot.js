d3.json('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json', function (data) {
    
    //create scales
    var yscale = d3.scaleLinear();
    var xscale = d3.scaleLinear();
    let formatTime = d3.timeFormat("%M:%S");
    let formatMinutes = function(d) { return formatTime(new Date(2012, 0, 1, 0, 0, d*60)); };
    
    //define scales
    yscale.domain([0, 36]);
    yscale.range([0, 400]);
    xscale.domain([36, 40]);
    xscale.range([0, 450]);
    
    //create axes
    var yaxis = d3.axisLeft(yscale);
    var xaxis = d3.axisBottom(xscale)
        .tickFormat(formatMinutes)
        .ticks(7);

    var svg = d3.select('body')
        .append('svg')
        .attr('width', 550)
        .attr('height', 550)
        .style('background-color', '#fff')
        .style('box-shadow', '2px 2px 8px 4px #555');
    
    var label = svg.selectAll('text')
        .data(data)
        .enter().append('text')
        .text(function (d) { return d.Name; })
        .attr('x', function (d) { 
            var minutes = d.Seconds / 60;
            return xscale(minutes) + 7; })
        .attr('y', function (d) { return yscale(d.Place) + 103; })
        .attr('font-family', 'Verdana')
        .attr('font-size', '9px')
    
    svg.append('g')
        .attr('transform', 'translate(50, 500)')
        .call(xaxis);
    svg.append('g')
        .attr('transform', 'translate(50, 100)')
        .call(yaxis);
    
    var circle = svg.selectAll('circle')
        .data(data)
        .enter().append('circle')
        .attr('cx', function (d) { 
            var minutes = d.Seconds / 60;
            return xscale(minutes); })
        .attr('cy', function (d) { return yscale(d.Place) + 100; })
        .attr('r', '5') 
        .attr('fill', function (d) {
            if (!d.Doping) {
                return '#00ff00';
            } else {
                return '#990000'; } })
        .attr('stroke', 'black')
        .attr('stroke-width', 0.8)
        .attr('cursor', 'pointer');
    
    //create details window (little window that comes up on hover)
    var details = d3.select('body').append('div')
        .style('position', 'fixed')
        .style('box-shadow', '1px 1px 2px 1px #111')
        .style('padding', '2px 4px')
        .style('display', 'none')
        .style('font-size', '10px');
    
    circle.on('mouseover', function (d) {
        var doping;
        if (!d.Doping) {
            doping = "None";
        } else {
            doping = d.Doping; }
        
        var superscript = 'th';
        if (d.Place == 1 || d.Place == 21 || d.Place == 31) {
            superscript = 'st';
        } else if (d.Place == 2 || d.Place == 22 || d.Place == 32) {
            superscript = 'nd';
        } else if (d.Place == 3 || d.Place == 23 || d.Place == 33) {
            superscript = 'rd'; }
        
        details.html('Name: ' + d.Name + '<br>Nationality: ' + d.Nationality + '<br>Place: ' + d.Place + '<sup>' + superscript + '</sup> All Time<br>Year: ' + d.Year + '<br>Time: ' + d.Time + '<br>Allegations: ' + doping) 
            .style('display', 'block')
            .style('background-color', 'white')
            .style('left',  '35%')
            .style('top', '60%');
    }).on('mouseout', function (d) {
        details.style('display', 'none');
    });
    
    //label for y axis
    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -325)
        .attr('y', 20)
        .attr('font-family', 'Verdana')
        .attr('font-size', '9px')
        .text('Place Finished');
    
    //label for axis
    svg.append('text')
        .attr('x', 235)
        .attr('y', 535)
        .attr('font-family', 'Verdana')
        .attr('font-size', '9px')
        .text('Minutes to Complete');
    
    //title
    svg.append('text')
        .attr('x', 135)
        .attr('y', 25)
        .attr('font-family', 'Verdana')
        .attr('font-size', '15px')
        .text('35 fastest times biking up Alpe d\'Huez');
    
    
    svg.append('circle')
        .attr('cx', 150)
        .attr('cy', 50)
        .attr('r', 5)
        .attr('fill', '#990000')
        .attr('stroke', 'black')
        .attr('stroke-width', 0.8);
    svg.append('text')
        .attr('x', 157)
        .attr('y', 53)
        .attr('font-family', 'Verdana')
        .attr('font-size', '9px')
        .text('Doping Allegations');
    
    svg.append('circle')
        .attr('cx', 300)
        .attr('cy', 50)
        .attr('r', 5)
        .attr('fill', '#00ff00')
        .attr('stroke', 'black')
        .attr('stroke-width', 0.8);
    svg.append('text')
        .attr('x', 307)
        .attr('y', 53)
        .attr('font-family', 'Verdana')
        .attr('font-size', '9px')
        .text('No Doping Allegations');

}); //end d3.json