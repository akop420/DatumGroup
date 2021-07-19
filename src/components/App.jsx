import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPoint } from '../reducers/pointsreducer';
import  MapComponent from '../components/MapComponent/map';

function App() {
    const data = useSelector(state => state.points.data)

    return <MapComponent data={data} addPoint={addPoint} />;
    
};

export default App;