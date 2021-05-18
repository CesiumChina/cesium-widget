/**
 * @Author: Caven
 * @Date: 2021-04-27 13:04:50
 */

class Widget {
  constructor() {
    this._viewer = undefined
    this._ready = false
    this._wrapper = undefined
    this._enabled = false
  }

  set enabled(enabled) {
    this._enabled = enabled
    this._enableHook && this._enableHook()
  }

  get enabled() {
    return this._enabled
  }

  /**
   * mount content
   * @private
   */
  _mountContent() {}

  /**
   * binds event
   * @private
   */
  _bindEvent() {}

  /**
   * Unbinds event
   * @private
   */
  _unbindEvent() {}

  /**
   * When enable modifies the hook executed, the subclass copies it as required
   * @private
   */
  _enableHook() {
    !this._ready && this._mountContent()
    if (this._enabled) {
      !this._wrapper.parentNode &&
        this._viewer.container.appendChild(this._wrapper)
      this._bindEvent()
    } else {
      this._unbindEvent()
      this._wrapper.parentNode &&
        this._viewer.container.removeChild(this._wrapper)
    }
  }

  /**
   * Updating the Widget location requires subclass overrides
   * @param windowCoord
   * @private
   */
  _updateWindowCoord(windowCoord) {}

  /**
   * Setting widget content
   * @param content
   * @returns {Widget}
   */
  setContent(content) {
    if (content && typeof content === 'string') {
      this._wrapper.innerHTML = content
    } else if (content && content instanceof Element) {
      while (this._wrapper.hasChildNodes()) {
        this._wrapper.removeChild(this._wrapper.firstChild)
      }
      this._wrapper.appendChild(content)
    }
    return this
  }

  /**
   * hide widget
   */
  hide() {
    this._wrapper &&
      (this._wrapper.style.cssText = `
    visibility:hidden;
    `)
  }

  /**
   *
   * @param viewer
   * @returns {Widget}
   */
  addTo(viewer) {
    return this
  }
}

export default Widget
