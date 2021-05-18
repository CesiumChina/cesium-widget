/**
 * @Author: Caven
 * @Date: 2019-12-31 17:32:01
 */

import { DomUtil } from '../utils'
import Widget from '../Widget'

class ContextMenu extends Widget {
  constructor() {
    super()
    this._wrapper = DomUtil.create('div', 'cesium-context-menu')
    this._ulEl = undefined
    this._handler = undefined
    this._position = undefined
    this._wgs84Position = undefined
    this._surfacePosition = undefined
    this._wgs84SurfacePosition = undefined
    this._windowPosition = undefined
    this._config = {}
    this._defaultMenu = [
      {
        label: '飞到默认位置',
        callback: e => {
          this._viewer.camera.flyHome(1.5)
        },
        context: this
      },
      {
        label: '取消飞行',
        callback: e => {
          this._viewer.camera.cancelFlight()
        },
        context: this
      }
    ]
    this._menus = []
    this.type = 'context-menu'
  }

  set DEFAULT_MENU(menus) {
    this._defaultMenu = menus
    return this
  }

  set config(config) {
    this._config = config
    config.customClass && this._setCustomClass()
    return this
  }

  /**
   *
   * @private
   */
  _bindEvent() {
    this._handler.setInputAction(movement => {
      this._onRightClick(movement)
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK)

    this._handler.setInputAction(movement => {
      this._onClick(movement)
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
  }

  /**
   *
   * @private
   */
  _unbindEvent() {
    this._handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK)
    this._handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
  }

  /**
   *
   * @private
   */
  _mountContent() {
    this._ulEl = DomUtil.create('ul', 'menu-list', this._wrapper)
    this._ready = true
  }

  /**
   *
   * @private
   */
  _mountMenu() {
    while (this._ulEl.hasChildNodes()) {
      this._ulEl.removeChild(this._ulEl.firstChild)
    }

    if (this._menus && this._menus.length) {
      this._menus.forEach(item => {
        this._addMenuItem(item.label, item.callback, item.context || this)
      })
    }

    if (this._defaultMenu && this._defaultMenu.length) {
      this._defaultMenu.forEach(item => {
        this._addMenuItem(item.label, item.callback, item.context || this)
      })
    }
  }

  /**
   *
   * @param movement
   * @private
   */
  _onRightClick(movement) {
    if (!this._enabled) {
      return
    }
    this._overlay = undefined
    let scene = this._viewer.scene
    this._windowPosition = movement.position
    this._updateWindowCoord(movement.position)
    if (scene.pickPositionSupported) {
      this._position = scene.pickPosition(movement.position)
    }
    if (this._position) {
      let c = Cesium.Ellipsoid.WGS84.cartesianToCartographic(this._position)
      if (c) {
        this._wgs84Position = {
          lng: Cesium.Math.toDegrees(c.longitude),
          lat: Cesium.Math.toDegrees(c.latitude),
          alt: c.height
        }
      }
    }
    if (scene.mode === Cesium.SceneMode.SCENE3D) {
      let ray = scene.camera.getPickRay(movement.position)
      this._surfacePosition = scene.globe.pick(ray, scene)
    } else {
      this._surfacePosition = scene.camera.pickEllipsoid(
        movement.position,
        Cesium.Ellipsoid.WGS84
      )
    }

    if (this._surfacePosition) {
      let c = Cesium.Ellipsoid.WGS84.cartesianToCartographic(
        this._surfacePosition
      )
      if (c) {
        this._wgs84SurfacePosition = {
          lng: Cesium.Math.toDegrees(c.longitude),
          lat: Cesium.Math.toDegrees(c.latitude),
          alt: c.height
        }
      }
    }
    this._mountMenu()
  }

  /**
   *
   * @param movement
   * @private
   */
  _onClick(movement) {
    this.hide()
  }

  /**
   *
   * @param windowCoord
   * @private
   */
  _updateWindowCoord(windowCoord) {
    this._wrapper.style.cssText = `
    visibility:visible;
    z-index:1;
    transform:translate3d(${Math.round(windowCoord.x)}px,${Math.round(
      windowCoord.y
    )}px, 0);
    `
  }

  /**
   *
   * @private
   */
  _setCustomClass() {
    DomUtil.setClass(
      this._wrapper,
      `dc-context-menu ${this._config.customClass}`
    )
  }

  /**
   *
   * @param label
   * @param method
   * @param context
   * @returns {ContextMenu}
   * @private
   */
  _addMenuItem(label, method, context) {
    if (!label || !method) {
      return this
    }
    let menu = DomUtil.create('li', 'menu-item', null)
    let a = DomUtil.create('a', '', menu)
    a.innerHTML = label
    a.href = 'javascript:void(0)'
    let self = this
    if (method) {
      a.onclick = () => {
        method.call(context, {
          windowPosition: self._windowPosition,
          position: self._position,
          wgs84Position: self._wgs84Position,
          surfacePosition: self._surfacePosition,
          wgs84SurfacePosition: self._wgs84SurfacePosition,
          overlay: self._overlay
        })
        self.hide()
      }
    }
    this._ulEl.appendChild(menu)
    return this
  }

  /**
   *
   * @param label
   * @param method
   * @param context
   * @returns {ContextMenu}
   */
  addMenu(label, method, context) {
    this._menus.push({
      label: label,
      callback: method,
      context: context
    })
    return this
  }

  /**
   *
   * @returns {ContextMenu}
   */
  clearMenus() {
    this._menus = []
    return this
  }

  /**
   *
   * @param index
   * @returns {ContextMenu}
   */
  removeMenu(index) {
    this._menus.splice(index, 1)
    return this
  }

  /**
   *
   * @param viewer
   * @returns {ContextMenu}
   */
  addTo(viewer) {
    this._viewer = viewer
    Object.defineProperty(this._viewer, 'contextMenu', {
      value: this,
      writable: false
    })
    this._handler = new Cesium.ScreenSpaceEventHandler(this._viewer.canvas)
    return this
  }
}

export default ContextMenu
