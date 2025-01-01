# [YAAH] Ban Detector

_You Are A Hitman_ is a community of like-minded individuals helping rid public platforms of harmful material (such as pornography and others).

The **Ban Detector** is an automated tool for keeping track of the accounts on the _"hit list"_, and whether or not they have been successfully removed from the platforms.

### Project Vision

Our vision with the **Ban Detector** is to:
- Help allocate community resources towards real action, rather than confirming bans
- Help keep track of banned and not-yet-banned accounts
- Help make our efforts more fruitful due to less wasted efforts

### Project Status

The project is currently in it's early stages

## Getting Started

To run this application, you will need
[https://nodejs.org](Node.js)
as well as a
[https://en.wikipedia.org/wiki/Chromium_(web_browser)#Browsers_based_on_Chromium](Chromium-based browser).

Once you have installed these two, clone the repository somewhere:

``` sh
git clone https://github.com/yaah-cause/ban-detector
```

Then, create an `.env` file inside of the cloned directory with the following content, replacing `...` with the absolute path to the desired Chromium browser:

``` dotenv
BROWSER_PATH=...
```

Finally, you can install the dependencies and start the application (running these commands from within the directory)

``` sh
npm install
npm start
```
