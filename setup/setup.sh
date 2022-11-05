yes | sudo apt update
yes | sudo apt install nginx
yes | sudo ufw allow 'Nginx HTTP'
yes | sudo ufw allow 3000
yes | sudo ufw allow https
yes | sudo ufw enable

# cert bot SSL
yes | apt-get update
yes | sudo apt-get install certbot
yes | apt-get install python3-certbot-nginx

# enable cert bot for vootlachaitanya.com and www.vootlachaitanya.com
# !add A records for both the above domains point them to the machine 
yes | sudo certbot --nginx -d vootlachaitanya.com -d www.vootlachaitanya.com
