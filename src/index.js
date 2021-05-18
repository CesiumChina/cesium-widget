/**
 * @Author: Caven
 * @Date: 2020-01-14 18:22:10
 */

import Compass from './widgets/Compass'
import ContextMenu from './widgets/ContextMenu'
import DistanceLegend from './widgets/DistanceLegend'
import HawkeyeMap from './widgets/HawkeyeMap'
import LoadingMask from './widgets/LoadingMask'
import LocationBar from './widgets/LocationBar'
import MapSplit from './widgets/MapSplit'
import Popup from './widgets/Popup'
import Tooltip from './widgets/Tooltip'
import ZoomController from './widgets/ZoomController'

Cesium.CesiumWidgetMixin = function(viewer) {
  new Compass().addTo(viewer)
  new ContextMenu().addTo(viewer)
  new DistanceLegend().addTo(viewer)
  new HawkeyeMap().addTo(viewer)
  new LoadingMask().addTo(viewer)
  new LocationBar().addTo(viewer)
  new MapSplit().addTo(viewer)
  new Popup().addTo(viewer)
  new Tooltip().addTo(viewer)
  new ZoomController().addTo(viewer)
}
