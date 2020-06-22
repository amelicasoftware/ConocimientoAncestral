  // initialize global variables.
  var edges;
  var nodes;
  var network; 
  var container;
  var options, data;

  
  // This method is responsible for drawing the graph, returns the drawn network
  function drawGraph() {
      var container = document.getElementById('mynetwork');
      
      

      // parsing and collecting nodes and edges from the python
      nodes = new vis.DataSet([{"font": {"color": "white"}, "id": "cultura", "label": "cultura", "shape": "dot", "title": "cultura Neighbors:\u003cbr\u003einterculturalidad\u003cbr\u003edesarrollo\u003cbr\u003eidentidad cultural\u003cbr\u003ememoria\u003cbr\u003eind\u00edgenas\u003cbr\u003ehistoria\u003cbr\u003epol\u00edtica\u003cbr\u003epatrimonio\u003cbr\u003eEducaci\u00f3n\u003cbr\u003enaturaleza\u003cbr\u003ecomunicaci\u00f3n\u003cbr\u003eidentidad\u003cbr\u003eeducaci\u00f3n\u003cbr\u003eterritorio\u003cbr\u003eIdentidad", "value": 15}, {"font": {"color": "white"}, "id": "identidad", "label": "identidad", "shape": "dot", "title": "identidad Neighbors:\u003cbr\u003eglobalizaci\u00f3n\u003cbr\u003ehistoria\u003cbr\u003ediversidad cultural\u003cbr\u003eeducaci\u00f3n\u003cbr\u003epaisaje\u003cbr\u003eritual\u003cbr\u003ecolonialismo\u003cbr\u003ediversidad\u003cbr\u003emigraci\u00f3n\u003cbr\u003ecultura\u003cbr\u003emulticulturalismo\u003cbr\u003emito\u003cbr\u003einterculturalidad\u003cbr\u003emulticulturalidad\u003cbr\u003eM\u00e9xico\u003cbr\u003eCultura\u003cbr\u003epatrimonio\u003cbr\u003eetnicidad\u003cbr\u003eterritorio\u003cbr\u003ealteridad\u003cbr\u003eEstado\u003cbr\u003eetnograf\u00eda\u003cbr\u003eind\u00edgenas\u003cbr\u003ememoria\u003cbr\u003eeducaci\u00f3n intercultural", "value": 25}, {"font": {"color": "white"}, "id": "aprendizaje", "label": "aprendizaje", "shape": "dot", "title": "aprendizaje Neighbors:\u003cbr\u003eense\u00f1anza\u003cbr\u003eEnse\u00f1anza\u003cbr\u003eeducaci\u00f3n superior", "value": 3}, {"font": {"color": "white"}, "id": "ense\u00f1anza", "label": "ense\u00f1anza", "shape": "dot", "title": "ense\u00f1anza Neighbors:\u003cbr\u003eaprendizaje", "value": 1}, {"font": {"color": "white"}, "id": "Espiritualidad", "label": "Espiritualidad", "shape": "dot", "title": "Espiritualidad Neighbors:\u003cbr\u003ereligi\u00f3n\u003cbr\u003eSalud\u003cbr\u003eEnfermer\u00eda\u003cbr\u003eReligi\u00f3n", "value": 4}, {"font": {"color": "white"}, "id": "Religi\u00f3n", "label": "Religi\u00f3n", "shape": "dot", "title": "Religi\u00f3n Neighbors:\u003cbr\u003eEspiritualidad\u003cbr\u003eEnfermer\u00eda", "value": 2}, {"font": {"color": "white"}, "id": "Cultural", "label": "Cultural", "shape": "dot", "title": "Cultural Neighbors:\u003cbr\u003ePsicolog\u00eda Hist\u00f3rico", "value": 1}, {"font": {"color": "white"}, "id": "Psicolog\u00eda Hist\u00f3rico", "label": "Psicolog\u00eda Hist\u00f3rico", "shape": "dot", "title": "Psicolog\u00eda Hist\u00f3rico Neighbors:\u003cbr\u003eCultural", "value": 1}, {"font": {"color": "white"}, "id": "Enfermer\u00eda", "label": "Enfermer\u00eda", "shape": "dot", "title": "Enfermer\u00eda Neighbors:\u003cbr\u003eEspiritualidad\u003cbr\u003eReligi\u00f3n", "value": 2}, {"font": {"color": "white"}, "id": "cultural", "label": "cultural", "shape": "dot", "title": "cultural Neighbors:\u003cbr\u003epsicolog\u00eda hist\u00f3rico\u003cbr\u003eTeor\u00eda hist\u00f3rico\u003cbr\u003ePsicolog\u00eda hist\u00f3rico", "value": 3}, {"font": {"color": "white"}, "id": "psicolog\u00eda hist\u00f3rico", "label": "psicolog\u00eda hist\u00f3rico", "shape": "dot", "title": "psicolog\u00eda hist\u00f3rico Neighbors:\u003cbr\u003ecultural", "value": 1}, {"font": {"color": "white"}, "id": "historia", "label": "historia", "shape": "dot", "title": "historia Neighbors:\u003cbr\u003eM\u00e9xico\u003cbr\u003eCosta Rica\u003cbr\u003ememoria\u003cbr\u003ecultura\u003cbr\u003eidentidad", "value": 5}, {"font": {"color": "white"}, "id": "Espa\u00f1a", "label": "Espa\u00f1a", "shape": "dot", "title": "Espa\u00f1a Neighbors:\u003cbr\u003eLepidoptera\u003cbr\u003eIslas Canarias", "value": 2}, {"font": {"color": "white"}, "id": "Lepidoptera", "label": "Lepidoptera", "shape": "dot", "title": "Lepidoptera Neighbors:\u003cbr\u003eEspa\u00f1a\u003cbr\u003eIslas Canarias", "value": 2}, {"font": {"color": "white"}, "id": "Costa Rica", "label": "Costa Rica", "shape": "dot", "title": "Costa Rica Neighbors:\u003cbr\u003eIsla del Coco\u003cbr\u003ehistoria", "value": 2}, {"font": {"color": "white"}, "id": "Isla del Coco", "label": "Isla del Coco", "shape": "dot", "title": "Isla del Coco Neighbors:\u003cbr\u003eCosta Rica", "value": 1}, {"font": {"color": "white"}, "id": "paisaje", "label": "paisaje", "shape": "dot", "title": "paisaje Neighbors:\u003cbr\u003eTurismo\u003cbr\u003earqueolog\u00eda\u003cbr\u003epatrimonio\u003cbr\u003eturismo\u003cbr\u003eidentidad\u003cbr\u003eterritorio", "value": 6}, {"font": {"color": "white"}, "id": "territorio", "label": "territorio", "shape": "dot", "title": "territorio Neighbors:\u003cbr\u003eidentidad\u003cbr\u003ecultura\u003cbr\u003epaisaje", "value": 3}, {"font": {"color": "white"}, "id": "Psicolog\u00eda hist\u00f3rico", "label": "Psicolog\u00eda hist\u00f3rico", "shape": "dot", "title": "Psicolog\u00eda hist\u00f3rico Neighbors:\u003cbr\u003ecultural", "value": 1}, {"font": {"color": "white"}, "id": "Islas Canarias", "label": "Islas Canarias", "shape": "dot", "title": "Islas Canarias Neighbors:\u003cbr\u003eEspa\u00f1a\u003cbr\u003eTenerife\u003cbr\u003eLepidoptera", "value": 3}, {"font": {"color": "white"}, "id": "acci\u00f3n", "label": "acci\u00f3n", "shape": "dot", "title": "acci\u00f3n Neighbors:\u003cbr\u003einvestigaci\u00f3n", "value": 1}, {"font": {"color": "white"}, "id": "investigaci\u00f3n", "label": "investigaci\u00f3n", "shape": "dot", "title": "investigaci\u00f3n Neighbors:\u003cbr\u003eacci\u00f3n", "value": 1}, {"font": {"color": "white"}, "id": "memoria", "label": "memoria", "shape": "dot", "title": "memoria Neighbors:\u003cbr\u003eidentidad\u003cbr\u003ehistoria\u003cbr\u003ecultura", "value": 3}, {"font": {"color": "white"}, "id": "Tillandsia", "label": "Tillandsia", "shape": "dot", "title": "Tillandsia Neighbors:\u003cbr\u003eM\u00e9xico\u003cbr\u003eBromeliaceae", "value": 2}, {"font": {"color": "white"}, "id": "Bromeliaceae", "label": "Bromeliaceae", "shape": "dot", "title": "Bromeliaceae Neighbors:\u003cbr\u003eTillandsia\u003cbr\u003eM\u00e9xico", "value": 2}, {"font": {"color": "white"}, "id": "Cultura", "label": "Cultura", "shape": "dot", "title": "Cultura Neighbors:\u003cbr\u003eTurismo\u003cbr\u003eEducaci\u00f3n\u003cbr\u003eHistoria\u003cbr\u003eidentidad\u003cbr\u003ePatrimonio\u003cbr\u003eIdentidad", "value": 6}, {"font": {"color": "white"}, "id": "Identidad", "label": "Identidad", "shape": "dot", "title": "Identidad Neighbors:\u003cbr\u003eInterculturalidad\u003cbr\u003ePatrimonio cultural\u003cbr\u003eMemoria\u003cbr\u003eCultura\u003cbr\u003eHistoria\u003cbr\u003ecultura", "value": 6}, {"font": {"color": "white"}, "id": "globalizaci\u00f3n", "label": "globalizaci\u00f3n", "shape": "dot", "title": "globalizaci\u00f3n Neighbors:\u003cbr\u003eidentidad\u003cbr\u003eidentidad cultural", "value": 2}, {"font": {"color": "white"}, "id": "naci\u00f3n", "label": "naci\u00f3n", "shape": "dot", "title": "naci\u00f3n Neighbors:\u003cbr\u003eEstado", "value": 1}, {"font": {"color": "white"}, "id": "Estado", "label": "Estado", "shape": "dot", "title": "Estado Neighbors:\u003cbr\u003enaci\u00f3n\u003cbr\u003eidentidad", "value": 2}, {"font": {"color": "white"}, "id": "naturaleza", "label": "naturaleza", "shape": "dot", "title": "naturaleza Neighbors:\u003cbr\u003eHistoria ambiental\u003cbr\u003ecultura", "value": 2}, {"font": {"color": "white"}, "id": "Turismo", "label": "Turismo", "shape": "dot", "title": "Turismo Neighbors:\u003cbr\u003ePatrimonio cultural\u003cbr\u003ePaisaje\u003cbr\u003eCultura\u003cbr\u003ePatrimonio\u003cbr\u003epaisaje", "value": 5}, {"font": {"color": "white"}, "id": "Patrimonio cultural", "label": "Patrimonio cultural", "shape": "dot", "title": "Patrimonio cultural Neighbors:\u003cbr\u003eTurismo\u003cbr\u003eIdentidad", "value": 2}, {"font": {"color": "white"}, "id": "Yucat\u00e1n", "label": "Yucat\u00e1n", "shape": "dot", "title": "Yucat\u00e1n Neighbors:\u003cbr\u003eM\u00e9xico\u003cbr\u003emayas", "value": 2}, {"font": {"color": "white"}, "id": "mayas", "label": "mayas", "shape": "dot", "title": "mayas Neighbors:\u003cbr\u003eYucat\u00e1n", "value": 1}, {"font": {"color": "white"}, "id": "sociales y culturales", "label": "sociales y culturales", "shape": "dot", "title": "sociales y culturales Neighbors:\u003cbr\u003ederechos econ\u00f3micos", "value": 1}, {"font": {"color": "white"}, "id": "derechos econ\u00f3micos", "label": "derechos econ\u00f3micos", "shape": "dot", "title": "derechos econ\u00f3micos Neighbors:\u003cbr\u003esociales y culturales", "value": 1}, {"font": {"color": "white"}, "id": "educaci\u00f3n", "label": "educaci\u00f3n", "shape": "dot", "title": "educaci\u00f3n Neighbors:\u003cbr\u003einterculturalidad\u003cbr\u003eidentidad\u003cbr\u003emulticulturalismo\u003cbr\u003ecultura", "value": 4}, {"font": {"color": "white"}, "id": "interculturalidad", "label": "interculturalidad", "shape": "dot", "title": "interculturalidad Neighbors:\u003cbr\u003eind\u00edgenas\u003cbr\u003eEducaci\u00f3n\u003cbr\u003epueblos ind\u00edgenas\u003cbr\u003ecultura\u003cbr\u003eidentidad\u003cbr\u003eeducaci\u00f3n", "value": 6}, {"font": {"color": "white"}, "id": "Educaci\u00f3n", "label": "Educaci\u00f3n", "shape": "dot", "title": "Educaci\u00f3n Neighbors:\u003cbr\u003einterculturalidad\u003cbr\u003ecultura\u003cbr\u003eCultura", "value": 3}, {"font": {"color": "white"}, "id": "M\u00e9xico", "label": "M\u00e9xico", "shape": "dot", "title": "M\u00e9xico Neighbors:\u003cbr\u003eChiapas\u003cbr\u003eindigenismo\u003cbr\u003ehistoria\u003cbr\u003eGuanajuato\u003cbr\u003econservaci\u00f3n\u003cbr\u003etabaquismo\u003cbr\u003eEducaci\u00f3n intercultural\u003cbr\u003eeducaci\u00f3n superior\u003cbr\u003ediversidad\u003cbr\u003eagricultura\u003cbr\u003eOaxaca\u003cbr\u003eYucat\u00e1n\u003cbr\u003eEstados Unidos\u003cbr\u003eidentidad\u003cbr\u003eTillandsia\u003cbr\u003epobreza\u003cbr\u003epueblos ind\u00edgenas\u003cbr\u003ec\u00e1ncer de mama\u003cbr\u003eind\u00edgenas\u003cbr\u003eBromeliaceae\u003cbr\u003epoblaci\u00f3n ind\u00edgena", "value": 21}, {"font": {"color": "white"}, "id": "ind\u00edgenas", "label": "ind\u00edgenas", "shape": "dot", "title": "ind\u00edgenas Neighbors:\u003cbr\u003einterculturalidad\u003cbr\u003eColombia\u003cbr\u003eM\u00e9xico\u003cbr\u003emigraci\u00f3n\u003cbr\u003ecultura\u003cbr\u003eidentidad", "value": 6}, {"font": {"color": "white"}, "id": "Memoria", "label": "Memoria", "shape": "dot", "title": "Memoria Neighbors:\u003cbr\u003eIdentidad", "value": 1}, {"font": {"color": "white"}, "id": "multiculturalismo", "label": "multiculturalismo", "shape": "dot", "title": "multiculturalismo Neighbors:\u003cbr\u003eidentidad\u003cbr\u003eeducaci\u00f3n\u003cbr\u003eetnicidad\u003cbr\u003eliberalismo", "value": 4}, {"font": {"color": "white"}, "id": "patrimonio", "label": "patrimonio", "shape": "dot", "title": "patrimonio Neighbors:\u003cbr\u003ePaisaje\u003cbr\u003eidentidad\u003cbr\u003epaisaje\u003cbr\u003ecultura", "value": 4}, {"font": {"color": "white"}, "id": "Paisaje", "label": "Paisaje", "shape": "dot", "title": "Paisaje Neighbors:\u003cbr\u003epatrimonio\u003cbr\u003eTurismo", "value": 2}, {"font": {"color": "white"}, "id": "historiograf\u00eda", "label": "historiograf\u00eda", "shape": "dot", "title": "historiograf\u00eda Neighbors:\u003cbr\u003ehistoria cultural", "value": 1}, {"font": {"color": "white"}, "id": "historia cultural", "label": "historia cultural", "shape": "dot", "title": "historia cultural Neighbors:\u003cbr\u003ehistoriograf\u00eda", "value": 1}, {"font": {"color": "white"}, "id": "Ense\u00f1anza", "label": "Ense\u00f1anza", "shape": "dot", "title": "Ense\u00f1anza Neighbors:\u003cbr\u003eaprendizaje", "value": 1}, {"font": {"color": "white"}, "id": "Chile", "label": "Chile", "shape": "dot", "title": "Chile Neighbors:\u003cbr\u003eArquitectura\u003cbr\u003eMapuche", "value": 2}, {"font": {"color": "white"}, "id": "Mapuche", "label": "Mapuche", "shape": "dot", "title": "Mapuche Neighbors:\u003cbr\u003eChile", "value": 1}, {"font": {"color": "white"}, "id": "educaci\u00f3n superior", "label": "educaci\u00f3n superior", "shape": "dot", "title": "educaci\u00f3n superior Neighbors:\u003cbr\u003eaprendizaje\u003cbr\u003eInterculturalidad\u003cbr\u003eeducaci\u00f3n intercultural\u003cbr\u003eM\u00e9xico", "value": 4}, {"font": {"color": "white"}, "id": "Interculturalidad", "label": "Interculturalidad", "shape": "dot", "title": "Interculturalidad Neighbors:\u003cbr\u003eeducaci\u00f3n superior\u003cbr\u003eIdentidad\u003cbr\u003eeducaci\u00f3n intercultural", "value": 3}, {"font": {"color": "white"}, "id": "Patrimonio", "label": "Patrimonio", "shape": "dot", "title": "Patrimonio Neighbors:\u003cbr\u003eTurismo\u003cbr\u003eCultura", "value": 2}, {"font": {"color": "white"}, "id": "recolectores", "label": "recolectores", "shape": "dot", "title": "recolectores Neighbors:\u003cbr\u003eCazadores\u003cbr\u003ecazadores", "value": 2}, {"font": {"color": "white"}, "id": "cazadores", "label": "cazadores", "shape": "dot", "title": "cazadores Neighbors:\u003cbr\u003erecolectores", "value": 1}, {"font": {"color": "white"}, "id": "Colombia", "label": "Colombia", "shape": "dot", "title": "Colombia Neighbors:\u003cbr\u003eind\u00edgenas\u003cbr\u003eAntioquia", "value": 2}, {"font": {"color": "white"}, "id": "turismo", "label": "turismo", "shape": "dot", "title": "turismo Neighbors:\u003cbr\u003epaisaje\u003cbr\u003epatrimonio cultural", "value": 2}, {"font": {"color": "white"}, "id": "patrimonio cultural", "label": "patrimonio cultural", "shape": "dot", "title": "patrimonio cultural Neighbors:\u003cbr\u003eturismo\u003cbr\u003econservaci\u00f3n", "value": 2}, {"font": {"color": "white"}, "id": "Salud", "label": "Salud", "shape": "dot", "title": "Salud Neighbors:\u003cbr\u003eEspiritualidad", "value": 1}, {"font": {"color": "white"}, "id": "pueblos ind\u00edgenas", "label": "pueblos ind\u00edgenas", "shape": "dot", "title": "pueblos ind\u00edgenas Neighbors:\u003cbr\u003einterculturalidad\u003cbr\u003ederechos humanos\u003cbr\u003eAmazon\u00eda\u003cbr\u003eM\u00e9xico", "value": 4}, {"font": {"color": "white"}, "id": "Antioquia", "label": "Antioquia", "shape": "dot", "title": "Antioquia Neighbors:\u003cbr\u003eColombia", "value": 1}, {"font": {"color": "white"}, "id": "Chiapas", "label": "Chiapas", "shape": "dot", "title": "Chiapas Neighbors:\u003cbr\u003eM\u00e9xico", "value": 1}, {"font": {"color": "white"}, "id": "espiritualidad", "label": "espiritualidad", "shape": "dot", "title": "espiritualidad Neighbors:\u003cbr\u003ereligi\u00f3n\u003cbr\u003ereligiosidad", "value": 2}, {"font": {"color": "white"}, "id": "religiosidad", "label": "religiosidad", "shape": "dot", "title": "religiosidad Neighbors:\u003cbr\u003eespiritualidad", "value": 1}, {"font": {"color": "white"}, "id": "conservaci\u00f3n", "label": "conservaci\u00f3n", "shape": "dot", "title": "conservaci\u00f3n Neighbors:\u003cbr\u003epatrimonio cultural\u003cbr\u003eM\u00e9xico", "value": 2}, {"font": {"color": "white"}, "id": "tabaquismo", "label": "tabaquismo", "shape": "dot", "title": "tabaquismo Neighbors:\u003cbr\u003eM\u00e9xico", "value": 1}, {"font": {"color": "white"}, "id": "derechos humanos", "label": "derechos humanos", "shape": "dot", "title": "derechos humanos Neighbors:\u003cbr\u003epueblos ind\u00edgenas\u003cbr\u003eg\u00e9nero\u003cbr\u003ejusticia", "value": 3}, {"font": {"color": "white"}, "id": "Brasil", "label": "Brasil", "shape": "dot", "title": "Brasil Neighbors:\u003cbr\u003eArgentina", "value": 1}, {"font": {"color": "white"}, "id": "Argentina", "label": "Argentina", "shape": "dot", "title": "Argentina Neighbors:\u003cbr\u003eBrasil\u003cbr\u003eUruguay", "value": 2}, {"font": {"color": "white"}, "id": "Estados Unidos", "label": "Estados Unidos", "shape": "dot", "title": "Estados Unidos Neighbors:\u003cbr\u003eM\u00e9xico", "value": 1}, {"font": {"color": "white"}, "id": "poblaci\u00f3n ind\u00edgena", "label": "poblaci\u00f3n ind\u00edgena", "shape": "dot", "title": "poblaci\u00f3n ind\u00edgena Neighbors:\u003cbr\u003eeducaci\u00f3n intercultural\u003cbr\u003eM\u00e9xico", "value": 2}, {"font": {"color": "white"}, "id": "alteridad", "label": "alteridad", "shape": "dot", "title": "alteridad Neighbors:\u003cbr\u003eidentidad", "value": 1}, {"font": {"color": "white"}, "id": "etnicidad", "label": "etnicidad", "shape": "dot", "title": "etnicidad Neighbors:\u003cbr\u003emulticulturalismo\u003cbr\u003eidentidad", "value": 2}, {"font": {"color": "white"}, "id": "pol\u00edtica", "label": "pol\u00edtica", "shape": "dot", "title": "pol\u00edtica Neighbors:\u003cbr\u003ecultura", "value": 1}, {"font": {"color": "white"}, "id": "Oaxaca", "label": "Oaxaca", "shape": "dot", "title": "Oaxaca Neighbors:\u003cbr\u003eM\u00e9xico", "value": 1}, {"font": {"color": "white"}, "id": "migraci\u00f3n", "label": "migraci\u00f3n", "shape": "dot", "title": "migraci\u00f3n Neighbors:\u003cbr\u003eidentidad\u003cbr\u003eind\u00edgenas\u003cbr\u003eg\u00e9nero", "value": 3}, {"font": {"color": "white"}, "id": "Educaci\u00f3n intercultural", "label": "Educaci\u00f3n intercultural", "shape": "dot", "title": "Educaci\u00f3n intercultural Neighbors:\u003cbr\u003eFormaci\u00f3n del profesorado\u003cbr\u003eM\u00e9xico", "value": 2}, {"font": {"color": "white"}, "id": "religi\u00f3n", "label": "religi\u00f3n", "shape": "dot", "title": "religi\u00f3n Neighbors:\u003cbr\u003eespiritualidad\u003cbr\u003eEspiritualidad", "value": 2}, {"font": {"color": "white"}, "id": "identidad cultural", "label": "identidad cultural", "shape": "dot", "title": "identidad cultural Neighbors:\u003cbr\u003ecultura\u003cbr\u003eglobalizaci\u00f3n", "value": 2}, {"font": {"color": "white"}, "id": "HISTORIA", "label": "HISTORIA", "shape": "dot", "title": "HISTORIA Neighbors:\u003cbr\u003eCOSTA RICA", "value": 1}, {"font": {"color": "white"}, "id": "COSTA RICA", "label": "COSTA RICA", "shape": "dot", "title": "COSTA RICA Neighbors:\u003cbr\u003eHISTORIA", "value": 1}, {"font": {"color": "white"}, "id": "Formaci\u00f3n del profesorado", "label": "Formaci\u00f3n del profesorado", "shape": "dot", "title": "Formaci\u00f3n del profesorado Neighbors:\u003cbr\u003eEducaci\u00f3n intercultural", "value": 1}, {"font": {"color": "white"}, "id": "diversidad", "label": "diversidad", "shape": "dot", "title": "diversidad Neighbors:\u003cbr\u003eidentidad\u003cbr\u003eM\u00e9xico", "value": 2}, {"font": {"color": "white"}, "id": "mam\u00edferos", "label": "mam\u00edferos", "shape": "dot", "title": "mam\u00edferos Neighbors:\u003cbr\u003edistribuci\u00f3n", "value": 1}, {"font": {"color": "white"}, "id": "distribuci\u00f3n", "label": "distribuci\u00f3n", "shape": "dot", "title": "distribuci\u00f3n Neighbors:\u003cbr\u003emam\u00edferos", "value": 1}, {"font": {"color": "white"}, "id": "vulnerabilidad", "label": "vulnerabilidad", "shape": "dot", "title": "vulnerabilidad Neighbors:\u003cbr\u003eriesgo", "value": 1}, {"font": {"color": "white"}, "id": "riesgo", "label": "riesgo", "shape": "dot", "title": "riesgo Neighbors:\u003cbr\u003evulnerabilidad", "value": 1}, {"font": {"color": "white"}, "id": "pobreza", "label": "pobreza", "shape": "dot", "title": "pobreza Neighbors:\u003cbr\u003eg\u00e9nero\u003cbr\u003eUruguay\u003cbr\u003ebienestar\u003cbr\u003eM\u00e9xico", "value": 4}, {"font": {"color": "white"}, "id": "bienestar", "label": "bienestar", "shape": "dot", "title": "bienestar Neighbors:\u003cbr\u003epobreza", "value": 1}, {"font": {"color": "white"}, "id": "g\u00e9nero", "label": "g\u00e9nero", "shape": "dot", "title": "g\u00e9nero Neighbors:\u003cbr\u003emigraci\u00f3n\u003cbr\u003ederechos humanos\u003cbr\u003epobreza", "value": 3}, {"font": {"color": "white"}, "id": "c\u00e1ncer de mama", "label": "c\u00e1ncer de mama", "shape": "dot", "title": "c\u00e1ncer de mama Neighbors:\u003cbr\u003eM\u00e9xico", "value": 1}, {"font": {"color": "white"}, "id": "infantil", "label": "infantil", "shape": "dot", "title": "infantil Neighbors:\u003cbr\u003eSalud materno", "value": 1}, {"font": {"color": "white"}, "id": "Salud materno", "label": "Salud materno", "shape": "dot", "title": "Salud materno Neighbors:\u003cbr\u003einfantil", "value": 1}, {"font": {"color": "white"}, "id": "agricultura", "label": "agricultura", "shape": "dot", "title": "agricultura Neighbors:\u003cbr\u003eM\u00e9xico", "value": 1}, {"font": {"color": "white"}, "id": "Per\u00fa", "label": "Per\u00fa", "shape": "dot", "title": "Per\u00fa Neighbors:\u003cbr\u003eAndes\u003cbr\u003eAmazon\u00eda", "value": 2}, {"font": {"color": "white"}, "id": "Amazon\u00eda", "label": "Amazon\u00eda", "shape": "dot", "title": "Amazon\u00eda Neighbors:\u003cbr\u003epueblos ind\u00edgenas\u003cbr\u003ePer\u00fa", "value": 2}, {"font": {"color": "white"}, "id": "multiculturalidad", "label": "multiculturalidad", "shape": "dot", "title": "multiculturalidad Neighbors:\u003cbr\u003eidentidad", "value": 1}, {"font": {"color": "white"}, "id": "Andes", "label": "Andes", "shape": "dot", "title": "Andes Neighbors:\u003cbr\u003ePer\u00fa", "value": 1}, {"font": {"color": "white"}, "id": "Teor\u00eda hist\u00f3rico", "label": "Teor\u00eda hist\u00f3rico", "shape": "dot", "title": "Teor\u00eda hist\u00f3rico Neighbors:\u003cbr\u003ecultural", "value": 1}, {"font": {"color": "white"}, "id": "indigenismo", "label": "indigenismo", "shape": "dot", "title": "indigenismo Neighbors:\u003cbr\u003eM\u00e9xico", "value": 1}, {"font": {"color": "white"}, "id": "modernidad", "label": "modernidad", "shape": "dot", "title": "modernidad Neighbors:\u003cbr\u003eposmodernidad\u003cbr\u003etradici\u00f3n", "value": 2}, {"font": {"color": "white"}, "id": "tradici\u00f3n", "label": "tradici\u00f3n", "shape": "dot", "title": "tradici\u00f3n Neighbors:\u003cbr\u003emodernidad", "value": 1}, {"font": {"color": "white"}, "id": "ritual", "label": "ritual", "shape": "dot", "title": "ritual Neighbors:\u003cbr\u003eidentidad", "value": 1}, {"font": {"color": "white"}, "id": "Guanajuato", "label": "Guanajuato", "shape": "dot", "title": "Guanajuato Neighbors:\u003cbr\u003eM\u00e9xico", "value": 1}, {"font": {"color": "white"}, "id": "autonom\u00eda", "label": "autonom\u00eda", "shape": "dot", "title": "autonom\u00eda Neighbors:\u003cbr\u003edignidad", "value": 1}, {"font": {"color": "white"}, "id": "dignidad", "label": "dignidad", "shape": "dot", "title": "dignidad Neighbors:\u003cbr\u003eautonom\u00eda", "value": 1}, {"font": {"color": "white"}, "id": "comunicaci\u00f3n", "label": "comunicaci\u00f3n", "shape": "dot", "title": "comunicaci\u00f3n Neighbors:\u003cbr\u003ecultura", "value": 1}, {"font": {"color": "white"}, "id": "arqueolog\u00eda", "label": "arqueolog\u00eda", "shape": "dot", "title": "arqueolog\u00eda Neighbors:\u003cbr\u003epaisaje", "value": 1}, {"font": {"color": "white"}, "id": "diversidad cultural", "label": "diversidad cultural", "shape": "dot", "title": "diversidad cultural Neighbors:\u003cbr\u003eidentidad\u003cbr\u003eeducaci\u00f3n intercultural", "value": 2}, {"font": {"color": "white"}, "id": "educaci\u00f3n intercultural", "label": "educaci\u00f3n intercultural", "shape": "dot", "title": "educaci\u00f3n intercultural Neighbors:\u003cbr\u003eInterculturalidad\u003cbr\u003eeducaci\u00f3n superior\u003cbr\u003ediversidad cultural\u003cbr\u003eeducaci\u00f3n ind\u00edgena\u003cbr\u003epoblaci\u00f3n ind\u00edgena\u003cbr\u003eidentidad", "value": 6}, {"font": {"color": "white"}, "id": "Arquitectura", "label": "Arquitectura", "shape": "dot", "title": "Arquitectura Neighbors:\u003cbr\u003eChile", "value": 1}, {"font": {"color": "white"}, "id": "Palabras clave descriptores", "label": "Palabras clave descriptores", "shape": "dot", "title": "Palabras clave descriptores Neighbors:\u003cbr\u003ePalabras clave", "value": 1}, {"font": {"color": "white"}, "id": "Palabras clave", "label": "Palabras clave", "shape": "dot", "title": "Palabras clave Neighbors:\u003cbr\u003ePalabras clave descriptores", "value": 1}, {"font": {"color": "white"}, "id": "liberalismo", "label": "liberalismo", "shape": "dot", "title": "liberalismo Neighbors:\u003cbr\u003emulticulturalismo", "value": 1}, {"font": {"color": "white"}, "id": "Historia ambiental", "label": "Historia ambiental", "shape": "dot", "title": "Historia ambiental Neighbors:\u003cbr\u003enaturaleza", "value": 1}, {"font": {"color": "white"}, "id": "justicia", "label": "justicia", "shape": "dot", "title": "justicia Neighbors:\u003cbr\u003ederechos humanos", "value": 1}, {"font": {"color": "white"}, "id": "democracia", "label": "democracia", "shape": "dot", "title": "democracia Neighbors:\u003cbr\u003ederechos", "value": 1}, {"font": {"color": "white"}, "id": "derechos", "label": "derechos", "shape": "dot", "title": "derechos Neighbors:\u003cbr\u003edemocracia", "value": 1}, {"font": {"color": "white"}, "id": "Uruguay", "label": "Uruguay", "shape": "dot", "title": "Uruguay Neighbors:\u003cbr\u003eArgentina\u003cbr\u003epobreza", "value": 2}, {"font": {"color": "white"}, "id": "Historia", "label": "Historia", "shape": "dot", "title": "Historia Neighbors:\u003cbr\u003eIdentidad\u003cbr\u003eCultura", "value": 2}, {"font": {"color": "white"}, "id": "mito", "label": "mito", "shape": "dot", "title": "mito Neighbors:\u003cbr\u003eidentidad", "value": 1}, {"font": {"color": "white"}, "id": "posmodernidad", "label": "posmodernidad", "shape": "dot", "title": "posmodernidad Neighbors:\u003cbr\u003emodernidad", "value": 1}, {"font": {"color": "white"}, "id": "etnograf\u00eda", "label": "etnograf\u00eda", "shape": "dot", "title": "etnograf\u00eda Neighbors:\u003cbr\u003eidentidad", "value": 1}, {"font": {"color": "white"}, "id": "educaci\u00f3n ind\u00edgena", "label": "educaci\u00f3n ind\u00edgena", "shape": "dot", "title": "educaci\u00f3n ind\u00edgena Neighbors:\u003cbr\u003eeducaci\u00f3n intercultural", "value": 1}, {"font": {"color": "white"}, "id": "desarrollo", "label": "desarrollo", "shape": "dot", "title": "desarrollo Neighbors:\u003cbr\u003ecultura", "value": 1}, {"font": {"color": "white"}, "id": "Tenerife", "label": "Tenerife", "shape": "dot", "title": "Tenerife Neighbors:\u003cbr\u003eIslas Canarias", "value": 1}, {"font": {"color": "white"}, "id": "colonialismo", "label": "colonialismo", "shape": "dot", "title": "colonialismo Neighbors:\u003cbr\u003eidentidad", "value": 1}, {"font": {"color": "white"}, "id": "Cazadores", "label": "Cazadores", "shape": "dot", "title": "Cazadores Neighbors:\u003cbr\u003erecolectores", "value": 1}]);
      edges = new vis.DataSet([{"from": "cultura", "to": "identidad", "value": 62}, {"from": "aprendizaje", "to": "ense\u00f1anza", "value": 42}, {"from": "Espiritualidad", "to": "Religi\u00f3n", "value": 37}, {"from": "Cultural", "to": "Psicolog\u00eda Hist\u00f3rico", "value": 22}, {"from": "Enfermer\u00eda", "to": "Espiritualidad", "value": 19}, {"from": "cultural", "to": "psicolog\u00eda hist\u00f3rico", "value": 18}, {"from": "identidad", "to": "historia", "value": 17}, {"from": "Espa\u00f1a", "to": "Lepidoptera", "value": 17}, {"from": "Costa Rica", "to": "Isla del Coco", "value": 17}, {"from": "paisaje", "to": "territorio", "value": 16}, {"from": "historia", "to": "cultura", "value": 16}, {"from": "cultural", "to": "Psicolog\u00eda hist\u00f3rico", "value": 16}, {"from": "Islas Canarias", "to": "Espa\u00f1a", "value": 15}, {"from": "acci\u00f3n", "to": "investigaci\u00f3n", "value": 15}, {"from": "memoria", "to": "historia", "value": 15}, {"from": "Tillandsia", "to": "Bromeliaceae", "value": 15}, {"from": "Cultura", "to": "Identidad", "value": 14}, {"from": "identidad", "to": "globalizaci\u00f3n", "value": 14}, {"from": "naci\u00f3n", "to": "Estado", "value": 14}, {"from": "cultura", "to": "naturaleza", "value": 14}, {"from": "Turismo", "to": "Patrimonio cultural", "value": 13}, {"from": "Yucat\u00e1n", "to": "mayas", "value": 13}, {"from": "sociales y culturales", "to": "derechos econ\u00f3micos", "value": 13}, {"from": "cultura", "to": "educaci\u00f3n", "value": 12}, {"from": "cultura", "to": "territorio", "value": 12}, {"from": "interculturalidad", "to": "educaci\u00f3n", "value": 12}, {"from": "identidad", "to": "territorio", "value": 12}, {"from": "identidad", "to": "interculturalidad", "value": 12}, {"from": "interculturalidad", "to": "Educaci\u00f3n", "value": 12}, {"from": "M\u00e9xico", "to": "Bromeliaceae", "value": 12}, {"from": "Islas Canarias", "to": "Lepidoptera", "value": 12}, {"from": "M\u00e9xico", "to": "ind\u00edgenas", "value": 11}, {"from": "Identidad", "to": "Memoria", "value": 11}, {"from": "multiculturalismo", "to": "identidad", "value": 11}, {"from": "patrimonio", "to": "identidad", "value": 10}, {"from": "Turismo", "to": "Paisaje", "value": 10}, {"from": "historiograf\u00eda", "to": "historia cultural", "value": 10}, {"from": "aprendizaje", "to": "Ense\u00f1anza", "value": 10}, {"from": "Chile", "to": "Mapuche", "value": 10}, {"from": "educaci\u00f3n superior", "to": "Interculturalidad", "value": 10}, {"from": "Patrimonio", "to": "Turismo", "value": 10}, {"from": "identidad", "to": "Cultura", "value": 10}, {"from": "recolectores", "to": "cazadores", "value": 10}, {"from": "patrimonio", "to": "cultura", "value": 9}, {"from": "ind\u00edgenas", "to": "identidad", "value": 9}, {"from": "ind\u00edgenas", "to": "Colombia", "value": 9}, {"from": "turismo", "to": "patrimonio cultural", "value": 9}, {"from": "Salud", "to": "Espiritualidad", "value": 9}, {"from": "cultura", "to": "Identidad", "value": 9}, {"from": "interculturalidad", "to": "pueblos ind\u00edgenas", "value": 9}, {"from": "Colombia", "to": "Antioquia", "value": 9}, {"from": "identidad", "to": "paisaje", "value": 9}, {"from": "identidad", "to": "memoria", "value": 9}, {"from": "Chiapas", "to": "M\u00e9xico", "value": 9}, {"from": "espiritualidad", "to": "religiosidad", "value": 9}, {"from": "M\u00e9xico", "to": "conservaci\u00f3n", "value": 9}, {"from": "Tillandsia", "to": "M\u00e9xico", "value": 9}, {"from": "cultura", "to": "interculturalidad", "value": 8}, {"from": "M\u00e9xico", "to": "tabaquismo", "value": 8}, {"from": "derechos humanos", "to": "pueblos ind\u00edgenas", "value": 8}, {"from": "Brasil", "to": "Argentina", "value": 8}, {"from": "Estados Unidos", "to": "M\u00e9xico", "value": 8}, {"from": "M\u00e9xico", "to": "poblaci\u00f3n ind\u00edgena", "value": 8}, {"from": "alteridad", "to": "identidad", "value": 8}, {"from": "M\u00e9xico", "to": "historia", "value": 8}, {"from": "multiculturalismo", "to": "etnicidad", "value": 8}, {"from": "cultura", "to": "pol\u00edtica", "value": 8}, {"from": "M\u00e9xico", "to": "Oaxaca", "value": 8}, {"from": "ind\u00edgenas", "to": "migraci\u00f3n", "value": 8}, {"from": "M\u00e9xico", "to": "pueblos ind\u00edgenas", "value": 8}, {"from": "identidad", "to": "educaci\u00f3n", "value": 8}, {"from": "Identidad", "to": "Interculturalidad", "value": 8}, {"from": "M\u00e9xico", "to": "Educaci\u00f3n intercultural", "value": 8}, {"from": "M\u00e9xico", "to": "educaci\u00f3n superior", "value": 8}, {"from": "religi\u00f3n", "to": "Espiritualidad", "value": 8}, {"from": "identidad cultural", "to": "globalizaci\u00f3n", "value": 8}, {"from": "historia", "to": "Costa Rica", "value": 8}, {"from": "HISTORIA", "to": "COSTA RICA", "value": 8}, {"from": "Cultura", "to": "Patrimonio", "value": 8}, {"from": "Educaci\u00f3n intercultural", "to": "Formaci\u00f3n del profesorado", "value": 8}, {"from": "religi\u00f3n", "to": "espiritualidad", "value": 8}, {"from": "M\u00e9xico", "to": "diversidad", "value": 8}, {"from": "mam\u00edferos", "to": "distribuci\u00f3n", "value": 8}, {"from": "vulnerabilidad", "to": "riesgo", "value": 7}, {"from": "pobreza", "to": "bienestar", "value": 7}, {"from": "etnicidad", "to": "identidad", "value": 7}, {"from": "cultura", "to": "memoria", "value": 7}, {"from": "derechos humanos", "to": "g\u00e9nero", "value": 7}, {"from": "M\u00e9xico", "to": "pobreza", "value": 7}, {"from": "M\u00e9xico", "to": "c\u00e1ncer de mama", "value": 7}, {"from": "infantil", "to": "Salud materno", "value": 7}, {"from": "Educaci\u00f3n", "to": "Cultura", "value": 7}, {"from": "Identidad", "to": "Patrimonio cultural", "value": 7}, {"from": "M\u00e9xico", "to": "agricultura", "value": 7}, {"from": "patrimonio", "to": "paisaje", "value": 7}, {"from": "Per\u00fa", "to": "Amazon\u00eda", "value": 7}, {"from": "multiculturalidad", "to": "identidad", "value": 7}, {"from": "Per\u00fa", "to": "Andes", "value": 7}, {"from": "cultural", "to": "Teor\u00eda hist\u00f3rico", "value": 7}, {"from": "M\u00e9xico", "to": "indigenismo", "value": 7}, {"from": "modernidad", "to": "tradici\u00f3n", "value": 7}, {"from": "multiculturalismo", "to": "educaci\u00f3n", "value": 7}, {"from": "ritual", "to": "identidad", "value": 7}, {"from": "educaci\u00f3n superior", "to": "aprendizaje", "value": 7}, {"from": "Guanajuato", "to": "M\u00e9xico", "value": 7}, {"from": "autonom\u00eda", "to": "dignidad", "value": 7}, {"from": "diversidad", "to": "identidad", "value": 7}, {"from": "interculturalidad", "to": "ind\u00edgenas", "value": 7}, {"from": "comunicaci\u00f3n", "to": "cultura", "value": 7}, {"from": "cultura", "to": "Educaci\u00f3n", "value": 7}, {"from": "migraci\u00f3n", "to": "identidad", "value": 7}, {"from": "paisaje", "to": "arqueolog\u00eda", "value": 7}, {"from": "paisaje", "to": "Turismo", "value": 7}, {"from": "identidad", "to": "diversidad cultural", "value": 7}, {"from": "educaci\u00f3n intercultural", "to": "Interculturalidad", "value": 7}, {"from": "patrimonio cultural", "to": "conservaci\u00f3n", "value": 7}, {"from": "Chile", "to": "Arquitectura", "value": 7}, {"from": "Palabras clave descriptores", "to": "Palabras clave", "value": 7}, {"from": "multiculturalismo", "to": "liberalismo", "value": 6}, {"from": "naturaleza", "to": "Historia ambiental", "value": 6}, {"from": "justicia", "to": "derechos humanos", "value": 6}, {"from": "diversidad cultural", "to": "educaci\u00f3n intercultural", "value": 6}, {"from": "democracia", "to": "derechos", "value": 6}, {"from": "Uruguay", "to": "Argentina", "value": 6}, {"from": "pobreza", "to": "g\u00e9nero", "value": 6}, {"from": "g\u00e9nero", "to": "migraci\u00f3n", "value": 6}, {"from": "cultura", "to": "ind\u00edgenas", "value": 6}, {"from": "Turismo", "to": "Cultura", "value": 6}, {"from": "identidad", "to": "M\u00e9xico", "value": 6}, {"from": "Cultura", "to": "Historia", "value": 6}, {"from": "paisaje", "to": "turismo", "value": 6}, {"from": "pueblos ind\u00edgenas", "to": "Amazon\u00eda", "value": 6}, {"from": "identidad cultural", "to": "cultura", "value": 6}, {"from": "Enfermer\u00eda", "to": "Religi\u00f3n", "value": 6}, {"from": "identidad", "to": "mito", "value": 6}, {"from": "posmodernidad", "to": "modernidad", "value": 6}, {"from": "identidad", "to": "Estado", "value": 6}, {"from": "etnograf\u00eda", "to": "identidad", "value": 6}, {"from": "educaci\u00f3n ind\u00edgena", "to": "educaci\u00f3n intercultural", "value": 6}, {"from": "educaci\u00f3n intercultural", "to": "identidad", "value": 6}, {"from": "poblaci\u00f3n ind\u00edgena", "to": "educaci\u00f3n intercultural", "value": 6}, {"from": "patrimonio", "to": "Paisaje", "value": 6}, {"from": "educaci\u00f3n superior", "to": "educaci\u00f3n intercultural", "value": 6}, {"from": "desarrollo", "to": "cultura", "value": 6}, {"from": "Uruguay", "to": "pobreza", "value": 6}, {"from": "Historia", "to": "Identidad", "value": 6}, {"from": "M\u00e9xico", "to": "Yucat\u00e1n", "value": 6}, {"from": "Islas Canarias", "to": "Tenerife", "value": 6}, {"from": "colonialismo", "to": "identidad", "value": 6}, {"from": "recolectores", "to": "Cazadores", "value": 6}]);

      // adding nodes and edges to the graph
      data = {nodes: nodes, edges: edges};

      var options = {
  "configure": {
      "enabled": false
  },
  "edges": {
      "color": {
          "inherit": true
      },
      "smooth": {
          "enabled": false,
          "type": "continuous"
      }
  },
  "interaction": {
      "dragNodes": true,
      "hideEdgesOnDrag": false,
      "hideNodesOnDrag": false
  },
  "physics": {
      "enabled": true,
      "forceAtlas2Based": {
          "avoidOverlap": 0,
          "centralGravity": 0.01,
          "damping": 0.4,
          "gravitationalConstant": -50,
          "springConstant": 0.08,
          "springLength": 100
      },
      "solver": "forceAtlas2Based",
      "stabilization": {
          "enabled": true,
          "fit": true,
          "iterations": 1000,
          "onlyDynamicEdges": false,
          "updateInterval": 50
      }
  }
};
      
      

      

      network = new vis.Network(container, data, options);

      


      
      network.on("stabilizationProgress", function(params) {
            document.getElementById('loadingBar').removeAttribute("style");
          var maxWidth = 496;
          var minWidth = 20;
          var widthFactor = params.iterations/params.total;
          var width = Math.max(minWidth,maxWidth * widthFactor);

          document.getElementById('bar').style.width = width + 'px';
          document.getElementById('text').innerHTML = Math.round(widthFactor*100) + '%';
      });
      network.once("stabilizationIterationsDone", function() {
          document.getElementById('text').innerHTML = '100%';
          document.getElementById('bar').style.width = '496px';
          document.getElementById('loadingBar').style.opacity = 0;
          // really clean the dom element
          setTimeout(function () {document.getElementById('loadingBar').style.display = 'none';}, 500);
      });
      

      return network;

  }

  drawGraph();

  network.on("click", function (params) {
          console.log('prueba');
          document.getElementById("datosArticulo").innerHTML = "";
          document.getElementById("contenedorArticulos").style.display = "block";
          params.event = "[original event]";
          console.log(params.nodes)
          document.getElementById("datosArticulo").innerHTML = "Articulos para " + params.nodes;
          $.ajax({
              url: `http://portal.amelica.org/BackEndAmelic/articulos/palClave?p="${params.nodes}"&page=1`, 
              success: function(result){
                console.log('datos de articulos home', result);
                var articulosConcepto = result.articulos.articulos;
                console.log(articulosConcepto);
                console.log(Object.keys(articulosConcepto).length);
                tamano = Object.keys(articulosConcepto).length;
                for (let index = 0; index < tamano; index++) {
                    const element = articulosConcepto[index];
                    // console.log(index);
                    // console.log(element.id);
                    // console.log(element.contenido);
                    // console.log(element.tituloArt);
                    var item = document.createElement('a');
                    item.setAttribute("href", 'https://redalyc.org/articulo.oa?id=' + element.claveArt);
                    item.setAttribute("target", "_blank");
                    item.innerHTML = '<div class="tituloArt"><span class="text-link">' + element.tituloArt + '</span><br><span class="text-revista">' + element.nombreRevista + ', ' + element.anio + ',' + element.numero + '(' + element.volumen + ')</span></div>';
                    document.getElementById('datosArticulo').appendChild(item);
                }
                // document.getElementById('tituloArticulos').innerText = 'ARTICLES RELATED TO ' + params.nodes;
          }});
        
      });
