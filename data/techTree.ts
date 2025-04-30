export const TECH_TREE = {
  items: [
    {
      id: '1',
      code: 'fa-solid fa-code',
      title: 'Frontend Specialization',
      total: 1,
      points: 1,
      content:
        'Front-end web development is the development of the graphical user interface of a website, through the use of HTML, CSS, and JavaScript, so that users can view and interact with that website.',
    },
    {
      id: '4',
      code: 'fa-brands fa-html5',
      title: 'HTML',
      total: 5,
      parent: '1',
      points: 5,
      content:
        'The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.',
    },
    {
      id: '5',
      code: 'fa-brands fa-css3',
      title: 'CSS',
      total: 5,
      parent: '1',
      points: 4,
      content:
        'Cascading Style Sheets (CSS) is a style sheet language used for describing the presentation of a document written in a markup language such as HTML. CSS is a cornerstone technology of the World Wide Web, alongside HTML and JavaScript.',
    },
    {
      id: '7',
      code: 'fa-brands fa-sass',
      title: 'SASS',
      total: 5,
      parent: '5',
      points: 3,
      content:
        "Sass (short for syntactically awesome style sheets) is a preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets (CSS). SassScript is the scripting language itself. Sass consists of two syntaxes. The original syntax, called 'the indented syntax,' uses a syntax similar to Haml. It uses indentation to separate code blocks and newline characters to separate rules. The newer syntax, 'SCSS' (Sassy CSS), uses block formatting like that of CSS.",
    },
    {
      id: '8',
      code: 'fa-brands fa-js',
      title: 'JavaScript',
      total: 5,
      parent: '1',
      points: 5,
      content:
        "JavaScript, often abbreviated JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS. Over 97% of websites use JavaScript on the client side for web page behavior, often incorporating third-party libraries. All major web browsers have a dedicated JavaScript engine to execute the code on users' devices.",
    },
    {
      id: '9',
      code: 'fa-brands fa-react',
      title: 'React',
      total: 5,
      parent: '8',
      points: 5,
      content:
        'React (also known as React.js or ReactJS) is a free and open-source front-end JavaScript library for building user interfaces based on UI components. It is maintained by Meta (formerly Facebook) and a community of individual developers and companies. React can be used as a base in the development of single-page, mobile, or server-rendered applications with frameworks like Next.js.',
    },
    {
      id: '13',
      code: 'fa-solid fa-circle-nodes',
      title: 'Redux',
      total: 5,
      parent: '9',
      points: 4,
      content:
        'Redux is an open-source JavaScript library for managing and centralizing application state. It is most commonly used with libraries such as React or Angular for building user interfaces.',
    },
    {
      id: '15',
      code: 'fa-solid fa-angle-right',
      title: 'NextJS',
      total: 5,
      parent: '9',
      points: 4,
      content:
        "Next.js is an open-source web development framework built on top of Node.js enabling React based web applications functionalities such as server-side rendering and generating static websites. React documentation mentions Next.js among 'Recommended Toolchains' advising it to developers as a solution when 'Building a server-rendered website with Node.js'. Where traditional React apps can only render their content in the client-side browser, Next.js extends this functionality to include applications rendered on the server side.",
    },
    {
      id: '10',
      code: 'fa-brands fa-angular',
      title: 'Angular',
      total: 5,
      parent: '8',
      points: 1,
      content:
        "Angular (commonly referred to as 'Angular 2+' or 'Angular CLI') is a TypeScript-based free and open-source web application framework led by the Angular Team at Google and by a community of individuals and corporations. Angular is a complete rewrite from the same team that built AngularJS. Angular is used as the frontend of the MEAN stack, consisting of MongoDB database, Express.js web application server framework, Angular itself (or AngularJS), and Node.js server runtime environment.",
    },
    {
      id: '11',
      code: 'fa-brands fa-vuejs',
      title: 'Vue',
      total: 5,
      parent: '8',
      points: 0,
      content:
        "Vue.js (commonly referred to as Vue; pronounced 'view') is an open-source model–view–viewmodel front end JavaScript framework for building user interfaces and single-page applications. It was created by Evan You, and is maintained by him and the rest of the active core team members.",
    },
    {
      id: '12',
      code: 'fa-solid fa-check-double',
      title: 'Typescript',
      total: 5,
      parent: '8',
      points: 5,
      content:
        'TypeScript is a programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript and adds optional static typing to the language. TypeScript is designed for the development of large applications and transcompiles to JavaScript. As TypeScript is a superset of JavaScript, existing JavaScript programs are also valid TypeScript programs.',
    },
    {
      id: '2',
      code: 'fa-solid fa-terminal',
      title: 'Backend Specialization',
      total: 1,
      points: 1,
      content:
        'Backend web development is the development of the server that often acts as a means of data-access for a website.',
    },
    {
      id: '14',
      code: 'fa-solid fa-globe',
      title: 'C#',
      total: 5,
      parent: '2',
      points: 5,
      content:
        'C# is a general-purpose, multi-paradigm programming language. C# encompasses static typing, strong typing, lexically scoped, imperative, declarative, functional, generic, object-oriented (class-based), and component-oriented programming disciplines.',
    },
    {
      id: '18',
      code: 'fa-brands fa-windows',
      title: '.NET',
      total: 5,
      parent: '14',
      points: 4,
      content:
        ".NET (pronounced as 'dot net'; previously named .NET Core) is a free and open-source, managed computer software framework for Windows, Linux, and macOS operating systems. It is a cross-platform successor to .NET Framework. The project is primarily developed by Microsoft employees by way of the .NET Foundation, and released under the MIT License.",
    },
    {
      id: '16',
      code: 'fa-brands fa-python',
      title: 'Python',
      total: 5,
      parent: '2',
      points: 0,
      content:
        'Python is a high-level, general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation. Its language constructs and object-oriented approach aim to help programmers write clear, logical code for small- and large-scale projects.',
    },
    {
      id: '17',
      code: 'fa-brands fa-js',
      title: 'JavaScript',
      total: 5,
      parent: '2',
      points: 5,
      content:
        "JavaScript, often abbreviated JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS. Over 97% of websites use JavaScript on the client side for web page behavior, often incorporating third-party libraries. All major web browsers have a dedicated JavaScript engine to execute the code on users' devices.",
    },
    {
      id: '19',
      code: 'fa-brands fa-node-js',
      title: 'NodeJS',
      total: 5,
      parent: '17',
      points: 4,
      content:
        "Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser. Node.js lets developers use JavaScript to write command line tools and for server-side scripting—running scripts server-side to produce dynamic web page content before the page is sent to the user's web browser.",
    },
    {
      id: '20',
      code: 'fa-solid fa-forward-fast',
      title: 'ExpressJS',
      total: 5,
      parent: '19',
      points: 3,
      content:
        'Express.js, or simply Express, is a back end web application framework for Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs. It has been called the de facto standard server framework for Node.js.',
    },
    {
      id: '21',
      code: 'fa-solid fa-meteor',
      title: 'MeteorJS',
      total: 5,
      parent: '19',
      points: 0,
      content:
        'Meteor, or MeteorJS, is a free and open-source isomorphic JavaScript web framework written using Node.js. Meteor allows for rapid prototyping and produces cross-platform (Android, iOS, Web) code. It integrates with MongoDB and uses the Distributed Data Protocol and a publish–subscribe pattern to automatically propagate data changes to clients without requiring the developer to write any synchronization code.',
    },
    {
      id: '22',
      code: 'fa-solid fa-crow',
      title: 'NestJS',
      total: 5,
      parent: '19',
      points: 3,
      content:
        'Nest (NestJS) is a framework for building efficient, scalable Node.js server-side applications. It uses progressive JavaScript, is built with and fully supports TypeScript (yet still enables developers to code in pure JavaScript) and combines elements of OOP (Object Oriented Programming), FP (Functional Programming), and FRP (Functional Reactive Programming).',
    },
    {
      id: '23',
      code: 'fa-solid fa-check-double',
      title: 'TypeScript',
      total: 5,
      parent: '17',
      points: 4,
      content:
        'TypeScript is a programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript and adds optional static typing to the language. TypeScript is designed for the development of large applications and transcompiles to JavaScript. As TypeScript is a superset of JavaScript, existing JavaScript programs are also valid TypeScript programs.',
    },
    {
      id: '24',
      code: 'fa-solid fa-database',
      title: 'Databases',
      total: 1,
      parent: '2',
      points: 1,
      content:
        'In computing, a database is an organized collection of data stored and accessed electronically. Small databases can be stored on a file system, while large databases are hosted on computer clusters or cloud storage. The design of databases spans formal techniques and practical considerations including data modeling, efficient data representation and storage, query languages, security and privacy of sensitive data, and distributed computing issues including supporting concurrent access and fault tolerance.',
    },
    {
      id: '25',
      code: 'fa-solid fa-table-list',
      title: 'SQL',
      total: 5,
      parent: '24',
      points: 4,
      content:
        "SQL ('sequel'; Structured Query Language) is a domain-specific language used in programming and designed for managing data held in a relational database management system (RDBMS), or for stream processing in a relational data stream management system (RDSMS). It is particularly useful in handling structured data, i.e. data incorporating relations among entities and variables.",
    },
    {
      id: '27',
      code: 'fa-solid fa-floppy-disk',
      title: 'SQL Server',
      total: 3,
      parent: '25',
      points: 3,
      content:
        'Microsoft SQL Server is a relational database management system developed by Microsoft. As a database server, it is a software product with the primary function of storing and retrieving data as requested by other software applications—which may run either on the same computer or on another computer across a network (including the Internet).',
    },
    {
      id: '28',
      code: 'fa-solid fa-floppy-disk',
      title: 'PostgreSQL',
      total: 3,
      parent: '25',
      points: 2,
      content:
        'PostgreSQL, also known as Postgres, is a free and open-source relational database management system (RDBMS) emphasizing extensibility and SQL compliance.',
    },
    {
      id: '29',
      code: 'fa-solid fa-floppy-disk',
      title: 'OracleDB',
      total: 3,
      parent: '25',
      points: 0,
      content:
        'Oracle Database (commonly referred to as Oracle DBMS or simply as Oracle) is a multi-model database management system produced and marketed by Oracle Corporation. It is a database commonly used for running online transaction processing (OLTP), data warehousing (DW) and mixed (OLTP & DW) database workloads.',
    },
    {
      id: '30',
      code: 'fa-solid fa-floppy-disk',
      title: 'MySQL',
      total: 3,
      parent: '25',
      points: 1,
      content:
        "MySQL is an open-source relational database management system (RDBMS).Its name is a combination of 'My', the name of co-founder Michael Widenius's daughter, and 'SQL', the abbreviation for Structured Query Language. ",
    },
    {
      id: '26',
      code: 'fa-solid fa-link-slash',
      title: 'NoSQL',
      total: 5,
      parent: '24',
      points: 3,
      content:
        "A NoSQL (originally referring to 'non-SQL' or 'non-relational') database provides a mechanism for storage and retrieval of data that is modeled in means other than the tabular relations used in relational databases.",
    },
    {
      id: '31',
      code: 'fa-solid fa-file-code',
      title: 'MongoDB',
      total: 5,
      parent: '26',
      points: 4,
      content:
        'MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas.',
    },
    {
      id: '32',
      code: 'fa-solid fa-server',
      title: 'Redis',
      total: 5,
      parent: '26',
      points: 0,
      content:
        'Redis (Remote Dictionary Server) is an in-memory data structure store, used as a distributed, in-memory key–value database, cache and message broker, with optional durability. Redis supports different kinds of abstract data structures, such as strings, lists, maps, sets, sorted sets, HyperLogLogs, bitmaps, streams, and spatial indices.',
    },
    {
      id: '33',
      code: 'fa-solid fa-share-nodes',
      title: 'Neo4J',
      total: 5,
      parent: '26',
      points: 0,
      content:
        'Neo4j is a graph database management system developed by Neo4j, Inc.',
    },
    {
      id: '3',
      code: 'fa-solid fa-user-gear',
      title: 'Utility Specialization',
      total: 1,
      points: 1,
      content:
        'There are many tools and technologies available to aid in the software development process',
    },
    {
      id: '34',
      code: 'fa-solid fa-code-branch',
      title: 'Git',
      total: 5,
      parent: '3',
      points: 5,
      content:
        'Git is software for tracking changes in any set of files, usually used for coordinating work among programmers collaboratively developing source code during software development. Its goals include speed, data integrity, and support for distributed, non-linear workflows (thousands of parallel branches running on different systems).',
    },
    {
      id: '35',
      code: 'fa-brands fa-github',
      title: 'GitHub',
      total: 5,
      parent: '34',
      points: 5,
      content:
        'GitHub, Inc. is a provider of Internet hosting for software development and version control using Git. It offers the distributed version control and source code management (SCM) functionality of Git, plus its own features. It provides access control and several collaboration features such as bug tracking, feature requests, task management, continuous integration and wikis for every project.',
    },
    {
      id: '36',
      code: 'fa-brands fa-bitbucket',
      title: 'BitBucket',
      total: 5,
      parent: '34',
      points: 5,
      content:
        'Bitbucket is a Git-based source code repository hosting service owned by Atlassian. Bitbucket offers both commercial plans and free accounts with an unlimited number of private repositories.',
    },
    {
      id: '37',
      code: 'fa-solid fa-cloud',
      title: 'Cloud',
      total: 1,
      parent: '3',
      points: 1,
      content:
        'Cloud computing is the on-demand availability of computer system resources, especially data storage (cloud storage) and computing power, without direct active management by the user.',
    },
    {
      id: '38',
      code: 'fa-solid fa-cloud',
      title: 'Heroku',
      total: 3,
      parent: '37',
      points: 2,
      content:
        'Heroku is a cloud platform as a service (PaaS) supporting several programming languages. One of the first cloud platforms, Heroku has been in development since June 2007, when it supported only the Ruby programming language, but now supports Java, Node.js, Scala, Clojure, Python, PHP, and Go.',
    },
    {
      id: '39',
      code: 'fa-solid fa-arrows-spin',
      title: 'Netlify',
      total: 3,
      parent: '37',
      points: 3,
      content:
        'Netlify is a San Francisco-based cloud computing company that offers hosting and serverless backend services for web applications and static websites. The company provides hosting for websites whose source files are stored in the version control system Git and then generated into static web content files served via a Content Delivery Network. Given the limitations of the purely static model, the company later expanded services to include content management systems, and features of serverless computing to handle websites with interactive features.',
    },
    {
      id: '40',
      code: 'fa-brands fa-aws',
      title: 'AWS',
      total: 3,
      parent: '37',
      points: 1,
      content:
        'Amazon Web Services, Inc. (AWS) is a subsidiary of Amazon providing on-demand cloud computing platforms and APIs to individuals, companies, and governments, on a metered pay-as-you-go basis. These cloud computing web services provide a variety of basic abstract technical infrastructure and distributed computing building blocks and tools.',
    },
    {
      id: '41',
      code: 'fa-brands fa-google',
      title: 'GCP',
      total: 3,
      parent: '37',
      points: 0,
      content:
        'Google Cloud Platform (GCP), offered by Google, is a suite of cloud computing services that runs on the same infrastructure that Google uses internally for its end-user products, such as Google Search, Gmail, Google Drive, and YouTube. Alongside a set of management tools, it provides a series of modular cloud services including computing, data storage, data analytics and machine learning.',
    },
    {
      id: '42',
      code: 'fa-solid fa-cloud-arrow-up',
      title: 'Azure',
      total: 3,
      parent: '37',
      points: 1,
      content:
        'Microsoft Azure, often referred to as Azure is a cloud computing service operated by Microsoft for application management via Microsoft-managed data centers. It provides software as a service (SaaS), platform as a service (PaaS) and infrastructure as a service (IaaS) and supports many different programming languages, tools, and frameworks, including both Microsoft-specific and third-party software and systems.',
    },
    {
      id: '43',
      code: 'fa-solid fa-fire',
      title: 'Firebase',
      total: 3,
      parent: '37',
      points: 2,
      content:
        'Firebase is a platform developed by Google for creating mobile and web applications. It was originally an independent company founded in 2011. In 2014, Google acquired the platform and it is now their flagship offering for app development.',
    },
    {
      id: '44',
      code: 'fa-solid fa-cloud-arrow-up',
      title: 'Supabase',
      total: 3,
      parent: '37',
      points: 3,
      content:
        'Supabase is an open source Firebase alternative. It provides all the backend services you need to build a product. You can use it completely, or just the services you require',
    },
    {
      id: '45',
      code: 'fa-brands fa-docker',
      title: 'Docker',
      total: 3,
      parent: '3',
      points: 2,
      content:
        'Docker is a set of platform as a service (PaaS) products that use OS-level virtualization to deliver software in packages called containers. The service has both free and premium tiers.',
    },
  ],
};
