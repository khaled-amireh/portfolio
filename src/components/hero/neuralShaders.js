// R3F owns the transforms; GSAP writes only the shared cinematic parameters.
export const deformation = `
  uniform float uTime;
  uniform float uFormation;
  uniform float uProgress;
  uniform float uReduced;
  uniform vec2 uPointer;
  attribute vec3 aScatter;
  attribute vec3 aTarget;
  attribute float aSeed;
  vec3 neuralPosition() {
    float dissolve = smoothstep(0.28, 0.86, uProgress);
    vec3 p = mix(aScatter, position, uFormation);
    p = mix(p, aTarget, dissolve);
    p.x += sign(aTarget.x) * smoothstep(0.78, 1.0, uProgress) * 2.0;
    float alive = (1.0 - uReduced) * uFormation;
    p.z += sin(uTime * 0.55 + position.y * 3.0 + aSeed * 2.0) * 0.018 * alive;
    float proximity = exp(-length(position.xy - uPointer * vec2(1.3, 1.8)) * 2.2);
    p.z += proximity * 0.045 * alive;
    return p;
  }
`

export const particleVertex = `
  ${deformation}
  uniform float uScale;
  uniform float uEyes;
  uniform float uPulse;
  attribute float aKind;
  varying float vLight;
  varying float vKind;
  varying float vAlpha;
  void main() {
    vec3 p = neuralPosition();
    if (aKind > 0.5 && aKind < 1.5) p.xy += uPointer * vec2(0.025, 0.018) * (1.0 - uReduced);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = clamp((1.2 + aSeed * 1.45 + step(0.5, aKind) * 0.65) * uScale * (8.0 / -mv.z), 1.0, 7.0);
    float pulse = exp(-pow((position.y - uPulse) * 4.5, 2.0)) * (1.0 - uReduced);
    float idle = sin(uTime * 0.7 + aSeed * 18.0) * 0.07 * (1.0 - uReduced);
    vLight = 0.18 + aSeed * 0.38 + max(0.0, position.z - 0.25) * 0.35 + pulse * 0.5 + idle;
    vKind = aKind;
    float eye = step(0.5, aKind) * (1.0 - step(1.5, aKind));
    vAlpha = mix(1.0, uEyes, eye) * mix(0.14, 1.0, uFormation);
    vAlpha *= 1.0 - eye * (0.035 + sin(uTime * 0.65) * 0.035) * (1.0 - uReduced);
    vAlpha *= 1.0 - smoothstep(0.83, 1.0, uProgress);
  }
`
export const particleFragment = `
  varying float vLight;
  varying float vKind;
  varying float vAlpha;
  void main() {
    vec2 uv = abs(gl_PointCoord - 0.5);
    float shape = 1.0 - smoothstep(0.23, 0.5, max(uv.x, uv.y));
    vec3 color = mix(vec3(0.18, 0.65, 0.64), vec3(0.60, 0.96, 0.87), clamp(vLight, 0.0, 1.0));
    if (vKind > 0.5 && vKind < 1.5) color = vec3(0.72, 1.0, 0.94);
    float brightness = vKind > 0.5 ? 0.93 : vLight;
    gl_FragColor = vec4(color, shape * brightness * vAlpha);
  }
`
export const connectionVertex = `
  ${deformation}
  attribute float aAlong;
  varying float vAlong;
  void main() {
    vAlong = aAlong;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(neuralPosition(), 1.0);
  }
`
export const connectionFragment = `
  uniform float uTime;
  uniform float uActivation;
  uniform float uProgress;
  uniform float uReduced;
  varying float vAlong;
  void main() {
    float wave = fract(vAlong - uTime * 0.12);
    float signal = pow(max(0.0, 1.0 - abs(wave - 0.5) * 12.0), 3.0) * (1.0 - uReduced);
    float alpha = (0.1 + signal * 0.55 + uProgress * 0.2) * uActivation;
    alpha *= 1.0 - smoothstep(0.78, 1.0, uProgress);
    gl_FragColor = vec4(0.33, 0.84, 0.80, alpha);
  }
`
