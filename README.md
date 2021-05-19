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
npm install @dvgis/cesium-widget
```

```js
require('dvgis/cesium-widget')
import 'dvgis/cesium-widget/dist/cesium.widget.min.css'
```
## Start

> Introduce the Cesium framework before use

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
viewer.contextMenu.addMenu('测试',()=> { alert('测试') } )
```

### DistanceLegend

```js
viewer.distanceLegend.enabled = true
```

### HawkeyeMap

```js
viewer.hawkeyeMap.enabled = true
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
viewer.mapSplit.addImagery(new Cesium.BaiduImageryProvider(),Cesium.ImagerySplitDirection.RIGHT) 
```

### Popup

```js
// Popup default enabled is true,so no need to setting
viewer.popup.showAt(Cesium.Cartesian3.fromDegrees(120.121,31.121),'test')
viewer.popup.hide()
```

### Tooltip

```js
viewer.tooltip.enabled =  true
viewer.tooltip.showAt(new Cesium.Cartesian2(100,20),'test')
viewer.tooltip.hide()
```

### ZoomController

```js
viewer.zoomController.enabled = true
```

## Tips

> Layout using the default layout, according to the project can set their own css style

## Thanks
