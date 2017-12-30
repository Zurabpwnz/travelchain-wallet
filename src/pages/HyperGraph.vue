<template lang="pug">
    div#graph-area.max-available-height(ref="graphArea")
</template>

<script lang="ts">
    var d3 = require('../modules/d3.v3.min.js');

    import Vue from 'vue';
    import Component from 'vue-class-component';

    @Component({
        name: 'HyperGraph'
    })
    export default class HyperGraph extends Vue
    {
        graphWidth: number;
        graphHeight: number;
        node; link; vis; force;

        root: any = {
            name: "flare",
            children: [
                {
                    name: "analytics",
                    children: [
                        {
                            name: "cluster",
                            children: [
                                { name: "AgglomerativeCluster", size: 3938 },
                                { name: "CommunityStructure", size: 3812 },
                                { name: "HierarchicalCluster", size: 6714 },
                                {
                                    name: "MergeEdge",
                                    size: 743,
                                    children: [
                                        {
                                            name: "graph",
                                            children: [
                                                { name: "BetweennessCentrality", size: 3534 },
                                                { name: "LinkDistance", size: 5731 },
                                                { name: "MaxFlowMinCut", size: 7840 },
                                                { name: "ShortestPaths", size: 5914 },
                                                { name: "SpanningTree", size: 3416 }
                                            ]
                                        },
                                        {
                                            name: "optimization",
                                            children: [
                                                { name: "AspectRatioBanker", size: 7074 },
                                                {
                                                    name: "graph",
                                                    children: [
                                                        { name: "BetweennessCentrality", size: 3534 },
                                                        { name: "LinkDistance", size: 5731 },
                                                        { name: "MaxFlowMinCut", size: 7840 },
                                                        { name: "ShortestPaths", size: 5914 },
                                                        { name: "SpanningTree", size: 3416 }
                                                    ]
                                                },
                                                {
                                                    name: "optimization",
                                                    children: [
                                                        { name: "AspectRatioBanker", size: 7074 }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            name: "graph",
                            children: [
                                { name: "BetweennessCentrality", size: 3534 },
                                { name: "LinkDistance", size: 5731 },
                                { name: "MaxFlowMinCut", size: 7840 },
                                { name: "ShortestPaths", size: 5914 },
                                { name: "SpanningTree", size: 3416 }
                            ]
                        },
                        {
                            name: "optimization",
                            children: [
                                {
                                    name: "graph",
                                    children: [
                                        { name: "BetweennessCentrality", size: 3534 },
                                        { name: "LinkDistance", size: 5731 },
                                        { name: "MaxFlowMinCut", size: 7840 },
                                        { name: "ShortestPaths", size: 5914 },
                                        { name: "SpanningTree", size: 3416 }
                                    ]
                                },
                                {
                                    name: "optimization",
                                    children: [
                                        { name: "AspectRatioBanker", size: 7074 }
                                    ]
                                }
                            ]
                        }
                    ]
                },
            ]
        };

        mounted ()
        {
            setTimeout(() => {
                // @ts-ignore
                this.graphWidth = this.$refs.graphArea.clientWidth
                // @ts-ignore
                this.graphHeight = this.$refs.graphArea.clientHeight

                this.force = d3.layout.force()
                    .on("tick", this.tick)
                    .charge(function(d) { return d._children ? -d.size / 100 : -30; })
                    .linkDistance(function(d) { return d.target._children ? 80 : 30; })
                    .size([this.graphWidth, this.graphHeight - 160]);

                this.vis = d3.select("#graph-area").append("svg:svg")
                    .attr("width", this.graphWidth)
                    .attr("height", this.graphHeight);

                this.root.fixed = true;
                this.root.x = this.graphWidth / 2;
                this.root.y = this.graphHeight / 2 - 80;
                this.update();
            },
            2000)
        }

        update ()
        {
            var nodes = this.flatten(this.root),
                links = d3.layout.tree().links(nodes);

            // Restart the force layout.
            this.force
                .nodes(nodes)
                .links(links)
                .start();

            // Update the links…
            this.link = this.vis.selectAll("line.link")
                .data(links, function(d) { return d.target.id; });

            // Enter any new links.
            this.link.enter().insert("svg:line", ".node")
                .attr("class", "link")
                .attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            // Exit any old links.
            this.link.exit().remove();

            // Update the nodes…
            this.node = this.vis.selectAll("circle.node")
                .data(nodes, function(d) { return d.id; })
                .style("fill", this.color);

            this.node.transition()
                .attr("r", function(d) { return d.children ? 4.5 : Math.sqrt(d.size) / 10; });

            // Enter any new nodes.
            this.node.enter().append("svg:circle")
                .attr("class", "node")
                .attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; })
                .attr("r", function(d) { return d.children ? 4.5 : Math.sqrt(d.size) / 10; })
                .style("fill", this.color)
                .on("click", this.click)
                .call(this.force.drag);

            // Exit any old nodes.
            this.node.exit().remove();
        }

        tick ()
        {
            this.link.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            this.node.attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });
        }

        color (d)
        {
            return d._children ? "#3182bd" : d.children ? "#c6dbef" : "#fd8d3c";
        }

        click (d)
        {
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }
            this.update();
        }

        flatten (root)
        {
            var nodes = new Array(), i = 0;

            function recurse (node)
            {
                if (node.children) node.size = node.children.reduce(function(p, v) { return p + recurse(v); }, 0);
                if (!node.id) node.id = ++i;
                nodes.push(node);
                return node.size;
            }

            root.size = recurse(root);
            return nodes;
        }
    }
</script>

<style lang="stylus">
    #graph-area
        position relative

        svg
            position absolute
            top 0
            left 0
            width 100%
            height 100%

        .node circle
            cursor pointer
            stroke #3182bd
            stroke-width 1.5px

        .node text
            font 10px sans-serif
            pointer-events none
            text-anchor middle

        line.link
            fill none
            stroke #9ecae1
            stroke-width 1.5px
</style>