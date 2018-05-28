<?php
use lawsaw\widgets\Button;
?>

Hello World

<?= Button::widget([
    'classContent' => 'awModalOpen',
    'theme' => 'lightblue',
    'size' => 'sizeL',
    'href' => '#',
    'data' => 'data-awesome-modal="testModal"',
    'label' => 'Open modal 2',
]); ?>