

## Server Configureation info
I used nginx to forward incoming requests to my servers<br />
I used pm2 to run my node applications locally<br />

location / {
        proxy_pass http://localhost:****;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }<br />
    location /quizapp {
        proxy_pass http://localhost:****;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }<br />
    location /answers {
        proxy_pass http://localhost:****;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

## Database Info
database username: ********* 
password: *********

version 2.0

CREATE TABLE questions (
    ID int NOT NULL AUTO_INCREMENT,
    question varchar(1024) NOT NULL,
    PRIMARY KEY (ID)
);<br />

CREATE TABLE answers (
    ID int NOT NULL AUTO_INCREMENT,
	QID int NOT NULL,
    answer varchar(255) NOT NULL,
	correct int NOT NULL,
    PRIMARY KEY (ID)
);<br />


INSERT INTO questions (question)
VALUES 
('What is forty-eight divided by six?'),
('Ernie had $10 in cash, with which he purchased gum for $1.29, a candy bar for $1.49 and a beverage for $2.39. If he does not have to pay sales tax, how much change should he receive?'),
('The Johnson household has a food budget of $355 per month. They have already spent $187 this month. How much is left in their budget for the month?'),
('Npm init creates a package.json file in your current directory.'),
('The third president of the United States was:'),
('O to the n^2 complexity is a good complexity for a sorting algorithm.'),
('Which of these names is NOT a a real city in Europe:');<br />


INSERT INTO answers (QID, answer, correct)
VALUES 
(1,'7',0),
(1,'8',1),
(1,'6',0),
(1,'9',0),
(2,'4.27',0),
(2,'4.64',0),
(2,'4.83',1),
(2,'4.89',0),
(2,'4.93',0),
(3,'168',1),
(3,'178',0),
(3,'164',0),
(3,'89',0),
(3,'162',0),
(4,'true',1),
(4,'false',0),
(5,'John Adams',0),
(5,'James Madison',0),
(5,'James Monroe',0),
(5,'Thomas Jefferson',1),
(6,'true',0),
(6,'false',1),
(7,'Zerkenstin',1),
(7,'Geilenkirchen',0),
(7,'Rottenegg',0),
(7,'Nasty',0);<br />

## Create React App info
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
