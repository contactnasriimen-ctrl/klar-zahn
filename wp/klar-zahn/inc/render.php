<?php
/**
 * Platzhalter und Bausteine.
 * In den Seiteninhalten stehen {{home}} (Website-Adresse), {{asset}} (Theme-Ordner /assets),
 * {{login}}, {{rest}} und {{latest_posts}} (die neuesten Blogbeiträge). Sie werden beim Anzeigen ersetzt.
 */
if (!defined('ABSPATH')) {
	exit;
}

function kz_tokens() {
	static $tokens = null;
	if ($tokens === null) {
		$tokens = array(
			'{{asset}}' => KZ_URI . '/assets',
			'{{home}}'  => untrailingslashit(home_url()),
			'{{login}}' => wp_login_url(),
			'{{rest}}'  => rest_url(),
			'{{blog}}'  => kz_blog_url(),
		);
	}
	return $tokens;
}

function kz_render($html) {
	$html = strtr((string) $html, kz_tokens());
	if (strpos($html, '{{latest_posts}}') !== false) {
		$html = str_replace('{{latest_posts}}', kz_latest_posts(3), $html);
	}
	return $html;
}

/** Kopf und Fuß der Website (parts/header.html, parts/footer.html) */
function kz_part($name) {
	$file = KZ_DIR . '/parts/' . $name . '.html';
	return is_readable($file) ? kz_render(file_get_contents($file)) : '';
}

function kz_meta($key, $id = 0) {
	$id = $id ? $id : get_queried_object_id();
	return $id ? (string) get_post_meta($id, $key, true) : '';
}

/** Seite mit vom Theme angelegtem HTML-Inhalt */
function kz_is_raw($id = 0) {
	if (!$id && !is_singular('page')) {
		return false;
	}
	return kz_meta('_kz_raw', $id) === '1';
}

function kz_raw_content($post = null) {
	$post = get_post($post);
	if (!$post) {
		return '';
	}
	$html = preg_replace('#<!-- /?wp:html -->#', '', $post->post_content);
	return kz_render(do_shortcode($html));
}

function kz_page_url($path) {
	$page = get_page_by_path($path, OBJECT, 'page');
	return $page ? get_permalink($page) : home_url('/' . $path . '/');
}

function kz_blog_url() {
	$id = (int) get_option('page_for_posts');
	return $id ? get_permalink($id) : home_url('/blog/');
}

/* ---------- Blog ---------- */
function kz_date($post) {
	$months = array('Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember');
	$ts = get_post_timestamp($post);
	return $ts ? wp_date('j', $ts) . '. ' . $months[(int) wp_date('n', $ts) - 1] . ' ' . wp_date('Y', $ts) : '';
}

function kz_category($post) {
	$cats = get_the_category($post->ID);
	return $cats ? $cats[0]->name : 'Blog';
}

/** Titelbild: Beitragsbild, sonst 3D-Grafik aus dem Theme */
function kz_cover($post, $size = 'medium_large') {
	if (has_post_thumbnail($post)) {
		return array(get_the_post_thumbnail_url($post, $size), 'fit-cover', 'night');
	}
	$cover = get_post_meta($post->ID, '_kz_cover', true);
	$tone  = get_post_meta($post->ID, '_kz_tone', true);
	return array($cover ? kz_render($cover) : KZ_URI . '/assets/img/3d/tooth.webp', 'fit-contain', $tone ? $tone : 'mint');
}

function kz_read_minutes($post) {
	$words = count(preg_split('/\s+/u', trim(wp_strip_all_tags($post->post_content)), -1, PREG_SPLIT_NO_EMPTY));
	return max(1, (int) round($words / 200));
}

function kz_card($post) {
	list($src, $fit, $tone) = kz_cover($post);
	return '<article class="post-card" data-tilt><a class="post-link" href="' . esc_url(get_permalink($post)) . '">'
		. '<div class="post-cover tone-' . esc_attr($tone) . '"><img class="' . esc_attr($fit) . '" src="' . esc_url($src) . '" alt="" loading="lazy" decoding="async">'
		. '<span class="post-glare" aria-hidden="true"></span></div>'
		. '<div class="post-body"><div class="post-meta"><span class="post-cat">' . esc_html(kz_category($post)) . '</span>'
		. '<time datetime="' . esc_attr(get_the_date('c', $post)) . '">' . esc_html(kz_date($post)) . '</time></div>'
		. '<h3>' . esc_html(get_the_title($post)) . '</h3>'
		. '<p>' . esc_html(wp_trim_words(get_the_excerpt($post), 28, ' …')) . '</p>'
		. '<span class="post-more">Weiterlesen<svg class="ico"><use href="#i-arrow"/></svg></span></div></a></article>';
}

function kz_latest_posts($count = 3) {
	$query = new WP_Query(array('posts_per_page' => $count, 'ignore_sticky_posts' => true, 'no_found_rows' => true));
	if (!$query->have_posts()) {
		return '<p class="blog-empty">Bald finden Sie hier Artikel aus unserer Praxis.</p>';
	}
	$out = '';
	while ($query->have_posts()) {
		$query->the_post();
		$out .= kz_card(get_post());
	}
	wp_reset_postdata();
	return $out;
}

/** Hintergrund der Seitenköpfe */
function kz_hero_bg() {
	return '<div class="hero-bg" aria-hidden="true"><span class="aurora a1"></span><span class="aurora a2"></span><span class="beams"></span><div class="hero-floor"></div></div>';
}

function kz_img3d($name, $class = 'page-hero-3d') {
	$base = KZ_URI . '/assets/img/3d/' . $name;
	return '<img class="' . esc_attr($class) . '" src="' . esc_url($base . '-400.webp') . '" srcset="' . esc_url($base . '-400.webp') . ' 400w, ' . esc_url($base . '.webp') . ' 720w" sizes="(max-width: 900px) 45vw, 320px" alt="" aria-hidden="true" width="720" height="720">';
}
