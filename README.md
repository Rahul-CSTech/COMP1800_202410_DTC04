# Project Title
Heemang


## Project Description
This is a planner app loaded with additional help from intelligent AI.

## Technologies and Resources Used
List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.
* HTML, CSS, JavaScript
* Bootstrap 5.0 (Frontend library)
* Firebase 8.0 (BAAS - Backend as a Service)
* NodeJS 20.11
* cors: 2.8.5
* express: 4.19.2
* openai: 4.31.0
* serverless-http:3.2.0

## Contents
 Top level of project folder: 
├── .gitignore: Specifies files and patterns to exclude from Git tracking.\
├── README.md: This descriptive project documentation.\
├── .firebase/: Folder containing Firebase-related assets.\
├── .firebaserc: Firebase configuration file.\
├── 404.html: Custom error page for 'Not Found' situations.\
├── firebase.json: Firebase hosting configuration.\
├── firestore.indexes.json: Firestore index definitions.\
├── firestore.rules: Firestore security rules.\
├── storage.rules: Firebase Storage security rules.\
├── tailwind.config.js (using Tailwind CSS)

├── index.html: The first login page, which user can choose between SignIn/SignUp.\
├── signup.html: The page users can sign up.\
├── profile.html: The page shows current user's information.\
├── main.html: Our webapp's main page, can be linked to any features.\
├── journal.html: The journal main page.\
├── journal_edit.html: The page users can edit their own journals.\
├── journal_new.html: The page users can add their new journals.\
├── consultation.html: The page users can interact with our AI-based consultant.\
├── tasks.html: The task main page.\
├── task_new.html: The page users can add their new task.

It has the following subfolders and files:
├── images/: Folder containing image assets.\
	Habit.svg: Icon representing habit tracking or formation.\
	home.svg: Icon representing the home page or a main navigation element.\
	journal.svg: Icon representing a journaling or logging feature.\
	methodologies.svg: Icon representing methodologies or approaches.\
	tasks.svg: Icon representing tasks or to-do management.

├── scripts/: Folder containing JavaScript scripts\
	authentication.js: Handles user login, registration, and session management.\
	calendar.js: Implements calendar views, event scheduling, and related features.\
	consultation.js: Facilitates consultation booking, scheduling, or management.\
	firebaseAPI_TEAM04.js: Manages interactions with the Firebase database (data retrieval, updates, etc.)\
	journal.js: Provides core journal viewing and listing functionality.\
	journal_edit.js: Handles editing existing journal entries.\
	journal_new.js: Enables creating new journal entries.\
	profile.js: Manages user profile information and settings.\
	signin.js: Implements the sign-in process.\
	signup.js: Handles new user registration.\
	tasks.js Provides task listing, viewing, and management.\
	task_new.js: Handles the creation of new tasks.\
	script.js: Contains general or core functionality used across multiple pages to add notes.\
	skeleton.js: Provides a base structure and layout upon which pages can be built.\

├── styles/: Folder containing CSS style sheets.\
	style.css: Primary stylesheet for the project, defining the general look and feel.\
	style_methodology.css: Stylesheet containing specific styles for a "consultation" component or section of your project.\

├── openai_backend/: Folder containing code/configuration related to OpenAI integration.\
	constants.json: Contains configuration values and constants used throughout the project.\
	index.js: The main entry point for your Node.js application.\
	package-lock.json: Automatically generated file for managing exact package dependencies.\
	package.json: Project metadata, including name, description, dependencies, and scripts.\

├── text/: Folder containing text-related files or data.\
	head.html: Contains metadata, title, link to stylesheets, and other elements in the <head> section of HTML pages.\
	header.html: Contains the website's main header area.\
	header_login_nav.html Llogin-specific navigation or menu within the header.\
	header_main_nav.html: The website's primary navigation menu.\
	footer.html: Contains footer content.\
	calendar.html: The calendar-focused page of the application.\
	jumbotron.html: Contains a prominent hero section or banner on a page.\
	login.html: Dedicated page for user login.\
	template.html: Base template upon which other pages are designed.

## Resourcess
In-app icons are from https://icons8.com/


## limitations
- we have not make a function for confirmation when editing or adding journals and tasks
- update buttons in tasks doesn't work yet

## contact
Roy Vina - roy.jeph@gmail.com
Rahul Sharma - rahulsharma15160@gmail.com
Juhyun Park - juhyun5328@outlook.com

## Acknowledgements 
* <a href="https://fonts.google.com/">Petit Formal Script</a>
* <a href="https://fonts.google.com/">Leckerli One</a>
* <a href="https://fonts.google.com/">Arimo</a>


















```


