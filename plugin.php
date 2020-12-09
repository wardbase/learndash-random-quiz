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
    global $wpdb;

    // Extract published questions.
    $sql_str = $wpdb->prepare( 
        "SELECT m.meta_value FROM {$wpdb->prefix}postmeta AS m
        INNER JOIN {$wpdb->prefix}posts AS p ON p.ID = m.post_id
        WHERE p.post_status='publish' AND m.meta_key='question_pro_id'"
    );

    $ids = $wpdb->get_results($sql_str);

    if (count($ids) > 0) {
        // Generate array string like ('3', '4') for where ... in syntax.
        $ids_str = '(';
    
        for ($i = 0; $i < count($ids); $i++) {
            $ids_str .= "'" . $ids[$i]->meta_value . "'";
    
            if ($i !== count($ids) - 1) {
                $ids_str .= ',';
            }
        }
    
        $ids_str .= ')';
    
        // Query data.
        $tableQuestion = LDLMS_DB::get_table_name('quiz_question');
        $sql_str = $wpdb->prepare("SELECT * FROM {$tableQuestion} WHERE id IN {$ids_str}");
    
        $questions = $wpdb->get_results($sql_str);
        $questions = maybe_unserialize($questions);

        // Decode answer_data.
        for($i = 0; $i < count($questions); $i++) {
            $answer_data = maybe_unserialize($questions[$i]->answer_data);
            $answer_data_array = array();

            foreach($answer_data as $answer_choice) {
                if ($answer_choice->isHtml()) {
                    $answer_data_array[] = array(
                        'html' => $answer_choice->getAnswer(),
                    );
                } else {
                    $answer_data_array[] = $answer_choice->getAnswer();
                }
            }

            $questions[$i]->answer_data = $answer_data_array;
        }

        return json_encode($questions);
    } else {
        // Send empty array when there is no published questions.
        return array();
    }
}
