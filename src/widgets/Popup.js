/**
 * @Author: Caven
 * @Date: 2020-01-15 19:16:45
 */

import { DomUtil } from '../utils'
import Widget from '../Widget'

class Popup extends Widget {
  constructor() {
    super()
    this._wrapper = DomUtil.create('div', 'cesium-popup')
    this._config = { customClass: '' }
    this._position = undefined
    this.type = 'popup'
  }

  set config(config) {
    this._config = config
    config.customClass && this._setCustomClass()
  }

  /**
   * binds event
   * @private
   */
  _bindEvent() {
    if (this._viewer && this._wrapper) {
      let self = this
      let scene = this._viewer.scene
      scene.postRender.addEventListener(() => {
        if (
          self._position &&
          self._enabled &&
          self._updateWindowCoord &&
          self._wrapper.style.visibility === 'visible'
        ) {
          let windowCoord = Cesium.SceneTransforms.wgs84ToWindowCoordinates(
            scene,
            self._position
          )
          windowCoord && self._updateWindowCoord(windowCoord)
        }
      })
    }
  }

  /**
   *
   * @private
   */
  _mountContent() {
    this._wrapper.style.visibility = 'hidden'
  }

  /**
   *
   * @param windowCoord
   * @private
   */
  _updateWindowCoord(windowCoord) {
    let x = windowCoord.x - this._wrapper.offsetWidth / 2
    let y = windowCoord.y - this._wrapper.offsetHeight
    if (this._config && this._config.position === 'left') {
      x = windowCoord.x - this._wrapper.offsetWidth
    } else if (this._config && this._config.position === 'right') {
      x = windowCoord.x
    }
    this._wrapper.style.cssText = `
    visibility:visible;
    z-index:1;
    transform:translate3d(${Math.round(x)}px,${Math.round(y)}px, 0);
    `
  }

  /**
   *
   * @private
   */
  _setCustomClass() {
    DomUtil.setClass(this._wrapper, `${this._config.customClass}`)
  }

  /**
   *
   * Setting widget position
   * @param {*} position
   *
   */
  setPosition(position) {
    this._position = position
    this._wrapper &&
      (this._wrapper.style.cssText = `
    visibility:visible;
    `)
    return this
  }

  /**
   *
   * @param {*} position
   * @param {*} content
   */
  showAt(position, content) {
    this.setPosition(position).setContent(content)
    return this
  }

  /**
   *
   * @param viewer
   * @returns {Popup}
   */
  addTo(viewer) {
    this._viewer = viewer
    this.enabled = true
    this._bindEvent()
    Object.defineProperty(this._viewer, 'popup', {
      value: this,
      writable: false
    })
    return this
  }
}

export default Popup
