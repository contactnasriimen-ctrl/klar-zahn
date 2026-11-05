<?php
/**
 * Einrichtung: Bei der Aktivierung legt das Theme alle Seiten aus data/pages.json an
 * (Startseite, Leistungen, Praxislabor, Online-Termin, Impressum, Datenschutz, Blog),
 * setzt Startseite und Blogseite, die Permalinks und drei Beispiel-Beiträge.
 * Vorhandene Seiten werden nie überschrieben. Unter Design → Klar Zahn lassen sich
 * fehlende Seiten erneut anlegen und die E-Mail-Adresse für Terminanfragen ändern.
 */
if (!defined('ABSPATH')) {
	exit;
}

function kz_data() {
	$file = KZ_DIR . '/data/pages.json';
	return is_readable($file) ? json_decode(file_get_contents($file), true) : null;
}

function kz_install() {
	$data = kz_data();
	if (!$data) {
		return 0;
	}
	if (function_exists('set_time_limit')) {
		@set_time_limit(180);
	}
	kses_remove_filters();
	$ids     = array();
	$created = 0;
	foreach ($data['pages'] as $p) {
		$existing = get_page_by_path($p['path'], OBJECT, 'page');
		if ($existing) {
			$ids[$p['path']] = $existing->ID;
			continue;
		}
		$parent = ($p['parent'] !== '' && isset($ids[$p['parent']])) ? $ids[$p['parent']] : 0;
		$id     = wp_insert_post(wp_slash(array(
			'post_type'      => 'page',
			'post_status'    => 'publish',
			'post_title'     => $p['title'],
			'post_name'      => $p['slug'],
			'post_parent'    => $parent,
			'menu_order'     => (int) $p['order'],
			'comment_status' => 'closed',
			'ping_status'    => 'closed',
			'post_content'   => $p['content'] === '' ? '' : "<!-- wp:html -->\n" . $p['content'] . "\n<!-- /wp:html -->",
		)), true);
		if (is_wp_error($id)) {
			continue;
		}
		$ids[$p['path']] = $id;
		$created++;
		foreach ($p['meta'] as $key => $value) {
			update_post_meta($id, $key, wp_slash($value));
		}
	}
	kses_init_filters();

	if (isset($ids['startseite'])) {
		update_option('show_on_front', 'page');
		update_option('page_on_front', $ids['startseite']);
	}
	if (isset($ids['blog'])) {
		update_option('page_for_posts', $ids['blog']);
	}
	if (isset($ids['datenschutz'])) {
		update_option('wp_page_for_privacy_policy', $ids['datenschutz']);
	}
	kz_install_posts(isset($data['posts']) ? $data['posts'] : array());

	/* Schöne Adressen: Seiten unter /leistungen/…/, Beiträge unter /blog/…/ */
	$structure = (string) get_option('permalink_structure');
	if ($structure === '' || strpos($structure, '%year%') !== false || strpos($structure, '?p=') !== false) {
		global $wp_rewrite;
		$wp_rewrite->set_permalink_structure('/blog/%postname%/');
	}
	flush_rewrite_rules();
	/* Kategorie- und Schlagwort-Adressen entstehen erst mit der neuen Struktur: beim nächsten Aufruf erneut erzeugen */
	update_option('kz_flush_rewrite', 1);
	update_option('kz_installed', KZ_VERSION);
	return $created;
}

function kz_install_posts($posts) {
	if (get_option('kz_posts_installed')) {
		return;
	}
	foreach ($posts as $a) {
		if (get_page_by_path($a['slug'], OBJECT, 'post')) {
			continue;
		}
		$term = term_exists($a['category'], 'category');
		if (!$term) {
			$term = wp_insert_term($a['category'], 'category');
		}
		$cat = is_array($term) ? (int) $term['term_id'] : (int) $term;
		$id  = wp_insert_post(wp_slash(array(
			'post_type'      => 'post',
			'post_status'    => 'publish',
			'post_title'     => $a['title'],
			'post_name'      => $a['slug'],
			'post_excerpt'   => $a['excerpt'],
			'post_content'   => $a['html'],
			'post_date'      => $a['date'],
			'post_category'  => $cat ? array($cat) : array(),
			'tags_input'     => $a['tags'],
			'comment_status' => 'closed',
			'ping_status'    => 'closed',
		)), true);
		if (!is_wp_error($id)) {
			update_post_meta($id, '_kz_cover', $a['cover']);
			update_post_meta($id, '_kz_tone', 'mint');
		}
	}
	/* Unveränderte Beispielinhalte einer frischen WordPress-Installation in den Papierkorb */
	foreach (array(array(1, 'post'), array(2, 'page')) as $sample) {
		$post = get_post($sample[0]);
		if ($post && $post->post_type === $sample[1] && in_array($post->post_name, array('hello-world', 'hallo-welt', 'sample-page', 'beispiel-seite', 'beispielseite'), true) && $post->post_modified === $post->post_date) {
			wp_trash_post($post->ID);
		}
	}
	update_option('kz_posts_installed', 1);
}

add_action('init', function () {
	if (get_option('kz_flush_rewrite') && !did_action('after_switch_theme') && !did_action('admin_post_kz_install')) {
		delete_option('kz_flush_rewrite');
		flush_rewrite_rules();
	}
}, 999);

add_action('after_switch_theme', function () {
	$created = kz_install();
	set_transient('kz_activated', $created, 300);
});

add_action('admin_notices', function () {
	$created = get_transient('kz_activated');
	if ($created === false || !current_user_can('manage_options')) {
		return;
	}
	delete_transient('kz_activated');
	echo '<div class="notice notice-success is-dismissible"><p><strong>Klar Zahn ist eingerichtet.</strong> '
		. esc_html(sprintf('%d Seiten wurden angelegt, Startseite und Blog sind gesetzt.', (int) $created))
		. ' <a href="' . esc_url(home_url('/')) . '">Website ansehen</a> · <a href="' . esc_url(admin_url('themes.php?page=klar-zahn')) . '">Einstellungen</a></p></div>';
});

/* ---------- Design → Klar Zahn ---------- */
add_action('admin_menu', function () {
	add_theme_page('Klar Zahn', 'Klar Zahn', 'manage_options', 'klar-zahn', 'kz_admin_page');
});

function kz_admin_page() {
	$data  = kz_data();
	$total = $data ? count($data['pages']) : 0;
	$found = 0;
	if ($data) {
		foreach ($data['pages'] as $p) {
			if (get_page_by_path($p['path'], OBJECT, 'page')) {
				$found++;
			}
		}
	}
	echo '<div class="wrap"><h1>Klar Zahn – Einstellungen</h1>';
	if (isset($_GET['kz_done'])) {
		echo '<div class="notice notice-success"><p>' . esc_html(sprintf('%d fehlende Seiten wurden angelegt.', (int) $_GET['kz_done'])) . '</p></div>';
	}
	if (isset($_GET['kz_saved'])) {
		echo '<div class="notice notice-success"><p>Gespeichert.</p></div>';
	}
	echo '<h2>Seiten</h2><p>' . esc_html(sprintf('%d von %d Seiten des Themes sind vorhanden.', $found, $total)) . ' Bereits vorhandene Seiten werden nicht verändert.</p>';
	echo '<form method="post" action="' . esc_url(admin_url('admin-post.php')) . '"><input type="hidden" name="action" value="kz_install">';
	wp_nonce_field('kz_install');
	submit_button('Fehlende Seiten anlegen', 'secondary', 'submit', false);
	echo '</form>';
	echo '<h2 style="margin-top:2em">Online-Terminanfrage</h2><form method="post" action="' . esc_url(admin_url('admin-post.php')) . '">'
		. '<input type="hidden" name="action" value="kz_save"><p><label for="kz_booking_email">Anfragen gehen an:</label><br>'
		. '<input type="email" class="regular-text" id="kz_booking_email" name="kz_booking_email" value="' . esc_attr(kz_booking_email()) . '"></p>';
	wp_nonce_field('kz_save');
	submit_button('Speichern');
	echo '</form><p>Für zuverlässigen E-Mail-Versand empfehlen wir ein SMTP-Plugin (z. B. „WP Mail SMTP“) mit dem Postfach der Praxis.</p>';
	echo '<h2>Inhalte bearbeiten</h2><p>Die Texte der Seiten stehen unter <em>Seiten</em> in einem HTML-Block. Platzhalter wie <code>{{home}}</code> (Website-Adresse) und <code>{{asset}}</code> (Bilder des Themes) bitte stehen lassen. '
		. 'Neue Artikel schreiben Sie unter <em>Beiträge → Erstellen</em>; sie erscheinen automatisch im Blog und auf der Startseite.</p></div>';
}

add_action('admin_post_kz_install', function () {
	if (!current_user_can('manage_options')) {
		wp_die('Keine Berechtigung.');
	}
	check_admin_referer('kz_install');
	$created = kz_install();
	wp_safe_redirect(admin_url('themes.php?page=klar-zahn&kz_done=' . (int) $created));
	exit;
});

add_action('admin_post_kz_save', function () {
	if (!current_user_can('manage_options')) {
		wp_die('Keine Berechtigung.');
	}
	check_admin_referer('kz_save');
	$mail = isset($_POST['kz_booking_email']) ? sanitize_email(wp_unslash($_POST['kz_booking_email'])) : '';
	if (is_email($mail)) {
		update_option('kz_booking_email', $mail);
	}
	wp_safe_redirect(admin_url('themes.php?page=klar-zahn&kz_saved=1'));
	exit;
});
