<?php
/**
 * @package WardBase_Quiz_Power_Pack
 * @version 1.7.2
 */
/*
Plugin Name: LearnDash Random Quiz
Plugin URI: http://wordpress.org/plugins/learn-dash-random-quiz/
Description: Extract random questions from the server and create a quiz.
Author: WardBase
Version: 1.0.0
Author URI: https://wardbase.com
*/

function wardbase_random_quiz() {
    return "<h1>Hello World</h1>";
}

add_shortcode('RandomQuiz', 'wardbase_random_quiz');
