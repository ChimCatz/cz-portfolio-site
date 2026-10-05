window.TECH_MASTER_QUESTION_BANKS = window.TECH_MASTER_QUESTION_BANKS || {};
window.TECH_MASTER_QUESTION_BANKS.hard = [
    {
        question: "Who is widely recognized as the first computer programmer?",
        choices: ["Alan Turing", "Ada Lovelace", "Grace Hopper", "Charles Babbage"],
        answer: 1,
        explanation: "Ada Lovelace wrote an algorithm for Charles Babbage's Analytical Engine in the 1800s. That is why she is widely recognized as the first computer programmer."
    },
    {
        question: "What does Big O notation describe?",
        choices: ["Code file size", "Algorithm performance growth", "Memory hardware speed", "Database table count"],
        answer: 1,
        explanation: "Big O describes how an algorithm's time or memory use grows as input size increases. It helps compare efficiency without focusing on exact runtime."
    },
    {
        question: "Which data structure follows Last In, First Out?",
        choices: ["Queue", "Stack", "Array", "Graph"],
        answer: 1,
        explanation: "A stack follows Last In, First Out, meaning the last item added is removed first. It works like stacking plates."
    },
    {
        question: "Which data structure follows First In, First Out?",
        choices: ["Queue", "Stack", "Tree", "Hash Map"],
        answer: 0,
        explanation: "A queue follows First In, First Out, meaning the first item added is processed first. It works like a real-world line."
    },
    {
        question: "What is normalization in databases mainly used for?",
        choices: ["Increasing file size", "Reducing redundancy", "Making UI faster", "Encrypting passwords"],
        answer: 1,
        explanation: "Normalization organizes data to reduce repeated values and improve consistency. It usually splits data into related tables."
    },
    {
        question: "Which SQL command removes all rows from a table but keeps the table structure?",
        choices: ["DROP", "DELETE DATABASE", "TRUNCATE", "ALTER"],
        answer: 2,
        explanation: "TRUNCATE removes all rows quickly while keeping the table itself. DROP removes the table structure entirely."
    },
    {
        question: "What does ACID stand for in database transactions?",
        choices: ["Atomicity, Consistency, Isolation, Durability", "Accuracy, Control, Input, Data", "Access, Cache, Index, Delivery", "Atomicity, Columns, Insert, Delete"],
        answer: 0,
        explanation: "ACID means Atomicity, Consistency, Isolation, and Durability. These properties help keep database transactions reliable."
    },
    {
        question: "Which HTTP status code means 'Not Found'?",
        choices: ["200", "301", "404", "500"],
        answer: 2,
        explanation: "HTTP 404 means the requested resource could not be found. It often appears when a page URL is wrong or removed."
    },
    {
        question: "Which HTTP method is normally used to update an existing resource fully?",
        choices: ["GET", "PUT", "POST", "TRACE"],
        answer: 1,
        explanation: "PUT is commonly used to replace or fully update an existing resource. PATCH is usually used for partial updates."
    },
    {
        question: "What is the main purpose of hashing?",
        choices: ["Compressing videos", "Creating fixed-length data fingerprints", "Increasing internet speed", "Running SQL queries"],
        answer: 1,
        explanation: "Hashing converts input into a fixed-length output. It is commonly used for password storage, checksums, and fast lookups."
    },
    {
        question: "Which algorithm is commonly used for secure password hashing?",
        choices: ["MD5", "SHA-1", "bcrypt", "Base64"],
        answer: 2,
        explanation: "bcrypt is designed for password hashing because it is intentionally slow and supports salting. MD5 and SHA-1 are no longer safe for password storage."
    },
    {
        question: "What does a foreign key do in a relational database?",
        choices: ["Encrypts a column", "Links one table to another", "Deletes duplicate rows", "Speeds up CSS loading"],
        answer: 1,
        explanation: "A foreign key links a column in one table to a primary key in another table. This helps maintain relationships and data integrity."
    },
    {
        question: "Which concept allows a class to reuse behavior from another class?",
        choices: ["Encapsulation", "Inheritance", "Indexing", "Compilation"],
        answer: 1,
        explanation: "Inheritance lets one class reuse or extend another class's behavior. It is a major concept in object-oriented programming."
    },
    {
        question: "What is encapsulation in object-oriented programming?",
        choices: ["Hiding internal details behind controlled access", "Copying files into folders", "Running code faster", "Deleting unused functions"],
        answer: 0,
        explanation: "Encapsulation hides internal data and exposes only controlled methods. It helps protect object state from unsafe changes."
    },
    {
        question: "Which JavaScript keyword declares a block-scoped variable?",
        choices: ["var", "let", "define", "global"],
        answer: 1,
        explanation: "let creates a block-scoped variable in JavaScript. var is function-scoped and can cause unexpected behavior."
    },
    {
        question: "What does === check in JavaScript?",
        choices: ["Value only", "Type only", "Value and type", "Memory address only"],
        answer: 2,
        explanation: "The === operator checks both value and type. This makes it stricter than ==, which may perform type conversion."
    },
    {
        question: "What is a closure in JavaScript?",
        choices: ["A CSS animation", "A function remembering variables from its outer scope", "A browser cache rule", "A database lock"],
        answer: 1,
        explanation: "A closure happens when a function keeps access to variables from its outer scope. This remains true even after the outer function has finished."
    },
    {
        question: "What does async/await help manage?",
        choices: ["Synchronous loops", "Asynchronous operations", "CSS styling", "Database indexes only"],
        answer: 1,
        explanation: "async/await makes asynchronous code easier to read and manage. It is commonly used with promises and API calls."
    },
    {
        question: "Which Python data type stores key-value pairs?",
        choices: ["List", "Tuple", "Dictionary", "Set"],
        answer: 2,
        explanation: "A Python dictionary stores data as key-value pairs. It is useful for fast lookups and structured records."
    },
    {
        question: "What is the output of Python: len(set([1, 1, 2, 3]))?",
        choices: ["2", "3", "4", "Error"],
        answer: 1,
        explanation: "A set removes duplicate values, so [1, 1, 2, 3] becomes {1, 2, 3}. The length is 3."
    },
    {
        question: "Which sorting algorithm has average time complexity O(n log n)?",
        choices: ["Bubble Sort", "Linear Search", "Merge Sort", "Sleep Sort"],
        answer: 2,
        explanation: "Merge Sort has average time complexity O(n log n). It splits the list, sorts parts, and merges them back."
    },
    {
        question: "What does recursion mean?",
        choices: ["A function calling itself", "A loop that never ends", "A database backup", "A CSS layout method"],
        answer: 0,
        explanation: "Recursion means a function calls itself to solve smaller versions of a problem. It must have a base case to stop."
    },
    {
        question: "What is overfitting in machine learning?",
        choices: ["A model learning training data too closely", "A model running too fast", "A database storing too much data", "A UI having too many buttons"],
        answer: 0,
        explanation: "Overfitting happens when a model performs well on training data but poorly on new data. It memorizes patterns instead of generalizing."
    },
    {
        question: "What is the main purpose of a validation dataset?",
        choices: ["Train the model only", "Tune and evaluate during development", "Replace production data", "Store passwords"],
        answer: 1,
        explanation: "A validation dataset helps evaluate model performance during development. It guides tuning before final testing."
    },
    {
        question: "What does a confusion matrix show?",
        choices: ["Model prediction results by category", "Database table relationships", "Network speed changes", "Memory allocation blocks"],
        answer: 0,
        explanation: "A confusion matrix shows correct and incorrect predictions across classes. It helps analyze errors beyond simple accuracy."
    },
    {
        question: "What is precision in classification?",
        choices: ["Correct positives out of predicted positives", "Correct negatives out of all records", "Training speed percentage", "Dataset size ratio"],
        answer: 0,
        explanation: "Precision measures how many predicted positives are actually positive. It matters when false positives are costly."
    },
    {
        question: "What is recall in classification?",
        choices: ["Correct positives found out of actual positives", "Correct file recovery rate", "Model loading speed", "Database response time"],
        answer: 0,
        explanation: "Recall measures how many actual positives the model successfully found. It matters when missing positives is costly."
    },
    {
        question: "Which architecture is the foundation of GPT-style language models?",
        choices: ["Transformer", "Decision Tree", "K-Means", "Naive Bayes"],
        answer: 0,
        explanation: "GPT-style models use the Transformer architecture. It handles text sequences efficiently using attention mechanisms."
    },
    {
        question: "What is an embedding in AI?",
        choices: ["A numeric representation of data meaning", "A password hash", "A database backup", "A browser cookie"],
        answer: 0,
        explanation: "An embedding converts data like text into numeric vectors. Similar meanings usually have closer vector positions."
    },
    {
        question: "What is tokenization in language models?",
        choices: ["Breaking text into smaller units", "Encrypting all data", "Removing duplicate rows", "Designing a web page"],
        answer: 0,
        explanation: "Tokenization breaks text into smaller pieces such as words, subwords, or characters. Language models process these tokens instead of raw text."
    },
    {
        question: "What is the main role of DNS?",
        choices: ["Translate domain names into IP addresses", "Encrypt website content", "Store browser history", "Compress images"],
        answer: 0,
        explanation: "DNS translates names like example.com into IP addresses. This lets browsers find the correct server."
    },
    {
        question: "Which protocol secures web traffic using encryption?",
        choices: ["HTTP", "FTP", "HTTPS", "SMTP"],
        answer: 2,
        explanation: "HTTPS encrypts web traffic using TLS. It protects data between the browser and server."
    },
    {
        question: "What is a primary key?",
        choices: ["A unique identifier for table records", "A password for database login", "The first column only", "A server address"],
        answer: 0,
        explanation: "A primary key uniquely identifies each row in a table. It prevents duplicate identity records."
    },
    {
        question: "What does indexing do in databases?",
        choices: ["Makes queries faster", "Deletes unused rows", "Encrypts tables", "Changes UI layout"],
        answer: 0,
        explanation: "Indexing helps databases find rows faster without scanning everything. It improves read performance but can add write overhead."
    },
    {
        question: "Which command is used to copy a Git repository?",
        choices: ["git clone", "git push", "git merge", "git reset"],
        answer: 0,
        explanation: "git clone copies a remote repository to your local machine. It includes project files and version history."
    },
    {
        question: "What does git commit do?",
        choices: ["Saves a snapshot of changes", "Uploads changes to GitHub", "Deletes the repo", "Creates a database"],
        answer: 0,
        explanation: "git commit saves a snapshot of staged changes in local history. git push is used to upload commits to a remote repository."
    },
    {
        question: "What is Docker mainly used for?",
        choices: ["Containerizing applications", "Writing HTML", "Creating spreadsheets", "Replacing Git"],
        answer: 0,
        explanation: "Docker packages apps with their dependencies into containers. This helps make software run consistently across environments."
    },
    {
        question: "What does CI/CD stand for?",
        choices: ["Continuous Integration and Continuous Delivery", "Code Input and Code Design", "Cloud Interface and Cloud Data", "Central Internet and Central Database"],
        answer: 0,
        explanation: "CI/CD automates testing, building, and deployment workflows. It helps teams release software faster and with fewer manual steps."
    },
    {
        question: "Which attack tries many password combinations automatically?",
        choices: ["Brute force attack", "Phishing attack", "SQL indexing", "DNS caching"],
        answer: 0,
        explanation: "A brute force attack repeatedly tries many password combinations. Strong passwords and rate limits help reduce the risk."
    },
    {
        question: "What is SQL injection?",
        choices: ["Injecting malicious SQL into input fields", "Adding indexes to tables", "Backing up databases", "Formatting query results"],
        answer: 0,
        explanation: "SQL injection happens when attackers insert malicious SQL through unsafe inputs. Parameterized queries help prevent it."
    }
];
