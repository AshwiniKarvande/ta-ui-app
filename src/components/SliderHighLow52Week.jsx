import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const SliderHighLow52Week = ({data}) => {
    const min = data.low;
    const max = data.high;
    const mid = (max + min) / 2;
    const marks = {
        [min]: min,
        [max]: max,
        [mid]: {
            style: {
                color: 'red',
                fontWeight: 'bold',
            },
            label: data.lastPrice,
        },
        [(min + mid) / 2]: {
            style: {
                color: 'green',
            },
            label: data.fromLowPer + '% >>>',
        },
        [(mid + max) / 2]: {
            style: {
                color: 'blue',
            },
            label: '<<< ' + data.fromHighPer + '%',
        }
    };
 
  return (
    <Slider
        defaultValue={data.lastPrice}
        min={min}
        max={max}
        marks={marks}
        style={{ width: 400, margin: '0 auto' }}
        dotStyle={{ display: 'none'}}
        trackStyle={{ backgroundColor: 'green', height: 10 }}
        railStyle={{ backgroundColor: 'red', height: 10 }}
        handleStyle={{ backgroundColor: 'blue', borderColor: 'blue', height: 20, width: 20, marginLeft: -10, marginTop: -5 }}
        value={data.lastPrice}
        disabled={true}                     
    /> 
  )
}

export default SliderHighLow52Week
