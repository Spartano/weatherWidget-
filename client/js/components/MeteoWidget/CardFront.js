import React from "react";
import Day from "./Day";
import Week from "./Week";
import { getForecast } from "../../modules/MeteoWidget/methods";
import { getIcon } from "../../utils/iconMapping";
import { convertToCelsius } from "../../utils/weatherConversion";
import moment from "moment";

import "./CardFront.css";

class CardFront extends React.Component {
  constructor() {
    super();
    this.state = {
      currentDay: moment().format("ddd"),
      umidita: null,
      previsioni: [],
      temperatura: null,
      condizioniAtmosferiche: null,
      citta: null,
      data: null,
      codice: null,
      velocitaVento: null
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps && nextProps.coords) {
      let { latitude: lat, longitude: lng } = nextProps.coords;

      getForecast(lat, lng).then(res => {
        let {
          atmosphere: { humidity: umidita },
          item: {
            forecast: previsioni,
            condition: { temp: temperatura, text: condizioniAtmosferiche, date: data, code: codice }
          },
          location: { city: citta },
          wind: { speed: velocitaVento }
        } = res;

        this.setState({
          umidita,
          previsioni: previsioni.slice(0, 6),
          temperatura: convertToCelsius(temperatura),
          condizioniAtmosferiche,
          citta,
          data: moment(data, "ddd").format("dddd"),
          codice,
          velocitaVento
        });
      });
    }
  }

  render() {
    let { classes } = this.props;
    let {
      currentDay,
      umidita,
      previsioni,
      temperatura,
      condizioniAtmosferiche,
      citta,
      data,
      codice,
      velocitaVento
    } = this.state;

    return (
      <div className="card-side side-front">
        <div className={"headerLeftIcon"}>
          <i className={"fas fa-map-marker-alt"} />
        </div>
        <div className={"headerLeftTextCity"}>{citta}</div>
        <div className={"headerLeftTextAtm"}>{condizioniAtmosferiche}</div>
        <div className={"headerLeftTextWind"}>vento: {velocitaVento} km/h</div>

        <div className={"headerRightTextBig"}>{temperatura}°</div>

        <div className={"bodyIcon"}>
          <i className={getIcon(codice)} />
        </div>

        <div className={"footerUmidity"}>
          <div>
            <div>FEELS LIKE:</div>
            <div>{temperatura}°</div>
          </div>

          <div>
            <div>HUMIDITY</div>
            <div>{umidita}%</div>
          </div>
        </div>

        <Week>
          <Day borderRight day="Mon" currentDay={currentDay} />
          <Day borderRight borderLeft day="Tue" currentDay={currentDay} />
          <Day borderRight borderLeft day="Wed" currentDay={currentDay} />
          <Day borderRight borderLeft day="Thu" currentDay={currentDay} />
          <Day borderRight borderLeft day="Fri" currentDay={currentDay} />
          <Day borderRight borderLeft day="Sat" currentDay={currentDay} />
          <Day borderLeft day="Sun" currentDay={currentDay} />
        </Week>
      </div>
    );
  }
}

export default CardFront;
