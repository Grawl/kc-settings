<?php

/**
 * Options helpers
 *
 * @package KC_Settings
 *
 * All functions here should only be used as field callback functions
 */


/**
 * Options
 */
class kcSettings_options {
	public static $nav_menus;
	public static $image_sizes;
	public static $image_sizes_default;
	public static $image_sizes_custom;


	public static function init() {
		foreach ( get_class_methods(__CLASS__) as $method )
			if ( $method !== 'init' )
				call_user_func( array(__CLASS__, $method) );
	}


	public static function nav_menus() {
		$_menus = wp_get_nav_menus();
		if ( !$_menus )
			return;

		$menus = array();
		foreach ( $_menus as $menu )
			$menus[$menu->term_id] = $menu->name;

		self::$nav_menus = $menus;
	}


	public static function image_sizes( $store = true, $dims = true ) {
		$sizes = array();
		foreach ( kcs_get_image_sizes() as $id => $dim ) {
			if ( $dims )
				$sizes[$id] = "{$id} ({$dim['width']} x {$dim['height']})";
			else
				$sizes[$id] = $id;
		}

		if ( !$store )
			return $sizes;

		self::$image_sizes = $sizes;

		$defaults = array();
		foreach ( array('thumbnail', 'medium', 'large') as $ds ) {
			$defaults[$ds] = $sizes[$ds];
			unset( $sizes[$ds] );
		}
		self::$image_sizes_default = $defaults;

		if ( !empty($sizes) )
			self::$image_sizes_custom = $sizes;
	}
}



/**
 * Multi featured images
 *
 */
function kcs_multi_featured_images( $args, $db_value, $cb_args ) {
	if ( !is_array($cb_args) || !$cb_args )
		return '<p class="description"><span class="impo">'.__('Please fix your callback args!', 'kc-settings').'</span></p>';

	$url = 'media-upload.php?kcmfi=true&amp;post_id='.$args['object_id'].'&amp;TB_iframe=1';
	$out = "<ul class='kc-mfi'>\n";
	foreach ( $cb_args as $idx => $item ) {
		$out .= "\t<li>\n";

		if ( isset($db_value[$idx]) ) {
			if ( $img = wp_get_attachment_image_src($db_value[$idx]) )
				$out .= "\t\t<a href='{$url}' class='add' title='{$cb_args[$idx]['add']}'><img src='{$img[0]}' alt='' /></a>\n";
			$img_id = $db_value[$idx];
		}
		else {
			$out .= "\t\t<a href='{$url}' class='add thickbox'>{$cb_args[$idx]['add']}</a>\n";
			$img_id = '';
		}

		$out .= "\t\t<a href='#' class='del'>".__('Remove', 'kc-settings')."</a>\n";
		$out .= "\t\t<input type='hidden' name='{$args['field']['name']}[{$cb_args[$idx]['id']}]' value='{$img_id}'/>\n";
		$out .= "\t</li>\n";
	}
	$out .= "</ul>\n";

	return $out;
}


/**
 * Get nav menus
 */
function kcs_cb_nav_menus( $args, $db_value, $cb_args ) {
	if ( !kcSettings_options::$nav_menus )
		return __('Please create a menu', 'kc-settings');

	$type = ( isset($cb_args['type']) && in_array($cb_args['type'], array('select', 'checkbox', 'radio')) ) ? $cb_args['type'] : 'select';
	$out = kcForm::field(array(
		'type'    => $type,
		'options' => kcSettings_options::$nav_menus,
		'attr'    => array(
			'id'    => $args['field']['id'],
			'name'  => $args['field']['name']
		),
		'current' => $db_value
	));

	return $out;
}
