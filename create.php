<!DOCTYPE html>
<html>
<head>
    <title>Fabrique</title>
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <link rel="stylesheet" type="text/css" href="css/fonts.css">
</head>
<body class="create">

  <div id="tools">
    <span class="copyright">
      <a href="#" id="copyright">©</a>
      <a href="#" id="logo"><img src="css/logo.png"></a>
    </span>
    <span>
      <a href="#" id="add">+</a> <a id="save" href="#">Save</a>
    </span>
    <span>
      <a id="download" href="#">Download</a>
    </span>
    <form>
      <input type="text" name="username" id="username" placeholder="your name" required >
      <button type="submit">OK</button>
    </form>
    <span id="message"></span>
    <div id="imagetools">
      
      <span class="depth">
        <a href="#" data-fabric-action="bringForward">↑</a>
        <a href="#" data-fabric-action="sendBackwards">↓</a>
        <a href="#" data-fabric-action="remove">x</a>
      </span>
      <span class="colors">
        <label style="background-color:#f00"><input type="radio" name="tint" value="#f00"></label>
        <label style="background-color:#ff0"><input type="radio" name="tint" value="#ff0"></label>
        <label style="background-color:#f0f"><input type="radio" name="tint" value="#f0f"></label>
        <label style="background-color:#0f0"><input type="radio" name="tint" value="#0f0"></label>
        <label style="background-color:#00f"><input type="radio" name="tint" value="#00f"></label>
        <label style="background-color:#fff"><input type="radio" name="tint" value="null"></label>
        <label class="rainbow"><input value="#e66465" type="color" name="tint" id="rainbow" value="null"></label>
      </span>
      <span class="type">
        <span class="select">
          <select id="font-family"></select>
        </span>
        <span class="range">
          <input type="range" id="fontsize" name="fontsize" min="8" max="800" value="50" step="1" >
        </span>
        <span class="range">
          <input type="range" id="lineheight" name="lineheight" min="0.2" max="2" value=".8" step=".05" >
        </span>
        <span class="range">
          <input type="range" id="spacing" name="spacing" min="-200" max="600" value="0" step="1" >
        </span>
      </span>
    </div>
  </div>
    
  <div id="images">
    <h3 class="text">Texte</h3>
    <div id="textform">
      <textarea name="addtext" id="addtext"></textarea>
      <button type="button" id="textblock">OK</button>
    </div>

    <?php
      function listFolderFiles($dir, $mode){
        $ffs = scandir($dir);
        foreach ($ffs as $ff) {
          if ($ff != '.' && $ff != '..') {
            $file = $dir.'/'.$ff;
            if (stripos($file, '.png') !== false || stripos($file, '.jpg') !== false) {
              echo '<img src="'.$file . '" class="' . $mode . '">';
            }
          }
        }
      }
      //echo "<h3>backgrounds</h3>";
      //echo "<div class='g'>";
      // directory : ./_images/
      //listFolderFiles('_backgrounds', 'background');
      //echo "</div>";
      echo "<h3>images</h3>";
      echo "<div class='g'>";
      // directory : ./_images/
      listFolderFiles('_images', 'image');
      echo "</div>";
      echo "<h3>Reclus</h3>";
      echo "<div class='g'>";
      // directory : ./_images/
      listFolderFiles('_reclus', 'image');
      echo "</div>";
    ?>
    </div>
    
    
    <div id="container">
        <canvas id="c" ></canvas>    
    </div>
    
    <script type="text/javascript" src="js/fabric.js"></script>
    <script type="text/javascript" src="js/fontfaceobserver.js"></script>
    <script type="text/javascript" src="js/resize.js"></script>
    <script type="text/javascript" src="js/script.js"></script>
</body>
</html>