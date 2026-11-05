<?php
/**
 * Online-Terminanfrage: Das Formular auf der Seite „Online-Termin“ sendet an
 * /wp-json/klarzahn/v1/termin. WordPress verschickt die Anfrage per E-Mail an die Praxis
 * (Adresse unter Design → Klar Zahn). Es wird nichts in der Datenbank gespeichert.
 * Tipp: Für zuverlässigen Versand ein SMTP-Plugin nutzen (z. B. „WP Mail SMTP“).
 */
if (!defined('ABSPATH')) {
	exit;
}

function kz_booking_email() {
	$mail = get_option('kz_booking_email', 'Kontakt@klar-zahn.de');
	return is_email($mail) ? $mail : get_option('admin_email');
}

add_action('rest_api_init', function () {
	register_rest_route('klarzahn/v1', '/termin', array(
		'methods'             => 'POST',
		'callback'            => 'kz_booking_send',
		'permission_callback' => '__return_true',
	));
});

function kz_booking_send(WP_REST_Request $request) {
	$data = $request->get_json_params();
	if (!is_array($data) || count($data) > 40) {
		return new WP_REST_Response(array('success' => 'false'), 400);
	}

	/* Höchstens 5 Anfragen pro Stunde und Absender */
	$ip  = isset($_SERVER['REMOTE_ADDR']) ? sanitize_text_field(wp_unslash($_SERVER['REMOTE_ADDR'])) : '';
	$key = 'kz_bk_' . md5($ip);
	$n   = (int) get_transient($key);
	if ($n >= 5) {
		return new WP_REST_Response(array('success' => 'false', 'message' => 'Zu viele Anfragen'), 429);
	}
	set_transient($key, $n + 1, HOUR_IN_SECONDS);

	$subject = isset($data['_subject']) ? sanitize_text_field($data['_subject']) : 'Neue Terminanfrage';
	$rows    = '';
	foreach ($data as $field => $value) {
		$field = (string) $field;
		if ($field === '' || $field[0] === '_' || !is_scalar($value)) {
			continue;
		}
		$value = mb_substr(trim((string) $value), 0, 2000);
		$rows .= '<tr><th align="left" valign="top" style="padding:6px 14px 6px 0;color:#035444">' . esc_html(mb_substr($field, 0, 80)) . '</th>'
			. '<td style="padding:6px 0">' . nl2br(esc_html($value)) . '</td></tr>';
	}
	if ($rows === '') {
		return new WP_REST_Response(array('success' => 'false'), 400);
	}
	$body = '<div style="font-family:Arial,sans-serif;font-size:15px;color:#0b2621"><h2 style="color:#035444">' . esc_html($subject) . '</h2>'
		. '<table cellspacing="0" cellpadding="0">' . $rows . '</table>'
		. '<p style="color:#4a645d;font-size:13px">Gesendet über das Formular „Online-Termin“ auf ' . esc_html(home_url('/')) . '</p></div>';

	$headers = array('Content-Type: text/html; charset=UTF-8');
	$reply   = isset($data['_replyto']) ? sanitize_email($data['_replyto']) : '';
	if ($reply && is_email($reply)) {
		$headers[] = 'Reply-To: ' . $reply;
	}
	$ok = wp_mail(kz_booking_email(), $subject, $body, $headers);
	return new WP_REST_Response(array('success' => $ok ? 'true' : 'false'), $ok ? 200 : 500);
}
