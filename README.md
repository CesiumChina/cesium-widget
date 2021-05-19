# Cesium-Widget

<p>
<img src="https://img.shields.io/badge/license-Apache%202-blue"/>
<img src="https://img.shields.io/npm/v/@dvgis/cesium-widget?logo=npm&color=orange" />
<img src="https://img.shields.io/npm/dm/@dvgis/cesium-widget?logo=npm"/>
</p>

> Cesium-Widget is mainly used to load common map widgets

## Installation

`CDN`

```html
<script src="https://cdn.jsdelivr.net/npm/@dvgis/cesium-widget"></script>
<link href="https://cdn.jsdelivr.net/npm/@dvgis/cesium-widget/dist/cesium.widget.min.css" rel="stylesheet">
```

`NPM / YARN`

```shell
yarn add @dvgis/cesium-widget
------------------------------
npm install @dvgis/cesium-widget
```

```js
require('dvgis/cesium-widget')
import 'dvgis/cesium-widget/dist/cesium.widget.min.css'
```
## Start

**_`Introduce the Cesium framework before use`_**

```js
viewer.extend(Cesium.CesiumWidgetMixin)
```

## Usage

### Compass

```js
viewer.compass.enabled = true
```

### ContextMenu

```js
viewer.contextMenu.enabled = true
// add menu item, params: label, callback, context
viewer.contextMenu.addMenu('测试',()=> { alert('测试') } ) 
// setting default menu,if setting the property, the lib default setting will be overwrite
viewer.contextMenu.DEFAULT_MENU = [{
   label:'',
   callback:(e)=>{},
   context:this
}] 
```

### DistanceLegend

```js
viewer.distanceLegend.enabled = true
```

### HawkeyeMap

```js
viewer.hawkeyeMap.enabled = true
// add imagery, params: ImageryProvider
viewer.hawkeyeMap.addImagery(new Cesium.BaiduImageryProvider())
```

### LoadingMask

```js
viewer.loadingMask.enabled = true
```

### LocationBar

```js
viewer.locationBar.enabled = true
```

### MapSplit

```js
viewer.mapSplit.enabled = true
// add imagery, params: ImageryProvider, ImagerySplitDirection
viewer.mapSplit.addImagery(new Cesium.BaiduImageryProvider(),Cesium.ImagerySplitDirection.RIGHT) 
```

### Popup

```js
// Popup default enabled is true,so no need to setting
// show popup, params: cartesian3, content
viewer.popup.showAt(Cesium.Cartesian3.fromDegrees(120.121,31.121),'test')
// hide popup
viewer.popup.hide()
```

### Tooltip

```js
viewer.tooltip.enabled =  true
// show tooltip, params: cartesian2, content
viewer.tooltip.showAt(new Cesium.Cartesian2(100,20),'test')
// hide tooltip
viewer.tooltip.hide()
```

### ZoomController

```js
viewer.zoomController.enabled = true
```

## Tips

> Layout using the default layout, according to the project can set their own css style

## Thanks
