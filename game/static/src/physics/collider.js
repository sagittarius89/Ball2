const ColliderShape = {
    SQUARE: "square",
    CIRCLE: "circle",
    SURFACE: "surface"
}

class Collider {
    static get OBJECT_PROPERTY() {
        return "collision_object";
    }

    static get SHAPE_PROPERTY() {
        return "shape_property";
    }

    static get STATIC_PROPERTY() {
        return "static_property";
    }

    /**
     * @param {ColliderShape} shape
     * @param {boolean} static
     */
    static COLLIDER_OBJECT_DATA(shape, static_) {
        var result = {}

        result[this.SHAPE_PROPERTY] = shape;
        result[this.STATIC_PROPERTY] = static_;

        return result;
    }

    checkCollision(objA, colDataA, objB, colDataB) {
        let shapeA = colDataA[Collider.SHAPE_PROPERTY];
        let shapeB = colDataB[Collider.SHAPE_PROPERTY];

        if (shapeA == ColliderShape.CIRCLE && shapeB == ColliderShape.CIRCLE) {
            this.processCircleCircleCollision(
                objA,
                colDataA[Collider.STATIC_PROPERTY],
                objB,
                colDataB[Collider.STATIC_PROPERTY]
            );
        }
        else if (shapeA == ColliderShape.CIRCLE && shapeB == ColliderShape.SURFACE) {
            this.processCircleShapeCollision(
                objA,
                colDataA[Collider.STATIC_PROPERTY],
                objB,
                colDataB[Collider.STATIC_PROPERTY]
            );
        }

        /** @todo */
    }

    processCircleCircleCollision(objA, isStaticA, objB, isStaticB) {
        //resolveIntersectionWith(objA,objB);


        //var collisionId = ball1.id + '&' + ball2.id;

        let objAPos = objA.position;
        let objBPos = objB.position;

        var distance = objAPos.getDistance(objBPos);

        if (distance <= objA.radius + objB.radius) {
            this.resolveIntersectionBallBall(objA, objB);

            let objAAcc = objA.acc;
            let objBAcc = objB.acc;

            //Unit normal vector uN is the unit-vector that links the two centers.
            let uN = objAPos.substract(objBPos).normalize();

            //Unit tangent vector uT is the unit-vector normal to uN. It's tangent to both the    two balls.
            let uT = new Vector2d(-uN.y, uN.x);

            //Project the two balls velocities onto the collision axis(uT and uN vectors).
            let v1n = uN.dot(objAAcc);
            let v1t = uT.dot(objAAcc);

            let v2n = uN.dot(objBAcc)
            let v2t = uT.dot(objBAcc);

            //Calculate the post collision normal velocities (tangent velocities don't change).
            let v1nPost = v2n;
            let v2nPost = v1n;

            //Convert scalar velocities to vectors.
            let postV1N = uN.multiplyByFloat(v1nPost);
            let postV1T = uT.multiplyByFloat(v1t);
            let postV2N = uN.multiplyByFloat(v2nPost);
            let postV2T = uT.multiplyByFloat(v2t);

            //Change the balls velocities.
            objA.acc = postV1N.add(postV1T);
            objB.acc = postV2N.add(postV2T);
        }
    }

    resolveIntersectionBallBall(ball1, ball2) {
        var ball1Pos = ball1.position;
        var ball2Pos = ball2.position;

        var n = ball1Pos.substract(ball2Pos);

        // How much the distance between centers is less than the radii's sum.
        var offset = (ball1.radius + ball2.radius) - (n.getLength());
        n = n.normalize();
        n = n.multiplyByFloat(offset);

        // Bring back the two ball according to their mass.
        ball1Pos = ball1Pos.add(n = n.multiplyByFloat(0.5));
        ball2Pos = ball2Pos.substract(n = n.multiplyByFloat(0.5));

        ball1.position = ball1Pos;
        ball2.position = ball2Pos;
    }

    processCircleShapeCollision(objA, isStaticA, objB, isStaticB) {
        let orientation = objB.orientation;
        let position = objA.position;
        let level = objB.startPoint;
        let acc = objA.acc;


        if (orientation == Orientation.HORIZONTAL) {
            if (position.y > level.y - objA.radius && position.y < level.y
                && position.x > level.x && position.x < level.x + objB.length) {
                objA.position = new Vector2d(position.x, level.y - objA.radius - 1);
                objA.acc = new Vector2d(acc.x, Physics.elasticity * acc.y);
            }
            else if (position.y < level.y + objA.radius && position.y > level.y
                && position.x > level.x && position.x < level.x + objB.length + 1) {
                objA.position = new Vector2d(position.x, level.y + objA.radius);
                objA.acc = new Vector2d(acc.x, Physics.elasticity * acc.y);
            }
        } else {
            if (position.x < level.x + objA.radius && position.x > level.x
                && position.y > level.y && position.y < level.y + objB.length) {
                objA.position = new Vector2d(level.x + objA.radius, position.y);
                objA.acc = new Vector2d(acc.x * Physics.elasticity, acc.y);
            }
            else if (position.x > level.x - objA.radius && position.x < level.x
                && position.y > level.y && position.y < level.y + objB.length) {
                objA.position = new Vector2d(level.x - objA.radius, position.y);
                objA.acc = new Vector2d(acc.x * Physics.elasticity, acc.y);
            }
        }

        if (position.y > level.y - (objA.radius + 10) && position.y < level.y
            && position.x > level.x && position.x < level.x + objB.length) {
            objA.addProperty("jumpable", objB.id);
        }
        else {
            if (objA.getProperty("jumpable") == objB.id)
                objA.addProperty("jumpable", false);
        }
    }
}