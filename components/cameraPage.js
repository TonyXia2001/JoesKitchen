import React from 'react';
import { Camera } from 'expo-camera';
import { View, Text } from 'react-native';

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
    };

    setFlashMode = (flashMode) => this.setState({ flashMode });
    setCameraType = (cameraType) => this.setState({ cameraType });
    // handleCaptureIn = () => this.setState({ capturing: true });

    // handleCaptureOut = () => {
    //     if (this.state.capturing)
    //         this.camera.stopRecording();
    // };

    handleShortCapture = async () => {
        const photoData = await this.camera.takePictureAsync({base64: true});
        const image = await getRawLabels(photoData.base64.substring(photoData.base64.indexOf(",") + 1));
        this.setState({imageLabels: [image, ...this.state.imageLabels]});
        console.log(this.state.imageLabels)
        this.setState({ capturing: false, captures: [photoData, ...this.state.captures] })
    };

    // handleLongCapture = async () => {
    //     const videoData = await this.camera.recordAsync();
    //     this.setState({ capturing: false, captures: [videoData, ...this.state.captures] });
    // };

    async componentDidMount() {
        const camera = await Camera.requestPermissionsAsync();
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
                    //onCaptureIn={this.handleCaptureIn}
                    //onCaptureOut={this.handleCaptureOut}
                    //onLongCapture={this.handleLongCapture}
                    onShortCapture={this.handleShortCapture}
                />
            </React.Fragment>
        );
    };
};

export {CameraPage};