/**
 * @Author: Caven
 * @Date: 2020-03-04 15:38:40
 */

import { DomUtil } from '../utils'
import Icons from '../icons'
import Widget from '../Widget'

class MapSplit extends Widget {
  constructor() {
    super()
    this._wrapper = DomUtil.create('div', 'cesium-slider')
    this._imagery = undefined
    this._moveActive = false
    this.type = 'map_split'
  }

  /**
   *
   * @private
   */
  _bindEvent() {
    this._viewer.scene.imagerySplitPosition = 0.5
    this._wrapper.style.left = '50%'
  }

  /**
   *
   * @private
   */
  _unbindEvent() {
    if (this._imagery) {
      this._viewer.scene.imagerySplitPosition =
        this._imagery.splitDirection > 0 ? 1 : 0
    } else {
      this._viewer.scene.imagerySplitPosition = 0
    }
  }

  /**
   *
   * @private
   */
  _mountContent() {
    let splitter = DomUtil.parseDom(Icons.splitter, true, 'splitter')
    this._wrapper.appendChild(splitter)
    let handler = new Cesium.ScreenSpaceEventHandler(splitter)
    let self = this
    handler.setInputAction(() => {
      self._moveActive = true
    }, Cesium.ScreenSpaceEventType.LEFT_DOWN)
    handler.setInputAction(() => {
      self._moveActive = true
    }, Cesium.ScreenSpaceEventType.PINCH_START)

    handler.setInputAction(movement => {
      self._moveHandler(movement)
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)

    handler.setInputAction(movement => {
      self._moveHandler(movement)
    }, Cesium.ScreenSpaceEventType.PINCH_MOVE)

    handler.setInputAction(() => {
      self._moveActive = false
    }, Cesium.ScreenSpaceEventType.LEFT_UP)
    handler.setInputAction(() => {
      self._moveActive = false
    }, Cesium.ScreenSpaceEventType.PINCH_END)
    this._ready = true
  }

  /**
   *
   * @param movement
   * @private
   */
  _moveHandler(movement) {
    if (!this._moveActive || !this._enabled) {
      return
    }
    let relativeOffset = movement.endPosition.x
    let splitPosition =
      (this._wrapper.offsetLeft + relativeOffset) /
      this._wrapper.parentElement.offsetWidth
    this._wrapper.style.left = 100.0 * splitPosition + '%'
    this._viewer.scene.imagerySplitPosition = splitPosition
  }

  /**
   *
   * @param imageryProvider
   * @param splitDirection
   * @returns {MapSplit}
   */
  addImagery(imageryProvider, splitDirection = 1) {
    if (!this._viewer || !this._enabled) {
      return this
    }
    if (imageryProvider) {
      this._imagery && this._viewer.imageryLayers.remove(this._imagery)
      this._imagery = this._viewer.imageryLayers.addImageryProvider(
        imageryProvider
      )
      this._imagery.splitDirection = splitDirection || 0
      this._viewer.scene.imagerySplitPosition =
        this._wrapper.offsetLeft / this._wrapper.parentElement.offsetWidth
    }
    return this
  }

  /**
   *
   * @param viewer
   * @returns {MapSplit}
   */
  addTo(viewer) {
    this._viewer = viewer
    Object.defineProperty(this._viewer, 'mapSplit', {
      value: this,
      writable: false
    })
    return this
  }
}

export default MapSplit
