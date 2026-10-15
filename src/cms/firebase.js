/* Firebase-Verbindung für den Ratgeber. Die Konfiguration steht in assets/js/firebase-config.js. */
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, where, getDocs, doc, getDoc } from "firebase/firestore/lite";

const cfg = window.KZ_FIREBASE || {};
export const configured = !!cfg.apiKey && cfg.apiKey !== "REPLACE_ME" && !!cfg.projectId && cfg.projectId !== "REPLACE_ME";
export const app = configured ? initializeApp(cfg) : null;
export const db = configured ? getFirestore(app) : null;

export const ARTICLES = "articles";
export const BODIES = "articleBodies";

/** Veröffentlichte Artikel (ohne Inhalt), neueste zuerst. */
export async function listPublished() {
  const snap = await getDocs(query(collection(db, ARTICLES), where("status", "==", "published")));
  return snap.docs.map(function (d) { return Object.assign({ id: d.id }, d.data()); })
    .sort(function (a, b) { return (b.publishedAt || 0) - (a.publishedAt || 0); });
}

/** Ein Artikel mit Inhalt; null, wenn nicht vorhanden oder nicht veröffentlicht. */
export async function getPublished(id) {
  try {
    const meta = await getDoc(doc(db, ARTICLES, id));
    if (!meta.exists()) return null;
    const body = await getDoc(doc(db, BODIES, id));
    return Object.assign({ id: id }, meta.data(), body.exists() ? body.data() : {});
  } catch (e) {
    return null;
  }
}
