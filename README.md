## iOS nights API
Api service for iOS nights workshop

### Endpoints

| Endpoint | Description | Method | Params | Protected |
| :---------- |:------------| :-----:| :---- | :----: |
| `/register` | Register user and returns user object with token | POST | `name`, `email`, `password`, `picture` (file)| - |
| `/login` | Login user and returns user object with token | POST | `email`, `password` | - |
| `/user` | Verify token and returns user object | GET | - | Token |
| `/user/picture` | Update user's profile picture | PATCH | `picture` - file | Token |
| `/lectures`   | Return list of lectures | GET | `?page` - pagination | Token | 
| `/lectures/:id` | Return detail of lecture |   GET | `id` - ID of lecture | Token |
| `/lectures/:id/attendance` | Update user's lecture attendance | PATCH | `attends` - `true/false` | Token |
| `/lectures/:id/assignment` | Update users' lecture assignment status | PATCH | `done` - `true/false` | Token |

#### Authentication
For accessing protected endpoints you need to provide `Authorization` header

`Authorization: jwt TOKEN_HERE`
