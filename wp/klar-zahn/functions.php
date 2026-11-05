<?php
/**
 * Klar Zahn – WordPress-Theme (OverTech)
 *
 * inc/render.php  Platzhalter in Inhalten ({{home}}, {{asset}} …), Blog-Karten
 * inc/seo.php     Titel, Beschreibung, Open Graph, strukturierte Daten
 * inc/booking.php Online-Terminanfrage per E-Mail (REST-Endpunkt)
 * inc/setup.php   Seiten und Blog bei der Aktivierung anlegen, Einstellungsseite
 */
if (!defined('ABSPATH')) {
	exit;
}

define('KZ_VERSION', '1.0.0');
define('KZ_DIR', get_template_directory());
define('KZ_URI', get_template_directory_uri());

require KZ_DIR . '/inc/render.php';
require KZ_DIR . '/inc/seo.php';
require KZ_DIR . '/inc/booking.php';
require KZ_DIR . '/inc/setup.php';

add_action('after_setup_theme', function () {
	add_theme_support('title-tag');
	add_theme_support('post-thumbnails');
	add_theme_support('html5', array('search-form', 'gallery', 'caption', 'style', 'script'));
	add_theme_support('responsive-embeds');
	set_post_thumbnail_size(1600, 900, false);
});

/* Website auf Deutsch auszeichnen, auch wenn WordPress auf Englisch installiert ist */
add_filter('language_attributes', function () {
	return 'lang="de"';
});

/* ---------- Skripte und Styles ---------- */
add_action('wp_enqueue_scripts', function () {
	$defer = array('strategy' => 'defer', 'in_footer' => true);
	wp_enqueue_style('klar-zahn', KZ_URI . '/assets/style.min.css', array(), KZ_VERSION);
	wp_enqueue_style('klar-zahn-wp', KZ_URI . '/assets/wp.css', array('klar-zahn'), KZ_VERSION);
	wp_enqueue_script('klar-zahn', KZ_URI . '/assets/main.min.js', array(), KZ_VERSION, $defer);
	wp_enqueue_script('klar-zahn-consent', KZ_URI . '/assets/consent.min.js', array(), KZ_VERSION, $defer);
	wp_add_inline_script('klar-zahn-consent', 'window.KZ_LINKS=' . wp_json_encode(array(
		'datenschutz' => kz_page_url('datenschutz'),
		'impressum'   => kz_page_url('impressum'),
		'external'    => 'Google Maps',
	)) . ';', 'before');
	if (kz_meta('_kz_script') === 'booking') {
		wp_enqueue_script('klar-zahn-booking', KZ_URI . '/assets/booking.min.js', array(), KZ_VERSION, $defer);
	}
	/* Seiten aus dem Theme brauchen keine Block-Styles: schnelleres Laden */
	if (kz_is_raw()) {
		foreach (array('wp-block-library', 'wp-block-library-theme', 'global-styles', 'classic-theme-styles') as $handle) {
			wp_dequeue_style($handle);
		}
	}
}, 20);

/* ---------- Ballast entfernen (Geschwindigkeit) ---------- */
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('admin_print_scripts', 'print_emoji_detection_script');
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action('admin_print_styles', 'print_emoji_styles');
remove_filter('the_content_feed', 'wp_staticize_emoji');
remove_filter('wp_mail', 'wp_staticize_emoji_for_email');
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wp_shortlink_wp_head');
remove_action('wp_head', 'wp_oembed_add_discovery_links');
remove_action('wp_head', 'rest_output_link_wp_head');
add_filter('emoji_svg_url', '__return_false');
add_filter('wp_resource_hints', function ($urls, $type) {
	if ($type === 'dns-prefetch') {
		$urls = array_filter($urls, function ($u) {
			return strpos(is_array($u) ? ($u['href'] ?? '') : $u, 's.w.org') === false;
		});
	}
	return $urls;
}, 10, 2);
add_action('wp_enqueue_scripts', function () {
	wp_deregister_script('wp-embed');
}, 100);

/* ---------- Kommentare abschalten (Praxis-Website) ---------- */
add_action('init', function () {
	remove_post_type_support('post', 'comments');
	remove_post_type_support('page', 'comments');
	remove_post_type_support('post', 'trackbacks');
});
add_filter('comments_open', '__return_false', 20);
add_filter('pings_open', '__return_false', 20);
add_filter('comments_array', '__return_empty_array', 10);

/* ---------- CSS-Klassen der Seiten ---------- */
add_filter('body_class', function ($classes) {
	if (kz_is_raw()) {
		$extra = trim(kz_meta('_kz_body'));
		if ($extra !== '') {
			$classes = array_merge($classes, preg_split('/\s+/', $extra));
		}
		$classes[] = 'kz-raw';
	}
	if (is_home() || is_archive() || is_singular('post') || is_search()) {
		$classes[] = 'kz-blog';
	}
	return $classes;
});

/* Beitragsauszüge etwas kürzer, ohne […] */
add_filter('excerpt_length', function () {
	return 30;
});
add_filter('excerpt_more', function () {
	return ' …';
});
