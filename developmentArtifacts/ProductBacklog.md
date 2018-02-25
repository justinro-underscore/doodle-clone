# <a name = "Top"></a>Product Backlog 
 Team Members: Justin Roderman, Harrison Luo, Varun Chadha, Noah Brabec, Alex Kunz

|Feature/Improvement                            | Complexity(1-5)   | Time Commitment | Priority |
| --------------------------------------------- |:-----------------:|:---------------:|---------:|
| [Show Event Info](#EventInfo)                 | 2                 | 2 hours         | 1        |
| [Time Bugs](#TimeBugs)                        | 4                 | 5 hours         | 2        |
| [Deliniate Admins from Users](#AdminFunction) | 2                 | 2.5 hours       | 3        |
| [Multi-day Events](#Multi-day)                | 2                 | 1 hour          | 4        |
| [Add Tasks to Events](#Tasks)                 | 3                 | 5 hours         | 5        |
| [Improve UI](#ImproveUI)                      | 3                 | 8 hours         | 6        |
| [Improve Documentation](#ImproveDoc)          | 2                 | 3 hours         | 7        |

>You can click on each feature to take you to a brief description of each one. Complexity is based
off of an 1-5 scale where 5 is the most complex. All time commitment values are measured in hours
predicted to finish the feature/improvement. Priority was decided by first finishing project 1 
requirements and then moving onto the new additions. 

## <a name = "EventInfo"></a> Show Event Info
 We need to add a way for the users to view more detail about the event. Currently how the event is
 displayed in the list it shows: <The name of the event> - <Date of the Event> and then below it in
 large grid of buttons it outlines the times for the event. We plan on adding a description of the 
 event, who is attending the event, tasks for the event, and who is assinged to each task. 
 
[Back to Top](#Top)
 
## <a name = "TimeBugs"></a>Time Bugs
 When you create an event currently, you select the times for the event from the large grid of numbers
 and those are stored in some list. Then when you want to set your availibility for the event, that 
 same grid of numbers is shown but the events times are highlighted as a sugestion of, "Hey, pick the
 times you're free out of these highlighted options", but nothing actually stops the user from picking
 any other time from the grid, meaning times outside of the event's time are allowed to be picked. We 
 are going to fix this by only allowing times during the event to be picked so there is no confusion on
 who can come to the event. 
 
[Back to Top](#Top)
## <a name = "AdminFunction"></a>Deliniate Admins from Users
 "All users are created equal" is the motto of the current code. Sadly, according to design specifications,
 they are not. We need to have normal users that can: view events, set when they are availible, and set what 
 tasks they are able to complete, and we need to have admins users that can: do everything normal users can do,
 create events, and set tasks that need to be accomplished within each event. So we are going to add login 
 functionality for each user, and when those users are created it will be decided if they are an admin user or 
 not. 

[Back to Top](#Top)
## <a name = "Multi-day"></a>Multi-day Events
 One of the new features requested for project 2 is the ability to add multi-day events. We are going to add the
 ability to have events span more than one day while also tranfering the times of the event from day to day. 
 User's will be able to pick the times on each day so if they are availible at 8:00am on a Wednesday but not 
 8:00am on a Thursday, they can deliniate that and pick times accordingly. 

[Back to Top](#Top)
## <a name = "Tasks"></a>Add Tasks to Events
 The other brand spanking new feature for project 2 is tasks. Within each event, along with the times that event
 will be on, there will be a list of tasks that need to be fulfilled for that event (i.e. "Someone bring cups). 
 We will add a list of tasks for each event that can be selected by only one user and display which tasks are 
 being covered by which user. 

[Back to Top](#Top)
## <a name = "ImproveUI"></a>Improve UI
 The current UI feels a bit clunky and certain information can become confusing to read. We are going to re-design
 the UI to give a more user friendly experience. The biggest thing that is being changed is how the time selection
 screen looks. Instead of a large array of buttons, we are going to change it to have two lists of times. One will
 show what times are avalible to pick from, and the other will be what times the user wants to either set their 
 availibility for, or what times they want the event to be on. Also we will be adding a calendar view so that you
 can easily navigate around the year to see when events are being held. 

[Back to Top](#Top)
## <a name = "ImproveDoc"></a>Improve Documentation
 We want to expand and add to the current documentation to make it clear which files talk to each other and where
 variable get declared and changed. We are also going to add a more detailed description of each function/method 
 to make sure when someone looks at the code they can accurately asses what needs to be changed or added to expand
 the codes functionality. 

[Back to Top](#Top)
