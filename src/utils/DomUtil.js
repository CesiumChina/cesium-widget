/**
 * @Author: Caven
 * @Date: 2021-04-27 13:04:34
 */

class DomUtil {
  /**
   * Creates an HTML element with `tagName`, sets its class to `className`, and optionally appends it to `container` element.
   * @param tagName
   * @param className
   * @param container
   * @returns {HTMLElement}
   */
  static create(tagName, className, container = null) {
    let el = document.createElement(tagName)
    el.className = className || ''
    if (container) {
      container.appendChild(el)
    }
    return el
  }

  /**
   * Sets the element's class.
   * @param {*} el
   * @param {*} name
   */
  static setClass(el, name) {
    if (el.className.baseVal === undefined) {
      el.className = name
    } else {
      // in case of SVG element
      el.className.baseVal = name
    }
  }

  /**
   * Parses string to Dom
   * @param domStr
   * @param withWrapper
   * @param className
   * @returns {HTMLDivElement|NodeListOf<ChildNode>}
   */
  static parseDom(domStr, withWrapper, className) {
    withWrapper = withWrapper ?? false
    let el = document.createElement('div')
    el.className = className || ''
    el.innerHTML = domStr
    return withWrapper ? el : el.childNodes
  }
}

export default DomUtil
