## iOS nights API
Api service for iOS nights workshop

### Endpoints

| Endpoint | Description | Method | Params | Protected |
| :---------- |:------------| :-----:| :---- | :----: |
| `/register` | Register user and returns user object with token | POST | `name`, `email`, `password`, `picture` (file)| - |
| `/login` | Login user and returns user object with token | POST | `email`, `password` | - |
| `/me` | Verifies token and returns user object | GET | - | Token |
| `/lectures`   | Returns list of lectures | GET | `?page` - pagination | Token | 
| `/lectures/:id` | Returns detail of lecture |   GET | `id` - ID of lecture | Token |
| `/lectures/:id/attendance` | Updates user's lecture attendance | PATCH | `attends` - `true/false`| Token |
| `/lectures/:id/assignment` | Updates users' lecture assignment status | PATCH | `done` - `true/false` | Token |

#### Authentication
For accessing protected endpoints you need to provide `Authorization` header

`Authorization: jwt TOKEN_HERE`
