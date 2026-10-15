/* Klar Zahn – magische 3D-Effekte: Seifenblasen, Feenstaub, Sternfunkeln. */
import { THREE } from "./models.js";

/* ---------- Schillernde Seifenblasen ---------- */
let bubbleMat = null;
function bubbleMaterial() {
  if (bubbleMat) return bubbleMat;
  bubbleMat = new THREE.MeshPhysicalMaterial({
    color: 0xf2fffa, metalness: 0, roughness: 0, transparent: true, opacity: 0.5,
    iridescence: 1, iridescenceIOR: 1.3, iridescenceThicknessRange: [120, 900],
    clearcoat: 1, clearcoatRoughness: 0, envMapIntensity: 3.2, depthWrite: false, side: THREE.DoubleSide
  });
  return bubbleMat;
}

/** Gruppe aufsteigender Blasen; update(t) bewegt sie. */
export function makeBubbles(count, spread) {
  const group = new THREE.Group();
  const geo = new THREE.SphereGeometry(1, 40, 28);
  const items = [];
  for (let i = 0; i < count; i++) {
    const m = new THREE.Mesh(geo, bubbleMaterial());
    const r = 0.07 + Math.random() * 0.2;
    m.scale.setScalar(r);
    const it = {
      mesh: m, r: r,
      x: (Math.random() * 2 - 1) * spread, z: (Math.random() * 2 - 1) * spread * 0.6,
      speed: 0.12 + Math.random() * 0.2, phase: Math.random() * 10, offset: Math.random()
    };
    items.push(it);
    group.add(m);
  }
  group.userData.update = function (t) {
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      const k = (it.offset + t * it.speed * 0.25) % 1;
      it.mesh.position.set(
        it.x + Math.sin(t * 0.8 + it.phase) * 0.18,
        -1.9 + k * 3.8,
        it.z + Math.cos(t * 0.6 + it.phase) * 0.12
      );
      const fade = Math.min(1, k * 6, (1 - k) * 6);
      it.mesh.scale.setScalar(it.r * (0.6 + 0.4 * fade) * (1 + Math.sin(t * 3 + it.phase) * 0.04));
      it.mesh.visible = fade > 0.02;
    }
  };
  return group;
}

/* ---------- Feenstaub: funkelnde Teilchen auf Spiralbahnen (Shader) ---------- */
export function makeFairyDust(count, radius, palette) {
  const colors = (palette || [0x5eb593, 0x2f8f6a, 0xe2b453, 0xd99a2b, 0x8ee6bd]).map(function (c) { return new THREE.Color(c); });
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  const orbit = new Float32Array(count * 4);
  const misc = new Float32Array(count * 2);
  const col = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    orbit[i * 4] = radius * (0.7 + Math.random() * 0.55);
    orbit[i * 4 + 1] = Math.random() * Math.PI * 2;
    orbit[i * 4 + 2] = (0.18 + Math.random() * 0.45) * (Math.random() < 0.8 ? 1 : -1);
    orbit[i * 4 + 3] = (Math.random() * 2 - 1) * 1.4;
    misc[i * 2] = 0.05 + Math.random() * 0.11;
    misc[i * 2 + 1] = Math.random() * 10;
    const c = colors[Math.floor(Math.random() * colors.length)];
    col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
  }
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setAttribute("aOrbit", new THREE.BufferAttribute(orbit, 4));
  geo.setAttribute("aMisc", new THREE.BufferAttribute(misc, 2));
  geo.setAttribute("aColor", new THREE.BufferAttribute(col, 3));
  const mat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uSize: { value: 800 } },
    transparent: true, depthWrite: false,
    vertexShader: [
      "attribute vec4 aOrbit; attribute vec2 aMisc; attribute vec3 aColor;",
      "uniform float uTime; uniform float uSize;",
      "varying vec3 vColor; varying float vAlpha;",
      "void main() {",
      "  float ang = aOrbit.y + uTime * aOrbit.z;",
      "  float r = aOrbit.x + sin(uTime * 0.7 + aMisc.y) * 0.1;",
      "  float y = aOrbit.w + sin(uTime * 0.9 + aMisc.y * 2.0) * 0.16;",
      "  vec3 p = vec3(cos(ang) * r, y, sin(ang) * r * 0.62);",
      "  vec4 mv = modelViewMatrix * vec4(p, 1.0);",
      "  gl_Position = projectionMatrix * mv;",
      "  float tw = 0.5 + 0.5 * sin(uTime * 3.2 + aMisc.y * 6.0);",
      "  vAlpha = 0.35 + 0.65 * tw * tw;",
      "  vColor = aColor;",
      "  gl_PointSize = aMisc.x * uSize * (0.55 + 0.7 * tw) / -mv.z;",
      "}"
    ].join("\n"),
    fragmentShader: [
      "varying vec3 vColor; varying float vAlpha;",
      "void main() {",
      "  vec2 c = gl_PointCoord - 0.5;",
      "  float d = length(c);",
      "  float core = smoothstep(0.5, 0.0, d);",
      "  float rays = max(0.0, 1.0 - abs(c.x) * 14.0) + max(0.0, 1.0 - abs(c.y) * 14.0);",
      "  float a = (core * core * 0.9 + rays * smoothstep(0.5, 0.05, d) * 0.55) * vAlpha;",
      "  if (a < 0.02) discard;",
      "  gl_FragColor = vec4(vColor, min(a, 1.0));",
      "}"
    ].join("\n")
  });
  const points = new THREE.Points(geo, mat);
  points.frustumCulled = false;
  points.userData = {
    update: function (t) { mat.uniforms.uTime.value = t; },
    resize: function (heightPx, fovDeg) { mat.uniforms.uSize.value = heightPx / (2 * Math.tan((fovDeg * Math.PI) / 360)); }
  };
  return points;
}

/* ---------- Sternfunkeln (Lens-Flare-Sterne) ---------- */
let flareTex = null;
function flareTexture() {
  if (flareTex) return flareTex;
  const s = 256, c = document.createElement("canvas");
  c.width = c.height = s;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.12, "rgba(255,255,255,.85)");
  g.addColorStop(0.35, "rgba(255,255,255,.12)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, s, s);
  ctx.translate(s / 2, s / 2);
  [0, Math.PI / 2, Math.PI / 4, -Math.PI / 4].forEach(function (rot, i) {
    ctx.save();
    ctx.rotate(rot);
    const len = i < 2 ? s * 0.48 : s * 0.24, w = i < 2 ? 5 : 3;
    const lg = ctx.createLinearGradient(-len, 0, len, 0);
    lg.addColorStop(0, "rgba(255,255,255,0)");
    lg.addColorStop(0.5, "rgba(255,255,255,1)");
    lg.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = lg;
    ctx.beginPath();
    ctx.moveTo(-len, 0); ctx.quadraticCurveTo(0, -w, len, 0); ctx.quadraticCurveTo(0, w, -len, 0);
    ctx.fill();
    ctx.restore();
  });
  flareTex = new THREE.CanvasTexture(c);
  flareTex.colorSpace = THREE.SRGBColorSpace;
  return flareTex;
}

/** Funkelnde Sterne, die nacheinander aufleuchten. */
export function makeGlints(points, color) {
  const group = new THREE.Group();
  const items = points.map(function (p, i) {
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: flareTexture(), color: color, transparent: true, depthWrite: false, opacity: 0 }));
    sp.position.set(p[0], p[1], p[2]);
    group.add(sp);
    return { sp: sp, delay: i * 1.3 };
  });
  group.userData.update = function (t) {
    items.forEach(function (it) {
      const k = ((t + it.delay) % 4) / 4;
      const pulse = k < 0.18 ? Math.sin((k / 0.18) * Math.PI) : 0;
      it.sp.material.opacity = pulse;
      it.sp.material.rotation = t * 0.6;
      it.sp.scale.setScalar(0.15 + pulse * 0.55);
    });
  };
  return group;
}
