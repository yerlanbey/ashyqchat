<?php
function makeImageFromName($name){
    $userImage = '';
    $shorName = '';


    $names = explode(" ", $name);
    foreach ($names as $w){
        $shorName .= $w[0];
    }

    $userImage = '<div class="name-image bg-primary">'.$shorName.'</div>';
    return $userImage;
}
