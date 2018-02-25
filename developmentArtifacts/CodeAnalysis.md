# Code Analysis 

Created by: Alex Kuntz and Noah Brabec of team The Queens of Fallingdownstairslandia. (Team 4). 

## Documentation 
While the documentation was decent, the organization and implementation of their program did not allow us to effectively utilize their code. Good documentation is not very beneficial when we have to scrap most of their code to achieve basic functionality. Also, their additional comments that described functionality were intermittent, making it hard to understand different parts of the program that were not explained.

## Code Extensibility 
The code is not extensible. We had to rework most of their program, including basic Project 1 functionality. After a bit of testing with the code we determined that the folder named ”template_files” serves zero functionality, as the program runs just the same with it removed. In terms of classes, there are none defined separately. In multiple of their javascript files they define and redefine a variable/object called “meeting” or “event” that all seems to store the same data (i.e. date, time, attendees). This could be abstracted into a class and then used throughout the program without having to declare a new system in every file. A good class that would’ve been helpful to implement is a “user” class, something that could be used in any other project or program that uses and stores users and their data, but nothing of the sort was created in this code. Also they used a large amount of global variables, making it very difficult to find what variable is used where, and what actually changes them. Adding new functionality is going to be a lot of work. Most files are dependent on each other in way that if we were to make a change, it could break the code without understanding why. And if we added new methods we wouldn’t know where to pull the data from. 

##### Places where code was unnecessarily repeated: 
* newDataFile.js: 1-64
* functions.js: 5-9
* driver.js: 38-48, 110-120
* data.js: 1-7
* data1.js: 17-24


## Code Stability 
While the program never crashed, the usability of the program was poor. A few problems with this project are included here:
* Being able to create events that do not have any information
* No validation of user input for dates
* Before signing in at all, you could create an event, allowing guests to create events
* Attendees were able to select any time they wanted, including times not valid for the event they were attending, when selecting event times
* When an invalid date is given (i.e. 2/31), it still creates the event

## Code Readability
The code readability is poor. The organizational pattern and structure of their folder and file hierarchy is nonexistent. When looking at the github repository initially, there is no way to tell what files does what based off of naming convention. When looking in each file, it is near impossible to trace the code due to global variables and functions being either randomly placed, or surrounded by functions that look very similar in functionality. That added with zero modularity and throwing every function into three javascript files makes this code confusing to read to say the least.

