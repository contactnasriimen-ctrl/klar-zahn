/* Klar Zahn – interaktiver 3D-Zahn im Hero.
   Wird mit esbuild zu assets/js/hero3d.js gebündelt (npm run build:3d). */
import { THREE, makeRenderer, addEnvironment, addLights, makeMaterials, makeLogoTooth, makeParticles, makeOrbit, makeSparkle } from "./models.js";

(function () {
  var stage = document.querySelector("[data-hero-3d]");
  if (!stage) return;
  var canvas = stage.querySelector("canvas");
  if (!canvas) return;

  var test = document.createElement("canvas");
  var gl = test.getContext("webgl2") || test.getContext("webgl");
  if (!gl) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var renderer;
  try {
    renderer = makeRenderer(canvas);
  } catch (e) {
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));

  var scene = new THREE.Scene();
  addEnvironment(renderer, scene);
  addLights(scene);
  var m = makeMaterials();

  var camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0, 8);

  var rig = new THREE.Group();
  scene.add(rig);

  var tooth = makeLogoTooth(m);
  tooth.scale.setScalar(1.08);
  rig.add(tooth);
  var left = tooth.userData.left, right = tooth.userData.right;
  var leftBase = left.position.clone(), rightBase = right.position.clone();

  var orbitA = makeOrbit(1.9, 0x8ee6bd, 0.45);
  orbitA.rotation.set(1.2, 0.3, 0);
  var orbitB = makeOrbit(2.25, 0xffffff, 0.18);
  orbitB.rotation.set(1.45, -0.5, 0.4);
  rig.add(orbitA, orbitB);

  var sparkA = makeSparkle(m.mint, 0.2);
  var sparkB = makeSparkle(m.enamel, 0.13);
  var sparkC = makeSparkle(m.mint, 0.1);
  rig.add(sparkA, sparkB, sparkC);

  var particles = makeParticles(window.innerWidth < 700 ? 90 : 170, 2.6);
  scene.add(particles);

  /* Größe */
  function resize() {
    var w = stage.clientWidth, h = stage.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.position.z = w < 420 ? 8.8 : 8;
    camera.updateProjectionMatrix();
  }
  resize();
  if ("ResizeObserver" in window) new ResizeObserver(resize).observe(stage);
  else window.addEventListener("resize", resize);

  /* Maus / Touch */
  var pointer = { x: 0, y: 0 }, smooth = { x: 0, y: 0 };
  window.addEventListener("pointermove", function (e) {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
  }, { passive: true });

  /* Scroll: Hälften öffnen sich, während der Hero verlassen wird */
  var hero = stage.closest("section") || document.body;
  function scrollProgress() {
    var h = hero.offsetHeight || window.innerHeight;
    var p = window.scrollY / (h * 0.85);
    return Math.max(0, Math.min(1, p));
  }

  var visible = true;
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible) loop();
    }, { threshold: 0 }).observe(stage);
  }
  document.addEventListener("visibilitychange", function () { if (!document.hidden) loop(); });

  var clock = new THREE.Clock();
  var running = false;
  var sp = 0;

  function frame(t) {
    var p = scrollProgress();
    sp += (p - sp) * 0.12;
    smooth.x += (pointer.x - smooth.x) * 0.06;
    smooth.y += (pointer.y - smooth.y) * 0.06;

    var ease = sp * sp * (3 - 2 * sp);
    rig.rotation.y = Math.sin(t * 0.45) * 0.38 + smooth.x * 0.45 + ease * 1.4;
    rig.rotation.x = Math.sin(t * 0.33) * 0.06 + smooth.y * 0.22 + ease * 0.2;
    rig.position.y = Math.sin(t * 1.1) * 0.07 + ease * 0.5;
    var s = 1 - ease * 0.18;
    rig.scale.setScalar(s);

    left.position.x = leftBase.x - ease * 0.75;
    left.position.z = leftBase.z - ease * 0.2;
    left.rotation.y = 0.08 - ease * 0.7;
    left.rotation.z = ease * 0.18;
    right.position.x = rightBase.x + ease * 0.75;
    right.rotation.y = ease * 0.7;
    right.rotation.z = -ease * 0.18;

    orbitA.rotation.z = t * 0.25;
    orbitB.rotation.z = -t * 0.18;
    sparkA.position.set(Math.cos(t * 0.7) * 1.55, 0.95 + Math.sin(t * 1.3) * 0.08, Math.sin(t * 0.7) * 0.6);
    sparkA.rotation.z = t * 0.6;
    sparkB.position.set(Math.cos(t * 0.5 + 2.4) * 1.7, -0.6 + Math.sin(t) * 0.1, Math.sin(t * 0.5 + 2.4) * 0.7);
    sparkB.rotation.z = -t * 0.8;
    sparkC.position.set(Math.cos(t * 0.9 + 4.2) * 1.3, 0.2 + Math.cos(t * 1.4) * 0.1, Math.sin(t * 0.9 + 4.2) * 0.8);
    particles.rotation.y = t * 0.05 + smooth.x * 0.1;
    particles.rotation.x = smooth.y * 0.05;

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
    frame(0.6);
    window.addEventListener("scroll", function () { frame(0.6); }, { passive: true });
  } else {
    loop();
  }
  requestAnimationFrame(function () { stage.classList.add("is-live"); });
})();
