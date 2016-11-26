import React from 'react';

const StaticMap = ({ className, latitude, longitude, markers, zoom, width, height, scale, styles, APIKey }) => {
  let and = "&"
  let bar = "%7C"

  let URL

  // add required components definitions to the url
  let baseURL = "https://maps.googleapis.com/maps/api/staticmap?"
  let centerURL  = "center=" + latitude + "," + longitude
  let zoomURL = "zoom=" + zoom
  let sizeURL = "size=" + width + "x" + height

  URL = baseURL + and + centerURL + and + zoomURL + and + sizeURL

  // add optional elements to the url
  if (scale){
      let scaleURL = "scale=" + scale
      URL += and + scaleURL
  }

  if (markers){
      let markersURL =  "markers="
      if (markers.style){
          markersURL += markers.style + bar
      }
      for (let i = 0; i < markers.locations.length; ++i){
          if (i > 0){
              markersURL += bar + markers.locations[i]
          }
          else {
              markersURL += markers.locations[i]
          }
      }
      URL += and + markersURL
  }

  //add all of the style elements to the url
  if(styles){
      for (let i = 0; i < styles.length; ++i){
          let singleStyle = styles[i]
          let styleURL = "style="
          // console.log("styles=")
          if(singleStyle.feature){
              styleURL += "feature:" + singleStyle.feature
              // console.log("feature:" + singleStyle.feature)
              
          }
          if(singleStyle.element){
              if(singleStyle.feature){
                  //add a seporator if the feature was defined
                  styleURL += bar
              }
              styleURL += "element:" + singleStyle.element
              // console.log( "element:" + singleStyle.element )
          }
          
          let keys = Object.keys(singleStyle.rules)
          for (let j = 0; j < keys.length; ++j){
              styleURL += bar + keys[j] + ":" +singleStyle.rules[keys[j]]
              // console.log( keys[j] + ":" +singleStyle.rules[keys[j]] )
          }
          URL += and + styleURL;
      }
  }

  // add the api key to the url
  let keyURL = 'key=' + APIKey
  URL += and + keyURL

  let mapStyle = {
      // width: '100%',
      // objectFit: 'contain'
  }

  return (
      <img src={ URL } className={ className } style={ mapStyle } />
  )
}

export default StaticMap;