# Big Lab 1 

# Class: 2022 WA1 (AJ)

## Team name: WebDevs
Team members:
* s279861 Breban Oana Madalina
* s272486 Cao Peng
* s287864 Can Karacomak
* s303406 Dal Pozzolo Christian

## Application's behaviour and design choices

In the following we will try to briefly explain some particular behaviours of tha applications.

First of all, the initial page that will be presented to the user (if the initial URL is "/" that is) is composed of the navigation bar, the add button, the buttons of the filters and the text which informs the user that none of the filters are currently active.
Since at this point none of the filters are actually active, also the film list remains empty.
This choice has been made in order not to create redundant behavior of the "/" page and the "/Filters/All" page.

In addition to the requirements, also the search button of the navigation bar has been implemented, and it allows to search for the films matching a specific title.
In order to avoid a nasty bug, this type of filter has been passed in the URL of the application in a different way and specifically by enclosing the input title in double quotes. In this way it is possible to differentiate between the "/Filters/All" filter (which looks for all films) and the " /Filters/"All" " filter (which looks for all the films that include the word "All" or "all" in their title). The input text has been designed in such a way that it is case insensitive with respect to the film list and so even if the user forgets to use an uppercase letter, the intended film will still appear.

Finally since the two main components, "Home" and "MyForm" are disjointed, in order to pass parameters between them we need to use the properties of states.
The selected_film state allows to pre-fill the edit form with the correct informations and the active_filter allows to go back to the previous filter view when the user submits or closes a form, instead of going back to "/".
For this reason these two state have not been removed from previous versions, which is a different situation with respect to the initial "form mode" state. In that case the state has been successfully replaced by routes and by passing a parameter to the "App" element which allows the application to either edit a film or add a new one based on the value of the passed parameter.

## Instructions

A general description of the BigLab 1 is avaible in the `course-materials` repository, [under _labs_](https://github.com/polito-WA1-AW1-2022/materials/tree/main/labs/BigLab1/BigLab1.pdf). In the same repository, you can find the [instructions for GitHub Classroom](https://github.com/polito-WA1-AW1-2022/materials/tree/main/labs/GH-Classroom-BigLab-Instructions.pdf), covering this and the next BigLab.

Once cloned this repository, instead, write your names in the above section.

Create the React project using the name `biglab1`. Edit this document as needed.

When committing on this repository, please, do **NOT** commit the `node_modules` directory, so that it is not pushed to GitHub.
This should be already automatically excluded from the `.gitignore` file, but double-check.

When another member of the team pulls the updated project from the repository, remember to run `npm install` in the project directory to recreate all the Node.js dependencies locally, in the `node_modules` folder.

Finally, remember to add the `final` tag for the final submission, otherwise it __will not be graded__.
