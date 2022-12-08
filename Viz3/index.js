var svg = d3
  .select('body')
  .append('svg')
  .attr('width', 900)
  .attr('height', 500);
var pie = d3.pie().value(function (d) {
  return d.value;
});
const months = new Map();
const mwmap = new Map();
const mamap = new Map();
const dmap = new Map();
const newAngles1 = new Map();
const ttmap = new Map();
ttmap.set('l0', 'Mobile web');
ttmap.set('l1', 'Mobile app');
ttmap.set('l2', 'Desktop');
ttmap.set('r0', 'Mobile web');
ttmap.set('r1', 'Mobile app');
ttmap.set('r2', 'Desktop');
let mouseOver = function (d) {
  svg
    .append('rect')
    .attr('fill', '#fff')
    .attr('stroke', '#000')
    .attr('x', d.x)
    .attr('y', d.y)
    .attr('width', 105)
    .attr('height', 50)
    .attr('class', 'tooltip');
  svg
    .append('text')
    .attr('x', d.x + 5)
    .attr('y', d.y + 20)
    .attr('font-weight', 'bold')
    .text(ttmap.get(d.toElement.id.substring(0, 2)))
    .attr('class', 'tooltip');
  if (d.toElement.id.substring(1, 2) == '0'){
  svg
    .append('text')
    .attr('x', d.x + 5)
    .attr('y', d.y + 45)
    .text(d3.format(',')(mwmap.get(d.toElement.id.substring(2, 9))))
    .attr('class', 'tooltip');
  };
  if (d.toElement.id.substring(1, 2) == '1'){
  svg
    .append('text')
    .attr('x', d.x + 5)
    .attr('y', d.y + 45)
    .text(d3.format(',')(mamap.get(d.toElement.id.substring(2, 9))))
    .attr('class', 'tooltip');
  };
  if (d.toElement.id.substring(1, 2) == '2'){
  svg
    .append('text')
    .attr('x', d.x + 5)
    .attr('y', d.y + 45)
    .text(d3.format(',')(dmap.get(d.toElement.id.substring(2, 9))))
    .attr('class', 'tooltip');
  };
};
let mouseLeave = function (d) {
  d3.selectAll('.tooltip').remove();
};
var mv = 0;
d3.csv('data.csv', function (d, i) {
  d.mo = d.month.substring(0, 7);
  months.set(i, d.mo);
  d.mobileweb = +d['total.mobile-web'];
  d.mobileapp = +d['total.mobile-app'];
  d.desktop = +d['total.desktop'];
  mwmap.set(d.mo, d.mobileweb);
  mamap.set(d.mo, d.mobileapp);
  dmap.set(d.mo, d.desktop);
}).then(function (loadData) {
  var colorScale = d3
    .scaleOrdinal()
    .domain(['mobileweb', 'mobileapp', 'desktop'])
    .range(['#f00', '#0f0', '#00f']);
  var tempdata = {
    mobileweb: mwmap.get('2016-01'),
    mobileapp: mamap.get('2016-01'),
    desktop: dmap.get('2016-01'),
  };
  var data_ready = pie(d3.entries(tempdata));
  svg
    .selectAll()
    .data(data_ready)
    .enter()
    .append('path')
    .attr(
      'd',
      d3.arc().innerRadius(0).outerRadius(100)
    )
    .attr('fill', function (d) {
      return colorScale(d.data.key);
    })
    .attr('stroke', 'black')
    .style('stroke-width', '2px')
    .style('opacity', 0.7)
    .attr(
      'transform',
      'translate(' + 200 + ',' + 250 + ')'
    )
    .attr('class', 'cpc')
  .attr('id', function(d, i){
    return 'l' + i.toString(10) + '2016-01';})
    .on('mouseover', mouseOver)
    .on('mouseleave', mouseLeave);
  svg
    .append('text')
    .attr('x', 200)
    .attr('y', 400)
    .attr('text-anchor', 'middle')
    .text('2016-01')
    .attr('class', 'cpc');
  var tempdata = {
    mobileweb: mwmap.get('2022-10'),
    mobileapp: mamap.get('2022-10'),
    desktop: dmap.get('2022-10'),
  };
  var data_ready = pie(d3.entries(tempdata));
  const newAngles = new Map();
  newAngles.set(2, [
    0,
    data_ready[2].endAngle -
      data_ready[2].startAngle,
  ]);
  newAngles.set(0, [
    data_ready[2].endAngle -
      data_ready[2].startAngle,
    data_ready[2].endAngle,
  ]);
  data_ready[2].startAngle = newAngles.get(2)[0];
  data_ready[2].endAngle = newAngles.get(2)[1];
  data_ready[0].startAngle = newAngles.get(0)[0];
  data_ready[0].endAngle = newAngles.get(0)[1];
  svg
    .selectAll()
    .data(data_ready)
    .enter()
    .append('path')
    .attr(
      'd',
      d3.arc().innerRadius(0).outerRadius(100)
    )
    .attr('fill', function (d) {
      return colorScale(d.data.key);
    })
    .attr('stroke', 'black')
    .style('stroke-width', '2px')
    .style('opacity', 0.7)
    .attr(
      'transform',
      'translate(' + 500 + ',' + 250 + ')'
    )
  .attr('id', function(d, i){
    return 'r' + i.toString(10) + '2022-10';})
    .on('mouseover', mouseOver)
    .on('mouseleave', mouseLeave);
  svg
    .append('text')
    .attr('x', 500)
    .attr('y', 400)
    .attr('text-anchor', 'middle')
    .text('2022-10');
  let advance = function (d) {
    if (mv < 81) {
      d3.selectAll('.cpc').remove();
      mv += 1;
      var tempdata = {
        mobileweb: mwmap.get(months.get(mv)),
        mobileapp: mamap.get(months.get(mv)),
        desktop: dmap.get(months.get(mv)),
      };
      var data_ready = pie(d3.entries(tempdata));
      if (data_ready[0].index == 0) {
        newAngles1.set(2, [
          0,
          data_ready[2].endAngle -
            data_ready[2].startAngle,
        ]);
        newAngles1.set(0, [
          data_ready[2].endAngle -
            data_ready[2].startAngle,
          data_ready[2].endAngle,
        ]);
        data_ready[2].startAngle = newAngles1.get(
          2
        )[0];
        data_ready[2].endAngle = newAngles1.get(
          2
        )[1];
        data_ready[0].startAngle = newAngles1.get(
          0
        )[0];
        data_ready[0].endAngle = newAngles1.get(
          0
        )[1];
      }
      svg
        .selectAll()
        .data(data_ready)
        .enter()
        .append('path')
        .attr(
          'd',
          d3.arc().innerRadius(0).outerRadius(100)
        )
        .attr('fill', function (d) {
          return colorScale(d.data.key);
        })
        .attr('stroke', 'black')
        .style('stroke-width', '2px')
        .style('opacity', 0.7)
        .attr(
          'transform',
          'translate(' + 200 + ',' + 250 + ')'
        )
        .attr('class', 'cpc')
        .on('mouseover', mouseOver)
        .on('mouseleave', mouseLeave);
      svg
        .append('text')
        .attr('x', 200)
        .attr('y', 400)
        .attr('text-anchor', 'middle')
        .text(months.get(mv))
        .attr('class', 'cpc');
      d3.select('#backward').style('opacity', 1);
      if (mv == 81) {
        d3.select('#forward').style('opacity', 0);
      }
    }
  };
  let goback = function (d) {
    if (mv > 0) {
      d3.selectAll('.cpc').remove();
      mv -= 1;
      var tempdata = {
        mobileweb: mwmap.get(months.get(mv)),
        mobileapp: mamap.get(months.get(mv)),
        desktop: dmap.get(months.get(mv)),
      };
      var data_ready = pie(d3.entries(tempdata));
      if (data_ready[0].index == 0) {
        newAngles1.set(2, [
          0,
          data_ready[2].endAngle -
            data_ready[2].startAngle,
        ]);
        newAngles1.set(0, [
          data_ready[2].endAngle -
            data_ready[2].startAngle,
          data_ready[2].endAngle,
        ]);
        data_ready[2].startAngle = newAngles1.get(
          2
        )[0];
        data_ready[2].endAngle = newAngles1.get(
          2
        )[1];
        data_ready[0].startAngle = newAngles1.get(
          0
        )[0];
        data_ready[0].endAngle = newAngles1.get(
          0
        )[1];
      }
      svg
        .selectAll()
        .data(data_ready)
        .enter()
        .append('path')
        .attr(
          'd',
          d3.arc().innerRadius(0).outerRadius(100)
        )
        .attr('fill', function (d) {
          return colorScale(d.data.key);
        })
        .attr('stroke', 'black')
        .style('stroke-width', '2px')
        .style('opacity', 0.7)
        .attr(
          'transform',
          'translate(' + 200 + ',' + 250 + ')'
        )
        .attr('class', 'cpc');
      svg
        .append('text')
        .attr('x', 200)
        .attr('y', 400)
        .attr('text-anchor', 'middle')
        .text(months.get(mv))
        .attr('class', 'cpc');
      d3.select('#forward').style('opacity', 1);
      if (mv == 0) {
        d3.select('#backward').style(
          'opacity',
          0
        );
      }
    }
  };
  let doAnimation = function (d) {
    mv = 0;
    var interval = d3.interval(() => {
      advance();
      if (mv > 81) {
        interval.stop();
        return;
      }
    }, 500);
  };
  svg
    .append('text')
    .attr('x', 235)
    .attr('y', 400)
    .text('▶')
    .attr('id', 'forward')
    .style('opacity', 1)
    .on('click', advance);
  svg
    .append('text')
    .attr('x', 165)
    .attr('y', 400)
    .text('◀')
    .attr('text-anchor', 'end')
    .attr('id', 'backward')
    .style('opacity', 0)
    .on('click', goback);
  svg
    .append('rect')
    .attr('x', 700)
    .attr('y', 200)
    .attr('width', 20)
    .attr('height', 20)
    .style('fill', '#f00')
    .style('stroke', '#000')
    .style('opacity', 0.7);
  svg
    .append('rect')
    .attr('x', 700)
    .attr('y', 225)
    .attr('width', 20)
    .attr('height', 20)
    .style('fill', '#0f0')
    .style('stroke', '#000')
    .style('opacity', 0.7);
  svg
    .append('rect')
    .attr('x', 700)
    .attr('y', 250)
    .attr('width', 20)
    .attr('height', 20)
    .style('fill', '#00f')
    .style('stroke', '#000')
    .style('opacity', 0.7);
  svg
    .append('text')
    .attr('x', 725)
    .attr('y', 215)
    .text('Mobile web');
  svg
    .append('text')
    .attr('x', 725)
    .attr('y', 240)
    .text('Mobile app');
  svg
    .append('text')
    .attr('x', 725)
    .attr('y', 265)
    .text('Desktop');
  svg
    .append('text')
    .attr('x', 350)
    .attr('y', 50)
    .text(
      'English Wikipedia views by device type'
    )
    .attr('text-anchor', 'middle');
  svg
    .append('text')
    .attr('x', 350)
    .attr('y', 450)
    .text('Play animation')
    .attr('text-anchor', 'middle')
    .on('click', doAnimation);
