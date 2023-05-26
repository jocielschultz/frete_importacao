<?php
function wpb_hook_javascript_footer() {
?>
        <script>
          // seu código javascript vai aqui
        </script>
<?php
}
add_action('wp_footer', 'wpb_hook_javascript_footer');
?>