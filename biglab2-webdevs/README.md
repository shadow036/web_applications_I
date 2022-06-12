# BigLab 2

## Team name: WebDevs

Team members:
* s279861 Breban Oana Madalina
* s272486 Cao Peng
* s287864 Can Karacomak
* s303406 Dal Pozzolo Christian

## List of APIs offered by the server

**HTTP METHOD**: GET \
**URL**: /api/v1/films \
**DESCRIPTION**: Retrieves the whole list of films \
**SAMPLE REQUEST BODY**: No body in the request \
**SAMPLE RESPONSE BODY**: List of JSON objects \
[ \
&nbsp;&nbsp;&nbsp;&nbsp; { \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "id": 1, \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "title": "Pulp Fiction", \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "favorite": 1, \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "watchdate": "2022-03-11", \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "rating": 5 \
&nbsp;&nbsp;&nbsp;&nbsp; }, \
&nbsp;&nbsp;&nbsp;&nbsp; { \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "id": 2, \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "title": "21 Grams", \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "favorite": 1, \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "watchdate": "2022-03-17", \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "rating": 4 \
&nbsp;&nbsp;&nbsp;&nbsp; }, \
&nbsp;&nbsp;&nbsp;&nbsp; { \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "id": 3, \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "title": "Star Wars", \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "favorite": 0, \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "watchdate": null, \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "rating": null \
&nbsp;&nbsp;&nbsp;&nbsp; }, \
&nbsp;&nbsp;&nbsp;&nbsp; { \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "id": 4, \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "title": "Matrix", \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "favorite": 0, \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "watchdate": null, \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "rating": null \
&nbsp;&nbsp;&nbsp;&nbsp; }, \
&nbsp;&nbsp;&nbsp;&nbsp; { \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "id": 5, \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "title": "Shrek", \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "favorite": 0, \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "watchdate": "2022-03-21", \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "rating": 3 \
&nbsp;&nbsp;&nbsp;&nbsp; }, \
&nbsp;&nbsp;&nbsp;&nbsp; { \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "id": 6, \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "title": "Avatar", \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "favorite": 1, \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"watchdate": "2012-02-13", \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "rating": 5 \
&nbsp;&nbsp;&nbsp;&nbsp; }, \
&nbsp;&nbsp;&nbsp;&nbsp; { \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "id": 7, \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "title": "Doctor Strange", \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "favorite": 1, \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "watchdate": "2016-11-03", \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "rating": 4 \
&nbsp;&nbsp;&nbsp;&nbsp; }, \
&nbsp;&nbsp;&nbsp;&nbsp; { \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "id": 8, \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "title": "Avatar 2", \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "favorite": 0, \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "watchdate": null, \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "rating": "" \
&nbsp;&nbsp;&nbsp;&nbsp; } \
] \
**ERROR RESPONSE**: 500, Internal Server Error (200, OK otherwise)

___

**HTTP METHOD**: GET \
**URL**: /api/v1/films/filters/:filter/:user_id \
**DESCRIPTION**: Retrieves the films matching the specified filter in the URL (Best rated, unseen, ...) and belonging to a specific user (whose id is in the URL as well) \
**SAMPLE REQUEST BODY**: No body in the request \
**SAMPLE RESPONSE BODY**: List of JSON objects \
(/api/v1/films/filters/Favorites/1) \
[ \
&nbsp;&nbsp;&nbsp;&nbsp; { \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "id": 1, \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "title": "Pulp Fiction", \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "favorite": 1, \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "watchdate": "2022-03-11", \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "rating": 5 \
&nbsp;&nbsp;&nbsp;&nbsp; }, \
&nbsp;&nbsp;&nbsp;&nbsp; { \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "id": 2, \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "title": "21 Grams", \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "favorite": 1, \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "watchdate": "2022-03-17", \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "rating": 4 \
&nbsp;&nbsp;&nbsp;&nbsp; } \
] \
**ERROR RESPONSE**: 500, Internal Server Error (200, OK otherwise)

___

**HTTP METHOD**: GET \
**URL**: /api/v1/films/:film_id \
**DESCRIPTION**: Retrieves the films matching the specified id in the URL \
**SAMPLE REQUEST BODY**: No body in the request \
**SAMPLE RESPONSE BODY**: Array of 1 JSON object \
(/api/v1/films/6) \
[ \
&nbsp;&nbsp;&nbsp;&nbsp; { \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "id": 6, \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "title": "Avatar", \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "favorite": 1, \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "watchdate": "2012-02-13", \
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "rating": 5 \
&nbsp;&nbsp;&nbsp;&nbsp; } \
] \
**ERROR RESPONSE**: 500, Internal Server Error (200, OK otherwise)

___

**HTTP METHOD**: POST \
**URL**: /api/v1/films \
**DESCRIPTION**: Adds a new film to the collection (data is in the body) \
**SAMPLE REQUEST BODY**: \
["title":"Test Film", "favorite": 1, "watchdate": "2009-12-31", "rating": 3] \
{id may be omitted(in that case it is assigned by the database), the user is the one which is logged in at that moment} \
**SAMPLE RESPONSE BODY**: No body in the response \
**ERROR RESPONSE**: 500, Internal Server Error (201, Created if OK)

___

**HTTP METHOD**: PUT \
**URL**: /api/v1/films/update/:id \
**DESCRIPTION**: Updates the film identified by the id in the URL (new fields are in the body) \
**SAMPLE REQUEST BODY**: \
(/api/v1/films/update/6) \
["title": "Avatar", "favorite": 0, "watchdate": "2012-02-13", "rating": 2] \
{id is not modified, the user is the on which is logged in at that moment} \
**SAMPLE RESPONSE BODY**: No body in the response \
**ERROR RESPONSE**: 500, Internal Server Error (201, Created if OK)

___

**HTTP METHOD**: PUT \
**URL**: /api/v1/films/toggle/:id \
**DESCRIPTION**: Inverts the value of the "favorite" field of the film whose id matches the id in the URL \
**SAMPLE REQUEST BODY**: No body in the request \
**SAMPLE RESPONSE BODY**: No body in the response \
**ERROR RESPONSE**: 500, Internal Server Error (201, Created if OK)

___

**HTTP METHOD**: DELETE \
**URL**: /api/v1/films/:id \
**DESCRIPTION**_ Deletes a film given its id \
**SAMPLE REQUEST BODY**: No body in the request \
**SAMPLE RESPONSE BODY**: No body in the response \
**ERROR RESPONSE**: 500, Internal Server Error (200, OK otherwise)

## Instructions

A general description of the BigLab 2 is avaible in the `course-materials` repository, [under _labs_](https://polito-wa1-aw1-2022.github.io/materials/labs/BigLab2/BigLab2.pdf). In the same repository, you can find the [instructions for GitHub Classroom](https://polito-wa1-aw1-2022.github.io/materials/labs/GH-Classroom-BigLab-Instructions.pdf), covering BigLabs and exam sessions.

Once you cloned this repository, please write the group name and names of the members of the group in the above section.

In the `client` directory, do **NOT** create a new folder for the project, i.e., `client` should directly contain the `public` and `src` folders and the `package.json` files coming from BigLab1.

When committing on this repository, please, do **NOT** commit the `node_modules` directory, so that it is not pushed to GitHub.
This should be already automatically excluded from the `.gitignore` file, but double-check.

When another member of the team pulls the updated project from the repository, remember to run `npm install` in the project directory to recreate all the Node.js dependencies locally, in the `node_modules` folder.
Remember that `npm install` should be executed inside the `client` and `server` folders (not in the `BigLab2` root directory).

Finally, remember to add the `final` tag for the final submission, otherwise it will not be graded.

## Secret

"secret word for session cookie!"

## Registered Users

Here you can find a list of the users already registered inside the provided database. This information will be used during the fourth week, when you will have to deal with authentication.
If you decide to add additional users, please remember to add them to this table (with **plain-text password**)!

| email | password | name |
|-------|----------|------|
| john.doe@polito.it | password | John |
| mario.rossi@polito.it | password | Mario |
| testuser@polito.it | password | Test |

## List of APIs offered by the server

Provide a short description for API with the required parameters, follow the proposed structure.

* [HTTP Method] [URL, with any parameter]
* [One-line about what this API is doing]
* [Sample request, with body (if any)]
* [Sample response, with body (if any)]
* [Error responses, if any]
