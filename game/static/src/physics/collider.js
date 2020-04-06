const ColliderShape = {
    SQUARE: "square",
    CIRCLE: "circle",
    SURFACE: "surface"
}

class Collider extends GameObject {
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
        return { shape, static_ };
    }

    update(ctx, objects) {
        objects.foreach((objA) => {
            var colDataA = objA.getProperty(Collider.OBJECT_PROPERTY);

            if (colDataA) {
                objects.foreach((objB) => {

                    if (objA != objB) {
                        var colDataB = objB.getProperty(Collider.OBJECT_PROPERTY);

                        if (colDataB) {
                            this.checkCollision(objA, colDataA, objB, colDataB);
                        }
                    }
                });
            }
        });
    }

    checkCollision(objA, colDataA, objB, colDataB) {
        let shapeA = colData[Collider.SHAPE_PROPERTY];
        let shapeB = colData[Collider.SHAPE_PROPERTY];

        if (shapeA == ColliderShape.CIRCLE && shapeB == ColliderShape.CIRCLE) {
            processCircleCircleCollision(
                objA,
                colDataA[Collider.STATIC_PROPERTY],
                objB,
                colDataB[Collider.STATIC_PROPERTY]
            );
        }
        else if (shapeA == ColliderShape.CIRCLE && shapeB == ColliderShape.SURFACE) {
            processCircleShapeCollision(
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

        let objAPos = objA.position();
        let objBPos = objB.position();

        let objAAcc = objA.acc();
        let objBAcc = objB.acc();

        //Unit normal vector uN is the unit-vector that links the two centers.
        let uN = objAPos.substract(objBPos).normalize();

        //Unit tangent vector uT is the unit-vector normal to uN. It's tangent to both the    two balls.
        let uT = createVector2d(-uN.y, uN.x);

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

    processCircleShapeCollision(objA, isStaticA, objB, isStaticB) {
        let orientation = objB.orientation;
        let position = objA.position;
        let level = objB.startPoint;
        let acc = objA.acc;


        if (orientation == Orientation.HORIZONTAL) {
            if (position.y > level.y - objA.radius && position.y < level.y) {
                objA.position = new Vector2d(position.x, level.y - Consts.radius);
            }
            else if (position.y < level.y - objA.radius && position.y > level.y) {
                objA.position = new Vector2d(position.x, level.y + Consts.radius);
            }

            objA.acc = new Vector2d(acc.x, Consts.Physics.elasticity * acc.y);
        }
        else {
            if (position.x > level.x - objA.radius && position.x < level.x) {
                objA.position = new Vector2d(level.x - Consts.radius, position.y);
            }
            else if (position.x < level.x - objA.radius && position.x > level.x) {
                objA.position = new Vector2d(level.x + Consts.radius, position.y);
            }

            objA.acc = new Vector2d(acc.x, Consts.Physics.elasticity * acc.x);
        }
    }
}