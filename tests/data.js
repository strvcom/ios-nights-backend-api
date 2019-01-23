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
  },
  {
    id: 2,
    name: 'Xcode',
    description: '- Brief Git intro - Targets, configurations - Schemes - Build process - Certificates - Dependency Management - Project structure - MVC',
    previewPicture: 'https://picsum.photos/200/300?image=3',
  },
]

const lectureDetail = { ...lecturesList[0] }

module.exports = {
  lecturesDB,
  lecturesList,
  lectureDetail,
}
