## iOS nights API
Api service for iOS nights workshop

### Endpoints

`POST /login`

| Endpoint | Description | Method | Params | Protected |
| :---------- |:------------| :-----:| ----:| :----: |
| `/lectures`   | Returns list of lectures | GET | `?page` - pagination | Token | 
| `/lectures/:id` | Returns detail of lecture |   GET | `id` - ID of lection | Token |
| `/login` | Login user and returns user object with token | POST | `email`, `password` | - |


#### Authentication
For accessing protected endpoints you need to provide `Authorization` header

`Authorization: jwt TOKEN_HERE`
