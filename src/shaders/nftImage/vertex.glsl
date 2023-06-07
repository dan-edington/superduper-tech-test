varying vec2 vUv;
uniform float uTime;
uniform float uRandomOffset;

void main() {
    vUv = uv;
    vec3 pos = position;
    pos.y += sin((uTime + uRandomOffset * 2.) * 1.) * 5.;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
}