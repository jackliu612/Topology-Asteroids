var ship;
var canvas;
var asteroids = [];
var bullets = [];
var score = 0;
var highScore = 0;
let fillColor= 0;
let fillColor2= 0;
let buttonStatus = 0;

let topology = 0;
let menu; //None
let button0; //None
let button1; //Cylinder
let button2; //Mobius
let button3; //Torus
let button4; //Klein
let button5; //RP2

function createButtons(){
    menu = new Button({
        x: 0,	y: 0,
		width: 150,		height: 50,
		align_x: 2,		align_y: 2,
		content: 'Change Topology',
		on_press() {
			buttonStatus=1;
		}
    })
    button0 = new Button({
		x: 0,	y: 0,
		width: 100,		height: 50,
		align_x: 2,		align_y: 5,
		content: 'Unit Square',
		on_press() {
			buttonStatus=0;
            topology=0;
		}
	});
    button1 = new Button({
		x: 0,	y: 0,
		width: 100,		height: 50,
		align_x: 2,		align_y: 8,
		content: 'Cylinder',
		on_press() {
			buttonStatus=0;
            topology=1;
		}
	});
    button2 = new Button({
		x: 0,	y: 0,
		width: 100,		height: 50,
		align_x: 2,		align_y: 11,
		content: 'Möbius',
		on_press() {
			buttonStatus=0;
            topology=2;
		}
	});
    button3 = new Button({
		x: 0,	y: 0,
		width: 100,		height: 50,
		align_x: 4.5,		align_y: 5,
		content: 'Torus',
		on_press() {
			buttonStatus=0;
            topology=3;
		}
	});
    button4 = new Button({
		x: 0,	y: 0,
		width: 100,		height: 50,
		align_x: 4.5,		align_y: 8,
		content: 'RP2',
		on_press() {
			buttonStatus=0;
            topology=4;
		}
	});
    button5 = new Button({
		x: 0,	y: 0,
		width: 100,		height: 50,
		align_x: 4.5,		align_y: 11,
		content: 'Klein',
		on_press() {
			buttonStatus=0;
            topology=5;
		}
	});
}
function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    ship = new Ship();
    for (var i = 0; i < 0; i++) {
        asteroids.push(new Asteroid(Math.ceil(Math.random() * 3)));
    }
    background(51);
    createButtons();
}

function draw() {
    var scoreMult = 1;
    if (ship.isAccelerating()) {
        scoreMult = 3;
    }
    background(51);
    push();
    // textFont(inconsolata);
    stroke(255);
    fill(255)
    textSize(24);
    var s;
    switch(topology){
        case 1:
            s="Cylinder";
            break;
        case 2:
            s="Möbius";
            break;
        case 3:
            s="Torus";
            break;
        case 4:
            s="RP2";
            break;
        case 5:
            s="Klein";
            break;
        default:
            s="Unit Square"
    }
    text(s, 240, 60);
    pop();
    ship.update();

    if (frameCount % 120 === 0 && asteroids.length < 3) {
        asteroids.push(new Asteroid(Math.ceil(Math.random() * 3)));
    }
    var tempA = [];
    var isHit = false;
    var reset = false;
    asteroids.forEach(function (a) {
        isHit = false;
        var tempB = [];
        var bVel;
        bullets.forEach(function (b) {
            if (a.getPosition().dist(b.getPos()) < a.getSize() * 25) {
                isHit = true;
                bVel = b.getVelocity();
            } else {
                tempB.push(b);
            }
        });
        bullets = tempB;

        if (!isHit) {
            a.update();
            if (a.getPosition().dist(ship.getCenter()) < 25 + 25 * a.getSize()) {
                reset = true;
            }
            a.show();
            tempA.push(a);
        } else if (a.getSize() > 1) {
            var newA1 = new Asteroid(a.getSize() - 1);
            newA1.setPosition(a.getPosition());
            newA1.setVelocity(bVel.rotate(Math.PI / 3).limit(random() * 2 + 1.5));
            var newA2 = new Asteroid(a.getSize() - 1);
            newA2.setPosition(a.getPosition());
            newA2.setVelocity(bVel.rotate(-Math.PI / 3).limit(random() * 2 + 1.5));
            tempA.push(newA1);
            tempA.push(newA2);
        }

        if (isHit) {
            score += 100 * a.getSize();
        }
    });
    if (reset) {
        this.reset();
    } else {
        asteroids = tempA;
    }

    var temp = [];
    bullets.forEach(function (b) {
        if (b.isOnScreen()) {
            b.update();
            b.show();
            temp.push(b);
        }
    });
    bullets = temp;

    ship.show();
    score = score + scoreMult;
    if(highScore<score){
        highScore = score;
    }
    // showScore();
    showButtons();
}

function keyPressed() {
    if (keyCode === 8) {
        reset();
    }

    if (keyCode === 32 || keyCode === 74) {
        shoot();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function shoot() {
    if (bullets.length < 10) {
        bullets.push(new Bullet(p5.Vector.fromAngle(ship.getAngle() - Math.PI / 2, 25).add(ship.getCenter()), createVector(0, -10).rotate(ship.getAngle())));
    }
}

function reset() {
    ship = new Ship();
    bullets = [];
    tempA = [];
    for (var i = 0; i < 3; i++) {
        tempA.push(new Asteroid(Math.ceil(Math.random() * 3)));
    }
    asteroids = tempA;
    score = 0;
}

function showScore() {
    push();
    // fill(51);
    // stroke(255);
    // strokeWeight(2);
    // rect(15,15, 200, 65);
    stroke(255);
    fill(255)
    textSize(24);
    text('Score: ' + score, 20, 40);
    text('High Score: ' + highScore, 20, 70);
    pop();
}

function showButtons() {
    push();
    menu.draw();
    // menu.text("Current Topology: xClick to Change");
    if(buttonStatus==1){
        button0.draw();
        button1.draw();
        button2.draw();
        button3.draw();
        button4.draw();
        button5.draw();
    } 
    pop();
}