<?php
/**
 * @package WardBase_Quiz_Power_Pack
 * @version 1.0.0
 */
/*
Plugin Name: LearnDash Random Quiz
Plugin URI: http://wordpress.org/plugins/learn-dash-random-quiz/
Description: Extract random questions from the server and create a quiz.
Author: WardBase
Version: 1.0.0
Author URI: https://wardbase.com
*/

define('LD_RANDOM_QUIZ_PATH', dirname(__FILE__));
define('LD_RANDOM_QUIZ_URL', plugins_url('', __FILE__));

require LD_RANDOM_QUIZ_PATH . '/lib/wardbase.php';

function wardbase_random_quiz() {
    wp_enqueue_style( 'ld-random-quiz-style' );
    wp_enqueue_script( 'wp-api' );
    wardbase_enqueue_scripts( 'ld-random-quiz-script' );

    return '<div id="ld-random-quiz-app"></div>';
}

add_shortcode('RandomQuiz', 'wardbase_random_quiz');

function wardbase_random_quiz_enqueue_scripts() {
    wardbase_load_react_app(LD_RANDOM_QUIZ_PATH . '/app/', LD_RANDOM_QUIZ_URL . '/app/', 'ld-random-quiz', '#ld-random-quiz-app');
}

add_action( 'wp_enqueue_scripts', 'wardbase_random_quiz_enqueue_scripts' );

function wardbase_random_quiz_rest_api() {
    register_rest_route( 'random-quiz/v1', '/quiz', array(
        'methods' => 'GET',
        'callback' => 'ward_base_get_quiz',
    ) );
}

add_action( 'rest_api_init', 'wardbase_random_quiz_rest_api' );

function ward_base_get_quiz() {
    return "Hello WP API World!";
}
