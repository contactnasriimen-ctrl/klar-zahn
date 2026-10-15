/* Klar Zahn – 3D-Implantat im Meisterlabor: setzt sich beim Scrollen zusammen. */
import { THREE, makeRenderer, addEnvironment, addLights, makeMaterials, makeImplant, makeHalo, makeGlowLight, makeSparkle } from "./models.js";
import { supportsWebGL } from "./hero.js";

export function initLab() {
  const stage = document.querySelector("[data-lab-3d]");
  if (!stage || !supportsWebGL()) return;
  const canvas = stage.querySelector("canvas");
  const story = stage.closest("[data-lab]") || stage;
  if (!canvas) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let renderer;
  try { renderer = makeRenderer(canvas); } catch (e) { return; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));

  const scene = new THREE.Scene();
  addEnvironment(renderer, scene);
  addLights(scene);
  const m = makeMaterials();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0.2, 8.4);

  const rig = new THREE.Group();
  scene.add(rig);
  const halo = makeHalo(0x8ee6bd, 4.6, 0.32);
  halo.position.set(0, 0, -1.4);
  scene.add(halo);

  const implant = makeImplant(m);
  implant.position.y = 0.25;
  rig.add(implant);
  const crown = implant.userData.crown, abutment = implant.userData.abutment;
  const crownBase = crown.position.y, abutBase = abutment.position.y;

  /* Laser-Scanring, der am Implantat entlangfährt */
  const scan = new THREE.Mesh(
    new THREE.TorusGeometry(0.42, 0.01, 8, 120),
    new THREE.MeshBasicMaterial({ color: 0x8ee6bd, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  scan.rotation.x = Math.PI / 2;
  rig.add(scan);
  const scanGlow = makeHalo(0x8ee6bd, 1.4, 0.35);
  rig.add(scanGlow);

  const lightA = makeGlowLight(0x8ee6bd, 20, 8);
  const lightB = makeGlowLight(0xffffff, 10, 8);
  scene.add(lightA, lightB);
  const spark = makeSparkle(m.mint, 0.16);
  rig.add(spark);

  function resize() {
    const w = stage.clientWidth, h = stage.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  if ("ResizeObserver" in window) new ResizeObserver(resize).observe(stage);

  const pointer = { x: 0, y: 0 }, smooth = { x: 0, y: 0 };
  window.addEventListener("pointermove", function (e) {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
  }, { passive: true });

  function progress() {
    const r = story.getBoundingClientRect(), vh = window.innerHeight;
    if (story === stage) return Math.max(0, Math.min(1, (vh - r.top) / (vh + r.height)));
    return Math.max(0, Math.min(1, (vh * 0.75 - r.top) / Math.max(1, r.height * 0.6)));
  }

  let visible = false, running = false, sp = 0;
  const clock = new THREE.Clock();

  function frame(t) {
    sp += (progress() - sp) * 0.1;
    const e = 1 - Math.pow(1 - sp, 3);
    crown.position.y = crownBase + (1 - e) * 1.5;
    crown.rotation.y = (1 - e) * 2.2;
    abutment.position.y = abutBase + (1 - e) * 0.7;
    abutment.rotation.y = (1 - e) * 5;

    rig.rotation.y = t * 0.35 + smooth.x * 0.5 + e * 1.2;
    rig.rotation.x = 0.18 + smooth.y * 0.15;
    rig.rotation.z = -0.12;
    smooth.x += (pointer.x - smooth.x) * 0.05;
    smooth.y += (pointer.y - smooth.y) * 0.05;

    const sy = -1.25 + ((t * 0.45) % 1) * 2.6;
    scan.position.y = sy + 0.25;
    scan.scale.setScalar(sy > 0.2 ? 1.25 : 0.62 + (sy + 1.3) * 0.08);
    scanGlow.position.set(0, sy + 0.25, 0);
    scan.material.opacity = 0.85 * Math.sin(((t * 0.45) % 1) * Math.PI);
    scanGlow.material.opacity = scan.material.opacity * 0.4;

    lightA.position.set(Math.cos(t * 0.7) * 2.2, Math.sin(t * 0.5) * 1.2, Math.sin(t * 0.7) * 2.2);
    lightB.position.set(Math.cos(t * 0.5 + 2.5) * 2.6, 0.8, Math.sin(t * 0.5 + 2.5) * 2.6);
    spark.position.set(Math.cos(t * 0.8) * 1.1, 1.5 + Math.sin(t * 1.2) * 0.1, Math.sin(t * 0.8) * 0.6);
    spark.rotation.z = t;
    halo.material.opacity = 0.26 + e * 0.16 + Math.sin(t * 1.4) * 0.05;

    renderer.render(scene, camera);
  }

  function loop() {
    if (running) return;
    running = true;
    (function tick() {
      if (!visible || document.hidden) { running = false; return; }
      frame(clock.getElapsedTime());
      requestAnimationFrame(tick);
    })();
  }

  if (reduceMotion) {
    sp = 1;
    frame(0.8);
  } else if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible) loop();
    }, { rootMargin: "200px 0px" }).observe(stage);
    document.addEventListener("visibilitychange", function () { if (!document.hidden && visible) loop(); });
  } else {
    visible = true;
    loop();
  }
  requestAnimationFrame(function () { stage.classList.add("is-live"); });
}
