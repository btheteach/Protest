# RadioHash
Author: Knowledge Brown

## About
The goal of this project is to create a native app to help protestors stay in communication when phone communications are being jammed. The inspiration came from two-factor authentication apps that use a seed to create one time codes as a verification code. This will be adapted to a seed that is hased along with time intervals to map to a radio frequency. Protestors using this frequency can communicate short messages on unbothered air. The one time code is re-created on an interval chosen by the client in order to evade jamming on each channel. 
### Workflow
Before a protest one user will generate a new seed with optional parameters of time interval for changes and range of channels or frequencies. They can send this seed to other protestors in this "cluster" and they in turn add it to their list of clusters. After that, they only need to open the app to see the frequency of the time.

## Tech Stack
React-Native, Expo, Redux