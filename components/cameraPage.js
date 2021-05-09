import React from 'react';
import { Camera } from 'expo-camera';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import styled from 'styled-components';

import styles from './styles';
import Toolbar from './toolbarComponent';
import Gallery from './galleryComponent';
import getRawLabels from '../utils/googlevision'
import { foodWords } from '../utils/foods'
import FuzzySet from 'fuzzyset'

class CameraPage extends React.Component {
    camera = null;

    state = {
        captures: [],
        imageLabels: [],
        capturing: null,
        hasCameraPermission: null,
        cameraType: Camera.Constants.Type.back,
        flashMode: Camera.Constants.FlashMode.off,
        foodWords: FuzzySet(foodWords.words),
        awaitingGoogle: false
    };

    setFlashMode = (flashMode) => this.setState({ flashMode });
    setCameraType = (cameraType) => this.setState({ cameraType });

    handleShortCapture = async () => {
        this.setState({ awaitingGoogle: true});
        const photoData = await this.camera.takePictureAsync({base64: true}).catch(e => {
            console.log(Error(e));
            this.setState({ awaitingGoogle: false});
            return;
        });
        this.setState({capturing: false, captures: [photoData, ...this.state.captures] })
        const image = await getRawLabels(photoData.base64).catch(e => { 
            console.log(Error(e));
            this.setState({ awaitingGoogle: false});
            return;
        });
        this.setState({awaitingGoogle: false, imageLabels: [image, ...this.state.imageLabels]});
        
    };

    async componentDidMount() {
        const camera = await Camera.requestPermissionsAsync().catch(e => console.log(Error(e)));
        const hasCameraPermission = (camera.status === 'granted');
        this.setState({ hasCameraPermission });
    };

    getListofFood = () => {
        var listofLabels = []
        const imglabs = this.state.imageLabels

        if (imglabs == null) {
            return listofLabels
        }
        for (let i = 0; i < imglabs.length; i++) {
            for (let j = 0; j < imglabs[i].responses[0].localizedObjectAnnotations.length; j++){
                if (imglabs[i].responses[0].localizedObjectAnnotations[j].score > 0.5) { // Change score to good one
                    listofLabels.push(imglabs[i].responses[0].localizedObjectAnnotations[j].name)
                }
            }
        }
        return listofLabels
    }

    filteredListofFood = () => {
        let filteredList = []
        let word = ""
        let listofFood = this.getListofFood()
        for (let i = 0; i < listofFood.length; i++) {
            word = this.state.foodWords.get(listofFood[i], null, .5)
            if (word != null && word.length != 0){
                filteredList.push(word[0][1])
            }
        }
        return filteredList
    }

    render() {
        const { hasCameraPermission, flashMode, cameraType, capturing, captures } = this.state;

        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>Access to camera has been denied.</Text>;
        }

        return (
            <React.Fragment>
                {
                    !this.state.awaitingGoogle &&
                    <StyledNext
                        onPress={ () => {
                        if (this.state.awaitingGoogle === true) {
                            Alert.alert("Please wait until Google processes your images!");
                        } else {
                            this.props.navigation.navigate('Review', {foodList: this.filteredListofFood()});
                        }
                    }}>
                        <Text>Next</Text>
                    </StyledNext>
                }
                <View>
                    <Camera
                        type={cameraType}
                        flashMode={flashMode}
                        style={styles.preview}
                        ref={camera => this.camera = camera}
                    />
                </View>

                {captures.length > 0 && <Gallery captures={captures}/>}

                <Toolbar 
                    capturing={capturing}
                    flashMode={flashMode}
                    cameraType={cameraType}
                    setFlashMode={this.setFlashMode}
                    setCameraType={this.setCameraType}
                    onShortCapture={this.handleShortCapture}
                />
            </React.Fragment>
        );
    };
};

const StyledNext = styled(TouchableOpacity)`
    top: -36px;
    left: 360px;
    background: #fff;
    z-index: 3;
    position: absolute;
    width: 50px;
`;

export {CameraPage};