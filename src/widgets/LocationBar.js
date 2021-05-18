/**
 * @Author: Caven
 * @Date: 2020-03-04 18:02:32
 */

import { DomUtil } from '../utils'
import Widget from '../Widget'

class LocationBar extends Widget {
  constructor() {
    super()
    this._wrapper = DomUtil.create('div', 'cesium-location-bar')
    this._mouseEl = undefined
    this._cameraEl = undefined
    this._handler = undefined
    this._lastMouseUpdate = Cesium.getTimestamp()
    this._lastCameraUpdate = Cesium.getTimestamp()
    this.type = 'location_bar'
  }

  /**
   *
   * @private
   */
  _bindEvent() {
    this._handler.setInputAction(movement => {
      this._moveHandler(movement)
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
    this._viewer.camera.changed.addEventListener(this._cameraHandler, this)
  }

  /**
   *
   * @private
   */
  _unbindEvent() {
    this._handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE)
    this._viewer.camera.changed.removeEventListener(this._cameraHandler, this)
  }

  /**
   *
   * @private
   */
  _mountContent() {
    this._mouseEl = DomUtil.create('div', 'mouse-location', this._wrapper)
    this._cameraEl = DomUtil.create('div', 'camera-location', this._wrapper)
    this._ready = true
  }

  /**
   *
   * @param movement
   * @private
   */
  _moveHandler(movement) {
    let now = Cesium.getTimestamp()
    if (now < this._lastMouseUpdate + 300) {
      return
    }
    this._lastMouseUpdate = now
    let scene = this._viewer.scene
    let ellipsoid = Cesium.Ellipsoid.WGS84
    let surfacePosition = undefined
    if (scene.mode === Cesium.SceneMode.SCENE3D) {
      let ray = scene.camera.getPickRay(movement.endPosition)
      surfacePosition = scene.globe.pick(ray, scene)
    } else {
      surfacePosition = scene.camera.pickEllipsoid(
        movement.endPosition,
        ellipsoid
      )
    }

    let cartographic = surfacePosition
      ? ellipsoid.cartesianToCartographic(surfacePosition)
      : undefined
    let lng = +Cesium.Math.toDegrees(cartographic?.longitude || 0)
    let lat = +Cesium.Math.toDegrees(cartographic?.latitude || 0)
    let alt = cartographic
      ? +this._viewer.scene.globe.getHeight(cartographic)
      : 0
    this._mouseEl.innerHTML = `
      <span>经度：${lng.toFixed(8)}</span>
      <span>纬度：${lat.toFixed(8)}</span>
      <span>海拔：${alt.toFixed(2)} 米</span>`
  }

  /**
   *
   * @private
   */
  _cameraHandler() {
    let now = Cesium.getTimestamp()
    if (now < this._lastCameraUpdate + 300) {
      return
    }
    this._lastCameraUpdate = now
    let ellipsoid = Cesium.Ellipsoid.WGS84
    let position = ellipsoid.cartesianToCartographic(
      this._viewer.camera.positionWC
    )
    this._cameraEl.innerHTML = `
      <span>视角：${(+Cesium.Math.toDegrees(this._viewer.camera.pitch)).toFixed(
        2
      )}</span>
      <span>视高：${(+position.height).toFixed(2)} 米</span>
    `
  }

  /**
   *
   * @param viewer
   * @returns {LocationBar}
   */
  addTo(viewer) {
    this._viewer = viewer
    Object.defineProperty(this._viewer, 'locationBar', {
      value: this,
      writable: false
    })
    this._handler = new Cesium.ScreenSpaceEventHandler(this._viewer.canvas)
    return this
  }
}

export default LocationBar
