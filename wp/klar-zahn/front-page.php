<?php
/** Startseite: die Seite „Startseite“ (oder die Beitragsliste, falls keine Seite gesetzt ist) */
if (!defined('ABSPATH')) {
	exit;
}
if (is_home()) {
	require KZ_DIR . '/home.php';
	return;
}
require KZ_DIR . '/page.php';
