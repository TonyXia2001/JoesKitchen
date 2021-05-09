import axios from 'axios'
import {GOOGLE_API_KEY} from '@env'

async function getRawLabels(image) {
  const response = await axios.post(`https://content-vision.googleapis.com/v1/images:annotate?alt=json&key=${GOOGLE_API_KEY}`,
    {
      requests: [
        {
          features: [
            {
              type: "LABEL_DETECTION"
            }
          ],
          image: {
            content: image
          }
        }
      ]
    }
  ).catch(e => {
    console.log(Error(e));
  });
  if (response.data) {
    return response.data;
  } else {
    return {};
  }
}

export default getRawLabels;
