
var w = window.innerWidth;
var h = window.innerHeight;
var c = document.getElementById('canvas');

c.width = w;
c.height = h;

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Common = Matter.Common,
    Composites = Matter.Composites
    Svg = Matter.Svg,
    Vertices = Matter.Vertices;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    canvas: c,
    options: {
    	background: '#111',
    	width: w,
    	height: h,

    	wireframes: false,

    	// hasBounds: true,
    	// showCollisions: true,
    	// showAngleIndicator: true,
    	// showVelocity: true,
    },
    engine: engine
});

engine.world.bounds.min.x = -10;
engine.world.bounds.max.x = w+10;

engine.world.bounds.min.y = 0;
engine.world.bounds.max.y = h+10;

var wallOpts = { 
	isStatic: true, 
	render : { visible: false }
}

var walls = [
	Bodies.rectangle( w*.5, h+9, w, 10, wallOpts),
	Bodies.rectangle( -10, 0, 10, h*2, wallOpts),
	Bodies.rectangle( w, 0, 10, h*2, wallOpts),
];

// add all of the bodies to the world
World.add(engine.world, walls);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);

var skullehBase = {
	w: 131,
	h: 105,
	shape: []
}


// Load the shape and get vertices
$.get('./img/bnze_shape.svg').done(function(data) {
    $(data).find('path').each(function(i, path) {
        var points = Svg.pathToVertices(path, 10);
        skullehBase.shape.push(Vertices.scale(points, 1, 1));
    });
});


// Do a loop - there is probably a method in Matter ?
function draw() {

	setTimeout(function() {

		window.requestAnimationFrame(draw);

        if(engine.world.bodies.length < 100) {
            var x = 100+(Math.random()*(w-200));
            var y = -100;
            var xScale = Math.random()+.3;
            var yScale = xScale;
            var skulleh = Bodies.fromVertices(x, y, skullehBase.shape, {
                restitution: .85,
                angle: Math.random()*Math.PI,
                render: {
                    fillstyle: '#ff0000',
                    sprite : {
                            texture: '/img/bnze.svg',
                            xScale: xScale,
                            yScale: yScale,
                    }
                }
            }, true);
            
            Matter.Body.scale(skulleh, xScale, yScale);

            World.add(engine.world, [ skulleh ] )
        }

	}, 800)

}

draw();


// Other stuff


function toggleDebug() {
	render.options.wireframes = !render.options.wireframes;
	render.options.showCollisions = !render.options.showCollisions;
	render.options.showAngleIndicator = !render.options.showAngleIndicator;
}

window.addEventListener("resize", function(){
    c.width = window.innerWidth;
    c.height = window.innerHeight;
});


function start() {
    if(console && console.log) {
        console.log('O HAI! This is a quick hack up to play with Matter.js');
    }
}