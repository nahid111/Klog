# Klog
<p>
Backend: Koajs,     Frontend: React,Redux,     Database: MySQL,     ORM: Sequelize
</p>


### installation
- install NodeJs & MySQL
- ``` $ npm install ```



# Endpoints

- Users & Auth
    > POST &emsp;&emsp; /api/auth <br>
    > GET &emsp;&emsp;&nbsp;&nbsp;&nbsp; /api/users <br>
    > GET &emsp;&emsp;&nbsp;&nbsp;&nbsp; /api/users/:id <br>
    > POST &emsp;&emsp; /api/users <br>
    > PUT &emsp;&emsp;&nbsp;&nbsp;&nbsp; /api/users/:id <br>
    > DELETE &emsp; /api/users/:id




## Users & Auth
### Login User:
Authenticate a user using email & password and send back a token
- Endpoint:
    >POST    /api/auth
- Arguments:
    ```json
    {
        headers: {
            "Content-Type": "application/json"
        },
        body: {
            "email": "techguyinfo@gmail.com",
            "password": "123456"
        }
    }
    ```
- Returns a token

### Get all users list:
Get a list of users
- Endpoint:
    >GET    /api/users
- Arguments:
    ```json
    {
        headers: {
            "Content-Type": "application/json",
            "x_auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJuYW1lIjoiTXIuIFVzZXIiLCJlbWFpbCI6ImVtYWlsQGdtYWlsLmNvbSIsImF2YXRhciI6bnVsbH0sImlhdCI6MTU3NDE1NTM3MSwiZXhwIjoxNTc0NTE1MzcxfQ.SQ2-lmPMRconyY1WlZsm-wUKyN6rpbh3OHuQfZgNNXI"
        }
    }
    ```
- Returns a list of user objects

### Get User by id:
Get a user by id
- Endpoint:
    >GET    /api/users/:id
- Arguments:
    ```json
    {
        headers: {
            "Content-Type": "application/json",
            "x_auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJuYW1lIjoiTXIuIFVzZXIiLCJlbWFpbCI6ImVtYWlsQGdtYWlsLmNvbSIsImF2YXRhciI6bnVsbH0sImlhdCI6MTU3NDE1NTM3MSwiZXhwIjoxNTc0NTE1MzcxfQ.SQ2-lmPMRconyY1WlZsm-wUKyN6rpbh3OHuQfZgNNXI"
        },
        params: {
            "id": 5
        }
    }
    ```
- Returns a user object
    ```json
    {
        "id": 3,
        "name": "Mr. User",
        "email": "email@gmail.com",
        "avatar": null,
        "createdAt": "2019-11-16T15:38:01.000Z",
        "updatedAt": "2019-11-16T15:38:01.000Z"
    }
    ```

### Create a user:
Create a user using name, email & password
- Endpoint:
    >POST    /api/users
- Arguments:
    ```json
    {
        headers: {
            "Content-Type": "application/json",
            "x_auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJuYW1lIjoiTXIuIFVzZXIiLCJlbWFpbCI6ImVtYWlsQGdtYWlsLmNvbSIsImF2YXRhciI6bnVsbH0sImlhdCI6MTU3NDE1NTM3MSwiZXhwIjoxNTc0NTE1MzcxfQ.SQ2-lmPMRconyY1WlZsm-wUKyN6rpbh3OHuQfZgNNXI"
        },
        body: {
            "name": "Test user",
	        "email": "test@gmail.com",
            "password": "123456"
        }
    }
    ```
- Returns a user object
    ```json
    {
        "id": 7,
        "name": "Test user",
        "email": "test@gmail.com",
        "password": "$2a$10$06LDnqIMmnwpqwIlJak.z./rwidQhqKaV3E07DwfLYeuaHX.9hnbS",
        "avatar": "//www.gravatar.com/avatar/1aedb8d9dc4751e229a335e371db8058?s=200&r=pg&d=mm",
        "updatedAt": "2019-11-19T09:32:20.627Z",
        "createdAt": "2019-11-19T09:32:20.627Z"
    }
    ```

### Update a user:
Update a user by id
- Endpoint:
    >POST    /api/users/:id
- Arguments:
    ```json
    {
        headers: {
            "Content-Type": "application/json",
            "x_auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJuYW1lIjoiTXIuIFVzZXIiLCJlbWFpbCI6ImVtYWlsQGdtYWlsLmNvbSIsImF2YXRhciI6bnVsbH0sImlhdCI6MTU3NDE1NTM3MSwiZXhwIjoxNTc0NTE1MzcxfQ.SQ2-lmPMRconyY1WlZsm-wUKyN6rpbh3OHuQfZgNNXI"
        },
        params: {
            "id": 5
        },
        body: {
            "name": "Test user"
        }
    }
    ```
- Returns a user object

### Delete a user:
Delete a user by id
- Endpoint:
    >DELETE    /api/users/:id
- Arguments:
    ```json
    {
        headers: {
            "Content-Type": "application/json",
            "x_auth_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJuYW1lIjoiTXIuIFVzZXIiLCJlbWFpbCI6ImVtYWlsQGdtYWlsLmNvbSIsImF2YXRhciI6bnVsbH0sImlhdCI6MTU3NDE1NTM3MSwiZXhwIjoxNTc0NTE1MzcxfQ.SQ2-lmPMRconyY1WlZsm-wUKyN6rpbh3OHuQfZgNNXI"
        },
        params: {
            "id": 5
        }
    }
    ```
- Returns a user object



