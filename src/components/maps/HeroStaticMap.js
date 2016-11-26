import React from 'react';

import StaticMap from './StaticMap';

const HeroStaticMap = ({ latitude, longitude }) => {
  console.log(latitude, longitude);

  let white = "0xFFFFFF"
  let black = "0x222222"
  let whiteShade = "0xF4F4F4"

  let mapProps = {}
  mapProps.latitude = latitude
  mapProps.longitude = longitude
  mapProps.zoom = 16
  mapProps.width = 300
  mapProps.height = 150
  mapProps.scale = 2
  mapProps.markers = {
    locations: [ 
      `${latitude},${longitude}`, 
    ]
  }
  mapProps.styles = [
    // hidden items
    {
      feature: "poi",
      rules: {
        visibility: "off",
      }
    },
    {
      element: "labels.icon",
      rules: {
        visibility: "off",
      }
    },
    // general landscape
    {
      feature: "landscape",  
      element: "geometry",
      rules: {
        color: white,
        visibility: "simplified",
      }
    },
    // roads
    {
      feature: "road",
      element: "geometry.fill",
      rules: {
        color: black,
      }
    },
    {
      feature: "road",
      element: "geometry.stroke",
      rules: {
        visibility: "off"
      }
    },
    {
      feature: "road",
      element: "labels.text.fill",
      rules: {
        color: white,
      }
    },
    {
      feature: "road",
      element: "labels.text.stroke",
      rules: {
        color: black,
      }
    },
  ]

  mapProps.APIKey = 'AIzaSyAAZvR0LhIx6x6LWF3tt4oNSG2SEv40zFU'

  mapProps.className = 'span4'

  let mapLink = "https://www.google.com/maps/dir/Current+Location/" + latitude + ',' + longitude

  return (
    <StaticMap {...mapProps}/>
  )
}

export default HeroStaticMap;