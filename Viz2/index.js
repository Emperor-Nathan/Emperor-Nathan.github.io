// The svg
const svg = d3.select('svg'),
  width = +svg.attr('width'),
  height = +svg.attr('height');

// Map and projection
const path = d3.geoPath();
const projection = d3
  .geoEquirectangular()
  .scale(100)
  .center([0, 0])
  .translate([width / 2, 200]);

// Data and color scale
const data_l1 = new Map();
const data_n1 = new Map();
const data_l2 = new Map();
const data_n2 = new Map();
const data_l3 = new Map();
const data_n3 = new Map();
const data_l4 = new Map();
const data_n4 = new Map();
const data_l5 = new Map();
const data_n5 = new Map();
const iso = new Map();
const isoinverse = new Map();
const colorScale = d3
  .scaleThreshold()
  .domain([0, 0.5, 0.6, 0.7, 0.8, 0.9, 1])
  .range(d3.schemeBlues[7]);

// Load external data and boot
Promise.all([
  d3.json(
    'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson'
  ),
  d3.csv('data.csv', function (d) {
    iso.set(d.country, d.code);
    isoinverse.set(d.code, d.country);
    data_l1.set(d.country, d.l1);
    data_n1.set(d.country, +d.n1);
    data_l2.set(d.country, d.l2);
    data_n2.set(d.country, +d.n2);
    data_l3.set(d.country, d.l3);
    data_n3.set(d.country, +d.n3);
    data_l4.set(d.country, d.l4);
    data_n4.set(d.country, +d.n4);
    data_l5.set(d.country, d.l5);
    data_n5.set(d.country, +d.n5);
  }),
]).then(function (loadData) {
  let topo = loadData[0];

  let mouseOver = function (d) {
    d3.selectAll('.message').remove();
    d3.selectAll('.Country')
      .style('opacity', 0.5)
      .style('stroke', 'transparent');
    d3.select(this)
      .style('opacity', 1)
      .style('stroke', 'black');
    d3.selectAll('.below').remove();
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', 400)
      .attr('class', 'below')
      .text(d.toElement.id)
      .attr('text-anchor', 'middle');
    if (data_n1.get(d.toElement.id) != 0) {
      const barScale = d3
        .scaleLinear()
        .domain([0, data_n1.get(d.toElement.id)])
        .range([200, 500]);
      const gx = svg
        .append('g')
        .attr(
          'transform',
          `translate(${0}, ${440})`
        )
        .attr('class', 'below');
      const xAxis = d3.axisTop(barScale);
      xAxis(gx.append('g'));
      svg
        .append('rect')
        .attr('x', 200)
        .attr('y', 450)
        .attr(
          'width',
          barScale(data_n1.get(d.toElement.id)) -
            200
        )
        .attr('height', 20)
        .style('fill', '#000')
        .attr('class', 'below');
      svg
        .append('text')
        .attr('x', 190)
        .attr('y', 465)
        .attr('text-anchor', 'end')
        .text(data_l1.get(d.toElement.id))
        .attr('class', 'below');
      if (data_n2.get(d.toElement.id) != 0) {
        svg
          .append('rect')
          .attr('x', 200)
          .attr('y', 480)
          .attr(
            'width',
            barScale(
              data_n2.get(d.toElement.id)
            ) - 200
          )
          .attr('height', 20)
          .style('fill', '#000')
          .attr('class', 'below');
        svg
          .append('text')
          .attr('x', 190)
          .attr('y', 495)
          .attr('text-anchor', 'end')
          .text(data_l2.get(d.toElement.id))
          .attr('class', 'below');
        if (data_n3.get(d.toElement.id) != 0) {
          svg
            .append('rect')
            .attr('x', 200)
            .attr('y', 510)
            .attr(
              'width',
              barScale(
                data_n3.get(d.toElement.id)
              ) - 200
            )
            .attr('height', 20)
            .style('fill', '#000')
            .attr('class', 'below');
          svg
            .append('text')
            .attr('x', 190)
            .attr('y', 525)
            .attr('text-anchor', 'end')
            .text(data_l3.get(d.toElement.id))
            .attr('class', 'below');
          if (data_n4.get(d.toElement.id) != 0) {
            svg
              .append('rect')
              .attr('x', 200)
              .attr('y', 540)
              .attr(
                'width',
                barScale(
                  data_n4.get(d.toElement.id)
                ) - 200
              )
              .attr('height', 20)
              .style('fill', '#000')
              .attr('class', 'below');
            svg
              .append('text')
              .attr('x', 190)
              .attr('y', 555)
              .attr('text-anchor', 'end')
              .text(data_l4.get(d.toElement.id))
              .attr('class', 'below');
            if (
              data_n5.get(d.toElement.id) != 0
            ) {
              svg
                .append('rect')
                .attr('x', 200)
                .attr('y', 570)
                .attr(
                  'width',
                  barScale(
                    data_n5.get(d.toElement.id)
                  ) - 200
                )
                .attr('height', 20)
                .style('fill', '#000')
                .attr('class', 'below');
              svg
                .append('text')
                .attr('x', 190)
                .attr('y', 585)
                .attr('text-anchor', 'end')
                .text(data_l5.get(d.toElement.id))
                .attr('class', 'below');
            }
          }
        }
      }
    } else {
      svg
        .append('text')
        .attr('x', width / 2)
        .attr('y', 500)
        .attr('text-anchor', 'middle')
        .text('No data')
        .attr('class', 'below');
    }
  };

  let mouseLeave = function (d) {
    d3.selectAll('.Country')
      .style('opacity', 0.8)
      .style('stroke', '#000');
    d3.selectAll('.below').remove();
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', 450)
      .attr('text-anchor', 'middle')
      .attr('class', 'message')
      .text('When each country is hovered over,');
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', 475)
      .attr('text-anchor', 'middle')
      .attr('class', 'message')
      .text(
        'a bar chart will be displayed showing'
      );
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', 500)
      .attr('text-anchor', 'middle')
      .attr('class', 'message')
      .text(
        'the top 5 language editions of Wikipedia'
      );
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', 525)
      .attr('text-anchor', 'middle')
      .attr('class', 'message')
      .text(
        'by number of pageviews from that country.'
      );
  };

  // Draw the map
  svg
    .append('g')
    .selectAll('path')
    .data(topo.features)
    .enter()
    .append('path')
    // draw each country
    .attr(
      'd',
      d3.geoPath().projection(projection)
    )
    // set the color of each country
    .attr('fill', '#ddd')
    .style('stroke', '#000')
    .attr('id', function (d) {
      return isoinverse.get(d.id) || d.id;
    })
    .attr('class', function (d) {
      return 'Country';
    })
    .style('opacity', 0.8)
    .on('mouseover', mouseOver)
    .on('mouseleave', mouseLeave);
  svg
    .append('text')
    .attr('x', width / 2)
    .attr('y', 450)
    .attr('text-anchor', 'middle')
    .attr('class', 'message')
    .text('When each country is hovered over,');
  svg
    .append('text')
    .attr('x', width / 2)
    .attr('y', 475)
    .attr('text-anchor', 'middle')
    .attr('class', 'message')
    .text(
      'a bar chart will be displayed showing'
    );
  svg
    .append('text')
    .attr('x', width / 2)
    .attr('y', 500)
    .attr('text-anchor', 'middle')
    .attr('class', 'message')
    .text(
      'the top 5 language editions of Wikipedia'
    );
  svg
    .append('text')
    .attr('x', width / 2)
    .attr('y', 525)
    .attr('text-anchor', 'middle')
    .attr('class', 'message')
    .text(
      'by number of pageviews from that country.'
    );
});
