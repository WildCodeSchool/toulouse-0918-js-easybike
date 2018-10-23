import React, { Component } from 'react';
import ItineraryInputModule from './ItineraryInputModule';
import AdressInputModule from './AdressInputModule';

class NavigationModule extends Component {
  render() {
    const { itinerary, selectNavigation } = this.props;
    return (
      <div className="card my-2">
        <div className="card-header font-weight-bold">NAVIGATION</div>
        <div className="card-body p-2">
          <div className="card-text">
            <form>
              <div className="form-check mb-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="itinerary"
                  onChange={selectNavigation}
                  checked={itinerary}
                />
                <span> Rechercher un trajet</span>
              </div>
              <div className="form-group">
                <AdressInputModule itinerary={itinerary} />
                <ItineraryInputModule itinerary={itinerary} />
                <button type="button" className="btn btn-primary mt-2">Rechercher</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
};


export default NavigationModule;