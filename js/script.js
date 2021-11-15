(function() {
  var c = document.querySelector('#c'),                   // canvas
    container = document.querySelector('#container'),   // container
    h = container.clientHeight,        // height &
    w = container.clientWidth,         // width…
    save = document.querySelector('#save'),             // save button
    download = document.querySelector('#download'),     // download button
    images = document.querySelector('#images'),         // images list
    add = document.querySelector('#add'),               // add button
    message = document.querySelector('#message'),       // message
    imagetools = document.querySelector('#imagetools'),
    tools = document.querySelector('#tools'),
    addtext = document.querySelector('#addtext'),
    fontsize = document.querySelector('#fontsize'),
    lineheight = document.querySelector('#lineheight'),
    copyright = document.querySelector('#copyright'),
    logo = document.querySelector('#logo'),
    spacing = document.querySelector('#spacing'),
    textblock = document.querySelector('#textblock'),
    rainbow = document.querySelector('#rainbow'),
    fontfamily = document.querySelector("#font-family"),
    form = document.querySelector('form'),              // form
    img = null;                     // to store user collage

  var w = 3508 / 3;
  var h = 4961 / 3;

  c.setAttribute('width', w);
  c.setAttribute('height', h);


  // FABRIC

  var canvas2dBackend = new fabric.Canvas2dFilterBackend();
  fabric.filterBackend = fabric.initFilterBackend();
  fabric.Object.prototype.transparentCorners = false;
  fabric.Object.prototype.objectCaching = true;

  function applyFilter(index, filter) {
    var obj = canvas.getActiveObject();
    obj.filters[index] = filter;
    obj.applyFilters();
    canvas.renderAll();
  }

  function getFilter(index) {
    var obj = canvas.getActiveObject();
    return obj.filters[index];
  }

  function applyFilterValue(index, prop, value) {
    var obj = canvas.getActiveObject();
    if (obj.filters[index]) {
      obj.filters[index][prop] = value;
      obj.applyFilters();
      canvas.renderAll();
    }
  }
  
  var canvas = this.__canvas = new fabric.Canvas('c',{
    selectionColor : 'rgba(0,0,0,0.3)',
    selectionBorderColor : '#000',
    selectionLineWidth : 5,
    uniScaleTransform:false,
    backgroundColor:"#ffffff",
    globalCompositeOperation: "multiply"
  }),
  f = fabric.Image.filters;


  // RESIZE
  window.addEventListener('resize', ()=> {
    resize(canvas.wrapperEl);    
  });
  resize(canvas.wrapperEl);



  // FONTS
  var list = ["Karrik-Regular.ttf","Anthony.otf","AUTHENTICSans-60.otf","AUTHENTICSans-90.otf","AUTHENTICSans-130.otf","AUTHENTICSans-150.otf","AUTHENTICSans-Condensed-60.otf","AUTHENTICSans-Condensed-90.otf","AUTHENTICSans-Condensed-130.otf","AUTHENTICSans-Condensed-150.otf","Bagnard.otf","Basteleur.otf","Compagnon-Bold.otf","Compagnon-Light.otf","Compagnon-LightItalic.otf","Compagnon-Medium.otf","Compagnon-Roman.otf","Cormorant-Bold.ttf","Cormorant-BoldItalic.ttf","Cormorant-Italic.ttf","Cormorant-Light.ttf","Cormorant-LightItalic.ttf","Cormorant-Medium.ttf","Cormorant-MediumItalic.ttf","Cormorant-Regular.ttf","Cormorant-SemiBold.ttf","Cormorant-SemiBoldItalic.ttf","FivoSansModern-ExtBlack.otf","FivoSansModern-Medium-Oblique.otf","FivoSansModern-Regular-Oblique.otf","FivoSansModern-Regular.otf","FjallaOne.ttf","Happy_times_at_the_ikob-italic.otf","Happy_times_at_the_ikob-roman.otf","Karrik-Italic.ttf","Morganite-Black.ttf","Morganite-BlackItalic.ttf","Morganite-Bold.ttf","Morganite-BoldItalic.ttf","Morganite-Book.ttf","Morganite-BookItalic.ttf","Morganite-ExtraBold.ttf","Morganite-ExtraBoldItalic.ttf","Morganite-ExtraLight.ttf","Morganite-ExtraLightItalic.ttf","Morganite-Light.ttf","Morganite-LightItalic.ttf","Morganite-Medium.ttf","Morganite-MediumItalic.ttf","Morganite-SemiBold.ttf","Morganite-SemiBoldItalic.ttf","Morganite-Thin.ttf","Morganite-ThinItalic.ttf","NotCourierSans-Bold.otf","NotCourierSans-Regular.otf","Orchard-Linear.otf","Panamera-Bold.otf","Panamera-Light.otf","PlayfairDisplay-Black.ttf","PlayfairDisplay-BlackItalic.ttf","PlayfairDisplay-Bold.ttf","PlayfairDisplay-BoldItalic.ttf","PlayfairDisplay-Italic.ttf","PlayfairDisplay-Regular.ttf","Poppins-Black.ttf","Poppins-BlackItalic.ttf","Poppins-Bold.ttf","Poppins-BoldItalic.ttf","Poppins-ExtraBold.ttf","Poppins-ExtraBoldItalic.ttf","Poppins-ExtraLight.ttf","Poppins-ExtraLightItalic.ttf","Poppins-Italic.ttf","Poppins-Light.ttf","Poppins-LightItalic.ttf","Poppins-Medium.ttf","Poppins-MediumItalic.ttf","Poppins-Regular.ttf","Poppins-SemiBold.ttf","Poppins-SemiBoldItalic.ttf","Poppins-Thin.ttf","Poppins-ThinItalic.ttf","Rubik-Black.ttf","Rubik-BlackItalic.ttf","Rubik-Bold.ttf","Rubik-BoldItalic.ttf","Rubik-Italic.ttf","Rubik-Light.ttf","Rubik-LightItalic.ttf","Rubik-Medium.ttf","Rubik-MediumItalic.ttf","Rubik-Regular.ttf","Savate-italique.otf","Savate-regular.otf","SpaceMono-Bold.ttf","SpaceMono-BoldItalic.ttf","SpaceMono-Italic.ttf","SpaceMono-Regular.ttf","Terminal_grotesque-Closed.ttf","Terminal_grotesque-Open.otf","VLNL_Tp_Rawkost-Bold.otf","XanhMono-Italic.ttf","XanhMono-Regular.ttf"];
  var families = []
  var alternates = {}
  var families_select = "";
  var alternates_select = "";
  function prettyname(s){
    return s.replace(/_/g, " ").replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
  }
  function styleName(s){
    return s.replace(".ttf","").replace(".otf","").replace("_","").replace("-","").toLowerCase().trim();
  }
  list.forEach(f => {
    var font_ext = f.split(".");
    var ext = font_ext[1];
    var font = font_ext[0];
    
    var familyname_alternate = font.split("-")
    var familyname = familyname_alternate[0].trim();
    var familyprettyname = prettyname(familyname);
    var alternate =  familyname_alternate[1];
    
    if(families.indexOf(familyname) < 0){
      families.push(familyname);
      families_select += `<option value="${f}" data-family="${familyname}" data-format="${ext == 'ttf' ? 'truetype' : 'opentype' }">${familyprettyname}</option>`;
      if(alternate) {
        alternates[familyname]=[[alternate.trim(), f]];
        alternates_select += `<option value="${f}" data-format="${ext == 'ttf' ? 'truetype' : 'opentype' }">${alternate}</option>`;
      }
    } else {
      alternates[familyname].push([alternate.trim(), f]);
      alternates_select += `<option value="${f}" data-format="${ext == 'ttf' ? 'truetype' : 'opentype' }">${alternate}</option>`;
    }
  });
  
  fontfamily.innerHTML = families_select;

  fontfamily.addEventListener('change', (e)=> {
    var option = fontfamily.options[fontfamily.selectedIndex];
    var family = option.dataset.family;
    var format = option.dataset.format;
    var subselect = document.querySelector('#subselect');
    if(subselect) subselect.parentElement.removeChild(subselect);
    buildStyleSheet(fontfamily.value, format);
    if(family in alternates){
      buildSelect(family, format);          
    }
  })

  function buildSelect(family, format){
    var select = document.createElement("select");
    select.id = "subselect";
    select.dataset.family = family;
    var select_html = "";
    alternates[family].forEach((style_font)=>{
      select_html += `<option value="${style_font[1].trim()}" data-format="${format}">${style_font[0]}</option>`;
    })
    select.innerHTML = select_html;
    fontfamily.parentNode.insertBefore(select, fontfamily.nextSibling);
    select.onchange= (e)=>{
      var option = select.options[select.selectedIndex];
      var format = option.dataset.format;
      buildStyleSheet(select.value, format);
    };
  }

  function buildStyleSheet(fontfile, format){
    var style = document.createElement('style');
    var name = styleName(fontfile);
    var rules = `@font-face {
      font-family: '${name}';
      src: url('css/fonts/${fontfile}') format('${format}');
      font-weight: normal;
      font-style: normal;
      font-display: swap;
    }`;
    style.textContent = rules;
    document.querySelector("head").appendChild(style);
    loadAndUse(name)
  }

  function loadAndUse(font) {
    var myfont = new FontFaceObserver(font)
    myfont.load()
      .then(function() {
        canvas.getActiveObject().set("fontFamily", font);
        canvas.requestRenderAll();
      }).catch(function(e) {
        console.log(e)
        // alert('font loading failed ' + font);
      });
  }
  


  // UI
  canvas.on({
    'selection:created': function() {
      var ao = canvas.getActiveObject();
      if(ao.type == "image"){ imagetools.className = "imagemode"  } 
      else { imagetools.className = "textmode" }
    },
    'selection:updated': function() {
      var ao = canvas.getActiveObject();
      if(ao.type == "image"){ imagetools.className = "imagemode"  } 
      else { imagetools.className = "textmode" }
    },
    'selection:cleared': function() {
      imagetools.className = "";
    }
  });

  // UI: TOOLS
  imagetools.addEventListener('click', (e)=>{
    if(e.target.matches('a[data-fabric-action]')){
      e.preventDefault();
      var action = e.target.dataset.fabricAction;  
      switch (action){
        case "remove":
          canvas.remove(canvas.getActiveObject());
          break;
        case "sendBackwards":
          canvas.sendBackwards(canvas.getActiveObject());
          break;
        case "bringForward":
          canvas.bringForward(canvas.getActiveObject());
          break;
      }
    } else if(e.target.matches('input[name=tint]')){
      color = e.target.value;
      var ao = canvas.getActiveObject();
      if(ao === undefined) return;
      if(ao.type == "textbox"){
        ao.set('fill', color);
        canvas.requestRenderAll();
      } else if(ao.type=="image"){
        applyFilter(1, new f.BlendColor({
          color: color,
          mode: 'screen',
          alpha: 1
        }));
      }
    }
  })
  rainbow.addEventListener('change', function(){
    color = rainbow.value;
    var ao = canvas.getActiveObject();
    if(ao === undefined) return;
    if(ao.type == "textbox"){
      ao.set('fill', color);
      canvas.requestRenderAll();
    } else if(ao.type=="image"){
      applyFilter(1, new f.BlendColor({
        color: color,
        mode: 'screen',
        alpha: 1
      }));
    }
  })

  // UI: ADD something
  add.addEventListener('click', function(){
    images.style.display = "block";
  })
  // record addImage action on each image within images list
  images.addEventListener('click',  (e) =>{
    if(e.target.matches("img")){
      e.preventDefault();
      addImage(e.target.src, e.target.className);
      images.style.display = "none";
    }
  })

  // UI: ADD IMAGE
  function addImage(imageUrl, mode){
    imagetools.className = "imagemode";
    if(mode=='background'){ } else {      
      fabric.Image.fromURL(imageUrl, function(img) {
        var oImg = img.set({                  
          uniScaleTransform:false,
          hasBorders:false,
          padding:10,
          cornerColor:'#000',
          transparentCorners:false,
          globalCompositeOperation: 'multiply'
        });
        oImg.setControlVisible( 'tl', false);
        oImg.setControlVisible( 'mr', false);
        oImg.setControlVisible( 'br', false);
        oImg.setControlVisible( 'ml', false);
        oImg.setControlVisible( 'mt', false);
        oImg.setControlVisible( 'mb', false);
        
        oImg.set('left', w / 2 );
        oImg.set('top', h / 2 );
        oImg.set('angle', Math.floor( Math.random() * 360));

        canvas.add(oImg);
        
      });       
    }
  }


  // UI: TEXT font size
  fontsize.addEventListener('change', function(){
    var ao = canvas.getActiveObject();
    if(ao.type == "textbox"){
      ao.set("fontSize", parseFloat(fontsize.value));
      canvas.requestRenderAll();
    }
  })
  // UI: TEXT line height
  lineheight.addEventListener('change', function(){
    var ao = canvas.getActiveObject();
    if(ao.type == "textbox"){
      ao.set("lineHeight", parseFloat(lineheight.value));
      canvas.requestRenderAll();
    }
  })
  // UI: TEXT spacing
  spacing.addEventListener('change', function(){
    var ao = canvas.getActiveObject();
    if(ao.type == "textbox"){
      ao.set("charSpacing", parseInt(spacing.value));
      canvas.requestRenderAll();
    }
  })
  // UI: TEXT BLOCK
  textblock.addEventListener('click', function(){
    imagetools.className = "textmode";
    lineheight.value=0.8;
    fontsize.value=50;
    var text = addtext.value;
    var textbox = new fabric.Textbox(text, {
      left: 50,
      top: 50,
      width: 150,
      fontSize: 50,
      lineHeight: .8,
      fontFamily: "Karrik"
    });
    canvas.add(textbox).setActiveObject(textbox);
    images.style.display = "none";
  })

  // UI: COPYRIGHT
  copyright.addEventListener('click', function(e){
    e.preventDefault();
    imagetools.className = "textmode";
    
    var text = "L’idéal anarchique\n–\nMaison des éditions\n–\nImages issues de L’Homme et la Terre,\nd'Élisée Reclus";
    var textbox = new fabric.Textbox(text, {
      left: 50,
      top: 50,
      width: 150,
      fontSize: 16,
      textAlign: 'center',
      lineHeight: .8,
      fontFamily: "Karrik"
    });
    canvas.add(textbox).setActiveObject(textbox);
    images.style.display = "none";
  })

  // UI: LOGO
  logo.addEventListener('click', function(e){
    e.preventDefault();
    imagetools.className = "imagemode";
        
      fabric.Image.fromURL("css/logo.png", function(img) {
        var oImg = img.set({          
          hasBorders:false,
          padding:10,
          cornerColor:'#000',
          transparentCorners:false
        });
        oImg.setControlVisible( 'tl', false);
        oImg.setControlVisible( 'mr', false);
        oImg.setControlVisible( 'br', false);
        oImg.setControlVisible( 'ml', false);
        oImg.setControlVisible( 'mt', false);
        oImg.setControlVisible( 'mb', false);
        
        oImg.scale( 0.25 );
        oImg.set('left', w / 2 );
        oImg.set('top', h / 2 );
        
        canvas.add(oImg);
        
      });   
  })


  
  // SAVE : POST
  function ajaxPost(img) {
    var url = 'upload.php',
        xhr = new XMLHttpRequest();

    var username = document.querySelector('#username').value;

    var data = { 
      imgBase64: img,
      username: username
    }
    
    xhr.onload = function() {
      if (xhr.status != 200) { // analyze HTTP status of the response
        console.log(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
      } else { // show the result
        console.log(`Done, got ${xhr.response}`); // response is the server response
        var r = JSON.parse(xhr.response);        
        success(r.message);
      }
    };

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
  }

  // SAVE : REDIRECT
  function success(response) {
    tools.classList.add("message");
    form.style.display = "none";
    message.innerHTML = 'Bravo, ' + response +'&thinsp;!';
    setTimeout(function(){
      // redirect to home (gallery) after saving and 500 ms
      document.location.href = 'index.php'
    }, 2000)
  }
  
  // SAVE : FORM
  function showNameInput(img){
    // record username on save()
    // redirect to home (gallery) after saving
    save.style.display = "none";
    add.style.display = "none";
    form.style.display = "block";

    form.addEventListener('submit', function(e){
      e.preventDefault();
      ajaxPost(img);
    });
  }
  
  // SAVE : ACTION
  save.addEventListener('click', function(e){
    e.preventDefault();
    canvas.discardActiveObject();
    // convert canvas to image
    img = canvas.toDataURL({
      format: 'jpg',
      quality: 0.9,
      width:w,
      height:h
    });
    showNameInput(img);
  });


  
})();