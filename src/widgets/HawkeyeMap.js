/**
 * @Author: Caven
 * @Date: 2020-03-15 17:47:42
 */

import { DomUtil } from '../utils'
import Widget from '../Widget'

const DEF_OPTS = {
  animation: false,
  baseLayerPicker: false,
  imageryProvider: false,
  fullscreenButton: false,
  geocoder: false,
  homeButton: false,
  infoBox: false,
  sceneModePicker: false,
  selectionIndicator: false,
  timeline: false,
  navigationHelpButton: false,
  navigationInstructionsInitiallyVisible: false,
  creditContainer: undefined
}

class HawkeyeMap extends Widget {
  constructor() {
    super()
    this._wrapper = DomUtil.create('div', 'cesium-hawkeye-map', null)
    this._wrapper.setAttribute('id', 'cesium-hawkeye-map')
    this._imagerys = []
    this._map = undefined
    this.type = 'hawkeye_map'
  }

  get imagerys() {
    return this._imagerys
  }

  /**
   *
   * @private
   */
  _mountContent() {
    let map = new Cesium.Viewer(this._wrapper, {
      ...DEF_OPTS,
      sceneMode: Cesium.SceneMode.SCENE2D
    })
    map.imageryLayers.removeAll()
    map.cesiumWidget.creditContainer.style.display = 'none'
    map.cesiumWidget.screenSpaceEventHandler.removeInputAction(
      Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
    )
    map.scene.backgroundColor = Cesium.Color.TRANSPARENT
    map.scene.screenSpaceCameraController.enableRotate = false
    map.scene.screenSpaceCameraController.enableTranslate = false
    map.scene.screenSpaceCameraController.enableZoom = false
    map.scene.screenSpaceCameraController.enableTilt = false
    map.scene.screenSpaceCameraController.enableLook = false
    map.scene.screenSpaceCameraController.maximumZoomDistance = 40489014.0
    this._map = map
    this._ready = true
  }

  /**
   *
   * @private
   */
  _bindEvent() {
    this._viewer.camera.changed.addEventListener(this._syncMap, this)
  }

  /**
   *
   * @private
   */
  _unbindEvent() {
    this._viewer.camera.changed.removeEventListener(this._syncMap, this)
  }

  /**
   *
   * @returns {boolean}
   * @private
   */
  _syncMap() {
    let viewCenter = new Cesium.Cartesian2(
      Math.floor(this._viewer.canvas.clientWidth / 2),
      Math.floor(this._viewer.canvas.clientHeight / 2)
    )
    let worldPosition = this._viewer.scene.camera.pickEllipsoid(viewCenter)
    if (!worldPosition) {
      return false
    }
    let distance = Cesium.Cartesian3.distance(
      worldPosition,
      this._viewer.scene.camera.positionWC
    )
    this._map.scene.camera.lookAt(
      worldPosition,
      new Cesium.Cartesian3(0.0, 0.0, distance)
    )
  }

  /**
   *
   * @param imageryProvider
   * @returns {HawkeyeMap}
   */
  addImagery(imageryProvider) {
    if (!this._map || !this._enabled) {
      return this
    }
    if (imageryProvider) {
      if (this._imagerys && this._imagerys.length) {
        this._map.imageryLayers.removeAll()
      }
      if (!Array.isArray(imageryProvider)) {
        imageryProvider = [imageryProvider]
      }
      imageryProvider.forEach(item => {
        this._imagerys.push(this._map.imageryLayers.addImageryProvider(item))
      })
    }
    return this
  }

  /**
   *
   * @param viewer
   * @returns {HawkeyeMap}
   */
  addTo(viewer) {
    this._viewer = viewer
    Object.defineProperty(this._viewer, 'hawkeyeMap', {
      value: this,
      writable: false
    })
    this._viewer.camera.percentageChanged = 0.01
    return this
  }
}

export default HawkeyeMap
