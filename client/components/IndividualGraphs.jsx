//       <Legend
//           data= {[
//             {
//               key: 'Group Benefit Curve',
//               color: 'orange'
//             }, {
//               key: 'P10',
//               color: 'cyan'
//             }, {
//               key: 'P50',
//               color: 'red'
//             }, {
//               key: 'p90',
//               color: 'black'
//             }
//           ]}
//           dataId={'key'}
//           horizontal
//           config = {[
//             {color: 'orange'},
//             {color: 'cyan'},
//             {color: 'red'},
//             {color: 'black'}
//           ]}
//           styles = {{
//             '.legend': {
//               backgroundColor: '#f9f9f9',
//               borderRadius: '2px',
//               fontSize: '0.8em',
//               marginLeft: '40px',
//               maxWidth: '50%',
//               fontFamily: '"Segoe UI", Frutiger, "Frutiger Linotype", "Dejavu Sans", "Helvetica Neue", Arial, sans-serif'
//             }
//           }}/>

//         <LineChart
//           data={
//             [
//               this.state.GBgraphData,
//               [{x: this.state.GBP10, y: 0}, {x: this.state.GBP10, y: this.state.GBMax}],
//               [{x: this.state.GBP50, y: 0}, {x: this.state.GBP50, y: this.state.GBMax}],
//               [{x: this.state.GBP90, y: 0}, {x: this.state.GBP90, y: this.state.GBMax}]
//             ]
//           }
//           width={1000}
//           height={400}
//           margin={{top: 40, right: 5, bottom: 30, left: 100}}
//           axes
//           axisLabels={{x: 'X Axis', y: 'Y Axis'}}
//           interpolate={'cardinal'}
//           grid
//           verticalGrid
//           lineColors={['orange', 'cyan', 'red', 'black']}
//           xDomainRange={[0, (this.state.GBP90 + 10000)]}
//           xTicks={10}
//           yTicks={10}
//         />

// <Legend
//           data= {[
//             {
//               key: 'Individual Cost Curve',
//               color: 'red'
//             }, {
//               key: 'P10',
//               color: 'blue'
//             }, {
//               key: 'P50',
//               color: 'green'
//             }, {
//               key: 'p90',
//               color: 'orange'
//             }
//           ]}
//           dataId={'key'}
//           horizontal
//           config = {[
//             {color: 'red'},
//             {color: 'blue'},
//             {color: 'green'},
//             {color: 'orange'}
//           ]}
//           styles = {{
//             '.legend': {
//               backgroundColor: '#f9f9f9',
//               borderRadius: '2px',
//               fontSize: '0.8em',
//               marginLeft: '40px',
//               maxWidth: '50%',
//               fontFamily: '"Segoe UI", Frutiger, "Frutiger Linotype", "Dejavu Sans", "Helvetica Neue", Arial, sans-serif'
//             }
//           }}/>
//         <LineChart
//           data={
//             [
//               this.state.ICgraphData,
//               [{x: this.state.ICP10, y: 0}, {x: this.state.ICP10, y: this.state.ICMax}],
//               [{x: this.state.ICP50, y: 0}, {x: this.state.ICP50, y: this.state.ICMax}],
//               [{x: this.state.ICP90, y: 0}, {x: this.state.ICP90, y: this.state.ICMax}]
//             ]
//           }
//           width={1000}
//           height={400}
//           margin={{top: 40, right: 5, bottom: 30, left: 100}}
//           axes
//           axisLabels={{x: 'X Axis', y: 'Y Axis'}}
//           interpolate={'cardinal'}
//           grid
//           verticalGrid
//           lineColors={['red', 'blue', 'green', 'orange']}
//           xDomainRange={[0, (this.state.ICP90 + 10000)]}
//           xTicks={10}
//           yTicks={10}
//         />
//         <h1 className = 'analysis-text'> Group Cost </h1>
//         <Legend
//           data= {[
//             {
//               key: 'Group Cost Curve',
//               color: 'purple'
//             }, {
//               key: 'P10',
//               color: 'green'
//             }, {
//               key: 'P50',
//               color: 'pink'
//             }, {
//               key: 'p90',
//               color: 'brown'
//             }
//           ]}
//           dataId={'key'}
//           horizontal
//           config = {[
//             {color: 'purple'},
//             {color: 'green'},
//             {color: 'pink'},
//             {color: 'brown'}
//           ]}
//           styles = {{
//             '.legend': {
//               backgroundColor: '#f9f9f9',
//               borderRadius: '2px',
//               fontSize: '0.8em',
//               marginLeft: '40px',
//               maxWidth: '50%',
//               fontFamily: '"Segoe UI", Frutiger, "Frutiger Linotype", "Dejavu Sans", "Helvetica Neue", Arial, sans-serif'
//             }
//           }}/>
//         <LineChart
//           data={
//             [
//               this.state.GCgraphData,
//               [{x: this.state.GCP10, y: 0}, {x: this.state.GCP10, y: this.state.GCMax}],
//               [{x: this.state.GCP50, y: 0}, {x: this.state.GCP50, y: this.state.GCMax}],
//               [{x: this.state.GCP90, y: 0}, {x: this.state.GCP90, y: this.state.GCMax}]
//             ]
//           }
//           width={1000}
//           height={400}
//           margin={{top: 40, right: 5, bottom: 30, left: 100}}
//           axes
//           axisLabels={{x: 'X Axis', y: 'Y Axis'}}
//           interpolate={'cardinal'}
//           grid
//           verticalGrid
//           lineColors={['purple', 'green', 'pink', 'brown']}
//           xDomainRange={[0, (this.state.GCP90 + 10000)]}
//           xTicks={10}
//           yTicks={10}
//         /> */}

{ /* <Legend
            data= {[
              {
                key: 'Your personal estimate of Cost',
                color: 'orange'
              }, {
                key: "Aggregate of all your group's personal Cost estimates",
                color: 'blue'
              }, {
                key: 'Individual Cost P10',
                color: 'cyan'
              }, {
                key: 'Individual Cost P50',
                color: 'purple'
              }, {
                key: 'Individual Cost p90',
                color: 'green'
              }
            ]}
            dataId={'key'}
            horizontal
            config = {[
              {color: 'orange'},
              {color: 'blue'},
              {color: 'cyan'},
              {color: 'purple'},
              {color: 'green'}
            ]}
            styles = {{
              '.legend': {
                backgroundColor: '#f9f9f9',
                borderRadius: '2px',
                fontSize: '0.8em',
                marginLeft: '40px',
                maxWidth: '50%',
                fontFamily: '"Segoe UI", Frutiger, "Frutiger Linotype", "Dejavu Sans", "Helvetica Neue", Arial, sans-serif'
              }
            }}/>
          <LineChart
            lineColors={['orange', 'blue', 'cyan', 'purple', 'green']}
            noAreaGradient
            dataPoints
            data={
              [
                this.state.GCgraphData,
                this.state.ICgraphData,
                [{x: this.state.ICP10, y: 0}, {x: this.state.ICP10, y: this.state.ICGCMax}],
                [{x: this.state.ICP50, y: 0}, {x: this.state.ICP50, y: this.state.ICGCMax}],
                [{x: this.state.ICP90, y: 0}, {x: this.state.ICP90, y: this.state.ICGCMax}]
              ]
            }
            width={1000}
            height={400}
            margin={{top: 40, right: 5, bottom: 60, left: 60}}
            axes
            axisLabels={{x: 'Dollar Value ($)', y: 'Y Axis'}}
            interpolate={'cardinal'}
            grid
            verticalGrid

            xTicks={10}
            yTicks={10}
          /> */ }
{/* <Legend
            data= {[
              {
                key: "Group's agreed estimate of Benefit * Chance of Success",
                color: 'red'
              }, {
                key: 'Your personal estimate of Cost',
                color: 'blue'
              }, {
                key: 'Group Benefit P10',
                color: 'cyan'
              }, {
                key: 'Group Benefit P50',
                color: 'purple'
              }, {
                key: 'Group Benefit p90',
                color: 'green'
              }
            ]}
            dataId={'key'}
            horizontal
            config = {[
              {color: 'red'},
              {color: 'blue'},
              {color: 'cyan'},
              {color: 'purple'},
              {color: 'green'}
            ]}
            styles = {{
              '.legend': {
                backgroundColor: '#f9f9f9',
                borderRadius: '2px',
                fontSize: '0.8em',
                marginLeft: '40px',
                maxWidth: '50%',
                fontFamily: '"Segoe UI", Frutiger, "Frutiger Linotype", "Dejavu Sans", "Helvetica Neue", Arial, sans-serif'
              }
            }}/>
          <LineChart
            lineColors={['red', 'blue', 'cyan', 'purple', 'green']}
            noAreaGradient
            data={
              [
                this.state.GBgraphData,
                this.state.ICgraphData,
                [{x: this.state.GBP10, y: 0}, {x: this.state.GBP10, y: this.state.GBICMax}],
                [{x: this.state.GBP50, y: 0}, {x: this.state.GBP50, y: this.state.GBICMax}],
                [{x: this.state.GBP90, y: 0}, {x: this.state.GBP90, y: this.state.GBICMax}]
              ]
            }
            width={1000}
            height={400}
            margin={{top: 40, right: 5, bottom: 60, left: 60}}
            axes
            axisLabels={{x: 'Dollar Value ($)', y: 'Y Axis'}}
            interpolate={'cardinal'}
            grid
            verticalGrid

            xTicks={10}
            yTicks={10}
          /> */}

          // import {LineChart, Legend} from 'react-easy-chart'