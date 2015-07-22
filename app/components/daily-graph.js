export default Ember.Component.extend({
   tagName: 'svg',
  
  draw: function(){
    var dates = [];
    var averages = [];
    var stock = this.get('stock');

    if(!stock) {
      return
    }

    var histories = this.get('histories');
    if(histories && histories.get('length') > 0) {

      histories.forEach(function(history) {
        dates.push(history.get('date'));
        averages.push(history.get('average'));
      })

      var data = [ { label: stock.get('symbol') + " Performance Last 30 days", 
               x: dates, 
               y: averages }] ;

      var xy_chart = this.d3_xy_chart()
          .width(960)
          .height(500)
          .xlabel("Date")
          .ylabel("Price") ;

      this.$().empty();
      var svg = d3.select("svg")
          .datum(data)
          .call(xy_chart) ;
    }

  }.observes('stock'),

  d3_xy_chart: function() {
    var width = 640,  
        height = 480, 
        xlabel = "X Axis Label",
        ylabel = "Y Axis Label" ;
    
    function chart(selection) {
      selection.each(function(datasets) {
        //
        // Create the plot. 
        //
        var margin = {top: 20, right: 80, bottom: 30, left: 50}, 
            innerwidth = width - margin.left - margin.right,
            innerheight = height - margin.top - margin.bottom ;
       

     //   var x_scale = d3.scale.linear()
       //     .range([0, innerwidth])
         //   .domain([ d3.min(datasets, function(d) { return d3.min(d.x); }), 
           //           d3.max(datasets, function(d) { return d3.max(d.x); }) ]) ;
        
        var y_scale = d3.scale.linear()
            .range([innerheight, 0])
            .domain([ d3.min(datasets, function(d) { return d3.min(d.y); }),
                      d3.max(datasets, function(d) { return d3.max(d.y); }) ]) ;

        var x_scale = d3.scale.ordinal().rangeRoundBands([0, width]);
        var x_axis = d3.svg.axis().scale(x_scale).orient("bottom");
        x_scale.domain(datasets[0].x);

        var color_scale = d3.scale.category10()
            .domain(d3.range(datasets.length)) ;

     //   var x_axis = d3.svg.axis()
       //     .scale(x_scale)
         //   .orient("bottom") ;

        var y_axis = d3.svg.axis()
            .scale(y_scale)
            .orient("left") ;

        var x_grid = d3.svg.axis()
            .scale(x_scale)
            .orient("bottom")
            .tickSize(-innerheight)
            .tickFormat("") ;

        var y_grid = d3.svg.axis()
            .scale(y_scale)
            .orient("left") 
            .tickSize(-innerwidth)
            .tickFormat("") ;

        var draw_line = d3.svg.line()
            .interpolate("basis")
            .x(function(d) { return x_scale(d[0]); })
            .y(function(d) { return y_scale(d[1]); }) ;

        var svg = d3.select(this)
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")") ;
        
        svg.append("g")
            .attr("class", "x grid")
            .attr("transform", "translate(0," + innerheight + ")")
            .call(x_grid) ;

        svg.append("g")
            .attr("class", "y grid")
            .call(y_grid) ;

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + innerheight + ")") 
            .call(x_axis)
            .append("text")
            .attr("dy", "-.71em")
            .attr("x", innerwidth)
            .style("text-anchor", "end")
            .text(xlabel) ;
        
        svg.append("g")
            .attr("class", "y axis")
            .call(y_axis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .style("text-anchor", "end")
            .text(ylabel) ;

        var data_lines = svg.selectAll(".d3_xy_chart_line")
            .data(datasets.map(function(d) {return d3.zip(d.x, d.y);}))
            .enter().append("g")
            .attr("class", ".d3_xy_chart_line") ;
        
        data_lines.append("path")
            .attr("class", "line")
            .attr("d", function(d) {return draw_line(d); })
            .attr("stroke", function(_, i) {return color_scale(i);}) ;
        
        data_lines.append("text")
            .datum(function(d, i) { return {name: datasets[i].label, final: d[d.length-1]}; }) 
            .attr("transform", function(d) { 
                return ( "translate(" + x_scale(d.final[0]) + "," + 
                         y_scale(d.final[1]) + ")" ) ; })
            .attr("x", 3)
            .attr("dy", ".35em")
            .attr("fill", function(_, i) { return color_scale(i); })
            .text(function(d) { return d.name; }) ;

        }) ;
    }

    chart.width = function(value) {
      if (!arguments.length) return width;
      width = value;
      return chart;
    };

    chart.height = function(value) {
      if (!arguments.length) return height;
      height = value;
      return chart;
    };

    chart.xlabel = function(value) {
      if(!arguments.length) return xlabel ;
      xlabel = value ;
      return chart ;
    } ;

    chart.ylabel = function(value) {
      if(!arguments.length) return ylabel ;
      ylabel = value ;
      return chart ;
    } ;

    return chart;
}
});

