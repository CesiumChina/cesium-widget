/**
 * @Author: Liquid
 * @Date: 2021-03-02 13:38:48
 */

import { DomUtil } from '../utils'
import Widget from '../Widget'

class LoadingMask extends Widget {
  constructor() {
    super()
    this._wrapper = DomUtil.create('div', 'cesium-loading-mask')
    this.type = 'loading_mask'
  }

  /**
   *
   * @private
   */
  _mountContent() {
    let el = DomUtil.parseDom(
      `
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    `,
      true,
      'loading'
    )
    this._wrapper.appendChild(el)
    this._ready = true
  }

  /**
   *
   * @param viewer
   * @returns {LoadingMask}
   */
  addTo(viewer) {
    this._viewer = viewer
    Object.defineProperty(this._viewer, 'loadingMask', {
      value: this,
      writable: false
    })

    return this
  }
}

export default LoadingMask
