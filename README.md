## iOS nights API

[![Build Status](https://travis-ci.com/strvcom/ios-nights-backend-api.svg?token=s4QdpQx7n36q53UZ51Mk&branch=dev)](https://travis-ci.com/strvcom/ios-nights-backend-api)

Api service for iOS nights workshop

`https://ios-nights.herokuapp.com`

### Endpoints

| Endpoint | Description | Method | Params | Protected |
| :---------- |:------------| :-----:| :---- | :----: |
| `/register` | Register user and returns user object with token | POST | `name`, `email`, `password`, `picture` | - |
| `/login` | Login user and returns user object with token | POST | `email`, `password` | - |
| `/users/me` | Verify token and returns user object | GET | - | Token |
| `/users/me/picture/signed-url` | Get signed url for picture upload | POST | `name` - filename, `type` - file mime type | - |
| `/users/me/picture` | Update user's profile picture | PATCH | `picture` | Token |
| `/lectures`   | Return list of lectures | GET | `?page`, `?per_page` - pagination | Token | 
| `/lectures/:id` | Return detail of lecture |   GET | `id` - ID of lecture | Token |
| `/lectures/:id/attendance` | Update user's lecture attendance | PATCH | `attends` - `true/false` | Token |
| `/lectures/:id/assignment` | Update users' lecture assignment status | PATCH | `done` - `true/false` | Token |

#### Authentication
For accessing protected endpoints you need to provide `Authorization` header

`Authorization: Bearer TOKEN`
