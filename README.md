# Reach - trip timer web app
Reach is a real-time trip timer application that will help you decide which points of interests you can reach when you only have a limited amount of time.

![](screencast.gif)

A trip timer application where you can enter points of interests and see whether you can still reach them given your remaining time. React was used to render the travel times dynamically on a Google map, and Redux was used for state management. Material-UI react components were used to style the web app. Google Maps Distance Matrix API was used to obtain the travel time data. Built during a 3 day hackathon at FullStack Academy.

React, Redux, Firebase hosting, Google Maps API, Material-UI, Web Geolocation API

## To use:

1. Visit the hosted site [here](https://stackathon-trip-planner.firebaseapp.com/)
2. Allow your location to be tracked while using this app
3. You can stop your location from being tracked by simply closing the browser tab or by clicking the GPS icon in the url bar and clicking 'clear these settings for future visits'
4. You can center the map to your current location by clicking on the GPS icon button in the nav bar
5. Input a time
6. You can either:
  - Click on the map to add points of interests
  - Or search for a location with the search bar.
7. Pick a mode of transportation on the bottom
8. Start the timer
9. Every 30seconds, the app will re-calculate the travel times from your new location, so it will give you the latest time estimates based on your real time location.
10. You can immediately update the travel times by pressing the route icon button

