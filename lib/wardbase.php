<?php

/**
 * Load react app files in WordPress admin.
 *
 * @return bool|void
 */
function wardbase_load_react_app($react_app_folder_path, $react_app_url, $plugin_id, $appSelector){
	// Setting path variables.
    $react_app_build = $react_app_folder_path .'build/';
    $react_app_url = $react_app_url . 'build/';
	$manifest_url = $react_app_build. 'asset-manifest.json';

	// Request manifest file.
	$request = file_get_contents( $manifest_url );

	// If the remote request fails, wp_remote_get() will return a WP_Error, so let’s check if the $request variable is an error:
	if( !$request )
		return false;

	// Convert json to php array.
	$files_data = json_decode($request);
	if($files_data === null)
		return;

	if(!property_exists($files_data,'entrypoints'))
		return false;

	// Get assets links.
	$assets_files = $files_data->entrypoints;

	$js_files = array_filter($assets_files, function ($file_string) {
        return pathinfo($file_string, PATHINFO_EXTENSION) === 'js';
    });
	$css_files = array_filter($assets_files, function ($file_string) {
        return pathinfo( $file_string, PATHINFO_EXTENSION ) === 'css';
    });

	// Load css files.
	foreach ($css_files as $index => $css_file){
		wp_register_style($plugin_id.'-style', $react_app_url . $css_file);
	}

	// Load js files.
	foreach ($js_files as $index => $js_file){
		wardbase_register_script($plugin_id.'-script', $react_app_url . $js_file, array(), 1, true);
	}

	// Variables for app use.
	wp_localize_script($plugin_id.'-script', 'wpReactPlugin',
		array('appSelector' => $appSelector)
	);
}

$registered_scripts = array();

function wardbase_register_script($handle, $src, $deps = array(), $ver = false, $in_footer = false) {
    global $registered_scripts;

    if (!$registered_scripts[$handle]) {
        $registered_scripts[$handle] = array();
    }

    $count = count($registered_scripts[$handle]);
    $newHandle = $count === 0 ? $handle : $handle . '-' . $count;
    $registered_scripts[$handle][] = $newHandle;

    wp_register_script($newHandle, $src, $deps, $ver, $in_footer);
}

function wardbase_enqueue_scripts($handle) {
    global $registered_scripts;

    foreach ($registered_scripts[$handle] as $handleName) {
        call_user_func_array('wp_enqueue_script', array($handleName));
    }
}
