function Asteroid(s) {
    var r = random();
    var pos;
    if (r < .25) {
        pos = createVector(0, random() * windowHeight);
    } else if (r < .5) {
        pos = createVector(windowWidth, random() * windowHeight);
    } else if (r < .75) {
        pos = createVector(random() * windowWidth, 0);
    } else {
        pos = createVector(random() * windowWidth, windowHeight);
    }


    var vel = createVector(random() * 2 + 1.5, 0).rotate(random() * Math.PI * 2);
    var size = s;

    this.update = function () {
        pos.add(vel);
        wrapAround();
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
              }
        }
    }

    this.show = function show() {
        push();
        stroke(255);
        strokeWeight(1);
        noFill();
        translate(pos.x, pos.y);
        ellipse(0, 0, 50 * size, 50 * size);
        pop();
    }

    this.getPosition = function () {
        return pos.copy();
    }

    this.getVelocity = function () {
        return vel.copy();
    }

    this.getSize = function () {
        return size;
    }

    this.setPosition = function (p) {
        pos = p.copy();
    }
    this.setVelocity = function (v) {
        vel = v.copy();
    }
}