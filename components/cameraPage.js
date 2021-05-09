import React from 'react';
import { Camera } from 'expo-camera';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import styled from 'styled-components';

import styles from './styles';
import Toolbar from './toolbarComponent';
import Gallery from './galleryComponent';
import getRawLabels from '../utils/googlevision'

class CameraPage extends React.Component {
    camera = null;

    state = {
        captures: [],
        imageLabels: [],
        capturing: null,
        hasCameraPermission: null,
        cameraType: Camera.Constants.Type.back,
        flashMode: Camera.Constants.FlashMode.off,
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
        const image = await getRawLabels(photoData.base64).catch(e => { 
            console.log(Error(e));
            this.setState({ awaitingGoogle: false});
            return;
        });
        
        this.setState({imageLabels: [image, ...this.state.imageLabels]});
        console.log(this.state.imageLabels)
        this.setState({ awaitingGoogle: false, capturing: false, captures: [photoData, ...this.state.captures] })
    };

    async componentDidMount() {
        const camera = await Camera.requestPermissionsAsync().catch(e => console.log(Error(e)));
        const hasCameraPermission = (camera.status === 'granted');
        this.setState({ hasCameraPermission });
    };

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
                            this.props.navigation.navigate('Review');
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