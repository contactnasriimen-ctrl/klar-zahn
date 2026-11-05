<?php
/** Blog: Beitragsliste, Kategorien und Schlagwörter */
if (!defined('ABSPATH')) {
	exit;
}
get_header();
$kz_term  = (is_category() || is_tag()) ? get_queried_object() : null;
$kz_title = 'Wissen für Ihr <em>Lächeln</em>';
$kz_lead  = 'Tipps und Antworten aus unserer Praxis: verständlich erklärt, damit Sie gut informiert in Ihre Behandlung gehen.';
if ($kz_term) {
	$kz_title = esc_html((is_tag() ? '#' : '') . $kz_term->name);
	$kz_lead  = $kz_term->description !== '' ? esc_html($kz_term->description) : 'Alle Artikel zu diesem Thema.';
} elseif (is_search()) {
	$kz_title = 'Suche: ' . esc_html(get_search_query());
}
?>
<main id="inhalt">
	<section class="page-hero"><?php echo kz_hero_bg(); // phpcs:ignore ?>
		<div class="container page-hero-inner">
			<div>
				<p class="badge"><span class="badge-dot"></span>Blog der Praxis Klar Zahn</p>
				<h1><?php echo $kz_title; // phpcs:ignore -- oben maskiert ?></h1>
				<p class="hero-lead"><?php echo $kz_lead; // phpcs:ignore -- oben maskiert ?></p>
			</div>
			<?php echo kz_img3d('kids'); // phpcs:ignore ?>
		</div>
	</section>
	<section class="blog-body">
		<div class="container">
			<?php
			$kz_cats = get_categories(array('hide_empty' => true));
			if ($kz_cats) {
				echo '<nav class="chip-filters" aria-label="Kategorien"><a class="chip-filter' . ($kz_term ? '' : ' is-active') . '" href="' . esc_url(kz_blog_url()) . '">Alle</a>';
				foreach ($kz_cats as $kz_cat) {
					$kz_active = $kz_term && $kz_term->term_id === $kz_cat->term_id;
					echo '<a class="chip-filter' . ($kz_active ? ' is-active' : '') . '" href="' . esc_url(get_category_link($kz_cat)) . '">' . esc_html($kz_cat->name) . '</a>';
				}
				echo '</nav>';
			}
			if (have_posts()) {
				echo '<div class="post-grid">';
				while (have_posts()) {
					the_post();
					echo kz_card(get_post()); // phpcs:ignore
				}
				echo '</div>';
				$kz_pages = paginate_links(array('type' => 'list', 'prev_text' => '‹ Neuer', 'next_text' => 'Älter ›'));
				if ($kz_pages) {
					echo '<nav class="kz-pagination" aria-label="Seiten">' . $kz_pages . '</nav>'; // phpcs:ignore
				}
			} else {
				echo '<p class="blog-empty">Bald finden Sie hier Artikel aus unserer Praxis.</p>';
			}
			?>
		</div>
	</section>
</main>
<?php
get_footer();
