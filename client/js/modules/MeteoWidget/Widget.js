import React from "react";
import inject from "react-jss";
import { geolocated } from "../../components/HOCS/GeoLocated";
import Day from "../../components/Day";
import Week from "../../components/Week";
import { getForecast } from "./methods";
import { getIcon } from "../../utils/iconMapping";
import { convertToCelsius } from "../../utils/weatherConversion";

const style = {
  container: {
    width: "100%",
    height: "100%",
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: "linear-gradient(0deg, #cee1e5 0%, #c7e7ff 100%)"
  },
  flipCard: {
    height: 366,
    width: 256,
    background: "#48c3d9",
    boxShadow: "0px 0px 40px 2px rgba(0,0,0,0.2)",
    position: "relative",
    color: "white",
    fontFamily: "myriad-pro, sans-serif",
    fontStyle: "normal"
  },
  headerLeftIcon: {
    position: "absolute",
    top: 22,
    left: 18,
    fontSize: 20
  },
  headerLeftTextCity: {
    position: "absolute",
    top: 22,
    left: 36,
    fontSize: "20.7px",
    fontWeight: "400"
  },
  headerLeftTextAtm: {
    position: "absolute",
    top: 46,
    left: 36,
    fontSize: "12.66px",
    fontWeight: "400",
    textTransform: "lowercase"
  },
  headerLeftTextWind: {
    position: "absolute",
    top: 62,
    left: 36,
    fontSize: "12.66px",
    fontWeight: "400",
    textTransform: "lowercase"
  },
  headerRightTextBig: {
    position: "absolute",
    top: 22,
    left: 182,
    fontSize: "38.04px",
    fontWeight: "700"
  },
  headerRightTextSmall: {
    position: "absolute",
    top: 23,
    left: 224,
    fontSize: "18.91px",
    fontWeight: "700"
  },
  bodyIcon: {
    position: "absolute",
    top: 112,
    fontSize: "96px",
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  footerUmidity: {
    position: "absolute",
    top: 260,
    left: 0,
    padding: "0px 10px",
    boxSizing: "border-box",
    width: "100%",
    fontSize: "12.66px",
    letterSpacing: "-0.5px",
    fontWeight: 400,
    display: "flex",
    justifyContent: "space-between"
  },
  footerLeftText: {},
  footerRightText: {},
  footerText: {
    lineHeight: 9
  }
};

class Widget extends React.Component {
  constructor() {
    super();
    this.state = {
      currentDay: "Tue",
      umidita: null,
      previsioni: null,
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
          previsioni,
          temperatura: convertToCelsius(temperatura),
          condizioniAtmosferiche,
          citta,
          data,
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
      <div className={classes.container}>
        <div className={classes.flipCard}>
          <div className={classes.headerLeftIcon}>
            <i className={"fas fa-map-marker-alt"} />
          </div>
          <div className={classes.headerLeftTextCity}>{citta}</div>
          <div className={classes.headerLeftTextAtm}>{condizioniAtmosferiche}</div>
          <div className={classes.headerLeftTextWind}>vento: {velocitaVento} km/h</div>

          <div className={classes.headerRightTextBig}>{temperatura}</div>

          <div className={classes.headerRightTextSmall}>o</div>

          <div className={classes.bodyIcon}>
            <i className={getIcon(codice)} />
          </div>

          <div className={classes.footerUmidity}>
            <div className={classes.footerLeftText}>
              <div>FEELS LIKE:</div>
              <div>53*</div>
            </div>

            <div className={classes.footerRightText}>
              <div>HUMANITY</div>
              <div>{umidita}*</div>
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
      </div>
    );
  }
}

export default inject(style)(geolocated()(Widget));
