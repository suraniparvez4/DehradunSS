////$(function () {
////    $('#AdvanceSearch').click(function () {
////        if (!$('#iframe').length) {
////            $('#iframeHolder').css("display", "block");
////            $('#iframeHolder').html('<div style="margin-left:10%;margin-right:30%;z-index: 3;position: absolute;text-align: center;"><div><input type="button" onClick="clso()" class="btn btn-danger" value="Close"></input></div><iframe id="iframe" src="@Url.Action("AdvanceSearch","Home")" width="700" height="450" style="z-index:10;position:absolute,align-item:center" id="IframeA"></iframe></div>');
////        }
////    });
////});
////$(function () {
////    $('#PredefineQuery').click(function () {
////        if (!$('#iframe').length) {

////            $('#iframeHolder2').html('<div style="margin-left:30%;margin-right:30%;z-index: 3;position: absolute;text-align: center;"><iframe id="iframe" src="@Url.Action("PredefineQuery", "Home")" width="700" height="450" style="z-index:10;position:absolute,align-item:center"></iframe></div>');
////        }
////    });
////});
document.getElementById("AdBlink").addEventListener("click", function () {
    alert("Hii");
}, false);

function clso() {
    $('#iframeHolder').css("display", "none");
}
function updateBox(obj) {
    var index = obj.parentNode.parentNode.rowIndex;
    document.getElementById("tbody").deleteRow(index);
}

var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

var view = new ol.View({
    center: ol.proj.fromLonLat([78.0322, 30.3165]),
    zoom: 11
})

var overlay = new ol.Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250,
    },
});

closer.onclick = function () {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
};

var map = new ol.Map({
    target: 'map',
    layers: [
        //new ol.layer.Tile({
        //    source: new ol.source.OSM()
        //})
    ],
    overlays: [overlay],
    view: view
});
var zoomslider = new ol.control.ZoomSlider();
map.addControl(zoomslider);






if (window.location.hash !== '') {
    // try to restore center, zoom-level and rotation from the URL
    var hash = window.location.hash.replace('#map=', '');
    var parts = hash.split('/');
    if (parts.length === 4) {
        zoom = parseFloat(parts[0]);
        center = [parseFloat(parts[1]), parseFloat(parts[2])];
        rotation = parseFloat(parts[3]);
    }
}
var shouldUpdate = true;
var view = map.getView();
var updatePermalink = function () {
    if (!shouldUpdate) {
        // do not update the URL when the view was changed in the 'popstate' handler
        shouldUpdate = true;
        return;
    }

    var center = view.getCenter();
    var hash =
        '#map=' +
        view.getZoom().toFixed(2) +
        '/' +
        center[0].toFixed(2) +
        '/' +
        center[1].toFixed(2) +
        '/' +
        view.getRotation();
    var state = {
        zoom: view.getZoom(),
        center: view.getCenter(),
        rotation: view.getRotation(),
    };
    window.history.pushState(state, 'map', hash);
};

map.on('moveend', updatePermalink);


window.addEventListener('popstate', function (event) {
    if (event.state === null) {
        return;
    }
    map.getView().setCenter(event.state.center);
    map.getView().setZoom(event.state.zoom);
    map.getView().setRotation(event.state.rotation);
    shouldUpdate = false;
});
var basemap = new ol.layer.Tile({
    source: new ol.source.OSM()
})
map.addLayer(basemap)


var satmap = new ol.layer.Tile({
    source: new ol.source.XYZ({
        attributionsCollapsible: false,
        url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        maxZoom: 25
    })
})
var ArrLayer = [];
//Main Dehradun
var MainDist = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun14/wms',
    params: { 'LAYERS': 'Dehradun14:dist' },
    serverType: 'geoserver'
})
var MainDistLayer = new ol.layer.Tile({
    source: MainDist
})
map.addLayer(MainDistLayer);
MainDistLayer.setZIndex(50);
MainDistLayer.setOpacity(0.5);


var StateGovBuildSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun35/wms',
    params: { 'LAYERS': 'Dehradun35:state government office' },
    serverType: 'geoserver'
});

var StateGovBuildLayer = new ol.layer.Tile({
    source: StateGovBuildSource
});
StateGovBuildLayer.setZIndex(51);

var CentralBuildSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun11/wms',
    params: { 'LAYERS': 'Dehradun11:central government buildings' },
    serverType: 'geoserver'
})
var CentralBuildLayer = new ol.layer.Tile({
    source: CentralBuildSource
})
CentralBuildLayer.setZIndex(51);

var DrainageNetSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun15/wms',
    params: { 'LAYERS': 'Dehradun15:drainagenetwork' },
    serverType: 'geoserver'
})
var DrainageNetLayer = new ol.layer.Tile({
    source: DrainageNetSource
})
DrainageNetLayer.setZIndex(51);

var STWCatchmenetBoundSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun37/wms',
    params: { 'LAYERS': 'Dehradun37:stwcatchmentboundry' },
    serverType: 'geoserver'
})
var STWCatchmenetBoundLayer = new ol.layer.Tile({
    source: STWCatchmenetBoundSource
})
STWCatchmenetBoundLayer.setZIndex(51);

var STWPointSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun38/wms',
    params: { 'LAYERS': 'Dehradun38:stwpoint' },
    serverType: 'geoserver'
})
var STWPointLayer = new ol.layer.Tile({
    source: STWPointSource
})
STWPointLayer.setZIndex(51);

var FarmHouseSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun16/wms',
    params: { 'LAYERS': 'Dehradun16:farmhouse' },
    serverType: 'geoserver'
})
var FarmHouseLayer = new ol.layer.Tile({
    source: FarmHouseSource
})
FarmHouseLayer.setZIndex(51);

var ForestSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun18/wms',
    params: { 'LAYERS': 'Dehradun18:forest' },
    serverType: 'geoserver'
})
var ForestLayer = new ol.layer.Tile({
    source: ForestSource
})
ForestLayer.setZIndex(51);

var GreenAreaSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun19/wms',
    params: { 'LAYERS': 'Dehradun19:greenareas' },
    serverType: 'geoserver'
})
var GreenAreaLayer = new ol.layer.Tile({
    source: GreenAreaSource
})
GreenAreaLayer.setZIndex(51);

var AgriSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun4/wms',
    params: { 'LAYERS': 'Dehradun4:agriculture' },
    serverType: 'geoserver'
})
var AgriLayer = new ol.layer.Tile({
    source: AgriSource
})
AgriLayer.setZIndex(51);

var ParkingSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun25/wms',
    params: { 'LAYERS': 'Dehradun25:parking' },
    serverType: 'geoserver',

})
var ParkingLayer = new ol.layer.Tile({
    source: ParkingSource
})
ParkingLayer.setZIndex(51);

var PetrolPumpSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun26/wms',
    params: { 'LAYERS': 'Dehradun26:petrolpump' },
    serverType: 'geoserver'
})
var PetrolPumpLayer = new ol.layer.Tile({
    source: PetrolPumpSource
})
PetrolPumpLayer.setZIndex(51);

var BridgeAndFlyoverSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun9/wms',
    params: { 'LAYERS': 'Dehradun9:bridgesandflyover' },
    serverType: 'geoserver'
})
var BridgeAndFlyoverLayer = new ol.layer.Tile({
    source: BridgeAndFlyoverSource
})
BridgeAndFlyoverLayer.setZIndex(51);

var TrafficIslandSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun42/wms',
    params: { 'LAYERS': 'Dehradun42:trafficisland' },
    serverType: 'geoserver'
})
var TrafficIslandLayer = new ol.layer.Tile({
    source: TrafficIslandSource
})
TrafficIslandLayer.setZIndex(51);

var TrafficJuncSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun43/wms',
    params: { 'LAYERS': 'Dehradun43:trafficjunction' },
    serverType: 'geoserver'
})
var TrafficJuncLayer = new ol.layer.Tile({
    source: TrafficJuncSource
})
TrafficJuncLayer.setZIndex(51);

var BusDepotSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun10/wms',
    params: { 'LAYERS': 'Dehradun10:busdepot' },
    serverType: 'geoserver'
})
var BusDepotLayer = new ol.layer.Tile({
    source: BusDepotSource
})
BusDepotLayer.setZIndex(51);
var BanksSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun7/wms',
    params: { 'LAYERS': 'Dehradun7:banks' },
    serverType: 'geoserver'
})
var BanksLayer = new ol.layer.Tile({
    source: BanksSource
})
BanksLayer.setZIndex(51);

var PostOffSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun28/wms',
    params: { 'LAYERS': 'Dehradun28:postoffice' },
    serverType: 'geoserver'
})
var PostOffLayer = new ol.layer.Tile({
    source: PostOffSource
})
PostOffLayer.setZIndex(51);

var ATMSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun6/wms',
    params: { 'LAYERS': 'Dehradun6:atms' },
    serverType: 'geoserver'
})
var ATMLayer = new ol.layer.Tile({
    source: ATMSource
})
ATMLayer.setZIndex(51);

var WaterOverheadTankSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun46/wms',
    params: { 'LAYERS': 'Dehradun46:wateroverheadtank' },
    serverType: 'geoserver'
})
var WaterOverheadTankLayer = new ol.layer.Tile({
    source: WaterOverheadTankSource
})
WaterOverheadTankLayer.setZIndex(51);

var WaterTreatmentSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun50/wms',
    params: { 'LAYERS': 'Dehradun50:watertreatmentplant' },
    serverType: 'geoserver'
})
var WaterTreatmentLayer = new ol.layer.Tile({
    source: WaterTreatmentSource
})
WaterTreatmentLayer.setZIndex(51);

var waterLandmarkSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun47/wms',
    params: { 'LAYERS': 'Dehradun47:wateroverheadtanklandmark' },
    serverType: 'geoserver'
})
var waterLandmarkLayer = new ol.layer.Tile({
    source: waterLandmarkSource
})
waterLandmarkLayer.setZIndex(51);

var waterpipSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun48/wms',
    params: { 'LAYERS': 'Dehradun48:waterpipline' },
    serverType: 'geoserver'
})
var WaterPipline = new ol.layer.Tile({
    source: waterpipSource
})
WaterPipline.setZIndex(51);

var WaterSupPointSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun49/wms',
    params: { 'LAYERS': 'Dehradun49:watersupplypoint' },
    serverType: 'geoserver'
})
var WaterSupPointLayer = new ol.layer.Tile({
    source: WaterSupPointSource
})
WaterSupPointLayer.setZIndex(51);

var WaterTubeWellSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun51/wms',
    params: { 'LAYERS': 'Dehradun51:watertubewell' },
    serverType: 'geoserver'
})
var WaterTubeWellLayer = new ol.layer.Tile({
    source: WaterTubeWellSource
})
WaterTubeWellLayer.setZIndex(51);

var StreetLightSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun36/wms',
    params: { 'LAYERS': 'Dehradun36:streetlight' },
    serverType: 'geoserver'
})
var StreetLightLayer = new ol.layer.Tile({
    source: StreetLightSource
})
StreetLightLayer.setZIndex(51);

var CommToiletSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun13/wms',
    params: { 'LAYERS': 'Dehradun13:communitytoilet' },
    serverType: 'geoserver'
})
var CommToiletLayer = new ol.layer.Tile({
    source: CommToiletSource
})
CommToiletLayer.setZIndex(51);

var PubToiletSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun30/wms',
    params: { 'LAYERS': 'Dehradun30:publictoilets' },
    serverType: 'geoserver'
})
var PubToiletLayer = new ol.layer.Tile({
    source: PubToiletSource
})
PubToiletLayer.setZIndex(51);

var RailwayLineSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun31/wms',
    params: { 'LAYERS': 'Dehradun31:raillines' },
    serverType: 'geoserver'
})
var RailwayLineLayer = new ol.layer.Tile({
    source: RailwayLineSource
})
RailwayLineLayer.setZIndex(51);

var RailStatSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun32/wms',
    params: { 'LAYERS': 'Dehradun32:railstation' },
    serverType: 'geoserver'
})
var RailStatLayer = new ol.layer.Tile({
    source: RailStatSource
})
RailStatLayer.setZIndex(51);

var FireStatSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun17/wms',
    params: { 'LAYERS': 'Dehradun17:firestation' },
    serverType: 'geoserver'
})
var FireStatLayer = new ol.layer.Tile({
    source: FireStatSource
})
FireStatLayer.setZIndex(51);

var PrimarySource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun29/wms',
    params: { 'LAYERS': 'Dehradun29:primaryschool' },
    serverType: 'geoserver'
})
var PrimaryLayer = new ol.layer.Tile({
    source: PrimarySource
})
PrimaryLayer.setZIndex(51);

var SWMContSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun40/wms',
    params: { 'LAYERS': 'Dehradun40:swm container' },
    serverType: 'geoserver'
})
var SWMContainer = new ol.layer.Tile({
    source: SWMContSource
})
SWMContainer.setZIndex(51);

var SWMTransferSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun41/wms',
    params: { 'LAYERS': 'Dehradun41:swm transfer station' },
    serverType: 'geoserver'
})
var SWMTransferLayer = new ol.layer.Tile({
    source: SWMTransferSource
})
SWMTransferLayer.setZIndex(51);

var bloodbankSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun8/wms',
    params: { 'LAYERS': 'Dehradun8:bloodbank' },
    serverType: 'geoserver'
})
var bloodbankLayer = new ol.layer.Tile({
    source: bloodbankSource
})
bloodbankLayer.setZIndex(51);

var HomeopathicSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun20/wms',
    params: { 'LAYERS': 'Dehradun20:homeopathic' },
    serverType: 'geoserver'
})
var Homeopathic = new ol.layer.Tile({
    source: HomeopathicSource
})
Homeopathic.setZIndex(51);

var MedicalStoreSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun23/wms',
    params: { 'LAYERS': 'Dehradun23:medicalstore' },
    serverType: 'geoserver'
})
var MedicalStoreLayer = new ol.layer.Tile({
    source: MedicalStoreSource
})
MedicalStoreLayer.setZIndex(51);
var ClinicSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun12/wms',
    params: { 'LAYERS': 'Dehradun12:clinics' },
    serverType: 'geoserver'
})
var ClinicLayer = new ol.layer.Tile({
    source: ClinicSource
})
ClinicLayer.setZIndex(51);

var SurgicalSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun39/wms',
    params: { 'LAYERS': 'Dehradun39:surgicalshop' },
    serverType: 'geoserver'
})
var SurgicalLayer = new ol.layer.Tile({
    source: SurgicalSource
})
SurgicalLayer.setZIndex(51);

var VetClinicSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun45/wms',
    params: { 'LAYERS': 'Dehradun45:veterinary' },
    serverType: 'geoserver'
})
var VetClinicLayer = new ol.layer.Tile({
    source: VetClinicSource
})
VetClinicLayer.setZIndex(51);

var HospitalSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun21/wms',
    params: { 'LAYERS': 'Dehradun21:hospitals' },
    serverType: 'geoserver'
})
var HospitalLayer = new ol.layer.Tile({
    source: HospitalSource
})
HospitalLayer.setZIndex(51);

var ABDAreaSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun5/wms',
    params: { 'LAYERS': 'Dehradun5:areabaseddevlopment' },
    serverType: 'geoserver'
})
var ABDAreaLayer = new ol.layer.Tile({
    source: ABDAreaSource
})
ABDAreaLayer.setZIndex(51);

var ABDWardBoundSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun3/wms',
    params: { 'LAYERS': 'Dehradun3:abdwardboundry' },
    serverType: 'geoserver'
})
var ABDWardBound = new ol.layer.Tile({
    source: ABDWardBoundSource
})
ABDWardBound.setZIndex(51);

var ABDConnDrainSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun/wms',
    params: { 'LAYERS': 'Dehradun:abdconnectivitydrain' },
    serverType: 'geoserver'
})
var ABDConnDrain = new ol.layer.Tile({
    source: ABDConnDrainSource
})

var ABDGreenBuildingSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun1/wms',
    params: { 'LAYERS': 'Dehradun1:abdgreenbuilding' },
    serverType: 'geoserver'
})
var ABDGreenBuilding = new ol.layer.Tile({
    source: ABDGreenBuildingSource
})
ABDGreenBuilding.setZIndex(51);

var ABDMddaParkSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun2/wms',
    params: { 'LAYERS': 'Dehradun2:abdmddapark' },
    serverType: 'geoserver'
})
var ABDMddaPark = new ol.layer.Tile({
    source: ABDMddaParkSource
})
ABDMddaPark.setZIndex(51);

var IsolationwardSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun22/wms',
    params: { 'LAYERS': 'Dehradun22:isolationward' },
    serverType: 'geoserver'
})
var Isolationward = new ol.layer.Tile({
    source: IsolationwardSource
})
Isolationward.setZIndex(51);

var OtherEduSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun24/wms',
    params: { 'LAYERS': 'Dehradun24:othereducation' },
    serverType: 'geoserver'
})
var OtherEduLayer = new ol.layer.Tile({
    source: OtherEduSource
})
OtherEduLayer.setZIndex(51);

var SCADATubewellSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun44/wms',
    params: { 'LAYERS': 'Dehradun44:tubewell' },
    serverType: 'geoserver'
})
var SCADATubewell = new ol.layer.Tile({
    source: SCADATubewellSource
})
SCADATubewell.setZIndex(51);

var SCADAReservoirSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/Dehradun33/wms',
    params: { 'LAYERS': 'Dehradun33:reservoir' },
    serverType: 'geoserver'
})
var SCADAReservoir = new ol.layer.Tile({
    source: SCADAReservoirSource
})
SCADAReservoir.setZIndex(51);



var banksforlandmark = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/DehradunBank/wms',
    params: { 'LAYERS': 'DehradunBank:bankforlandmark' },
    serverType: 'geoserver'
})
var bankforlandmarklayer = new ol.layer.Tile({
    source: banksforlandmark
})


//Add Layer Function

document.getElementById('basemap').addEventListener('click', function () {
    if (document.getElementById('basemap').checked == true) {
        map.addLayer(basemap);
        return false;
    } else {
        map.removeLayer(basemap);
        return false;
    }
},
    false
);

document.getElementById('satmap').addEventListener(
    'click',
    function () {
        if (document.getElementById('satmap').checked == true) {
            map.addLayer(satmap);
            return false;
        } else {
            map.removeLayer(satmap);
            return false;
        }
    },
    false
);

document.getElementById('uncheck').addEventListener(
    'click',
    function () {
        if (document.getElementById('uncheck').checked == true) {
            map.addLayer(MainDistLayer);
            return false;
        } else {
            map.removeLayer(MainDistLayer);
            return false;
        }
    },
    false
);


//ADMIN BOUND
document.getElementById('boundmun').addEventListener(
    'click',
    function () {
        if (document.getElementById('boundmun').checked == true) {
            map.addLayer(MainDistLayer);
            return false;
        } else {
            map.removeLayer(MainDistLayer);
            return false;
        }
    },
    false
);
//Building
var i = 0;
document.getElementById('stategovbuild').addEventListener(
    'click',
    function () {
        if (document.getElementById('stategovbuild').checked == true) {
            map.addLayer(StateGovBuildLayer);
            ArrLayer.push(StateGovBuildSource);
            return false;
        } else {
            map.removeLayer(StateGovBuildLayer);
            return false;
        }
    },
    false
);



document.getElementById('centgovbuild').addEventListener(
    'click',
    function () {
        if (document.getElementById('centgovbuild').checked == true) {
            map.addLayer(CentralBuildLayer);
            ArrLayer.push(CentralBuildSource);
            return false;
        } else {
            map.removeLayer(CentralBuildLayer);
            return false;
        }
    },
    false
);

//Storm Water
document.getElementById('drainage').addEventListener(
    'click',
    function () {
        if (document.getElementById('drainage').checked == true) {
            map.addLayer(DrainageNetLayer);
            ArrLayer.push(DrainageNetSource);
            return false;
        } else {
            map.removeLayer(DrainageNetLayer);
            return false;
        }
    },
    false
);
document.getElementById('stwCatchmentbound').addEventListener(
    'click',
    function () {
        if (document.getElementById('stwCatchmentbound').checked == true) {
            map.addLayer(STWCatchmenetBoundLayer);
            ArrLayer.push(STWCatchmenetBoundSource);
            return false;
        } else {
            map.removeLayer(STWCatchmenetBoundLayer);
            return false;
        }
    },
    false
);

document.getElementById('stwpoint').addEventListener('click', function () {
    if (document.getElementById('stwpoint').checked == true) {
        map.addLayer(STWPointLayer);
        ArrLayer.push(STWPointSource);
        return false;
    } else {
        map.removeLayer(STWPointLayer);
        return false;
    }
},
    false
);

document.getElementById('farmhouse').addEventListener('click', function () {
    if (document.getElementById('farmhouse').checked == true) {
        map.addLayer(FarmHouseLayer);
        ArrLayer.push(FarmHouseSource);
        return false;
    } else {
        map.removeLayer(FarmHouseLayer);
        return false;
    }
},
    false
);
document.getElementById('forest').addEventListener(
    'click',
    function () {
        if (document.getElementById('forest').checked == true) {
            map.addLayer(ForestLayer);
            ArrLayer.push(ForestSource);
            return false;
        } else {
            map.removeLayer(ForestLayer);
            return false;
        }
    },
    false
);
document.getElementById('greenarea').addEventListener(
    'click',
    function () {
        if (document.getElementById('greenarea').checked == true) {
            map.addLayer(GreenAreaLayer);
            ArrLayer.push(GreenAreaSource);
            return false;
        } else {
            map.removeLayer(GreenAreaLayer);
            return false;
        }
    },
    false
);

document.getElementById('agric').addEventListener(
    'click',
    function () {
        if (document.getElementById('agric').checked == true) {
            map.addLayer(AgriLayer);
            ArrLayer.push(AgriSource);
            return false;
        } else {
            map.removeLayer(AgriLayer);
            return false;
        }
    },
    false
);
//ROAD
document.getElementById('parking').addEventListener(
    'click',
    function () {
        if (document.getElementById('parking').checked == true) {
            map.addLayer(ParkingLayer);
            ArrLayer.push(ParkingSource)
            return false;
        } else {
            map.removeLayer(ParkingLayer);
            return false;
        }
    },
    false
);
document.getElementById('petrolpump').addEventListener(
    'click',
    function () {
        if (document.getElementById('petrolpump').checked == true) {
            map.addLayer(PetrolPumpLayer);
            ArrLayer.push(PetrolPumpSource);
            return false;
        } else {
            map.removeLayer(PetrolPumpLayer);
            return false;
        }
    },
    false
);
document.getElementById('bridge').addEventListener(
    'click',
    function () {
        if (document.getElementById('bridge').checked == true) {
            map.addLayer(BridgeAndFlyoverLayer);
            ArrLayer.push(BridgeAndFlyoverSource);
            return false;
        } else {
            map.removeLayer(BridgeAndFlyoverLayer);
            return false;
        }
    },
    false
);
document.getElementById('trafficisland').addEventListener(
    'click',
    function () {
        if (document.getElementById('trafficisland').checked == true) {
            map.addLayer(TrafficIslandLayer);
            ArrLayer.push(TrafficIslandSource);
            return false;
        } else {
            map.removeLayer(TrafficIslandLayer);
            return false;
        }
    },
    false
);
document.getElementById('trafficjunc').addEventListener(
    'click',
    function () {
        if (document.getElementById('trafficjunc').checked == true) {
            map.addLayer(TrafficJuncLayer);
            ArrLayer.push(TrafficJuncSource)
            return false;
        } else {
            map.removeLayer(TrafficJuncLayer);
            return false;
        }
    },
    false
);
document.getElementById('busdepots').addEventListener(
    'click',
    function () {
        if (document.getElementById('busdepots').checked == true) {
            map.addLayer(BusDepotLayer);
            ArrLayer.push(BusDepotSource);
            return false;
        } else {
            map.removeLayer(BusDepotLayer);
            return false;
        }
    },
    false
);
document.getElementById('banks').addEventListener(
    'click',
    function () {
        if (document.getElementById('banks').checked == true) {
            map.addLayer(BanksLayer);
            ArrLayer.push(BanksSource);
            return false;
        } else {
            map.removeLayer(BanksLayer);
            return false;
        }
    },
    false
);
document.getElementById('postoff').addEventListener(
    'click',
    function () {
        if (document.getElementById('postoff').checked == true) {
            map.addLayer(PostOffLayer);
            ArrLayer.push(PostOffSource);
            return false;
        } else {
            map.removeLayer(PostOffLayer);
            return false;
        }
    },
    false
);
document.getElementById('atms').addEventListener(
    'click',
    function () {
        if (document.getElementById('atms').checked == true) {
            map.addLayer(ATMLayer);
            ArrLayer.push(ATMSource);
            return false;
        } else {
            map.removeLayer(ATMLayer);
            return false;
        }
    },
    false
);
document.getElementById('wateroverhead').addEventListener(
    'click',
    function () {
        if (document.getElementById('wateroverhead').checked == true) {
            map.addLayer(WaterOverheadTankLayer);
            ArrLayer.push(WaterOverheadTankSource);
            return false;
        } else {
            map.removeLayer(WaterOverheadTankLayer);
            return false;
        }
    },
    false
);
document.getElementById('watertreatment').addEventListener(
    'click',
    function () {
        if (document.getElementById('watertreatment').checked == true) {
            map.addLayer(WaterTreatmentLayer);
            ArrLayer.push(WaterTreatmentSource);
            return false;
        } else {
            map.removeLayer(WaterTreatmentLayer);
            return false;
        }
    },
    false
);
document.getElementById('landmark').addEventListener(
    'click',
    function () {
        if (document.getElementById('landmark').checked == true) {
            map.addLayer(waterLandmarkLayer);
            ArrLayer.push(waterLandmarkSource);
            return false;
        } else {
            map.removeLayer(waterLandmarkLayer);
            return false;
        }
    },
    false
);
document.getElementById('waterpipline').addEventListener(
    'click',
    function () {
        if (document.getElementById('waterpipline').checked == true) {
            map.addLayer(WaterPipline);
            ArrLayer.push(waterpipSource);
            return false;
        } else {
            map.removeLayer(WaterPipline);
            return false;
        }
    },
    false
);
document.getElementById('watersupppoint').addEventListener(
    'click',
    function () {
        if (document.getElementById('watersupppoint').checked == true) {
            map.addLayer(WaterSupPointLayer);
            ArrLayer.push(WaterSupPointSource);
            return false;
        } else {
            map.removeLayer(WaterSupPointLayer);
            return false;
        }
    },
    false
);
document.getElementById('tubewell').addEventListener(
    'click',
    function () {
        if (document.getElementById('tubewell').checked == true) {
            map.addLayer(WaterTubeWellLayer);
            ArrLayer.push(WaterTubeWellSource);
            return false;
        } else {
            map.removeLayer(WaterTubeWellLayer);
            return false;
        }
    },
    false
);
document.getElementById('streetlight').addEventListener(
    'click',
    function () {
        if (document.getElementById('streetlight').checked == true) {
            map.addLayer(StreetLightLayer);
            ArrLayer.push(StreetLightSource);
            return false;
        } else {
            map.removeLayer(StreetLightLayer);
            return false;
        }
    },
    false
);
document.getElementById('commtoilet').addEventListener(
    'click',
    function () {
        if (document.getElementById('commtoilet').checked == true) {
            map.addLayer(CommToiletLayer);
            ArrLayer.push(CommToiletSource);
            return false;
        } else {
            map.removeLayer(CommToiletLayer);
            return false;
        }
    },
    false
);
document.getElementById('pubtoilet').addEventListener(
    'click',
    function () {
        if (document.getElementById('pubtoilet').checked == true) {
            map.addLayer(PubToiletLayer);
            ArrLayer.push(PubToiletSource);
            return false;
        } else {
            map.removeLayer(PubToiletLayer);
            return false;
        }
    },
    false
);
document.getElementById("railwaystat").addEventListener('click', function () {
    if (document.getElementById('railwaystat').checked == true) {
        map.addLayer(RailStatLayer);
        ArrLayer.push(RailStatSource);
        return false;
    } else {
        map.removeLayer(RailStatLayer);
        return false;
    }
})
document.getElementById('railwayline').addEventListener(
    'click',
    function () {
        if (document.getElementById('railwayline').checked == true) {
            map.addLayer(RailwayLineLayer);
            ArrLayer.push(RailwayLineSource);
            return false;
        } else {
            map.removeLayer(RailwayLineLayer);
            return false;
        }
    },
    false
);
document.getElementById('firestat').addEventListener(
    'click',
    function () {
        if (document.getElementById('firestat').checked == true) {
            map.addLayer(FireStatLayer);
            ArrLayer.push(FireStatSource);
            return false;
        } else {
            map.removeLayer(FireStatLayer);
            return false;
        }
    },
    false
);
document.getElementById('primary').addEventListener(
    'click',
    function () {
        if (document.getElementById('primary').checked == true) {
            map.addLayer(PrimaryLayer);
            ArrLayer.push(PrimarySource);
            return false;
        } else {
            map.removeLayer(PrimaryLayer);
            return false;
        }
    },
    false
);
document.getElementById('SWMContainer').addEventListener(
    'click',
    function () {
        if (document.getElementById('SWMContainer').checked == true) {
            map.addLayer(SWMContainer);
            ArrLayer.push(SWMContSource);
            return false;
        } else {
            map.removeLayer(SWMContainer);
            return false;
        }
    },
    false
);
document.getElementById('SWMTransferStation').addEventListener(
    'click',
    function () {
        if (document.getElementById('SWMTransferStation').checked == true) {
            map.addLayer(SWMTransferLayer);
            ArrLayer.push(SWMTransferSource);
            return false;
        } else {
            map.removeLayer(SWMTransferLayer);
            return false;
        }
    },
    false
);
document.getElementById('bloodbank').addEventListener(
    'click',
    function () {
        if (document.getElementById('bloodbank').checked == true) {
            map.addLayer(bloodbankLayer);
            ArrLayer.push(bloodbankSource);
            return false;
        } else {
            map.removeLayer(bloodbankLayer);
            return false;
        }
    },
    false
);
document.getElementById('Homeopathic').addEventListener(
    'click',
    function () {
        if (document.getElementById('Homeopathic').checked == true) {
            map.addLayer(Homeopathic);
            ArrLayer.push(HomeopathicSource);
            return false;
        } else {
            map.removeLayer(Homeopathic);
            return false;
        }
    },
    false
);
document.getElementById('MedicalStore').addEventListener(
    'click',
    function () {
        if (document.getElementById('MedicalStore').checked == true) {
            map.addLayer(MedicalStoreLayer);
            ArrLayer.push(MedicalStoreSource);
            return false;
        } else {
            map.removeLayer(MedicalStoreLayer);
            return false;
        }
    },
    false
);
document.getElementById('Clinic').addEventListener(
    'click',
    function () {
        if (document.getElementById('Clinic').checked == true) {
            map.addLayer(ClinicLayer);
            ArrLayer.push(ClinicSource);
            return false;
        } else {
            map.removeLayer(ClinicLayer);
            return false;
        }
    },
    false
);
document.getElementById('surgshop').addEventListener(
    'click',
    function () {
        if (document.getElementById('surgshop').checked == true) {
            map.addLayer(SurgicalLayer);
            ArrLayer.push(SurgicalSource);
            return false;
        } else {
            map.removeLayer(SurgicalLayer);
            return false;
        }
    },
    false
);
document.getElementById('vetclin').addEventListener(
    'click',
    function () {
        if (document.getElementById('vetclin').checked == true) {
            map.addLayer(VetClinicLayer);
            ArrLayer.push(VetClinicSource);
            return false;
        } else {
            map.removeLayer(VetClinicLayer);
            return false;
        }
    },
    false
);
document.getElementById('Hospital').addEventListener(
    'click',
    function () {
        if (document.getElementById('Hospital').checked == true) {
            map.addLayer(HospitalLayer);
            ArrLayer.push(HospitalSource);
            return false;
        } else {
            map.removeLayer(HospitalLayer);
            return false;
        }
    },
    false
);
document.getElementById('ABDArea').addEventListener(
    'click',
    function () {
        if (document.getElementById('ABDArea').checked == true) {
            map.addLayer(ABDAreaLayer);
            ArrLayer.push(ABDAreaSource);
            return false;
        } else {
            map.removeLayer(ABDAreaLayer);
            return false;
        }
    },
    false
);
document.getElementById('ABDWardBound').addEventListener(
    'click',
    function () {
        if (document.getElementById('ABDWardBound').checked == true) {
            map.addLayer(ABDWardBound);
            ArrLayer.push(ABDWardBoundSource);
            return false;
        } else {
            map.removeLayer(ABDWardBound);
            return false;
        }
    },
    false
);
document.getElementById('ABDConnDrain').addEventListener(
    'click',
    function () {
        if (document.getElementById('ABDConnDrain').checked == true) {
            map.addLayer(ABDConnDrain);
            ArrLayer.push(ABDConnDrainSource);
            return false;
        } else {
            map.removeLayer(ABDConnDrain);
            return false;
        }
    },
    false
);
document.getElementById('ABDGreenBuilding').addEventListener(
    'click',
    function () {
        if (document.getElementById('ABDGreenBuilding').checked == true) {
            map.addLayer(ABDGreenBuilding);
            ArrLayer.push(ABDGreenBuildingSource);
            return false;
        } else {
            map.removeLayer(ABDGreenBuilding);
            return false;
        }
    },
    false
);
document.getElementById('ABDMddaPark').addEventListener(
    'click',
    function () {
        if (document.getElementById('ABDMddaPark').checked == true) {
            map.addLayer(ABDMddaPark);
            ArrLayer.push(ABDMddaParkSource);
            return false;
        } else {
            map.removeLayer(ABDMddaPark);
            return false;
        }
    },
    false
);
document.getElementById('islotaionward').addEventListener(
    'click',
    function () {
        if (document.getElementById('islotaionward').checked == true) {
            map.addLayer(Isolationward);
            ArrLayer.push(IsolationwardSource);
            return false;
        } else {
            map.removeLayer(Isolationward);
            return false;
        }
    },
    false
);
document.getElementById('OEducation').addEventListener(
    'click',
    function () {
        if (document.getElementById('OEducation').checked == true) {
            map.addLayer(OtherEduLayer);
            ArrLayer.push(OtherEduSource);
            return false;
        } else {
            map.removeLayer(OtherEduLayer);
            return false;
        }
    },
    false
);
document.getElementById('STubewell').addEventListener(
    'click',
    function () {
        if (document.getElementById('STubewell').checked == true) {
            map.addLayer(SCADATubewell);
            ArrLayer.push(SCADATubewellSource);
            return false;
        } else {
            map.removeLayer(SCADATubewell);
            return false;
        }
    },
    false
);
document.getElementById('Reservoir').addEventListener(
    'click',
    function () {
        if (document.getElementById('Reservoir').checked == true) {
            map.addLayer(SCADAReservoir);
            ArrLayer.push(SCADAReservoirSource);
            return false;
        } else {
            map.removeLayer(SCADAReservoir);
            return false;
        }
    },
    false
);
map.on('pointermove', function (e) {
    var Coord = ol.proj.toLonLat(e.coordinate);
    document.getElementById("ShowCoordinatesDetails").innerHTML = "| X : " + Coord[0].toPrecision(6) + "    Y : " + Coord[1].toPrecision(6) + " | &nbsp";
});
//Reset Layer
document.getElementById("resetlayer").addEventListener('click', function () {
    var layerArray, len, layer1;
    layerArray = map.getLayers().getArray();
    len = layerArray.length;
    while (len > 0) {
        layer1 = layerArray[len - 1];
        map.removeLayer(layer1);
        len = layerArray.length;
    }
    //map.addLayer(basemap);
    map.addLayer(MainDistLayer);
    var helper = document.getElementsByClassName("ol-overlay-container");
    for (var i = 0; i < helper.length; i++) {
        helper[i].style.display = "none";
    }
    
    document.getElementById("LayerForm").reset();
    //map.addLayer(basemap);
    // map.addLayer(distNames);
}, false)
//AllLayerOff
document.getElementById("AllLayerOff").addEventListener("click", function () {
    var layerArray, len, layer1;
    layerArray = map.getLayers().getArray();
    len = layerArray.length;
    while (len > 0) {
        layer1 = layerArray[len - 1];
        map.removeLayer(layer1);
        len = layerArray.length;
    }
});



//Navbar Function

var panID = false;
document.getElementById('PAN').addEventListener(
    'click',
    function () {
        if (panID) {
            document.getElementById("map").style.cursor = "auto";
            panID = false;
        } else {
            document.getElementById("map").style.cursor = "grab";
            panID = true;
        }
    },
    false
);
//})
document.getElementById('home').addEventListener(
    'click',
    function () {
        view.animate({
            zoom: 12
        }, {
            center: ol.proj.fromLonLat([78.0322, 30.3165]),
        })
    },
    false
);
document.getElementById('Previous').addEventListener(
    'click',
    function () {
        window.history.back(1);
    },
    false
);
document.getElementById('Next').addEventListener(
    'click',
    function () {
        window.history.go(1);
    },
    false
);
var ImgAdd = 0;
document.getElementById('Image').addEventListener('click', function () {
    if (ImgAdd == 0) {
        map.addLayer(satmap);
        ImgAdd = 1;
    } else {
        map.removeLayer(satmap);
        ImgAdd = 0;
    }
},
    false
);
//ZoomInbtn
document.getElementById("ZoomInbtn").addEventListener("click", function () {
    var zoom = view.getZoom();
    zoom++;
    view.setZoom(zoom);
});
//ZoomOutbtn
document.getElementById("ZoomOutbtn").addEventListener('click', function () {
    var zoom = view.getZoom();
    zoom--;
    view.setZoom(zoom);
})
//Clear Selection
document.getElementById("ClearSelection").addEventListener('click', function () {
    var layerArray, len, layer1;
    layerArray = map.getLayers().getArray();
    len = layerArray.length;
    while (len > 0) {
        layer1 = layerArray[len - 1];
        map.removeLayer(layer1);
        len = layerArray.length;
    }
    
    map.addLayer(MainDistLayer);
    var helper = document.getElementsByClassName("ol-overlay-container");
    for (var i = 0; i < helper.length; i++) {
        helper[i].style.display = "none";
    }

    document.getElementById("LayerForm").reset();
    map.addLayer(basemap);
})

document.getElementById('Area').addEventListener(
    'click',
    function () {
        var source = new ol.source.Vector();
        var raster = new ol.layer.Tile({
            source: new ol.source.OSM(),
        });

        //   var source = new VectorSource();

        var vector = new ol.layer.Vector({
            source: source,
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.2)',
                }),
                stroke: new ol.style.Stroke({
                    color: '#ffcc33',
                    width: 2,
                }),
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: '#ffcc33',
                    }),
                }),
            }),
        });

        /**
         * Currently drawn feature.
         * @type {import("../src/ol/Feature.js").default}
         */
        var sketch;

        /**
         * The help tooltip element.
         * @type {HTMLElement}
         */
        var helpTooltipElement;

        /**
         * Overlay to show the help messages.
         * @type {Overlay}
         */
        var helpTooltip;

        /**
         * The measure tooltip element.
         * @type {HTMLElement}
         */
        var measureTooltipElement;

        /**
         * Overlay to show the measurement.
         * @type {Overlay}
         */
        var measureTooltip;

        /**
         * Message to show when the user is drawing a polygon.
         * @type {string}
         */
        var continuePolygonMsg = 'Click to continue drawing the polygon';

        /**
         * Message to show when the user is drawing a line.
         * @type {string}
         */
        var continueLineMsg = 'Click to continue drawing the line';

        /**
         * Handle pointer move.
         * @param {import("../src/ol/MapBrowserEvent").default} evt The event.
         */
        createMeasureTooltip();
        createHelpTooltip();

        var pointerMoveHandler = function (evt) {
            if (evt.dragging) {
                return;
            }
            /** @type {string} */
            var helpMsg = 'Click to start drawing';

            if (sketch) {
                var geom = sketch.getGeometry();
                if (geom instanceof ol.geom.Polygon) {
                    helpMsg = continuePolygonMsg;
                } else if (geom instanceof ol.geom.LineString) {
                    helpMsg = continueLineMsg;
                }
            }

            helpTooltipElement.innerHTML = helpMsg;
            helpTooltip.setPosition(evt.coordinate);

            helpTooltipElement.classList.remove('hidden');
        };

        //   var map = new Map({
        //     layers: [raster, vector],
        //     target: 'map',
        //     view: new View({
        //       center: [-11000000, 4600000],
        //       zoom: 15,
        //     }),
        //   });

        map.addLayer(vector);


        map.on('pointermove', pointerMoveHandler);

        map.getViewport().addEventListener('mouseout', function () {
            helpTooltipElement.classList.add('hidden');
        });

        var typeSelect = document.getElementById('type');

        var draw; // global so we can remove it later

        /**
         * Format length output.
         * @param {LineString} line The line.
         * @return {string} The formatted length.
         */
        var formatLength = function (line) {
            var length = ol.sphere.getLength(line);
            var output;
            if (length > 100) {
                output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
            } else {
                output = Math.round(length * 100) / 100 + ' ' + 'm';
            }
            return output;
        };

        /**
         * Format area output.
         * @param {Polygon} polygon The polygon.
         * @return {string} Formatted area.
         */
        var formatArea = function (polygon) {
            var area = ol.sphere.getArea(polygon);
            var output;
            if (area > 10000) {
                output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>';
            } else {
                output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>';
            }
            return output;
        };

        function addInteraction() {
            // var type = typeSelect.value == 'area' ? 'Polygon' : 'LineString';
            draw = new ol.interaction.Draw({
                source: source,
                type: "Polygon",
                style: new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: 'rgba(255, 255, 255, 0.2)',
                    }),
                    stroke: new ol.style.Stroke({
                        color: 'rgba(0, 0, 0, 0.5)',
                        lineDash: [10, 10],
                        width: 2,
                    }),
                    image: new ol.style.Circle({
                        radius: 5,
                        stroke: new ol.style.Stroke({
                            color: 'rgba(0, 0, 0, 0.7)',
                        }),
                        fill: new ol.style.Fill({
                            color: 'rgba(255, 255, 255, 0.2)',
                        }),
                    }),
                }),
            });
            map.addInteraction(draw);


            var listener;
            draw.on('drawstart', function (evt) {
                // set sketch
                sketch = evt.feature;

                /** @type {import("../src/ol/coordinate.js").Coordinate|undefined} */
                var tooltipCoord = evt.coordinate;

                listener = sketch.getGeometry().on('change', function (evt) {
                    var geom = evt.target;
                    var output;
                    if (geom instanceof ol.geom.Polygon) {
                        output = formatArea(geom);
                        tooltipCoord = geom.getInteriorPoint().getCoordinates();
                    } else if (geom instanceof ol.geom.LineString) {
                        output = formatLength(geom);
                        tooltipCoord = geom.getLastCoordinate();
                    }
                    measureTooltipElement.innerHTML = output;
                    measureTooltip.setPosition(tooltipCoord);
                });
            });

            draw.on('drawend', function () {
                measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
                measureTooltip.setOffset([0, -7]);
                // unset sketch
                sketch = null;
                // unset tooltip so that a new one can be created
                measureTooltipElement = null;
                createMeasureTooltip();
                ol.Observable.unByKey(listener);
            });
        }

        /**
         * Creates a new help tooltip
         */
        function createHelpTooltip() {
            if (helpTooltipElement) {
                helpTooltipElement.parentNode.removeChild(helpTooltipElement);
            }
            helpTooltipElement = document.createElement('div');
            helpTooltipElement.className = 'ol-tooltip hidden';
            helpTooltip = new ol.Overlay({
                element: helpTooltipElement,
                offset: [15, 0],
                positioning: 'center-left',
            });
            map.addOverlay(helpTooltip);
        }

        /**
         * Creates a new measure tooltip
         */
        function createMeasureTooltip() {
            if (measureTooltipElement) {
                measureTooltipElement.parentNode.removeChild(measureTooltipElement);
            }
            measureTooltipElement = document.createElement('div');
            measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
            measureTooltip = new ol.Overlay({
                element: measureTooltipElement,
                offset: [0, -15],
                positioning: 'bottom-center',
            });
            map.addOverlay(measureTooltip);
        }

        /**
         * Let user change the geometry type.
         */
        //   typeSelect.onchange = function () {
        //     map.removeInteraction(draw);
        //     addInteraction();
        //   };

        addInteraction();
        map.on('dblclick', function () {
            map.removeInteraction(draw);
            //addInteraction();
            map.removeOverlay(measureTooltip);
            map.removeOverlay(helpTooltip);
        });

    },
    false
);


document.getElementById('length').addEventListener(
    'click',
    function () {


        var raster = new ol.layer.Tile({
            source: new ol.source.OSM(),
        });

        //   var source = new VectorSource();
        var source = new ol.source.Vector();
        var vector = new ol.layer.Vector({
            source: source,
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.2)',
                }),
                stroke: new ol.style.Stroke({
                    color: '#ffcc33',
                    width: 2,
                }),
                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: '#ffcc33',
                    }),
                }),
            }),
        });

        /**
         * Currently drawn feature.
         * @type {import("../src/ol/Feature.js").default}
         */
        var sketch;

        /**
         * The help tooltip element.
         * @type {HTMLElement}
         */
        var helpTooltipElement;

        /**
         * Overlay to show the help messages.
         * @type {Overlay}
         */
        var helpTooltip;

        /**
         * The measure tooltip element.
         * @type {HTMLElement}
         */
        var measureTooltipElement;

        /**
         * Overlay to show the measurement.
         * @type {Overlay}
         */
        var measureTooltip;

        /**
         * Message to show when the user is drawing a polygon.
         * @type {string}
         */
        var continuePolygonMsg = 'Click to continue drawing the polygon';

        /**
         * Message to show when the user is drawing a line.
         * @type {string}
         */
        var continueLineMsg = 'Click to continue drawing the line';

        /**
         * Handle pointer move.
         * @param {import("../src/ol/MapBrowserEvent").default} evt The event.
         */
        createMeasureTooltip();
        createHelpTooltip();

        var pointerMoveHandler = function (evt) {
            if (evt.dragging) {
                return;
            }
            /** @type {string} */
            var helpMsg = 'Click to start drawing';

            if (sketch) {
                var geom = sketch.getGeometry();
                if (geom instanceof ol.geom.Polygon) {
                    helpMsg = continuePolygonMsg;
                } else if (geom instanceof ol.geom.LineString) {
                    helpMsg = continueLineMsg;
                }
            }

            helpTooltipElement.innerHTML = helpMsg;
            helpTooltip.setPosition(evt.coordinate);

            helpTooltipElement.classList.remove('hidden');
        };

        //   var map = new Map({
        //     layers: [raster, vector],
        //     target: 'map',
        //     view: new View({
        //       center: [-11000000, 4600000],
        //       zoom: 15,
        //     }),
        //   });

        map.addLayer(vector);


        map.on('pointermove', pointerMoveHandler);

        map.getViewport().addEventListener('mouseout', function () {
            helpTooltipElement.classList.add('hidden');
        });



        var draw; // global so we can remove it later

        /**
         * Format length output.
         * @param {LineString} line The line.
         * @return {string} The formatted length.
         */
        var formatLength = function (line) {
            var length = ol.sphere.getLength(line);
            var output;
            if (length > 100) {
                output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
            } else {
                output = Math.round(length * 100) / 100 + ' ' + 'm';
            }
            return output;
        };

        /**
         * Format area output.
         * @param {Polygon} polygon The polygon.
         * @return {string} Formatted area.
         */
        var formatArea = function (polygon) {
            var area = ol.sphere.getArea(polygon);
            var output;
            if (area > 10000) {
                output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>';
            } else {
                output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>';
            }
            return output;
        };

        function addInteraction() {
            // var type = typeSelect.value == 'area' ? 'Polygon' : 'LineString';
            draw = new ol.interaction.Draw({
                source: source,
                type: "LineString",
                style: new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: 'rgba(255, 255, 255, 0.2)',
                    }),
                    stroke: new ol.style.Stroke({
                        color: 'rgba(0, 0, 0, 0.5)',
                        lineDash: [10, 10],
                        width: 2,
                    }),
                    image: new ol.style.Circle({
                        radius: 5,
                        stroke: new ol.style.Stroke({
                            color: 'rgba(0, 0, 0, 0.7)',
                        }),
                        fill: new ol.style.Fill({
                            color: 'rgba(255, 255, 255, 0.2)',
                        }),
                    }),
                }),
            });
            map.addInteraction(draw);


            var listener;
            draw.on('drawstart', function (evt) {
                // set sketch
                sketch = evt.feature;

                /** @type {import("../src/ol/coordinate.js").Coordinate|undefined} */
                var tooltipCoord = evt.coordinate;

                listener = sketch.getGeometry().on('change', function (evt) {
                    var geom = evt.target;
                    var output;
                    if (geom instanceof ol.geom.Polygon) {
                        output = formatArea(geom);
                        tooltipCoord = geom.getInteriorPoint().getCoordinates();
                    } else if (geom instanceof ol.geom.LineString) {
                        output = formatLength(geom);
                        tooltipCoord = geom.getLastCoordinate();
                    }
                    measureTooltipElement.innerHTML = output;
                    measureTooltip.setPosition(tooltipCoord);
                });
            });

            draw.on('drawend', function () {
                measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
                measureTooltip.setOffset([0, -7]);
                // unset sketch
                sketch = null;
                // unset tooltip so that a new one can be created
                measureTooltipElement = null;
                createMeasureTooltip();
                ol.Observable.unByKey(listener);
            });
        }

        /**
         * Creates a new help tooltip
         */
        function createHelpTooltip() {
            if (helpTooltipElement) {
                helpTooltipElement.parentNode.removeChild(helpTooltipElement);
            }
            helpTooltipElement = document.createElement('div');
            helpTooltipElement.className = 'ol-tooltip hidden';
            helpTooltip = new ol.Overlay({
                element: helpTooltipElement,
                offset: [15, 0],
                positioning: 'center-left',
            });
            map.addOverlay(helpTooltip);
        }

        /**
         * Creates a new measure tooltip
         */
        function createMeasureTooltip() {
            if (measureTooltipElement) {
                measureTooltipElement.parentNode.removeChild(measureTooltipElement);
            }
            measureTooltipElement = document.createElement('div');
            measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
            measureTooltip = new ol.Overlay({
                element: measureTooltipElement,
                offset: [0, -15],
                positioning: 'bottom-center',
            });
            map.addOverlay(measureTooltip);
        }

        /**
         * Let user change the geometry type.
         */
        //   typeSelect.onchange = function () {
        //     map.removeInteraction(draw);
        //     addInteraction();
        //   };

        addInteraction();
        map.on('dblclick', function () {
            map.removeInteraction(draw);
            //addInteraction();
            map.removeOverlay(measureTooltip);
            map.removeOverlay(helpTooltip);
        });

    },
    false
);

//Identify

var Idet = 0;
document.getElementById("Identify").addEventListener("click", function () {
    if (Idet == 0) {
        map.on('click', function (e) {
            Idet = 1;
            var p = new Promise((resolve, reject) => {
                var res = map.getView().getResolution();
                var coord = e.coordinate;
                var projection = map.getView().getProjection();
                var url = ArrLayer[ArrLayer.length - 1].getFeatureInfoUrl(coord, res, projection, { 'INFO_FORMAT': 'application/json' });
                if (url) {
                    $.getJSON(url, function (data) {
                        if (data.features[0]) {
                            var k = Object.keys(data.features[0].properties);
                            var v = Object.values(data.features[0].properties);
                            console.log(k);
                            console.log(v);
                            content.innerHTML = '<p>Result :</p><code>' + v + '</code>';
                            overlay.setPosition(coord);
                        }
                    })
                }
            });
        })
    } else {
        Idet = 0;
    }
})
document.getElementById("ClearAround").addEventListener("click", function () {
    document.getElementById("EmergencyServices").checked = false;
    document.getElementById("TouristAttraction").checked = false;
    document.getElementById("FunEntertainment").checked = false;
    document.getElementById("ShowHospital").innerHTML = "";
    document.getElementById("FunEnterShow").innerHTML = "";
    document.getElementById("TouristShow").innerHTML = "";
    document.getElementById("TShow").innerHTML = "";
    document.getElementById("TourShow").innerHTML = "";
    document.getElementById("FunShow").innerHTML = "";
    document.getElementById("lengtharea").value = "";
    //map.removeLayer(layer12);
    var layerArray, len, layer1;
    layerArray = map.getLayers().getArray();
    len = layerArray.length;
    while (len > 0) {
        layer1 = layerArray[len - 1];
        map.removeLayer(layer1);
        len = layerArray.length;
    }
    map.addLayer(basemap);
    map.addLayer(MainDistLayer);
}, false)

//AROUND ME API
var COORDINATE;
// console.log(check_a_point(2, 4, 6));
// console.log(check_a_point(6, 8, 6));
var layer12, length_area,abc=0;
document.getElementById("GoAroundme").addEventListener('click', function () {
    //if (document.getElementById("EmergencyServices").checked == true) {
    //alert("HI");
    //document.getElementById("dialog2").show();


    //document.getElementById("dia2Close").addEventListener("click", function () {
    //    document.getElementById("dialog2").close();
    //})
    abc = 0;
    var p = new Promise((resolve, reject) => {
        length_area = parseInt(document.getElementById("lengtharea").value);
        if (abc == 0) {
            
            map.on("click", function (e) {
                abc = 1;
            map.removeLayer(layer12);
            var resolution = map.getView().getResolution();
            var cor = e.coordinate;
            COORDINATE = ol.proj.toLonLat(cor);

            var meters2degress = function (x, y) {
                var lon = x * 180 / 20037508.34;
                var lat = Math.atan(Math.exp(y * Math.PI / 20037508.34)) * 360 / Math.PI - 90;
                return [lon, lat]
            }
            var cordinates = meters2degress(cor[0], cor[1]);
            var longitude = cordinates[0],
                latitude = cordinates[1];
            console.log(longitude + " " + latitude);
            var centerLongitudeLatitude = ol.proj.fromLonLat([longitude, latitude]);
            layer12 = new ol.layer.Vector({
                source: new ol.source.Vector({
                    projection: 'EPSG:4326',
                    features: [new ol.Feature(new ol.geom.Circle(centerLongitudeLatitude, length_area))]
                }),
                style: [
                    new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: '#333',
                            width: 2
                        }),
                        fill: new ol.style.Fill({
                            color: 'rgba(0, 0, 255, 0.1)'
                        })
                    })
                ]
            });
                map.addLayer(layer12);
                resolve();
            });
            
        }
        
        //EmergAroundme();
        //}
    });
    p.then(() => {
        if (document.getElementById("EmergencyServices").checked == true) {
            Check1();
        }
        if (document.getElementById("TouristAttraction").checked == true) {
            Check2();
        }
        if (document.getElementById("FunEntertainment").checked == true) {
            Check3();
        }
    })

    // p.then(() => TEST())

}, false);

var markerLayerEmerg, markerLayerFun, markerLayerTour;

function Check1() {
    fetch('http://localhost:8080/geoserver/DehradunHospital/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=DehradunHospital%3Adehracityhospital&maxFeatures=50&outputFormat=application%2Fjson')
        .then(function (res) {
            res.text().then(function (data) {
                // var a = COORDINATE[0];
                // var b = COORDINATE[1];
                document.getElementById("ShowHospital").innerHTML = "";
                document.getElementById("TShow").innerHTML = "";
                var data = JSON.parse(data);
                document.getElementById(data);
                //var vasteras = data.features[i].geometry.coordinates;
                document.getElementById("ShowHospital").innerHTML += "<br>  Hospitals : <br>";
                for (var i = 0; i < data.features.length; i++) {
                    console.log(arePointsNear(data.features[i].geometry.coordinates, COORDINATE, length_area))
                    if (arePointsNear(data.features[i].geometry.coordinates, COORDINATE, length_area)) {
                        console.log(data.features[i].properties.name);
                        console.log(data.features[i].geometry.coordinates);
                        markerLayerEmerg = new ol.layer.Vector({
                            source: new ol.source.Vector({
                                features: [
                                    new ol.Feature({
                                        geometry: new ol.geom.Point(ol.proj.fromLonLat([data.features[i].geometry.coordinates[0], data.features[i].geometry.coordinates[1]]))
                                    })
                                ]
                            })
                        });
                        map.addLayer(markerLayerEmerg);
                        markerLayerEmerg.setZIndex(52);
                        var zoom = 18;
                        var center = [data.features[i].geometry.coordinates[0], data.features[i].geometry.coordinates[1]];
                        var Link = "http://localhost:3000/map.html#/center/" + center[0] + "," + center[1] + "/zoom/" + zoom;
                        document.getElementById("TShow").innerHTML += "<tr><td><div style='color:black;' onclick='ZoomHosp(" + center[0] + "," + center[1] +")'>" +"->" + data.features[i].properties.name + "</div></td></tr>";
                        //document.getElementById("TShow").innerHTML += "<tr><td><li><a style='color:black;' href='" + Link + "'>" + data.features[i].properties.name + "</a></li></td></tr>";
                    }
                }
            })
        })
}
function ZoomHosp(a, b) {
    console.log(a, b);
    view.animate({
        zoom: 18
    }, {
        center: ol.proj.fromLonLat([a, b]),
    })
}

//TOURIST ATTRACTION
function Check2() {
    fetch('http://localhost:8080/geoserver/DehradunHospital/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=DehradunHospital%3Atouristforaroundme&maxFeatures=50&outputFormat=application%2Fjson')
        .then(function (res) {
            res.text().then(function (data) {
                // var a = COORDINATE[0];
                // var b = COORDINATE[1];
                document.getElementById("TourShow").innerHTML = "";
                document.getElementById("TouristShow").innerHTML = "";
                var data = JSON.parse(data);
                document.getElementById(data);
                //var vasteras = data.features[i].geometry.coordinates;
                document.getElementById("TouristShow").innerHTML += "<br>  TOURIST ENTERACTION : <br>";
                for (var i = 0; i < data.features.length; i++) {
                    console.log(arePointsNear(data.features[i].geometry.coordinates, COORDINATE, length_area))
                    if (arePointsNear(data.features[i].geometry.coordinates, COORDINATE, length_area)) {
                        console.log(data.features[i].properties.name);
                        console.log(data.features[i].geometry.coordinates);
                        markerLayerTour = new ol.layer.Vector({
                            source: new ol.source.Vector({
                                features: [
                                    new ol.Feature({
                                        geometry: new ol.geom.Point(ol.proj.fromLonLat([data.features[i].geometry.coordinates[0], data.features[i].geometry.coordinates[1]]))
                                    })
                                ]
                            })
                        });
                        map.addLayer(markerLayerTour);
                        markerLayerTour.setZIndex(52);
                        var zoom = 18;
                        var center = [data.features[i].geometry.coordinates[0], data.features[i].geometry.coordinates[1]];
                        var Link = "http://localhost:3000/map.html#/center/" + center[0] + "," + center[1] + "/zoom/" + zoom;
                        
                        document.getElementById("TourShow").innerHTML += "<tr><td><div style='color:black;' onclick='ZoomHosp(" + center[0] + "," + center[1] + ")'>" + "->" + data.features[i].properties.name + "</div></td></tr>";
                        /*document.getElementById("TourShow").innerHTML += "<tr><td><li><a style='color:black;' href='" + Link + "'>" + data.features[i].properties.name + "</a></li></td></tr>";*/
                    }
                }
            })
        })
}
//FUN & ENTERTAINMENT
function Check3() {
    fetch('http://localhost:8080/geoserver/DehradunHospital/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=DehradunHospital%3Afunandentainmentarountme&maxFeatures=50&outputFormat=application%2Fjson')
        .then(function (res) {
            res.text().then(function (data) {
                // var a = COORDINATE[0];
                // var b = COORDINATE[1];
                document.getElementById("FunShow").innerHTML = "";
                document.getElementById("FunEnterShow").innerHTML = "";
                var data = JSON.parse(data);
                document.getElementById(data);
                //var vasteras = data.features[i].geometry.coordinates;
                document.getElementById("FunEnterShow").innerHTML += "<br>  FUN & ENTERTAINMENT : <br>";
                for (var i = 0; i < data.features.length; i++) {
                    console.log(arePointsNear(data.features[i].geometry.coordinates, COORDINATE, length_area))
                    if (arePointsNear(data.features[i].geometry.coordinates, COORDINATE, length_area)) {
                        console.log(data.features[i].properties.name);
                        console.log(data.features[i].geometry.coordinates);
                        markerLayerFun = new ol.layer.Vector({
                            source: new ol.source.Vector({
                                features: [
                                    new ol.Feature({
                                        geometry: new ol.geom.Point(ol.proj.fromLonLat([data.features[i].geometry.coordinates[0], data.features[i].geometry.coordinates[1]]))
                                    })
                                ]
                            })
                        });
                        map.addLayer(markerLayerFun);
                        markerLayerFun.setZIndex(52);
                        var zoom = 18;
                        var center = [data.features[i].geometry.coordinates[0], data.features[i].geometry.coordinates[1]];
                        var Link = "http://localhost:3000/map.html#/center/" + center[0] + "," + center[1] + "/zoom/" + zoom;
                        
                    /*document.getElementById("FunShow").innerHTML += "<tr><td><li><a style='color:black;' href='" + Link + "'>" + data.features[i].properties.name + "</a></li></td></tr>";*/
                        document.getElementById("FunShow").innerHTML += "<tr><td><div style='color:black;' onclick='ZoomHosp(" + center[0] + "," + center[1] + ")'>" + "->" + data.features[i].properties.name + "</div></td></tr>";
                    }
                }
            })
        })
}

function arePointsNear(checkPoint, centerPoint, km) {
    console.log(km);
    km = km / 1000;
    var ky = 45000 / 360;
    var kx = Math.cos(Math.PI * centerPoint[1] / 180.0) * ky;
    var dx = Math.abs(centerPoint[0] - checkPoint[0]) * kx;
    var dy = Math.abs(centerPoint[1] - checkPoint[1]) * ky;
    console.log(dx, dy, dx * dx + dy * dy);
    return Math.sqrt(dx * dx + dy * dy) <= km;
}
//LANDMARK HOSPITAL
document.getElementById("LandmarksGo").addEventListener('click', function () {
    var AreaSelect = document.getElementById("AreaSelect").value;
    document.getElementById("LandShow").innerHTML = "";
    if (document.getElementById("LandHospital").checked == true) {
        Check(AreaSelect);

        function Check(Area) {
            fetch('http://localhost:8080/geoserver/DehradunHospital/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=DehradunHospital%3Adehracityhospital&maxFeatures=50&outputFormat=application%2Fjson')
                .then(function (res) {
                    res.text().then(function (data) {
                        // document.getElementById("ShowHospital").innerHTML = "";
                        var data = JSON.parse(data);
                        document.getElementById(data);
                        document.getElementById("LandShow").innerHTML += "<br>" + Area + "  Hospitals : <br>";
                        for (var i = 0; i < data.features.length; i++) {
                            //console.log(data.features[i].properties.name);
                            //console.log(data.features[i].properties.area);
                            if (data.features[i].properties.area == Area) {
                                console.log(data.features[i].properties.name);
                                //console.log(data.features[i].properties.area);
                                document.getElementById("LandShow").innerHTML += "<li>" + data.features[i].properties.name + "</li>";
                            }
                        }
                    })
                })
        }
    }
    if (document.getElementById("LandPschool").checked == true) {
        Check(AreaSelect);
        document.getElementById("LandShow").innerHTML = "";

        function Check(Area) {
            fetch('http://localhost:8080/geoserver/DehradunPrimarySchool/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=DehradunPrimarySchool%3Apschoollandmark&maxFeatures=50&outputFormat=application%2Fjson')
                .then(function (res) {
                    res.text().then(function (data) {
                        //  document.getElementById("LandShow").innerHTML = "";
                        var data = JSON.parse(data);
                        document.getElementById(data);
                        document.getElementById("LandShow").innerHTML += "<br>" + Area + "  Primary Schools : <br>";
                        for (var i = 0; i < data.features.length; i++) {
                            //console.log(data.features[i].properties.name);
                            //console.log(data.features[i].properties.area);
                            if (data.features[i].properties.area == Area) {
                                console.log(data.features[i].properties.name);
                                //console.log(data.features[i].properties.area);
                                document.getElementById("LandShow").innerHTML += "<li>" + data.features[i].properties.name + "</li>";
                            }
                        }
                    })
                })
        }
    }
    if (document.getElementById("LandATM").checked == true) {
        Check(AreaSelect);
        document.getElementById("LandShow").innerHTML = "";

        function Check(Area) {
            fetch('http://localhost:8080/geoserver/DehradunATM/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=DehradunATM%3Aatmsforlandmark&maxFeatures=50&outputFormat=application%2Fjson')
                .then(function (res) {
                    res.text().then(function (data) {
                        //document.getElementById("LandShow").innerHTML = "";
                        var data = JSON.parse(data);
                        document.getElementById(data);
                        document.getElementById("LandShow").innerHTML += "<br>" + Area + "  ATM : <br>";
                        for (var i = 0; i < data.features.length; i++) {
                            //console.log(data.features[i].properties.name);
                            //console.log(data.features[i].properties.area);
                            if (data.features[i].properties.area == Area) {
                                console.log(data.features[i].properties.name);
                                //console.log(data.features[i].properties.area);
                                document.getElementById("LandShow").innerHTML += "<li>" + data.features[i].properties.name + "</li>";
                            }
                        }
                    })
                })
        }
    }
    if (document.getElementById("LandBank").checked == true) {
        Check(AreaSelect);
        // document.getElementById("LandShow").innerHTML = "";

        function Check(Area) {
            fetch('http://localhost:8080/geoserver/DehradunBank/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=DehradunBank%3Abankforlandmark&maxFeatures=50&outputFormat=application%2Fjson')
                .then(function (res) {
                    res.text().then(function (data) {
                        //document.getElementById("LandShow").innerHTML = "";
                        var data = JSON.parse(data);
                        document.getElementById(data);
                        document.getElementById("LandShow").innerHTML += "<br>" + Area + "  BANKS : <br>";
                        for (var i = 0; i < data.features.length; i++) {
                            //console.log(data.features[i].properties.name);
                            //console.log(data.features[i].properties.area);
                            if (data.features[i].properties.area == Area) {
                                console.log(data.features[i].properties.name);
                                //console.log(data.features[i].properties.area);
                                document.getElementById("LandShow").innerHTML += "<li>" + data.features[i].properties.name + "</li>";
                            }
                        }
                    })
                })
        }
    }
});
//Find Location From Map Click


var locationLine, locationLinecount;
var prevLongitude, prevLatitude;

var locfrom = document.getElementById('findlocation');
locfrom.addEventListener(
    'click',
    function () {
        if (document.getElementById("findlocation").checked == true) {
            // dialog.close();
            locationLine = true;
            locationLinecount = 1;
            map.on('click', function (e) {
                var cd = e.coordinate;
                cd = ol.proj.toLonLat(cd);
                if (locationLine == true) {
                    if (locationLinecount == 1) {
                        prevLongitude = cd[0];
                        prevLatitude = cd[1];
                        var markerLayer3 = new ol.layer.Vector({
                            source: new ol.source.Vector({
                                features: [
                                    new ol.Feature({
                                        geometry: new ol.geom.Point(ol.proj.fromLonLat([cd[0], cd[1]]))
                                    })
                                ]
                            })
                        });
                        map.addLayer(markerLayer3);
                        locationLinecount++;
                    } else if (locationLinecount == 2) {
                        var markerLayer3 = new ol.layer.Vector({
                            source: new ol.source.Vector({
                                features: [
                                    new ol.Feature({
                                        geometry: new ol.geom.Point(ol.proj.fromLonLat([cd[0], cd[1]]))
                                    })
                                ]
                            })
                        });
                        map.addLayer(markerLayer3);

                        var lonlatnew = ol.proj.fromLonLat([prevLongitude, prevLatitude]);
                        var location2new = ol.proj.fromLonLat([cd[0], cd[1]]);
                        var linieStyle3 = [
                            new ol.style.Style({
                                stroke: new ol.style.Stroke({
                                    color: '#d12710',
                                    width: 3,
                                }),
                                text: new ol.style.Text({
                                    text: "KM : " + parseInt(distance(prevLongitude, prevLatitude, cd[0], cd[1])),
                                    scale: 2,
                                    fill: new ol.style.Fill({
                                        color: '#black',
                                    })
                                })
                            })
                        ];
                        //create the line       
                        var linie3 = new ol.layer.Vector({
                            source: new ol.source.Vector({
                                features: [new ol.Feature({
                                    geometry: new ol.geom.LineString([lonlatnew, location2new]),
                                    name: 'Line',
                                })]
                            })
                        });

                        //set the style and add to layer
                        linie3.setStyle(linieStyle3);
                        map.addLayer(linie3);
                        locationLinecount++;
                    }
                }
            })
        } else {

        }
    },
    false
);

function distance(lat1, lon1, lat2, lon2) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    } else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        dist = dist * 1.609344

        return dist;
    }
}

//Find Current Location

document.getElementById('track').addEventListener('click', function () {

    var geolocation = new ol.Geolocation({
        // enableHighAccuracy must be set to true to have the heading value.
        trackingOptions: {
            enableHighAccuracy: true,
        },
        projection: view.getProjection(),
    });

    function el(id) {
        return document.getElementById(id);
    }

    el('track').addEventListener('change', function () {
        geolocation.setTracking(this.checked);
    });

    // update the HTML page when the position changes.
    geolocation.on('change', function () {
        el('accuracy').innerText = geolocation.getAccuracy() + ' [m]';
        el('altitude').innerText = geolocation.getAltitude() + ' [m]';
        el('altitudeAccuracy').innerText = geolocation.getAltitudeAccuracy() + ' [m]';
        el('heading').innerText = geolocation.getHeading() + ' [rad]';
        el('speed').innerText = geolocation.getSpeed() + ' [m/s]';
    });

    // handle geolocation error.
    geolocation.on('error', function (error) {
        var info = document.getElementById('info');
        info.innerHTML = error.message;
        info.style.display = '';
    });

    var accuracyFeature = new ol.Feature();
    geolocation.on('change:accuracyGeometry', function () {
        accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
    });

    var positionFeature = new ol.Feature();
    positionFeature.setStyle(
        new ol.Style({
            image: new ol.style.CircleStyle({
                radius: 6,
                fill: new ol.style.Fill({
                    color: '#3399CC',
                }),
                stroke: new ol.style.Stroke({
                    color: '#fff',
                    width: 2,
                }),
            }),
        })
    );

    geolocation.on('change:position', function () {
        var coordinates = geolocation.getPosition();
        positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);
    });

    new ol.layer.VectorLayer({
        map: map,
        source: new ol.source.Vector({
            features: [accuracyFeature, positionFeature],
        }),
    });

}, false);


//Line From Coord

document.getElementById("FindLoc").addEventListener('click', function () {

    var modal = document.getElementById("myModal2");
    modal.style.display = "block";
    document.getElementById('DireSearch').onclick = function () {
        var latitude1 = document.getElementById("LatF").value;
        var latitude2 = document.getElementById("LatT").value;
        var longitude1 = document.getElementById("LongF").value;
        var longitude2 = document.getElementById("LongT").value;
        // var lonlat = [lati1, longt1];
        // var lonlat1 = [lati2, longt2];
        var markerLayer = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [
                    new ol.Feature({
                        geometry: new ol.geom.Point(ol.proj.fromLonLat([longitude1, latitude1]))
                    })
                ]
            })
        });
        map.addLayer(markerLayer);

        var markerLayer2 = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [
                    new ol.Feature({
                        geometry: new ol.geom.Point(ol.proj.fromLonLat([longitude2, latitude2]))
                    })
                ]
            })
        });
        map.addLayer(markerLayer2);

        //For LineDraw
        var lonlat = ol.proj.fromLonLat([longitude1, latitude1]);
        var location2 = ol.proj.fromLonLat([longitude2, latitude2]);
        var linieStyle = [
            new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: '#d12710',
                    width: 3,
                }),
                text: new ol.style.Text({
                    text: "KM : " + parseInt(distance(latitude1, longitude1, latitude2, longitude2)),
                    scale: 2,
                    fill: new ol.style.Fill({
                        color: '#black',
                    })
                })
            })
        ];
        //create the line       
        var linie = new ol.layer.Vector({
            source: new ol.source.Vector({
                features: [new ol.Feature({
                    geometry: new ol.geom.LineString([lonlat, location2]),
                    name: 'Line',
                })]
            })
        });

        //set the style and add to layer
        linie.setStyle(linieStyle);
        map.addLayer(linie);

        modal.style.display = "none";
    };

}, false);
document.getElementById('HideFind').addEventListener("click", function () {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
})

//var selectedValue;
//function SelectedValue(ddlObject) {
//    alert("Hii");
//     selectedValue = ddlObject.value;
//}
    
//var XYZ1, Advancelayer;
//document.getElementById("AdSearchbtn").addEventListener("click", function () {
//    alert("hiiii");
//    if (selectedValue == "BusDepot") {
//        Advancelayer = BusDepotLayer;
//    } else if (selectedValue == "Parking") {
//        Advancelayer = ParkingLayer;
//    } else if (selectedValue == "PostOffice") {
//        Advancelayer = PostOffLayer;
//    } else if (selectedValue == "FarmHouse") {
//        Advancelayer = FarmHouseLayer;
//    }
//    int = setInterval(() => {
//        if (XYZ1 == 0) {
//            map.addLayer(Advancelayer);
//            XYZ1 = 1;
//        } else {
//            map.removeLayer(Advancelayer);
//            XYZ1 = 0;
//        }
//    }, 1000);
//})

var setint, layer, Adlayer,set=0;
function clso() {
    
    if (localStorage.length!=0) {
        layer = localStorage.getItem("LayerName");
        
        if (layer == "BusDepotLayer") {
            Adlayer = BusDepotLayer;
        }
        if (layer == "FarmHouseLayer") {
            Adlayer = FarmHouseLayer;
        }
        if (layer == "ParkingLayer") {
            Adlayer = ParkingLayer;
        }
        if (layer == "MedicalStoreLayer") {
            Adlayer = MedicalStoreLayer;
        }
        if (layer == "PostOffLayer") {
            Adlayer = PostOffLayer;
        }
        if (layer == "HospitalLayer") {
            Adlayer = HospitalLayer;
        }
        localStorage.clear();
        setint = setInterval(() => {
            if (set == 0) {        
                map.addLayer(Adlayer);
                set = 1;
            } else {
                map.removeLayer(Adlayer);
                set = 0;
            }
        },1000)
    }
    $('#iframeHolder').css("display", "none");
}
document.getElementById("STOPBLINK").addEventListener('click', function () {
    clearInterval(setint);
    map.removeLayer(Adlayer);
}, false);

function bookmarkd(zoom, cd1, cd2) {
    console.log(zoom, cd1, cd2);
    view.animate({
        zoom: zoom
    }, {
        center: [cd1, cd2],
    })
}