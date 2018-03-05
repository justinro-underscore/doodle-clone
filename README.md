<a name="top"></a>
# Doodle-Clone
A collaborative project to create a Doodle Poll clone. 
Creators: Justin Roderman, Alex Kuntz, Harrison Luo, Varun Chadha, and Noah Brabec.

## Getting Started
Our doodle clone is based from a webserver so there is no need for any installation. All you need to do is click [here](#someweblink) and take a look around. 

## How to Use Doodle Clone
Doodle-Clone is a scheduling service that allows users to view upcoming events and vote on when they are availible to attend. You can also set tasks that need to be completed for each event and users can sign up to complete those tasks. This allows managers and admins to accurately plan when to host group events. 

### For General Users
General Users are anyone who uses the Doodle-Clone service. They will be able to log into the website, view events, vote on when they can go, and sign up for tasks for events. 

#### <a name="loggingIn"></a>Logging In
> If this is the first time using the doodle-clone service, please see the [Creating Users](#createUser) section on how to set up a first time user.

When you first open the page you will be prompted with a screen that has an entry field for both a username and a password. This is where you'll enter the credentials provided to you by your [admin](#admin).

![Alt text][loginScreen]

After you type them in you will be presented with the landing page where you have full access to all of the sites functionality. At the top is where you will find the navigation bar and the drop down menu. 
![alt text][landingPage]

#### <a name="viewing"></a>Viewing Events
First thing you'll need to do is to find an event. To view events you use the calendar interface.
![alt text][calendarPage]
You can explore past and future dates by clicking the arrow keys next to the month, and you can click on each day to see what events are on those days. The events that are on the selected day will be presented in a list below the calendar. To learn more about the events, such as what time and days the event is on and what tasks need to be fulfilled for the event, click on the event name and the information will appear below it. 
![alt text][eventInfo]

#### <a name="availibility"></a>Setting Availability 
After you have looked around the calendar interface and found an event that you'd want to attend, you probably want to let the creator know when you are available. You can do this via the "Set Availability" tab from the drop down menu. When you get here you will again be presented with a list of events to choose from. Click the one you want and then the list of times that the event is on will appear in below again. You can then choose the times that you can show up for and click submit. Then you can sign up for tasks.  
![alt text][votingScreen]

#### <a name="tasks"></a>Signing up For Tasks
Similar to choosing what times you available for, you can also select tasks that you want to be responsible for. All you have to do is go through the same screen that took you to voting for times and then a list of tasks will also be there. Only one person can be assigned to any one task so make sure to coordinate with you team. Click submit and you will be able to go back to the [view event](#viewing) page and see who is availible for what times and who is completing which tasks. 
![alt text][taskScreen]

### <a name="admin"></a>For Admins
Admin users can do everything that normal users can do but they can also add new users and they can create events. 
#### <a name="createUser"></a>Creating Users
On the bottom of the login page there is a button called create user. If you click that it will take you to a similar looking page but from here you can enter a new username, a password, and select whether the new user should have admin privaleges or not. Then when you click submit a new user with that information will be generated. Username's are unique so if you get a pop up saying the name is taken try a different name and click submit again. 

![alt text][creatingUserScreen]

#### <a name="createEvent"></a>Creating Events
As an admin user you have the unique ability to create events. You can do this by selecting the create events button from the drop down menu. You will presented with a screen that allows you to enter all of the information of the event. This includes: What day it is on; What times on those days is it on; What tasks need to be done for this event; and you can add a description of the event. After you do this you click submit, the event will be created, and all of the other users can now vote on when they are available. 
![alt text][creatingEventScreen]


[landingPage]: documentation/resources/readmePics/menuBar.png
[loginScreen]: documentation/resources/readmePics/loginScreen.png
[eventInfo]: documentation/resources/readmePics/calendarSelected.png
[votingScreen]: documentation/resources/readmePics/votingScreen.png
[taskScreen]: file/path/here.png
[creatingUserScreen]: documentation/resources/readmePics/createUser.png
[creatingEventScreen]: documentation/resources/readmePics/createEventScreen.png
[calendarPage]: documentation/resources/readmePics/viewEventScreen.png
