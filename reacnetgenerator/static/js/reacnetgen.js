var canvas = document.getElementById("canvas");

var G = new jsnx.Graph();
var timer=null;

jsnx.draw(G, {
    element: canvas,
    layoutAttr: {
        charge: -1000,
        linkDistance: 300,
        gravity: 0.05,
    },
    panZoom: {
        enabled: false
    },
    nodeShape: "use",
    nodeAttr: {
        title(d) { return d.label; },
        "xlink:href"(d) {return "#"+d.node+"_border"; }, 
        onclick(d) {
            return "clearTimeout(timer);timer = setTimeout(function(){addnode('"+d.node+"')}, 300);";
        }, 
        ondblclick(d) {
            return "clearTimeout(timer);G.removeNode('"+d.node+"');";
        },
        width: 100,
        height: 100,
        x: -50,
        y: -50,
    },
    nodeStyle: {
        border: "1px solid #ddd"
    },
    edgeStyle: {
        fill: "#999"
    },
    edgeAttr: {
        ondblclick(d) {
            return "G.removeEdge('"+d.edge[0]+"','"+d.edge[1]+"');";
        },
    }
}, true);
$("#canvassec").addClass("mfp-hide");

$(".popup-modal").magnificPopup({
    type: "inline",
    preloader: false,
});

function addnode(spec){
    G.addNode(spec);
    for (var i in linkreac[spec]){
        if ({}.hasOwnProperty.call(linkreac[spec], i)) {
            G.addNode(linkreac[spec][i]);
            G.addEdge(linkreac[spec][i],spec);
        }
    }
}