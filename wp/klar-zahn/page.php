<?php
/** Seiten: vom Theme angelegte Seiten zeigen ihr HTML, eigene Seiten das normale Layout */
if (!defined('ABSPATH')) {
	exit;
}
get_header();
while (have_posts()) {
	the_post();
	if (kz_is_raw(get_the_ID())) {
		$layout = kz_meta('_kz_layout');
		if ($layout === 'legal') {
			echo '<main id="inhalt" class="legal-main legal-wp"><div class="container">' . kz_raw_content() . '</div></main>'; // phpcs:ignore
		} else {
			$class = kz_meta('_kz_main_class');
			echo '<main id="inhalt"' . ($class !== '' ? ' class="' . esc_attr($class) . '"' : '') . '>' . kz_raw_content() . '</main>'; // phpcs:ignore
		}
		continue;
	}
	?>
	<main id="inhalt">
		<section class="page-hero"><?php echo kz_hero_bg(); // phpcs:ignore ?>
			<div class="container page-hero-inner">
				<div>
					<p class="badge"><span class="badge-dot"></span>Klar Zahn · Mörfelden-Walldorf</p>
					<h1><?php the_title(); ?></h1>
				</div>
				<?php echo kz_img3d('tooth'); // phpcs:ignore ?>
			</div>
		</section>
		<section class="blog-body">
			<div class="container"><article class="post-full"><div class="prose"><?php the_content(); ?></div></article></div>
		</section>
	</main>
	<?php
}
get_footer();
