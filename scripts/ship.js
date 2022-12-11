// noinspection UnterminatedStatementJS


function Ship() {
    var pos = createVector(windowWidth / 2, windowHeight / 2);
    var vel = createVector(0, 0);
    var acc = createVector(0, 0);
    var angle = 0;
    this.update = function () {
        if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
            accelerate();
        } else {
            decelerate();
        }

        if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
            turnLeft();
        }

        if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
            turnRight();
        }

        vel.limit(8);
        wrapAround();


        pos.add(vel);
        vel.add(acc);

    }

    function wrapAround() {
        if (pos.x < 0) {
            switch(topology) {
                case 2:
                case 4:
                case 5:
                    pos.y = windowHeight-pos.y
                case 1:
                case 3:
                    pos.x = windowWidth;
                    break;
                default:
                    pos.x = 0
                    vel.set(-vel.x, vel.y)
                    acc.set(-acc.x, acc.y)
              }
        }
        if (pos.x > windowWidth) {
            switch(topology) {
                case 2:
                case 4:
                case 5:
                    pos.y = windowHeight-pos.y
                case 1:
                case 3:
                  // code block
                    pos.x = 0;
                    break;
                default:
                    pos.x = windowWidth
                    vel.set(-vel.x, vel.y)
                    acc.set(-acc.x, acc.y)
              }
        }
        if (pos.y < 0) {
            switch(topology) {
                case 4:
                    pos.x = windowWidth-pos.x;
                case 5:
                case 3:
                  // code block
                    pos.y = windowHeight;
                    break;
                case 1:
                case 2:
                default:
                    pos.y = 0
                    vel.set(vel.x, -vel.y)
                    acc.set(acc.x, -acc.y)
              }
        }
        if (pos.y > windowHeight) {
            switch(topology) {
                case 4:
                    pos.x = windowWidth-pos.x;
                case 5:
                case 3:
                  // code block
                    pos.y = 0;
                    break;
                case 1:
                case 2:
                default:
                    pos.y = windowHeight
                    vel.set(vel.x, -vel.y)
                    acc.set(acc.x, -acc.y)
              }
        }
    }

    this.show = function show() {
        // console.log(vel);
        strokeWeight(1);
        stroke(0, 255, 17);
        fill(0, 255, 17);
        ellipse(pos.x, pos.y, 15, 15);
        push();
        fill(0, 255, 17);
        translate(pos.x, pos.y);
        rotate(angle);
        if (acc.x !== 0 && acc.y !== 0) {
            push();
            fill(255, 25, 0);
            stroke(255, 25, 0);
            triangle(-15, 0, 15, 0, 0, 20);
            fill(255, 255, 0);
            stroke(255, 255, 0);
            triangle(-8, 0, 8, 0, 0, 10);
            pop();
        }
        triangle(0, 0, 0, -25, 25 / 2 * Math.sqrt(3), 25 / 2);
        triangle(0, 0, 0, -25, -25 / 2 * Math.sqrt(3), 25 / 2);
        pop();
    }

    function accelerate() {
        acc = createVector(0, -0.2).rotate(angle);
    }

    function decelerate() {
        acc = createVector(0, 0);
        var mag = vel.mag();
        if (mag > .03) {
            vel.limit(mag - .03);
        } else {
            vel = createVector(0, 0);
        }
    }

    function turnLeft() {
        angle += -0.1;
    }

    function turnRight() {
        angle += 0.1;
    }

    this.getPoints = function () {
        var p = [];
        p.push(p5.Vector.fromAngle(angle - Math.PI / 2, 25).add(pos));
        p.push(p5.Vector.fromAngle(angle - 7 * Math.PI / 6, 25).add(pos));
        p.push(p5.Vector.fromAngle(angle - 11 * Math.PI / 6, 25).add(pos));
        return p;
    }

    this.isAccelerating = function () {
        return acc.mag()>0;
    }
    this.getCenter = function () {
        return pos.copy();
    }

    this.getAngle = function () {
        return angle;
    }
}