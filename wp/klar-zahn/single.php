<?php
/** Blogbeitrag */
if (!defined('ABSPATH')) {
	exit;
}
get_header();
while (have_posts()) {
	the_post();
	$kz_post  = get_post();
	$kz_cover = kz_cover($kz_post, 'large');
	$kz_tags  = get_the_tags();
	?>
	<main id="inhalt">
		<section class="blog-body blog-single">
			<div class="container">
				<article class="post-full">
					<a class="post-back" href="<?php echo esc_url(kz_blog_url()); ?>"><svg class="ico"><use href="#i-arrow"/></svg>Alle Artikel</a>
					<header class="post-head">
						<div class="post-meta">
							<span class="post-cat"><?php echo esc_html(kz_category($kz_post)); ?></span>
							<time datetime="<?php echo esc_attr(get_the_date('c')); ?>"><?php echo esc_html(kz_date($kz_post)); ?></time>
							<span><?php echo (int) kz_read_minutes($kz_post); ?> Min. Lesezeit</span>
						</div>
						<h1><?php the_title(); ?></h1>
						<?php if (has_excerpt()) : ?>
							<p class="post-lead"><?php echo esc_html(get_the_excerpt()); ?></p>
						<?php endif; ?>
					</header>
					<div class="post-hero tone-<?php echo esc_attr($kz_cover[2]); ?>"><img class="<?php echo esc_attr($kz_cover[1]); ?>" src="<?php echo esc_url($kz_cover[0]); ?>" alt="" decoding="async"></div>
					<div class="prose"><?php the_content(); ?></div>
					<?php if ($kz_tags) : ?>
						<div class="post-tags">
							<?php foreach ($kz_tags as $kz_tag) : ?>
								<a href="<?php echo esc_url(get_tag_link($kz_tag)); ?>">#<?php echo esc_html($kz_tag->name); ?></a>
							<?php endforeach; ?>
						</div>
					<?php endif; ?>
					<aside class="post-cta">
						<div><strong>Fragen zu diesem Thema?</strong><span>Wir beraten Sie gerne persönlich in unserer Praxis.</span></div>
						<a class="btn btn-glow" href="tel:+49610523604"><svg class="ico"><use href="#i-phone"/></svg>06105 23604</a>
					</aside>
					<p class="post-author">Veröffentlicht von <?php echo esc_html(get_post_meta(get_the_ID(), '_kz_author', true) ?: 'Praxis Klar Zahn'); ?></p>
				</article>
			</div>
		</section>
	</main>
	<?php
}
get_footer();
