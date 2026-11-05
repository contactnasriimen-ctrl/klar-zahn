<?php
/** Rückfall-Vorlage */
if (!defined('ABSPATH')) {
	exit;
}
require KZ_DIR . (is_singular() ? '/page.php' : '/home.php');
