<h1>Welcome To  Food Order App </h1>
<P>Whenever A new user come to the website first he has to register</p>

URL:- https://fooddeliver-app.onrender.com/

### Register a new  User
  - POST - "https://fooddeliver-app.onrender.com/api/regigister"
  - User have to hit the url.
  - user have to pass { name,email,password } inside the body.
  - When registration sucessful the API give response status as 201 and response as "User Register Sucessfully"

### For Login a User
  - POST - "https://fooddeliver-app.onrender.com/api/login"
  - User have to hit the url  for login.
  - user have to pass { email,password } inside the body.
  - When Login sucessful the API give response status as 201 and response as "User Login Sucessfully" and the   token.
  - If the user hit wrong Credentials it will give the response as "Wrong Credentials"

### For reseting the Password
 - PATCH - "https://fooddeliver-app.onrender.com/api/user/:id/reset"
 - user have to pass { currentPassword, newpassword } inside the body.
 - If the current password is correct the it responds "Update the password" else the API responds "Wrong Current Password"

 ### Adding a new Restaurant details
  - POST - "https://fooddeliver-app.onrender.com/api/restaurants"
  - User have to pass all the details such as name,address and menu of restaurant inside the request body.
  - Then the API send the response as "Restaurant Added To Database.

### Get All Restaurant Details
 - GET - "https://fooddeliver-app.onrender.com/api/restaurants"
 - It will give  all the restaurant Data as response.

### Get Particular Restaurant Data
- GET - "https://fooddeliver-app.onrender.com/api/restaurants/:id"
- According to the ID Api sends the particular restaurant data as response.

### Get Menu of a restaurants
 - GET - "https://fooddeliver-app.onrender.com/api/restaurants/:id/menu"
 - It will give the menu of a particular restaurant as response

 ### ADD a new menu to  a restaurant
  - POST - "https://fooddeliver-app.onrender.com/api/restaurants/:id/menu"
  - It will take the menu data inside request body.
  - The menu data contains 
     - name
     - description
     - price
     - image
  - After adding the Data the API responds as "Menu Added Sucessfuuly"

### Delete a particular menu
 - DELETE - "https://fooddeliver-app.onrender.com/api/restaurants/:resid/menu/:menuid"
 - The params contains restaurantId and menuId
 - It will delete the particular menu from the restaurant.
 - API give response as "Menu Deleted sucessfully"

### Orders an Item
  - POST - "https://fooddeliver-app.onrender.com/api/orders"
  For placed an order the data required for ordered are
    - userId
    - Restaurant ID
    - Items
    - Total Price
    - Delivery Address
    - status 

  - After the order Placed the API sends "Order Placed Sucessfully' as response.

### Get Particular Order Data
 - GET - "https://fooddeliver-app.onrender.com/orders/:id"
 - The API sends the order Data as response.

### Update the status of Order
 - PATCH - "https://fooddeliver-app.onrender.com/orders/:id"
 - It will take status value inside request body.
 - It will give the response as "Status updated Sucessfully."
