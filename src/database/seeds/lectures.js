/* eslint-disable */
'use strict'

const data = [
  {
    id: 1,
    name: 'Swift I',
    description: '- Basic data types, collection types - Struct, class, enum - Functions, closures - Access control - References, ARC - Operators, common methods - Extenstions, protocols, delegates',
    assignment: 'lorem ipsum dolor sit amet',
    preview_picture: 'https://s3.us-east-2.amazonaws.com/strv-ios-nights2019/lectures/list/Swift+I+(Playground)%402x.png',
    detail_picture: 'https://s3.us-east-2.amazonaws.com/strv-ios-nights2019/lectures/detail/Swift+I+(Playground)%402x.png',
  },
  {
    id: 2,
    name: 'Xcode',
    description: '- Brief Git intro - Targets, configurations - Schemes - Build process - Certificates - Dependency Management - Project structure - MVC',
    assignment: 'lorem ipsum dolor sit amet',
    preview_picture: 'https://s3.us-east-2.amazonaws.com/strv-ios-nights2019/lectures/list/Xcode+(Project)%402x.png',
    detail_picture: 'https://s3.us-east-2.amazonaws.com/strv-ios-nights2019/lectures/detail/Xcode+(Project)%402x.png',
  },
  {
    id: 3,
    name: 'Basic UIKit',
    description: '- Storyboards & nibs - Autolayout - Safe Area - Basic UI components',
    assignment: 'lorem ipsum dolor sit amet',
    preview_picture: 'https://s3.us-east-2.amazonaws.com/strv-ios-nights2019/lectures/list/Basic+ui+kit%402x.png',
    detail_picture: 'https://s3.us-east-2.amazonaws.com/strv-ios-nights2019/lectures/detail/Basic+ui+kit%402x.png',
  },
  {
    id: 4,
    name: 'Intermediate UIKit',
    description: '- Navigation components and transitions   - Window and root view controller   - UITabBarController   - UINavigationController   - Present/push - Advanced UI components',
    assignment: 'lorem ipsum dolor sit amet',
    preview_picture: 'https://s3.us-east-2.amazonaws.com/strv-ios-nights2019/lectures/list/Intermediate+UI+Kit%402x.png',
    detail_picture: 'https://s3.us-east-2.amazonaws.com/strv-ios-nights2019/lectures/detail/Intermediate+UI+Kit%402x.png',
  },
  {
    id: 5,
    name: 'Advanced UIKit',
    description: '- UIScrollView - UITableView - Screen rotation - Size classes',
    assignment: 'lorem ipsum dolor sit amet',
    preview_picture: 'https://s3.us-east-2.amazonaws.com/strv-ios-nights2019/lectures/list/Advanced+UI+Kit%402x.png',
    detail_picture: 'https://s3.us-east-2.amazonaws.com/strv-ios-nights2019/lectures/detail/Advanced+UI+Kit%402x.png',
  },
  {
    id: 6,
    name: 'Lifecycles and architectures',
    description: '- App lifecycle - View controller life cycle - MVVM - Dependency Injection',
    assignment: 'lorem ipsum dolor sit amet',
    preview_picture: 'https://s3.us-east-2.amazonaws.com/strv-ios-nights2019/lectures/list/App+architecture+and+life+cycle%402x.png',
    detail_picture: 'https://s3.us-east-2.amazonaws.com/strv-ios-nights2019/lectures/detail/App+architecture+and+life+cycle%402x.png',
  },
  {
    id: 7,
    name: 'Swift II',
    description: '- OOP vs. POP - Generics - Advanced Swift features',
    assignment: 'lorem ipsum dolor sit amet',
    preview_picture: 'https://s3.us-east-2.amazonaws.com/strv-ios-nights2019/lectures/list/Swift+II%402x.png',
    detail_picture: 'https://s3.us-east-2.amazonaws.com/strv-ios-nights2019/lectures/detail/Swift+II%402x.png',
  },
  {
    id: 8,
    name: 'Networking',
    description: '- Codable - Alamofire - Router, adapter - Networking component - Authorization flow - Keychain vs. UserDefaults',
    assignment: 'lorem ipsum dolor sit amet',
    preview_picture: 'https://s3.us-east-2.amazonaws.com/strv-ios-nights2019/lectures/list/Networking++_+persistence%402x.png',
    detail_picture: 'https://s3.us-east-2.amazonaws.com/strv-ios-nights2019/lectures/detail/Networking++_+persistence%402x.png',
  },
  {
    id: 9,
    name: 'Layers and animations',
    description: '- CALayer and its properties - CALayer subclasses - View and layer animations - Table view row animations',
    assignment: 'lorem ipsum dolor sit amet',
    preview_picture: 'https://s3.us-east-2.amazonaws.com/strv-ios-nights2019/lectures/list/Core+Graphics++and+animations%402x.png',
    detail_picture: 'https://s3.us-east-2.amazonaws.com/strv-ios-nights2019/lectures/detail/Core+Graphics++and+animations%402x.png',
  },
  {
    id: 10,
    name: 'Advanced iOS',
    description: '- Asynchronicity - Testing',
    assignment: 'lorem ipsum dolor sit amet',
    preview_picture: 'https://s3.us-east-2.amazonaws.com/strv-ios-nights2019/lectures/list/Asynchronicity+_+Testing%402x.png',
    detail_picture: 'https://s3.us-east-2.amazonaws.com/strv-ios-nights2019/lectures/detail/Asynchronicity+_+Testing%402x.png',
  },
]

const seed = async knex => {
  await knex('lectures').del()
  await Promise.all(data.map(lecture => knex('lectures').insert(lecture)))
}

module.exports = {
  seed,
}
