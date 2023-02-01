# WEB - Fetch Country App

## Submission Instructions [Please note]

## Maximum Marks - 15

- The Submission should not contain spaces, for example,/js-101 folder/eval will not work
- Do not push node_modules and package_lock.json to GitHub

```
 ✅ able to submit the app - 1 mark ( minimum score )
 ✅ Check if the api call made - 1 marks.
 ✅ Student is able to loop through the data and append in the dom - 2 marks.
 ✅ Check the Search Part  - 2 marks.
 ✅ Search is not Casesensetive - 1 marks.
 ✅ Sorting is Working Fine - 1 marks.
 ✅ Add country to visited - 2 marks.
 ✅ Check the visited page's table - 2 marks.
 ✅ Check the total Part  - 1 marks.
 ✅ Check the deleting - 1 marks.
 ✅ Check the total after deleting - 1 marks.
```

## Installation

- you can use any node version that works for you ( 14+ )
- Download and unzip the boilerplate
- Navigate to the correct path

## Folder structure

- index.html(Home Page)
- visited.html(Visited Page)
- Please Ignore all the other files except for the above-mentioned files.

### You haven't taught cypress to run the test cases locally, you can see the passed/ failed test cases and test errors on CP itself.

## Description

#### Use the template provided below to write your code (Mandatory)

### Some Rules to follow:-

- Before writing a single line of code please read the problem statement very carefully.
- Don't change the already given ids or classes.
- If you don't follow these rules you might not get any marks even if you do everything correctly.

### Problem Statement:-

- In this application, we have 2 different pages:-
  1. index.html(Home Page)
  2. visited.html(Visited Page)

#### index.html(Home Page):-

- On loading this page make an API request with fetch in this API end-point:-
  `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-countries`.

- On Successful API request, you will get a response of employee data which is Array of Objects.

- Loop over the response data and create rows and append them inside the tbody given in the template.

- Each row will have the following columns:-

  1. ID
  2. Country
  3. Rank
  4. Population
  5. Visited

- Here all the data will come from the api request only except for the last one which is Visited.

- Here in each cell of this row put this text:- `Visit`. This text is going to be case sensitive so please make sure you double check it.

- Refer to this image for a better understanding:-
  ![img](https://masai-course.s3.ap-south-1.amazonaws.com/editor/uploads/2023-01-12/Screenshot%202023-01-12%20at%203.35.56%20PM_279578.png)

- Here we will also have a form. Inside that we have a input tag.

- When the user submits that form only show those countries that on which the name includes input tag's value.

- Let's say when you submit the text in the input tag is `ia`, now in the table both `India` and `Seria` should show because both of their names has this text `ia`.

- Also make sure it is not case sensetive, like if you search `IA` even in that case both the countries should show up.
  ![img](https://masai-course.s3.ap-south-1.amazonaws.com/editor/uploads/2023-01-12/Screenshot%202023-01-12%20at%203.36.32%20PM_195895.png)

- Here we also have a select tag with id:- `sort`.
  Using that user should be able to sort the countries in ascending or descending order by their population.

- Don't use the built-in sort method for this, to get data in ascending order use this api:- `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-countries?sort=population&&order=asc`. Similarly to get the data in descending order use this api:- `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-countries?sort=population&&order=desc`.

- When someone click on the Visited row that country data should be added in localstorage with key :- `visited`.

#### visited.html(Visited Page):-

- In this page get the data from the localstorage with key `visited`.

- Loop over the LocalStorage data and create rows and append them inside the tbody given in the template.

- Each row will have the following columns:-

  1. ID
  2. Country
  3. Rank
  4. Population
  5. Visited
  6. Remove

- Here all the data will come from the localStorage only, except for the last one which is Remove.

- Here in each cell of this row put this text:- `Remove`. This text is going to be case-sensitive so please make sure you double-check it.

- Click on that `Remove` cell that row should be deleted both from DOM and from localStorage.

- In this page we will also have a span tag inside a h1 tag:-

```
    <h1 id="total">
      You have visited total <span id="visited-total">0</span> countries.
    </h1>
```

- Catch the span tag and show the total number of elements in the visited page.

- When Removing the total should also be updated.
  ![img](https://masai-course.s3.ap-south-1.amazonaws.com/editor/uploads/2023-01-12/Screenshot%202023-01-12%20at%203.38.34%20PM_209979.png)

#### General guidelines

- The system on cp.masaischool.com may take between 1-20 minutes for responding,
- so we request you to read the problem carefully and debug it before itself
- we also request you not just submit it last minute
- try to keep one submission at a time
