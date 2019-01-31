'use strict'

// Data in DB
const lecturesDB = [
  {
    id: 1,
    name: 'Swift I',
    description: '- Basic data types, collection types - Struct, class, enum - Functions, closures - Access control - References, ARC - Operators, common methods - Extenstions, protocols, delegates',
    assignment: 'lorem ipsum dolor sit amet',
    preview_picture: 'https://picsum.photos/200/300?image=0',
    detail_picture: 'https://picsum.photos/200/300?image=1',
  },
  {
    id: 2,
    name: 'Xcode',
    description: '- Brief Git intro - Targets, configurations - Schemes - Build process - Certificates - Dependency Management - Project structure - MVC',
    assignment: 'lorem ipsum dolor sit amet',
    preview_picture: 'https://picsum.photos/200/300?image=3',
    detail_picture: 'https://picsum.photos/200/300?image=4',
  },
]

// Expected data in list resposne
const lecturesList = [
  {
    id: 1,
    name: 'Swift I',
    description: '- Basic data types, collection types - Struct, class, enum - Functions, closures - Access control - References, ARC - Operators, common methods - Extenstions, protocols, delegates',
    previewPicture: 'https://picsum.photos/200/300?image=0',
    assignmentDone: false,
    attended: false,
  },
  {
    id: 2,
    name: 'Xcode',
    description: '- Brief Git intro - Targets, configurations - Schemes - Build process - Certificates - Dependency Management - Project structure - MVC',
    previewPicture: 'https://picsum.photos/200/300?image=3',
    assignmentDone: false,
    attended: false,
  },
]

const lectureDetail = { ...lecturesList[0] }

const dbRowUser = [
  'John Doe',
  'john.doe@example.org',
  '$2b$10$LTLMdAPm2HHpm0ctBJu48OmVhWrjpB1Srn.sehbhAQoey7bUQZBtG',
]

const registerUser = {
  name: 'Patrick Smith',
  password: 'pass1234',
  email: 'patricks39@seznam.cz',
}

const registerDuplicateUser = {
  name: 'John Doe',
  password: 'passw0rd',
  email: 'john.doe@example.org',
}

const loginData = {
  email: 'john.doe@example.org',
  password: 'passw0rd',
}

const uploadedPicture = {
  pictureUrl: 'www.amazonaws.com/users/test-file.jpg',
}

const user = {
  id: 1,
  name: 'John Doe',
  password: 'passw0rd',
  email: 'john.doe@example.org',
}

module.exports = {
  lecturesDB,
  lecturesList,
  lectureDetail,
  dbRowUser,
  loginData,
  registerDuplicateUser,
  uploadedPicture,
  registerUser,
  user,
}
