# goBarberApi 

## Backend
Pre-requisites

docker
`sudo apt install docker &&  apt install docker-compose` 

To Up the docker 
`sudo systemctl start docker` 
`sudo docker-compose up` 

Sequelize migration
`yarn migration:run`

To run the server
`yarn dev`

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