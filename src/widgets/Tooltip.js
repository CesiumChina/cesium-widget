/**
 * @Author: Caven
 * @Date: 2020-02-01 12:07:54
 */

import { DomUtil } from '../utils'
import Widget from '../Widget'

class Tooltip extends Widget {
  constructor() {
    super()
    this._wrapper = DomUtil.create('div', 'cesium-tool-tip')
    this._ready = true
    this.type = 'tooltip'
  }

  /**
   *
   * @param {*} windowCoord
   *
   */
  _updateWindowCoord(windowCoord) {
    let x = windowCoord.x + 10
    let y = windowCoord.y - this._wrapper.offsetHeight / 2
    this._wrapper.style.cssText = `
    visibility:visible;
    z-index:1;
    transform:translate3d(${Math.round(x)}px,${Math.round(y)}px, 0);
    `
  }

  /**
   *
   * @param windowPosition
   * @param content
   * @returns {Tooltip}
   */
  showAt(windowPosition, content) {
    if (!this._enabled) {
      return this
    }
    windowPosition && this._updateWindowCoord(windowPosition)
    this.setContent(content)
    return this
  }

  /**
   *
   * @param viewer
   * @returns {Tooltip}
   */
  addTo(viewer) {
    this._viewer = viewer
    Object.defineProperty(this._viewer, 'tooltip', {
      value: this,
      writable: false
    })
    return this
  }
}

export default Tooltip
