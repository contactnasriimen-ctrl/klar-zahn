/* Klar Zahn – 3D-Modelle (three.js r160)
   Die Zahnform stammt aus dem Logo: herzförmiger Zahn, links Mint, rechts Weiß. */
import * as THREE from "../vendor/three.module.js";
import { RoomEnvironment } from "../vendor/RoomEnvironment.js";

export { THREE };

export function makeRenderer(canvas, opts) {
  const renderer = new THREE.WebGLRenderer(Object.assign({
    canvas, antialias: true, alpha: true, powerPreference: "high-performance"
  }, opts || {}));
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.setClearColor(0x000000, 0);
  return renderer;
}

export function addEnvironment(renderer, scene) {
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromScene(new RoomEnvironment(renderer), 0.04).texture;
  scene.environment = env;
  pmrem.dispose();
  return env;
}

export function addLights(scene) {
  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(2.5, 3, 4);
  const rim = new THREE.DirectionalLight(0x7fe0b4, 2.2);
  rim.position.set(-3, 1.5, -2.5);
  const fill = new THREE.HemisphereLight(0xeafff4, 0x02362c, 0.6);
  scene.add(key, rim, fill);
}

export function makeMaterials() {
  return {
    enamel: new THREE.MeshPhysicalMaterial({
      color: 0xf7f8f5, roughness: 0.14, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.04,
      sheen: 0.5, sheenRoughness: 0.45, sheenColor: new THREE.Color(0xcff3e2),
      iridescence: 0.45, iridescenceIOR: 1.35, iridescenceThicknessRange: [180, 620]
    }),
    mint: new THREE.MeshPhysicalMaterial({ color: 0x5eb593, roughness: 0.2, clearcoat: 1, clearcoatRoughness: 0.08 }),
    mintDeep: new THREE.MeshPhysicalMaterial({ color: 0x2f8f6a, roughness: 0.24, clearcoat: 0.9, clearcoatRoughness: 0.1 }),
    forest: new THREE.MeshPhysicalMaterial({ color: 0x035444, roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.06 }),
    titanium: new THREE.MeshPhysicalMaterial({ color: 0xc9ced4, metalness: 1, roughness: 0.24 }),
    blush: new THREE.MeshPhysicalMaterial({ color: 0xf4a3a0, roughness: 0.5, transparent: true, opacity: 0.85 })
  };
}

/* ---------- Zahnform (Backenzahn, geteilt wie im Logo) ---------- */
const EXTRUDE = { depth: 0.4, bevelEnabled: true, bevelThickness: 0.13, bevelSize: 0.07, bevelSegments: 12, curveSegments: 48, steps: 1 };

// Umriss im 24er-Raster (wie das Zahn-Icon der Website), Segmente als kubische Bézierkurven
const SEG = {
  s1: [[5.5, 3.5], [3.5, 5.5], [3.5, 8.3]],
  s2: [[3.5, 10.5], [4.2, 12.1], [4.8, 13.8]],
  s3: [[5.4, 15.5], [5.7, 17.2], [6.1, 19.1]],
  s4: [[6.4, 20.5], [6.9, 21.5], [7.9, 21.5]],
  s5: [[9.1, 21.5], [9.4, 20.0], [9.7, 18.5]],
  s6: [[10.0, 16.9], [10.4, 15.3], [12, 15.3]],
  s7: [[13.6, 15.3], [14.0, 16.9], [14.3, 18.5]],
  s8: [[14.6, 20.0], [14.9, 21.5], [16.1, 21.5]],
  s9: [[17.1, 21.5], [17.6, 20.5], [17.9, 19.1]],
  s10: [[18.3, 17.2], [18.6, 15.5], [19.2, 13.8]],
  s11: [[19.8, 12.1], [20.5, 10.5], [20.5, 8.3]],
  s12: [[20.5, 5.5], [18.5, 3.5], [16, 3.5]],
  s13: [[14.4, 3.5], [13.4, 4.4], [12, 4.4]],
  s14: [[10.6, 4.4], [9.6, 3.5], [8, 3.5]]
};
const START = { s1: [8, 3.5], s2: [3.5, 8.3], s3: [4.8, 13.8], s4: [6.1, 19.1], s5: [7.9, 21.5], s6: [9.7, 18.5], s7: [12, 15.3],
  s8: [14.3, 18.5], s9: [16.1, 21.5], s10: [17.9, 19.1], s11: [19.2, 13.8], s12: [20.5, 8.3], s13: [16, 3.5], s14: [12, 4.4] };
const X = function (x) { return (x - 12) / 8; };
const Y = function (y) { return (12.6 - y) / 8; };

function seg(path, name, reverse) {
  const c = SEG[name];
  if (!reverse) path.bezierCurveTo(X(c[0][0]), Y(c[0][1]), X(c[1][0]), Y(c[1][1]), X(c[2][0]), Y(c[2][1]));
  else { const st = START[name]; path.bezierCurveTo(X(c[1][0]), Y(c[1][1]), X(c[0][0]), Y(c[0][1]), X(st[0]), Y(st[1])); }
}
function segs(path, names) { names.forEach(function (n) { seg(path, n, false); }); }
function move(path, p) { path.moveTo(X(p[0]), Y(p[1])); }

function halfShape(side) {
  const shape = new THREE.Shape();
  if (side < 0) {
    move(shape, [12, 4.4]);
    segs(shape, ["s14", "s1", "s2", "s3", "s4", "s5", "s6"]);
    shape.bezierCurveTo(X(11.1), Y(12.2), X(12.9), Y(7.6), X(12), Y(4.4));
  } else {
    move(shape, [12, 15.3]);
    segs(shape, ["s7", "s8", "s9", "s10", "s11", "s12", "s13"]);
    shape.bezierCurveTo(X(12.9), Y(7.6), X(11.1), Y(12.2), X(12), Y(15.3));
  }
  return shape;
}

export function fullToothShape() {
  const shape = new THREE.Shape();
  move(shape, [8, 3.5]);
  segs(shape, ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "s10", "s11", "s12", "s13", "s14"]);
  return shape;
}

/** Krone (oberer Teil des Backenzahns, für Implantat und Brücke). */
export function crownShape() {
  const shape = new THREE.Shape();
  move(shape, [3.5, 8.3]);
  seg(shape, "s1", true);
  seg(shape, "s14", true);
  seg(shape, "s13", true);
  seg(shape, "s12", true);
  seg(shape, "s11", true);
  shape.bezierCurveTo(X(15), Y(15.4), X(9), Y(15.4), X(4.8), Y(13.8));
  seg(shape, "s2", true);
  return shape;
}

function extrude(shape, opts) {
  const o = Object.assign({}, EXTRUDE, opts || {});
  const geo = new THREE.ExtrudeGeometry(shape, o);
  geo.translate(0, 0, -o.depth / 2);
  geo.computeVertexNormals();
  return geo;
}

/** Logo-Zahn: Gruppe mit linker (Mint) und rechter (Weiß) Hälfte. */
export function makeLogoTooth(m) {
  const group = new THREE.Group();
  const left = new THREE.Mesh(extrude(halfShape(-1)), m.mint);
  const right = new THREE.Group();
  const white = new THREE.Mesh(extrude(halfShape(1)), m.enamel);
  const rimGeo = extrude(halfShape(1), { depth: 0.2, bevelThickness: 0.06, bevelSize: 0.03 });
  const rim = new THREE.Mesh(rimGeo, m.mintDeep);
  rim.scale.set(1.045, 1.035, 1);
  rim.position.set(0.012, -0.004, -0.1);
  right.add(rim, white);
  left.position.set(-0.035, 0, -0.06);
  left.rotation.y = 0.08;
  right.position.set(0.035, 0, 0.02);
  group.add(left, right);
  group.userData = { left, right };
  return group;
}

/** Zahn-Figur mit Gesicht (Kinderzahnheilkunde). */
export function makeHappyTooth(m) {
  const group = new THREE.Group();
  const body = new THREE.Mesh(extrude(fullToothShape(), { depth: 0.5, bevelThickness: 0.16, bevelSize: 0.07 }), m.enamel);
  group.add(body);
  const zFront = 0.25 + 0.16;
  const eyeGeo = new THREE.SphereGeometry(0.075, 32, 24);
  [-0.3, 0.3].forEach(function (x) {
    const eye = new THREE.Mesh(eyeGeo, m.forest);
    eye.position.set(x, 0.52, zFront - 0.02);
    eye.scale.set(1, 1.25, 0.6);
    const shine = new THREE.Mesh(new THREE.SphereGeometry(0.022, 16, 12), m.enamel);
    shine.position.set(x + 0.025, 0.56, zFront + 0.025);
    group.add(eye, shine);
  });
  const cheekGeo = new THREE.SphereGeometry(0.08, 24, 16);
  [-0.56, 0.56].forEach(function (x) {
    const cheek = new THREE.Mesh(cheekGeo, m.blush);
    cheek.position.set(x, 0.32, zFront - 0.05);
    cheek.scale.set(1.2, 0.7, 0.3);
    group.add(cheek);
  });
  const smile = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.026, 16, 48, Math.PI), m.forest);
  smile.rotation.z = Math.PI;
  smile.position.set(0, 0.4, zFront - 0.01);
  group.add(smile);
  return group;
}

/** Implantat: Schraube, Abutment und schwebende Krone. */
export function makeImplant(m) {
  const group = new THREE.Group();
  const pts = [new THREE.Vector2(0.0, -1.62), new THREE.Vector2(0.09, -1.6), new THREE.Vector2(0.15, -1.54)];
  const turns = 12, bottom = -1.5, top = 0.0;
  for (let i = 0; i <= turns * 2; i++) {
    const t = i / (turns * 2);
    const y = bottom + t * (top - bottom);
    const base = 0.16 + 0.09 * t;
    pts.push(new THREE.Vector2(i % 2 === 0 ? base : base + 0.075, y));
  }
  pts.push(new THREE.Vector2(0.26, 0.06), new THREE.Vector2(0.0, 0.06));
  const screw = new THREE.Mesh(new THREE.LatheGeometry(pts, 120), m.titanium);
  const abutment = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.23, 0.5, 6, 1), m.titanium);
  abutment.position.y = 0.33;
  const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.26, 0.06, 64), m.mint);
  collar.position.y = 0.09;
  const crown = new THREE.Mesh(extrude(crownShape(), { depth: 0.62, bevelThickness: 0.2, bevelSize: 0.1, bevelSegments: 14 }), m.enamel);
  crown.scale.setScalar(0.62);
  crown.position.y = 0.92;
  group.add(screw, collar, abutment, crown);
  group.userData = { crown, screw, abutment };
  return group;
}

/** Brücke aus drei Kronen (Zahnersatz). */
export function makeBridge(m) {
  const group = new THREE.Group();
  const geo = extrude(crownShape(), { depth: 0.7, bevelThickness: 0.2, bevelSize: 0.1, bevelSegments: 14 });
  [-1, 0, 1].forEach(function (i) {
    const c = new THREE.Mesh(geo, m.enamel);
    c.scale.setScalar(0.62);
    c.position.set(i * 1.18, 0, i === 0 ? 0.1 : 0);
    c.rotation.y = i * -0.12;
    group.add(c);
  });
  const connGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.5, 32);
  [-0.59, 0.59].forEach(function (x) {
    const conn = new THREE.Mesh(connGeo, m.enamel);
    conn.rotation.z = Math.PI / 2;
    conn.position.set(x, 0.12, 0.04);
    group.add(conn);
  });
  return group;
}

/** Vierzackiger Funkelstern. */
export function sparkleShape() {
  const s = new THREE.Shape();
  s.moveTo(0, 1);
  s.quadraticCurveTo(0.14, 0.14, 1, 0);
  s.quadraticCurveTo(0.14, -0.14, 0, -1);
  s.quadraticCurveTo(-0.14, -0.14, -1, 0);
  s.quadraticCurveTo(-0.14, 0.14, 0, 1);
  return s;
}

export function makeSparkle(material, size) {
  const mesh = new THREE.Mesh(extrude(sparkleShape(), { depth: 0.12, bevelThickness: 0.06, bevelSize: 0.04, bevelSegments: 6 }), material);
  mesh.scale.setScalar(size || 1);
  return mesh;
}

/** Mondsichel (Dämmerschlaf & Vollnarkose). */
export function makeMoon(material) {
  const r1 = 1, c2 = new THREE.Vector2(0.52, 0.36), r2 = 0.86;
  const d = c2.length();
  const a = (r1 * r1 - r2 * r2 + d * d) / (2 * d);
  const h = Math.sqrt(r1 * r1 - a * a);
  const dir = c2.clone().divideScalar(d);
  const p2 = dir.clone().multiplyScalar(a);
  const perp = new THREE.Vector2(-dir.y, dir.x);
  const i1 = p2.clone().add(perp.clone().multiplyScalar(h));
  const i2 = p2.clone().sub(perp.clone().multiplyScalar(h));
  const angB = Math.atan2(c2.y, c2.x);
  const norm = function (x) { x %= Math.PI * 2; return x < 0 ? x + Math.PI * 2 : x; };
  const d1 = norm(Math.atan2(i1.y, i1.x) - angB), d2 = norm(Math.atan2(i2.y, i2.x) - angB);
  const lo = Math.min(d1, d2), hi = Math.max(d1, d2);
  const pts = [];
  const N = 90;
  for (let k = 0; k <= N; k++) {
    const t = angB + lo + (hi - lo) * (k / N);
    pts.push(new THREE.Vector2(Math.cos(t) * r1, Math.sin(t) * r1));
  }
  const end = pts[pts.length - 1];
  const angBA = angB + Math.PI;
  const e1 = Math.atan2(i1.y - c2.y, i1.x - c2.x), e2 = Math.atan2(i2.y - c2.y, i2.x - c2.x);
  const rel = function (x) { let v = norm(x - angBA); return v > Math.PI ? v - Math.PI * 2 : v; };
  const r1a = rel(e1), r2a = rel(e2);
  let from = Math.min(r1a, r2a), to = Math.max(r1a, r2a);
  const inner = [];
  for (let k = 0; k <= N; k++) {
    const t = angBA + from + (to - from) * (k / N);
    inner.push(new THREE.Vector2(c2.x + Math.cos(t) * r2, c2.y + Math.sin(t) * r2));
  }
  if (inner[0].distanceTo(end) > inner[inner.length - 1].distanceTo(end)) inner.reverse();
  const shape = new THREE.Shape(pts.concat(inner.slice(1, -1)));
  return new THREE.Mesh(extrude(shape, { depth: 0.3, bevelThickness: 0.12, bevelSize: 0.06, curveSegments: 12 }), material);
}

/** Leuchtende Partikel rund um ein Objekt. */
export function makeParticles(count, radius) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const mint = new THREE.Color(0x5eb593), white = new THREE.Color(0x1b7553);
  for (let i = 0; i < count; i++) {
    const r = radius * (0.55 + Math.random() * 0.6);
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(ph) * Math.cos(th);
    positions[i * 3 + 1] = r * Math.cos(ph) * 0.8;
    positions[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th) * 0.7;
    const c = Math.random() > 0.4 ? mint : white;
    colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext("2d");
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,.55)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(canvas);
  const mat = new THREE.PointsMaterial({
    size: 0.06, map: tex, vertexColors: true, transparent: true, opacity: 0.6, depthWrite: false,
    blending: THREE.NormalBlending, sizeAttenuation: true
  });
  return new THREE.Points(geo, mat);
}

export function makeOrbit(radius, color, opacity) {
  const mesh = new THREE.Mesh(
    new THREE.TorusGeometry(radius, 0.006, 8, 200),
    new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: opacity, depthWrite: false })
  );
  return mesh;
}

/** Weiche, runde Lichttextur (für Halos, Lichtkugeln und Funken). */
var glowTexture = null;
export function makeGlowTexture() {
  if (glowTexture) return glowTexture;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext("2d");
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.25, "rgba(255,255,255,.6)");
  g.addColorStop(0.6, "rgba(255,255,255,.12)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  glowTexture = new THREE.CanvasTexture(canvas);
  glowTexture.colorSpace = THREE.SRGBColorSpace;
  return glowTexture;
}

export function makeHalo(color, scale, opacity) {
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: makeGlowTexture(), color: color, transparent: true, opacity: opacity == null ? 0.6 : opacity,
    blending: THREE.NormalBlending, depthWrite: false
  }));
  sprite.scale.setScalar(scale);
  return sprite;
}

/** Punktlicht mit sichtbarer Lichtkugel. */
export function makeGlowLight(color, intensity, distance) {
  const group = new THREE.Group();
  const light = new THREE.PointLight(color, intensity, distance, 2);
  const orb = makeHalo(color, 0.55, 0.95);
  const core = makeHalo(0xffffff, 0.16, 1);
  group.add(light, orb, core);
  group.userData = { light: light, orb: orb };
  return group;
}

/** Funkenregen (z. B. beim Klick auf den Zahn). */
export function makeBurst(count) {
  const positions = new Float32Array(count * 3);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({
    size: 0.12, map: makeGlowTexture(), color: 0x3f9c78, transparent: true, opacity: 0,
    depthWrite: false, blending: THREE.NormalBlending, sizeAttenuation: true
  });
  const points = new THREE.Points(geo, mat);
  const velocities = new Float32Array(count * 3);
  let life = 0;
  points.userData = {
    fire: function (origin) {
      for (let i = 0; i < count; i++) {
        const th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1), sp = 1.6 + Math.random() * 2.6;
        velocities[i * 3] = Math.sin(ph) * Math.cos(th) * sp;
        velocities[i * 3 + 1] = Math.cos(ph) * sp + 0.6;
        velocities[i * 3 + 2] = Math.sin(ph) * Math.sin(th) * sp;
        positions[i * 3] = origin.x; positions[i * 3 + 1] = origin.y; positions[i * 3 + 2] = origin.z;
      }
      life = 1;
      geo.attributes.position.needsUpdate = true;
    },
    update: function (dt) {
      if (life <= 0) { mat.opacity = 0; return; }
      life -= dt * 0.8;
      for (let i = 0; i < count; i++) {
        velocities[i * 3 + 1] -= dt * 2.2;
        positions[i * 3] += velocities[i * 3] * dt;
        positions[i * 3 + 1] += velocities[i * 3 + 1] * dt;
        positions[i * 3 + 2] += velocities[i * 3 + 2] * dt;
        velocities[i * 3] *= 0.985; velocities[i * 3 + 2] *= 0.985;
      }
      geo.attributes.position.needsUpdate = true;
      mat.opacity = Math.max(0, life);
    }
  };
  return points;
}
