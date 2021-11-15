<!DOCTYPE html>
<html>
<head>
    <title>Fabric</title>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>

    <div id="tools" style="position: fixed">        
        <a href="create.php" id="create">create</a>    
    </div>    
    <p class="mention">
        Les images proviennent du tome I de <i>L’Homme et la Terre</i>, encyclopédie géohistorique d'Élisée Reclus en six volumes, publiée de façon posthume entre 1905 et 19081. 
    </p>
    
    <ul id="gallery">
        
            <?php

            $files = glob('_collages/*.png');
            usort($files, function($a, $b) {
                return filemtime($a) < filemtime($b);
            });

            foreach($files as $file){
                if (stripos($file, '.png') !== false ) {
                    echo '<li><a href="'.$file . '" download><img src="'.$file . '"></a></li>';
                }        
            }
           
            ?>
        
    
    </ul>

</body>
</html>