/* Klar Zahn – interaktiver 3D-Zahn im Hero (Licht folgt der Maus, Funken beim Klick). */
import {
  THREE, makeRenderer, addEnvironment, addLights, makeMaterials, makeLogoTooth, makeParticles,
  makeOrbit, makeSparkle, makeHalo, makeGlowLight, makeBurst
} from "./models.js";

export function supportsWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch (e) {
    return false;
  }
}

export function initHero() {
  const stage = document.querySelector("[data-hero-3d]");
  if (!stage || !supportsWebGL()) return;
  const canvas = stage.querySelector("canvas");
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
  camera.position.set(0, 0, 9.4);

  const rig = new THREE.Group();
  scene.add(rig);

  const halo = makeHalo(0x8ee6bd, 5.2, 0.42);
  halo.position.z = -1.2;
  rig.add(halo);
  const haloCore = makeHalo(0xffffff, 2.6, 0.5);
  haloCore.position.z = -0.9;
  rig.add(haloCore);

  const tooth = makeLogoTooth(m);
  tooth.scale.setScalar(1.08);
  rig.add(tooth);
  const left = tooth.userData.left, right = tooth.userData.right;
  const leftBase = left.position.clone(), rightBase = right.position.clone();
  const toothMeshes = [];
  tooth.traverse(function (o) { if (o.isMesh) toothMeshes.push(o); });

  const orbitA = makeOrbit(1.9, 0x8ee6bd, 0.45);
  orbitA.rotation.set(1.2, 0.3, 0);
  const orbitB = makeOrbit(2.25, 0x035444, 0.16);
  orbitB.rotation.set(1.45, -0.5, 0.4);
  rig.add(orbitA, orbitB);

  const sparkA = makeSparkle(m.mint, 0.2);
  const sparkB = makeSparkle(m.enamel, 0.13);
  const sparkC = makeSparkle(m.mint, 0.1);
  rig.add(sparkA, sparkB, sparkC);

  /* Lichter: eines folgt der Maus, zwei kreisen als leuchtende Kugeln */
  const cursorLight = new THREE.PointLight(0xffffff, 0, 14, 2);
  cursorLight.position.set(0, 0, 3);
  scene.add(cursorLight);
  const lightA = makeGlowLight(0x8ee6bd, 22, 9);
  const lightB = makeGlowLight(0xc9fff0, 14, 9);
  scene.add(lightA, lightB);

  const particles = makeParticles(window.innerWidth < 700 ? 90 : 170, 2.6);
  scene.add(particles);

  const burst = makeBurst(window.innerWidth < 700 ? 70 : 120);
  scene.add(burst);
  const shock = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.012, 8, 120),
    new THREE.MeshBasicMaterial({ color: 0x3f9c78, transparent: true, opacity: 0, depthWrite: false })
  );
  scene.add(shock);

  function resize() {
    const w = stage.clientWidth, h = stage.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.position.z = w < 300 ? 10.2 : 9.4;
    camera.updateProjectionMatrix();
  }
  resize();
  if ("ResizeObserver" in window) new ResizeObserver(resize).observe(stage);
  else window.addEventListener("resize", resize);

  /* Maus / Touch */
  const pointer = { x: 0, y: 0, active: false }, smooth = { x: 0, y: 0 };
  window.addEventListener("pointermove", function (e) {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    pointer.active = true;
  }, { passive: true });

  /* Klick auf den Zahn: Drehung + Funken + Lichtwelle */
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  let spin = 0, shockLife = 0, flash = 0;
  function hitTooth(e) {
    const r = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    raycaster.setFromCamera(ndc, camera);
    return raycaster.intersectObjects(toothMeshes, false)[0];
  }
  canvas.addEventListener("pointermove", function (e) {
    canvas.style.cursor = hitTooth(e) ? "pointer" : "";
  });
  canvas.addEventListener("click", function (e) {
    const hit = hitTooth(e);
    if (!hit) return;
    spin += 9;
    flash = 1;
    burst.userData.fire(hit.point);
    shock.position.copy(rig.position);
    shockLife = 1;
    if (reduceMotion) frame(clock.getElapsedTime(), 0.016);
  });

  /* Scroll: Hälften öffnen sich, während der Hero verlassen wird */
  const hero = stage.closest("section") || document.body;
  function scrollProgress() {
    const h = hero.offsetHeight || window.innerHeight;
    return Math.max(0, Math.min(1, window.scrollY / (h * 0.85)));
  }

  let visible = true;
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible) loop();
    }).observe(stage);
  }
  document.addEventListener("visibilitychange", function () { if (!document.hidden) loop(); });

  const clock = new THREE.Clock();
  let running = false, sp = 0, extraRot = 0, last = 0;

  function frame(t, dt) {
    const p = scrollProgress();
    sp += (p - sp) * 0.12;
    smooth.x += (pointer.x - smooth.x) * 0.06;
    smooth.y += (pointer.y - smooth.y) * 0.06;
    const ease = sp * sp * (3 - 2 * sp);

    spin *= Math.pow(0.04, dt);
    extraRot += spin * dt;

    rig.rotation.y = Math.sin(t * 0.45) * 0.38 + smooth.x * 0.45 + ease * 1.4 + extraRot;
    rig.rotation.x = Math.sin(t * 0.33) * 0.06 + smooth.y * 0.22 + ease * 0.2;
    rig.position.y = Math.sin(t * 1.1) * 0.07 + ease * 0.5;
    rig.scale.setScalar(1 - ease * 0.18);

    left.position.x = leftBase.x - ease * 0.75;
    left.position.z = leftBase.z - ease * 0.2;
    left.rotation.y = 0.08 - ease * 0.7;
    left.rotation.z = ease * 0.18;
    right.position.x = rightBase.x + ease * 0.75;
    right.rotation.y = ease * 0.7;
    right.rotation.z = -ease * 0.18;

    halo.material.opacity = 0.36 + Math.sin(t * 1.6) * 0.08 + flash * 0.5;
    halo.scale.setScalar(5.2 + Math.sin(t * 1.6) * 0.25 + flash * 1.5);
    flash *= Math.pow(0.05, dt);

    cursorLight.position.set(smooth.x * 3.2, -smooth.y * 2.4, 2.6);
    cursorLight.intensity += ((pointer.active ? 28 : 0) - cursorLight.intensity) * 0.05;

    lightA.position.set(Math.cos(t * 0.6) * 2.4, Math.sin(t * 0.9) * 0.9 + 0.4, Math.sin(t * 0.6) * 2.4);
    lightB.position.set(Math.cos(t * 0.45 + 3) * 2.8, Math.cos(t * 0.7) * 1.1 - 0.3, Math.sin(t * 0.45 + 3) * 2.8);
    lightA.userData.orb.material.opacity = lightA.position.z > -0.5 ? 0.95 : 0.35;
    lightB.userData.orb.material.opacity = lightB.position.z > -0.5 ? 0.8 : 0.3;

    orbitA.rotation.z = t * 0.25;
    orbitB.rotation.z = -t * 0.18;
    sparkA.position.set(Math.cos(t * 0.7) * 1.55, 0.95 + Math.sin(t * 1.3) * 0.08, Math.sin(t * 0.7) * 0.6);
    sparkA.rotation.z = t * 0.6;
    sparkB.position.set(Math.cos(t * 0.5 + 2.4) * 1.7, -0.6 + Math.sin(t) * 0.1, Math.sin(t * 0.5 + 2.4) * 0.7);
    sparkB.rotation.z = -t * 0.8;
    sparkC.position.set(Math.cos(t * 0.9 + 4.2) * 1.3, 0.2 + Math.cos(t * 1.4) * 0.1, Math.sin(t * 0.9 + 4.2) * 0.8);
    particles.rotation.y = t * 0.05 + smooth.x * 0.1;
    particles.rotation.x = smooth.y * 0.05;

    burst.userData.update(dt);
    if (shockLife > 0) {
      shockLife -= dt * 1.4;
      const s = 1 + (1 - shockLife) * 2.4;
      shock.scale.setScalar(s);
      shock.material.opacity = Math.max(0, shockLife) * 0.8;
    }

    renderer.render(scene, camera);
  }

  function loop() {
    if (running || reduceMotion) return;
    running = true;
    last = clock.getElapsedTime();
    (function tick() {
      if (!visible || document.hidden) { running = false; return; }
      const t = clock.getElapsedTime();
      frame(t, Math.min(0.05, t - last));
      last = t;
      requestAnimationFrame(tick);
    })();
  }

  if (reduceMotion) {
    frame(0.6, 0.016);
    window.addEventListener("scroll", function () { frame(0.6, 0.016); }, { passive: true });
  } else {
    loop();
  }
  requestAnimationFrame(function () { stage.classList.add("is-live"); });
}
