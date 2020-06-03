<h1>BISMILAHI RAHMANI RAHIM</h1>
ALAHOUMA SOLI ALA MOUHAMADIN WA ALA ALI-HI WA SOHBI-HI ADJ-MA-HIN WA SALAMA TASILIMAN KESIRAN

----------------------------------------------------------
                 Config your database
----------------------------------------------------------
-Update the config file in ./utils/config/dbConfig.js
-Update db.js file in ./database/db.js

----------------------------------------------------------
                 Create your Model
----------------------------------------------------------
For one Model follow this instructions :

-Create Model file on /app/models/ and define your columns and their type in this file
    *Import sequelize and Sequelize from /database/db : 
       EX :  const {sequelize, Sequelize} = require('../../database/db');

----------------------------------------------------------
                 Create your Queries
----------------------------------------------------------

-Create query file in /database/query/
    * Import db connexion file ./database/connexiondb.js
    * import your Model
    * add your different request, you can just copy User.request.js and edit it

-Import the query in your controller and add the corresponding functions to his corresponding controller

----------------------------------------------------------
                 Create table : migration
----------------------------------------------------------
    -Import your db/connexion in migration
    -Import your Model
    -Update the migration file and import in your query file see the example of user
    -Execute after the table creation comment the import the migration import line
