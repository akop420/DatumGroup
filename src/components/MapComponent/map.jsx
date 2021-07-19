import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import OSM from 'ol/source/OSM';
import 'antd/dist/antd.css';
import { Modal, Button, Input, notification } from 'antd';
import styles from './style.css'


const MapComponent = (props) => {
  const dispatch = useDispatch()
  const [ map, setMap ] = useState()
  const [ featuresLayer, setFeaturesLayer ] = useState()
  const [ selectedCoord , setSelectedCoord ] = useState()
  const [ isAddModal, setIsAddModal ] = useState(false)
  const [ name, setName ] = useState('')
  const [ description, setDescription] = useState('')


  const mapElement = useRef()
  const mapRef = useRef()
  mapRef.current = map

    
  useEffect( () => {
    const initalFeaturesLayer = new VectorLayer({
      source: new VectorSource()
    })

    const initialMap = new Map({
      target: mapElement.current,
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        initalFeaturesLayer 
      ],
      view: new View({
        center: [4421456.722271189, 5978458.369589963],
        zoom: 12,
        minZom: 12,
      }),
    })

    initialMap.on('click', handleMapClick)
    setMap(initialMap)
    setFeaturesLayer(initalFeaturesLayer)

  },[])

  const handleMapClick = (event) => {
    const clickedCoord = mapRef.current.getCoordinateFromPixel(event.pixel);
    setSelectedCoord( clickedCoord )
    setIsAddModal(true)
  }

  const handleCloseModal = () => {
      setIsAddModal(false)
      setName('')
      setDescription('')
  }

  const handleChangeName = (e) => {
      setName(e.target.value)
  }

  const handleChangeDescription = (e) => {
      setDescription(e.target.value)
  }

  const handleSave = async () => {
        await dispatch(props.addPoint(name, description, selectedCoord))
        handleCloseModal()
        notification.open({
            message: 'Маркер успешно добавлен',
        });
  }

        return (
            <>
             <div ref={mapElement} className="map-container" style={{ height: "100vh", width:"100%"}}></div>
            <Modal title="Добавить маркер" visible={isAddModal} onOk={handleSave} onCancel={handleCloseModal}>
                <div className="modalContainer">
                <Input id="name" placeholder="Введите название точки" value={name} onChange={(e) => handleChangeName(e)}/>
                <Input id="description" placeholder="Введите описание точки" value={description} onChange={(e) => handleChangeDescription(e)}/>,
                </div>
            </Modal>
            </>
           
        )
};

export default MapComponent