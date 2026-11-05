<?php
/** Kopf: Meta-Angaben (wp_head), Icon-Sprite, Kontaktleiste, Navigation, mobiles Menü */
if (!defined('ABSPATH')) {
	exit;
}
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo('charset'); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a class="skip-link" href="#inhalt">Zum Inhalt springen</a>
<?php echo kz_part('header'); // phpcs:ignore WordPress.Security.EscapeOutput -- Theme-Datei ?>
