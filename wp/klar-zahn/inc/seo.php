<?php
/**
 * Suchmaschinen: Titel, Beschreibung, Open Graph, strukturierte Daten (Dentist, MedicalSpecialty, FAQPage …).
 * Ist ein SEO-Plugin aktiv (Yoast, Rank Math, SEOPress, AIOSEO), übernimmt es Titel und Meta-Angaben;
 * die strukturierten Daten der Praxis bleiben erhalten.
 */
if (!defined('ABSPATH')) {
	exit;
}

function kz_seo_plugin() {
	return defined('WPSEO_VERSION') || defined('RANK_MATH_VERSION') || defined('SEOPRESS_VERSION') || defined('AIOSEO_VERSION');
}

add_filter('pre_get_document_title', function ($title) {
	if (kz_seo_plugin()) {
		return $title;
	}
	if (is_singular('page') && ($t = kz_meta('_kz_title')) !== '') {
		return $t;
	}
	if (is_singular('post')) {
		return get_the_title() . ' | Blog | Klar Zahn Mörfelden-Walldorf';
	}
	if (is_home()) {
		return 'Blog & Ratgeber Zahngesundheit | Klar Zahn Mörfelden-Walldorf';
	}
	if (is_category() || is_tag()) {
		return single_term_title('', false) . ' | Blog | Klar Zahn Mörfelden-Walldorf';
	}
	return $title;
});

function kz_description() {
	if (is_singular('page') && ($d = kz_meta('_kz_desc')) !== '') {
		return $d;
	}
	if (is_singular('post')) {
		return wp_strip_all_tags(get_the_excerpt());
	}
	if (is_home() || is_archive()) {
		return 'Blog der Zahnarztpraxis Klar Zahn in Mörfelden-Walldorf: Tipps zu Vorsorge, Zahnersatz, Implantaten und angstfreier Behandlung.';
	}
	return '';
}

function kz_og_image() {
	if (is_singular('post')) {
		$cover = kz_cover(get_post(), 'large');
		return $cover[0];
	}
	$og = is_singular('page') ? kz_meta('_kz_og') : '';
	return $og !== '' ? kz_render($og) : KZ_URI . '/assets/img/og-image.jpg';
}

/* Rechtliche Seiten nicht in Suchergebnisse */
add_filter('wp_robots', function ($robots) {
	if (is_singular('page') && kz_meta('_kz_noindex') === '1') {
		$robots['noindex'] = true;
		$robots['follow']  = true;
		unset($robots['max-image-preview']);
	}
	return $robots;
});

add_action('wp_head', function () {
	$fonts = KZ_URI . '/assets/fonts/';
	echo '<link rel="preload" href="' . esc_url($fonts . 'lexend-latin.woff2') . '" as="font" type="font/woff2" crossorigin>' . "\n";
	echo '<link rel="preload" href="' . esc_url($fonts . 'figtree-latin.woff2') . '" as="font" type="font/woff2" crossorigin>' . "\n";
	echo '<style id="kz-fonts">'
		. '@font-face{font-family:"Figtree";font-style:normal;font-weight:400 700;font-display:swap;src:url(' . esc_url($fonts . 'figtree-latin.woff2') . ') format("woff2")}'
		. '@font-face{font-family:"Lexend";font-style:normal;font-weight:300 700;font-display:swap;src:url(' . esc_url($fonts . 'lexend-latin.woff2') . ') format("woff2")}'
		. '@font-face{font-family:"Instrument Serif";font-style:italic;font-weight:400;font-display:swap;src:url(' . esc_url($fonts . 'instrument-serif-italic-latin.woff2') . ') format("woff2")}'
		/* Ersatzschriften mit gleichen Maßen: kein Verspringen beim Nachladen der Webfonts */
		. '@font-face{font-family:"Lexend Fallback";src:local("Arial"),local("Helvetica Neue"),local("Helvetica");size-adjust:108.14%;ascent-override:92.47%;descent-override:23.12%;line-gap-override:0%}'
		. '@font-face{font-family:"Figtree Fallback";src:local("Arial"),local("Helvetica Neue"),local("Helvetica");size-adjust:98.71%;ascent-override:96.24%;descent-override:25.33%;line-gap-override:0%}'
		. '@font-face{font-family:"Instrument Fallback";font-style:italic;src:local("Arial Italic"),local("Arial-ItalicMT"),local("Arial");size-adjust:79.27%;ascent-override:124.9%;descent-override:39.11%;line-gap-override:0%}'
		. "</style>\n";
	echo '<meta name="theme-color" content="#035444">' . "\n";
	if (!has_site_icon()) {
		$img = KZ_URI . '/assets/img/';
		echo '<link rel="icon" type="image/png" sizes="48x48" href="' . esc_url($img . 'favicon-48.png') . '">' . "\n";
		echo '<link rel="icon" type="image/png" sizes="192x192" href="' . esc_url($img . 'favicon-192.png') . '">' . "\n";
		echo '<link rel="apple-touch-icon" href="' . esc_url($img . 'apple-touch-icon.png') . '">' . "\n";
	}
	echo '<meta name="geo.region" content="DE-HE">' . "\n" . '<meta name="geo.placename" content="Mörfelden-Walldorf">' . "\n"
		. '<meta name="geo.position" content="49.9675673;8.5666833">' . "\n" . '<meta name="ICBM" content="49.9675673, 8.5666833">' . "\n";

	if (!kz_seo_plugin()) {
		$desc  = kz_description();
		$title = wp_get_document_title();
		$url   = home_url('/');
		if (is_singular()) {
			$url = get_permalink();
		} elseif (is_home()) {
			$url = kz_blog_url();
		} elseif (is_category() || is_tag()) {
			$link = get_term_link(get_queried_object());
			$url  = is_wp_error($link) ? $url : $link;
		}
		if ($desc !== '') {
			echo '<meta name="description" content="' . esc_attr($desc) . '">' . "\n";
		}
		if (($kw = kz_meta('_kz_keywords')) !== '' && is_singular('page')) {
			echo '<meta name="keywords" content="' . esc_attr($kw) . '">' . "\n";
		}
		echo '<meta property="og:type" content="' . (is_singular('post') ? 'article' : 'website') . '">' . "\n";
		echo '<meta property="og:site_name" content="Klar Zahn">' . "\n" . '<meta property="og:locale" content="de_DE">' . "\n";
		echo '<meta property="og:title" content="' . esc_attr($title) . '">' . "\n";
		if ($desc !== '') {
			echo '<meta property="og:description" content="' . esc_attr($desc) . '">' . "\n";
		}
		echo '<meta property="og:url" content="' . esc_url($url) . '">' . "\n";
		echo '<meta property="og:image" content="' . esc_url(kz_og_image()) . '">' . "\n";
		echo '<meta name="twitter:card" content="summary_large_image">' . "\n";
	}

	/* Strukturierte Daten der Seite (aus data/pages.json) */
	$home  = substr(wp_json_encode(untrailingslashit(home_url())), 1, -1);
	$asset = substr(wp_json_encode(KZ_URI . '/assets'), 1, -1);
	if (is_singular('page')) {
		$ld = json_decode(kz_meta('_kz_ld'), true);
		if (is_array($ld)) {
			foreach ($ld as $block) {
				echo '<script type="application/ld+json">' . strtr($block, array('{{home}}' => $home, '{{asset}}' => $asset, '</' => '<\/')) . "</script>\n";
			}
		}
	}
	if (is_singular('post')) {
		$post  = get_post();
		$cover = kz_cover($post, 'large');
		$data  = array(
			'@context' => 'https://schema.org',
			'@graph'   => array(
				array(
					'@type'            => 'Article',
					'headline'         => get_the_title($post),
					'description'      => wp_strip_all_tags(get_the_excerpt($post)),
					'image'            => $cover[0],
					'datePublished'    => get_the_date('c', $post),
					'dateModified'     => get_the_modified_date('c', $post),
					'inLanguage'       => 'de-DE',
					'mainEntityOfPage' => get_permalink($post),
					'author'           => array('@type' => 'Organization', 'name' => 'Praxis Klar Zahn'),
					'publisher'        => array('@id' => untrailingslashit(home_url()) . '/#praxis'),
					'keywords'         => implode(', ', wp_get_post_tags($post->ID, array('fields' => 'names'))),
				),
				array(
					'@type'           => 'BreadcrumbList',
					'itemListElement' => array(
						array('@type' => 'ListItem', 'position' => 1, 'name' => 'Startseite', 'item' => home_url('/')),
						array('@type' => 'ListItem', 'position' => 2, 'name' => 'Blog', 'item' => kz_blog_url()),
						array('@type' => 'ListItem', 'position' => 3, 'name' => get_the_title($post), 'item' => get_permalink($post)),
					),
				),
			),
		);
		echo '<script type="application/ld+json">' . wp_json_encode($data, JSON_UNESCAPED_UNICODE) . "</script>\n";
	}
}, 1);
