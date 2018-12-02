# HandiMaps

## Table of contents

* [Summary](#summary)
* [Visioni](#vision)
* [Technologies](#technologies)
	* [Backend](#backend)
	* [Frontend](#frontend)
* [Demo](#demo)
* [Running your project](#running-the-project)

## Summary
This is a project that was created for the Yhacks 2018 hackathon, and was created by 4 members of the ad-fidelitas association (Mohamed Beydoun, Valerian Clerc, Alexandre Falardeau and Hannh Lee). The first major section of the application pulls images from different sources (currently in application crowsourcing and Google Places Api) and manipulates them with computer vision operations as to anlayse them using the Google vision API. This data is afterwards bundled and made accessable through an local API endpoint. The second major part of the application takes the computed data from the backend and displays it on a google map by generating a network of colored polygons from the data (see example in demo).
<!-- Talk about yale hacks and general description here -->
## Vision
<!-- Talk about the use case, the challenge and etc -->

## Technologies

#### Requirements:
- Node.JS/npm
- Python 3.5+
- MongoDb

### Backend

#### Google Vision API

The Google Vision is the crowning jewl of the application, being used to complete analysis on images we receive from third parties. We process tags generated from the Vision AI to generate numerical evaluations for those images.

#### Open CV
We used the open Cv computer vision python library to transform and cut sections of images as to properly format them for the Google Vision API. Images were cut up so we could perform analysis on different sectors as to obtain more thourough data for the rating process.

#### Express

Express was used to manage the our API endpoints for our image analysis backend.

#### MongoDb

We used MongoDb in tandem with the mongoose librairy to send and query data from a database. Our Database was used to store image analysis results.

### Frontend

#### ReactJs

ReactJs was used to structure the front-end section of the application. We use the react router to manage different front-end componnents while maintining a single page web application.

#### Google Maps API

The google maps API is used to embedd a map component into our react application. Using component overlays, we were able to display real-world data using by adding a network of colored polygons (see the demo for an example of this display).

#### d3 librairys

## Demo

![](/readme-images/home.png?raw=true)

![](/readme-images/upload.png?raw=true)

![](/readme-images/map1.png?raw=true)

## Running the project

#### Set-up:
-Requires file named 'yhackGCP.json' with GCP access (omitted from this repository because it contains sensitive account information)
-Run: 'bash setup.bash' in backend folder to setup
-Run node server (TODO: finish this part when node server is functional)




