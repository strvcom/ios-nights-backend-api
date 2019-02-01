## iOS nights API

[![Build Status](https://travis-ci.com/strvcom/ios-nights-backend-api.svg?token=s4QdpQx7n36q53UZ51Mk&branch=dev)](https://travis-ci.com/strvcom/ios-nights-backend-api)

Api service for iOS nights workshop

`https://ios-nights.herokuapp.com`

### Endpoints

##### Authentication
| Method | Endpoint | Description | Params | Protected |
| :--- |:---------- |:------------| :----- | :--: |
| POST |`/register` | Register user and returns user object with token | `name`, `email`, `password`, `pictureUrl` | - |
| POST | `/login`   | Login user and returns user object with token    | `email`, `password` | - |

##### User
| Method | Endpoint | Description | Params | Protected |
| :--- |:---------- |:------------| :----- | :--: |
| GET   | `/users/me` | Verify token and returns user object | - | Token |
| POST  | `/users/me/picture/signed-url` | Get signed url for picture upload |`type` (MIME type) | - |
| PATCH | `/users/me/picture` | Update user's profile picture | `pictureUrl` | Token |

##### Lectures
| Method | Endpoint | Description | Params | Protected |
| :--- |:---------- |:------------| :----- | :--: |
| GET | `/lectures`   | Return list of lectures | `?page`, `?perPage` - pagination | Token | 
| GET |`/lectures/:id` | Return detail of lecture | `id` - ID of lecture | Token |
| PATCH | `/lectures/:id/attended` | Update user's lecture attendance | `attended` - `true/false` | Token |
| PATCH | `/lectures/:id/assignment-done` | Update users' lecture assignment status | `assignmentDone` - `true/false` | Token |

#### Authentication
For accessing protected endpoints you need to provide `Authorization` header

`Authorization: Bearer TOKEN`
