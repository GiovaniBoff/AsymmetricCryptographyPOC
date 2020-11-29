# goBarberApi 

## Backend
Pre-requisites

### Docker and Docker compose
- docker [Docker installation docs](https://docs.docker.com/get-docker/)
- docker-compose [docker compose installation](https://docs.docker.com/compose/install/)

To Up the docker 

`sudo docker-compose up -d`
 
If the above command do not run the docker, try: `sudo systemctl start docker`

### Install the dependencies

`yarn` or `npm install`

### Run the server

Sequelize migration

`yarn migration:run` 
or 
`npm run migration:run`

To run the server

`yarn dev` or `npm run dev`

## Database config
<table>
    <tr>
        <td>DB connect</td>
        <td>localhost</td>
     <tr>
    <tr>
        <td>User</td>
        <td>postgres</td>
     <tr>
        <td>Password</td>
        <td>docker</td>
     </tr> 
       <tr>
        <td>Database</td>
        <td>gobarber</td>
     </tr> 
       <tr>
        <td>Port</td>
        <td>5432</td>
     </tr> 
    </tr>
</table>

## Frontend
