# Application Flow

## 1. Student Flow
- Student logs in using matric or jamb reg. number
- Student enters matric number, faculty, department and level (if step one is implemented, then there might be no need for this step)
- Student selects course code and title
- Student selects lecturer name -> lecturers' names are retrieved for selection based on department
- Student gives ratings for each question
- Student submits all the data after rating
- Data is sent to server
- On the server, the rating sum for that evaluation is calculated

## 2. Lecturer Flow
- Lecturer verifies their account using their email address and creates a password for logging in
- On logging into their dashboard, they should be able to see the following ratings: overall rating, departmental rating, faculty rating, course rating (for each course) & average rating per evaluation question

## 3. Admin Flow
- Admin logs into their dashboard with password and email
- Should see a search bar for searching lecturers by name, department or faculty
- When the desired lecturer is found, admin can click to see individual lecturer ratings as specified above

## 4. Rating Calculation Logic

### Lecturer's Overall Rating
- To calculate the lecturer's *overall rating*, we get all ratings for each question (for `studentsRatings.json` that would be 5 questions, hence 5 ratings), for every student (for `studentsRatings.json` that would be 5 students).

    ```
    Student 1: 4 + 3 + 3 + 4 + 4 = 18
    Student 2: 5 + 4 + 3 + 5 + 4 = 21
    Student 3: 3 + 3 + 4 + 5 + 4 = 19
    Student 4: 4 + 4 + 4 + 4 + 4 = 20
    Student 5: 5 + 3 + 4 + 5 + 5 = 22

    Total: 18 + 21 + 19 + 20 + 22 = 100

    Number of ratings = 5 students × 5 questions = 25 ratings
    
    Overall Average/Rating: 100 ÷ 25 = 4.00
    ```

- Hence lecturer's *overall rating* is `4.00`.

### Lecturer's Course Rating
- To calculate the lecturer's *rating for a particular course* (say CSC 101, according to `studentsRatings.json`), we get all students who have rated for that course and then perform calculations similar to what we've done above.

    ```
    Student 1: 4 + 3 + 3 + 4 + 4 = 18
    Student 2: 5 + 4 + 3 + 5 + 4 = 21
    Student 5: 5 + 3 + 4 + 5 + 5 = 22
    Total: 18 + 21 + 22 = 61

    Number of ratings: 3 students × 5 questions = 15 ratings

    CS 101 Average: 61 ÷ 15 = 4.07 (rounded to 2 decimal places)

    ```
- Hence lecturer's *overall rating* is `4.07`.

### Lecturer's Departmental/Faculty Rating
- To calculate the lecturer's *departmental or faculty rating*, we get all students who have rated in that department or faculty, and then perform calculations similar to what we've done above.

    ```
    Student 1: 4 + 3 + 3 + 4 + 4 = 18
    Student 2: 5 + 4 + 3 + 5 + 4 = 21
    Student 3: 3 + 3 + 4 + 5 + 4 = 19
    Student 4: 4 + 4 + 4 + 4 + 4 = 20
    Student 5: 5 + 3 + 4 + 5 + 5 = 22

    Total: 18 + 21 + 19 + 20 + 22 = 100

    Number of ratings = 5 students × 5 questions = 25 ratings
    
    Overall Average/Rating: 100 ÷ 25 = 4.00
    ```

