import {
  scaleLinear,
  scaleLog,
  axisTop,
  axisBottom,
} from 'd3';
var svg = d3
  .select('body')
  .append('svg')
  .attr('width', 1300)
  .attr('height', 2680);
var ids = new Map();
var counts = new Map();
svg
  .append('line')
  .attr('x1', 15)
  .attr('x2', 95)
  .attr('y1', 35)
  .attr('y2', 35)
  .attr('stroke', '#000')
  .attr('stroke-width', 1);
svg
  .append('line')
  .attr('x1', 15)
  .attr('x2', 95)
  .attr('y1', 84 * 30 + 35)
  .attr('y2', 84 * 30 + 35)
  .attr('stroke', '#000')
  .attr('stroke-width', 1);
svg
  .append('line')
  .attr('x1', 15)
  .attr('x2', 15)
  .attr('y1', 35)
  .attr('y2', 84 * 30 + 35)
  .attr('stroke', '#000')
  .attr('stroke-width', 1);
svg
  .append('line')
  .attr('x1', 95)
  .attr('x2', 95)
  .attr('y1', 35)
  .attr('y2', 84 * 30 + 35)
  .attr('stroke', '#000')
  .attr('stroke-width', 1);
svg
  .append('text')
  .attr('x', 20)
  .attr('y', 25)
  .attr('font-weight', 'bold')
  .text('Month');
const xScale = scaleLinear()
  .domain([0, 1.5e8])
  .range([95, 1285]);
const gx = svg
  .append('g')
  .attr('transform', `translate(${0}, ${35})`);
const xAxis = axisTop(xScale);
xAxis(gx.append('g'));
const gx2 = svg
  .append('g')
  .attr(
    'transform',
    `translate(${0}, ${84 * 30 + 35})`
  );
const xAxis2 = axisBottom(xScale);
xAxis2(gx2.append('g'));
let mouseOver = function (d) {
  svg
    .append('rect')
    .attr('fill', '#fff')
    .attr('stroke', '#000')
    .attr('x', d.x)
    .attr('y', d.y)
    .attr('width', 400)
    .attr('height', 100)
    .attr('class', 'tooltip');
  svg
    .append('text')
    .attr('x', d.x + 5)
    .attr('y', d.y + 20)
    .attr('font-weight', 'bold')
    .text(ids.get(d.toElement.id))
    .attr('class', 'tooltip');
  if (d.toElement.id.substring(8, 9) == 'a') {
    svg
      .append('text')
      .attr('x', d.x + 5)
      .attr('y', d.y + 50)
      .text('1st place')
      .attr('class', 'tooltip');
  }
  if (d.toElement.id.substring(8, 9) == 'b') {
    svg
      .append('text')
      .attr('x', d.x + 5)
      .attr('y', d.y + 50)
      .text('2nd place')
      .attr('class', 'tooltip');
  }
  if (d.toElement.id.substring(8, 9) == 'c') {
    svg
      .append('text')
      .attr('x', d.x + 5)
      .attr('y', d.y + 50)
      .text('3rd place')
      .attr('class', 'tooltip');
  }
  svg
    .append('text')
    .attr('x', d.x + 5)
    .attr('y', d.y + 80)
    .text(
      d3.format(',')(counts.get(d.toElement.id)) +
        ' views'
    )
    .attr('class', 'tooltip');
};
let mouseLeave = function (d) {
  d3.selectAll('.tooltip').remove();
};
d3.csv('data.csv').then((data) => {
  data.forEach((d, i) => {
    d.c1 = +d.c1;
    d.c2 = +d.c2;
    d.c3 = +d.c3;
    console.log(d.c1);
    console.log(xScale(d.c1));
    svg
      .append('text')
      .attr('x', 20)
      .attr('y', i * 30 + 55)
      .text(d.month);
    svg
      .append('rect')
      .attr('x', 95)
      .attr('y', i * 30 + 40)
      .attr('height', 20)
      .attr('width', xScale(d.c1) - 95)
      .attr('id', 't' + d.month + 'a')
      .style('fill', 'gold')
      .on('mouseover', mouseOver)
      .on('mouseleave', mouseLeave);
    ids.set('t' + d.month + 'a', d.a1);
    counts.set('t' + d.month + 'a', d.c1);
    svg
      .append('rect')
      .attr('x', 95)
      .attr('y', i * 30 + 43)
      .attr('height', 14)
      .attr('width', xScale(d.c2) - 95)
      .attr('id', 't' + d.month + 'b')
      .style('fill', 'silver')
      .on('mouseover', mouseOver)
      .on('mouseleave', mouseLeave);
    ids.set('t' + d.month + 'b', d.a2);
    counts.set('t' + d.month + 'b', d.c2);
    svg
      .append('rect')
      .attr('x', 95)
      .attr('y', i * 30 + 46)
      .attr('height', 8)
      .attr('width', xScale(d.c3) - 95)
      .attr('id', 't' + d.month + 'c')
      .style('fill', '#cd7f32')
      .on('mouseover', mouseOver)
      .on('mouseleave', mouseLeave);
    ids.set('t' + d.month + 'c', d.a3);
    counts.set('t' + d.month + 'c', d.c3);
  });
});
