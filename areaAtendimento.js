areaAtendmento = (function(){
  var configuracao = {}
  var map = {}
  var userMarker = false

  const config = {
    apiKey: 'AIzaSyA51Mh3I2Rg5MxdiFoffUoq-aTmJysesI8',
    authDomain: 'areaatendimento-d3739.firebaseapp.com',
    databaseURL: 'https://areaatendimento-d3739.firebaseio.com',
    projectId: 'areaatendimento-d3739',
    storageBucket: '',
    messagingSenderId: '903879280896'
  } 
  let fire = firebase.initializeApp(config)
  let db = firebase.firestore(fire)

  function getConfig(idusuario, idconfiguracao){
    
    let fireConfiguracao = db
      .collection(window.config.idusuario)
      .doc('area-atendimento')
      .collection('configuracoes')
      .doc(window.config.idconfiguracao)


    fireConfiguracao
      .onSnapshot(function(doc) {
        configuracao = doc.data()
        console.log({configuracao})
        if(true) {
          initMap(configuracao)
        }
      })
  }

  function initMap(configuracao) {
    let input = document.createElement('input')
    let div = document.createElement('div')
    let element = document.getElementById(configuracao.idDiv)
    let el = element.parentNode
    input.setAttribute('id','searchLocation')
    div.innerHTML = 'Caso seu endereco nao esteja correto, pesquise o endereco correto aqui: '
    el.appendChild(div)
    el.appendChild(input)

    initializeGMaps(configuracao, input)
  }

  function initializeGMaps(configuracao, input) {
    let el = document.getElementById(configuracao.idDiv)
    el.style.width = configuracao.mapWidth
    el.style.height = configuracao.mapHeight
    map = new google.maps.Map(el, {
      center: configuracao.pontoAtendimento,
      zoom: 13
    });

    if (configuracao.mostrarRegiaoAtendimento) {
        var regiaoAtendimento = new google.maps.Polygon({
          paths: configuracao.points,
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35
        });
        regiaoAtendimento.setMap(map);
    }

    if (configuracao.mostrarPontoAtendimento) {
        let marker = new google.maps.Marker({
          position: configuracao.pontoAtendimento,
          map: map,
          title: configuracao.descricaO
        });
    }


    getUserLocation(map)
    initInput(map, input)
  }

  function initInput (map, input) {
    let autocomplete = new google.maps.places.Autocomplete(input)
   
    autocomplete.addListener('place_changed', function(){
      let places = autocomplete.getPlace()

      if (places.length === 0) {
       return
      }
      
      let latlng = {
        lat: places.geometry.location.lat(),
        lng: places.geometry.location.lng()
      }

      getUserLocation(map, latlng)

    })
  }


  function getUserLocation (map, pos) {
      if (userMarker) {
        userMarker.setMap(null)
      }

      let icon = {
        url: 'https://raw.githubusercontent.com/brunocroh/area-atendimento/master/if_Map_-_Location_Solid_Style_28_2216337.png',
        scaledSize: new google.maps.Size(50,50)
      }
      if(!pos) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            pos = { lat: position.coords.latitude, lng: position.coords.longitude }
            console.log({ pos })

            userMarker = new google.maps.Marker({
              position: pos,
              map: map,
              icon: icon 
            });

            map.panTo(pos)
            return
          })
        }
      } else {
        userMarker = new google.maps.Marker({
          position: pos,
          map: map,
          icon: icon 
        });

        map.panTo(pos)
      }


  }

  getConfig()

})();
