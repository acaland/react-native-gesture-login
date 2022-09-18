import React, {Component} from "react"
import {View} from "react-native"
import PropTypes from "prop-types"

import style from "../styles/Dot"


class Dot extends Component {

    lined = false;
    linedCircleStyle;
    linedCenterStyle;

    shouldComponentUpdate(nextProps, nextState) {
        const {lined = false, linedCircleStyle, linedCenterStyle} = nextProps;
        const oldLined = this.lined;
        this.lined = lined;

        const oldLinedCircleStyle = this.linedCircleStyle;
        this.linedCircleStyle = linedCircleStyle;

        const oldLinedCenterStyle = this.linedCenterStyle;
        this.linedCenterStyle = linedCenterStyle;

        return lined !== oldLined || linedCircleStyle !== oldLinedCircleStyle || linedCenterStyle !== oldLinedCenterStyle;
    }

    layout = (event) => {
        const {id, reportCenter} = this.props;
        if (reportCenter !== undefined) {
            const {x, y, width} = event.nativeEvent.layout;
            const radius = 0.5 * width;
            const center = {x: x + radius, y: y + radius};
            reportCenter(id, center, radius);
        }
    };

    render() {
        const {lined = false, circleStyle, centerStyle, linedCircleStyle, linedCenterStyle} = this.props;
        const circleLinedStyle = lined ? [style.circleLined, linedCircleStyle] : [];
        const centerLinedStyle = lined ? [style.centerLined, linedCenterStyle] : [];

        return (
            <View style={[style.circle, circleStyle, ...circleLinedStyle]} onLayout={this.layout}>
                <View style={[style.center, centerStyle, ...centerLinedStyle]}>
                </View>
            </View>
        )
    }

}

Dot.propTypes = {
    id: PropTypes.string,
    lined: PropTypes.bool,
    circleStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.number, PropTypes.object]),
    centerStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.number, PropTypes.object]),
    linedCircleStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.number, PropTypes.object]),
    linedCenterStyle: PropTypes.oneOfType([PropTypes.array, PropTypes.number, PropTypes.object]),

    reportCenter: PropTypes.func,
};

export default Dot