<?php
/** Seite nicht gefunden */
if (!defined('ABSPATH')) {
	exit;
}
get_header();
?>
<main id="inhalt">
	<section class="page-hero kz-404"><?php echo kz_hero_bg(); // phpcs:ignore ?>
		<div class="container page-hero-inner">
			<div>
				<p class="badge"><span class="badge-dot"></span>Fehler 404</p>
				<h1>Diese Seite gibt es <em>nicht (mehr)</em></h1>
				<p class="hero-lead">Vielleicht hilft Ihnen einer dieser Links weiter, oder rufen Sie uns an: 06105 23604.</p>
				<div class="svc-actions">
					<a class="btn btn-glow btn-lg" href="<?php echo esc_url(home_url('/')); ?>">Zur Startseite</a>
					<a class="btn btn-line btn-lg" href="<?php echo esc_url(home_url('/leistungen/')); ?>">Alle Leistungen</a>
					<a class="btn btn-line btn-lg" href="tel:+49610523604"><svg class="ico"><use href="#i-phone"/></svg>Jetzt anrufen</a>
				</div>
			</div>
			<?php echo kz_img3d('kids'); // phpcs:ignore ?>
		</div>
	</section>
</main>
<?php
get_footer();
