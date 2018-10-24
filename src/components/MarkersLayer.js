import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import L from 'leaflet';

import { Marker, Popup } from 'react-leaflet';
import SvgStationIconGauge from './SvgStationIconGauge';

import PopupContent from './PopupContent';
import ModalWarning from './ModalWarning';

class MarkersLayer extends Component {
  render() {
    const {
      stationsList,
      error,
      refreshStationsList,
      minStandsToDisplay,
      minBikesToDisplay,
      handleFavList,
      favStationsId
    } = this.props;

    const allStationsMarkers = stationsList
      .filter(stationData => (stationData.available_bike_stands >= minStandsToDisplay) && (stationData.available_bikes >= minBikesToDisplay))
      .map(stationData => (
        <Marker
          icon={L.divIcon({
            className: 'custom-icon',
            html: ReactDOMServer.renderToString(
              <SvgStationIconGauge
                perc={(stationData.available_bike_stands / stationData.bike_stands) * 110}
              />
            ),
            iconSize: [16, 45]
          })}
          position={[stationData.position.lat, stationData.position.lng]}
          key={`marker_${stationData.name}`}
        >
          <Popup>
            <PopupContent
              marker={stationData}
              refreshStationsList={refreshStationsList}
              favStationsId={favStationsId}
              handleFavList={handleFavList}
            />
          </Popup>
        </Marker>
      ));

    const displayMarkers = error ? (
      <ModalWarning
        error={error}
        clearError={this.clearError}
        refresh={this.refreshStationsList}
      />)
      : allStationsMarkers;

    return (
      <div>
        {displayMarkers}
      </div>
    );
  }
}

export default MarkersLayer;
